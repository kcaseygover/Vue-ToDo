import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  // strict: true,
  state: {
    todos: [{ id: 1, title: 'srtjdydkyfk', completed: false }],
    newId: 2
  },
  mutations: {
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
    removeTodo (state, todo) {
      state.todos.splice(state.todos.indexOf(todo), 1)
    },
  
    editTodo (state, { todo, title = todo.title, completed = todo.completed }) {
      todo.title = title
      todo.completed = completed
    }

  },
  actions: {
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
  },
});
