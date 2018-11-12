import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    todos: [{ id: 1, title: 'srtjdydkyfk', completed: false }],
    newId: 2,
    editedTodo: null,
    visibility: 'all',
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

  },
  actions: {
    addTodo(context, text) {
      context.commit('addTodo', text);
    }
  },
});
