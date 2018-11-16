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
    addToDoList(state, todoList) {
      console.log('in addToDoList mutation');
      Vue.set(state.todoLists, todoList.id, todoList);
    },
    removeTodoList(state, index) {
      state.todoLists.splice(index, 1);
    },
    loadTodoList(state, todoList) {
      Vue.set(state.todoLists, todoList.id, todoList);
    },
    loadTodos(state, todos) {
      todos.forEach(todo => Vue.set(state.todos, todo.id, todo))
    },
    addTodo(state, value) {
      if (!value) {
        return;
      }
      state.todos.push({
        id: state.newId++,
        title: value,
        completed: false,
      });
    },
    removeTodo(state, index) {
      state.todos.splice(state.todos.indexOf(index), 1)
    },
    editTodo(state, { todo, title = todo.title, completed = todo.completed }) {
      todo.title = title
      todo.completed = completed
    }
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
    async removeTodoList({ commit }, { id, index }) {
      await api.deleteTodoList(id);
      commit('removeTodoList', index);
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
    addTodo({ commit }, todo) {
      commit('addTodo', todo);
    },
    removeTodo ({ commit }, todo) {
      commit('removeTodo', todo)
    },
    toggleTodo ({ commit }, todo) {
      commit('editTodo', { todo, completed: !todo.completed })
    },
    editTodo ({ commit }, { todo, value }) {
      commit('editTodo', { todo, title: value }) 
    },
    toggleAll ({ state, commit }, completed) {
      state.todos.forEach((todo) => {
        commit('editTodo', { todo, completed })
      })
    },
    removeCompleted ({ state, commit }) {
      state.todos.filter(todo => todo.completed)
        .forEach(todo => {
          commit('removeTodo', todo)
        })
    } 
  },
});
