import Vue from 'vue';
import Vuex from 'vuex';
import api from './api';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    todoLists: [],
    todos: [],
    newId: 2
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
      const todoLists = await api.getTodoLists();
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
