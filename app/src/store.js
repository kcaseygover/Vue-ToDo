import Vue from 'vue';
import Vuex from 'vuex';
import api from './api';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    todoLists: {},
    todos: [],
  },
  mutations: {
    loadTodoLists(state, todoLists) {
      state.todoLists = todoLists;
    },
    addTodoList(state, todoList) {
      Vue.set(state.todoLists, todoList.id, todoList);
    },
    removeTodoList(state, id) {
      Vue.delete(state.todoLists, id);
    },
    loadTodoList(state, todoList) {
      Vue.set(state.todoLists, todoList.id, todoList);
    },
    loadTodos(state, todos) {
      todos.forEach(todo => Vue.set(state.todos, todo.id, todo))
    },
    addTodo(state, todo) {
      Vue.set(state.todos, todo.id, todo);
      state.todoLists[todo.todo_list_id].todos.push(todo.id);
    },
    removeTodo(state, { id, todoListId }) {
      var index = state.todoLists[todoListId].todos.indexOf(id);
      Vue.delete(state.todoLists[todoListId].todos, index);
      Vue.delete(state.todos, id);
    },
    editTodo(state, { id, title, completed }) {
      state.todos[id].title = title;
      state.todos[id].completed = completed;
    },
  },
  actions: {
    async loadTodoLists({ commit }) {
      const response = await api.getTodoLists();
      const todoLists = Object.assign({}, ...response.map(item => ({ [item.id]: item })));
      commit('loadTodoLists', todoLists);
    },
    async createTodoList({ commit }, name) {
      const todoList = await api.createTodoList(name);
      commit('addTodoList', todoList);
    },
    async removeTodoList({ commit }, { id }) {
      await api.deleteTodoList(id);
      commit('removeTodoList', id);
    },
    async loadTodoList({ commit }, { id }) {
      const todoList = await api.getTodoList(id);
      // Adding a commit of a single todoList is causing a double entry in the store
      // We already have the todoList in the store from when app mounted
      // We could check the store and load the todoList if not commited
      // Or we could empty state between route changes
      const todos = await Promise.all(todoList.todos.map(id => api.getTodo(id)));
      commit('loadTodos', todos);

    },
    async addTodo({ commit }, { todoListId, title }) {
      const todo = await api.createTodo(todoListId, title);
      commit('addTodo', todo);
    },
    async removeTodo({ commit }, { id, todoListId }) {
      await api.deleteTodo(id);
      commit('removeTodo', { id, todoListId });
    },
    async editTodo({ commit }, { id, title, completed }) {
      const todo = await api.updateTodo(id, title, completed);
      commit('editTodo', todo)
    },
    async toggleAll({ state, commit }, { done, todos }) {
      const alltodos = await Promise.all(todos.map(todo => api.updateTodo(todo.id, todo.title, done)));
      alltodos.forEach(todo => commit('editTodo', todo))
    },
    async removeCompleted({ state, commit }, todoListId) {
      const completedTodos = state.todos.filter(t => t.todo_list_id === todoListId).filter(todo => todo.completed);
      await Promise.all(completedTodos.map(todo => api.deleteTodo(todo.id)));
      completedTodos.sort((a, b) => a.id - b.id).reverse().forEach(todo => {
        commit('removeTodo', { id: todo.id, todoListId })
      })
    },
  },
});
