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
    removeTodo(state, todo) {
      state.todos.splice(state.todos.indexOf(todo), 1)
    },
    editTodo(state, { todo, title = todo.title, completed = todo.completed }) {
      todo.title = title
      todo.completed = completed
    }
  },
  actions: {
    async loadTodoLists({ commit }) {
      const todoLists = await api.getTodoLists();
      console.log('todoLists',todoLists);
      commit('loadTodoLists', todoLists);
    },
    addTodo({ commit }, text) {
      commit('addTodo', text);
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
