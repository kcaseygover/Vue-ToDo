import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import TodoList from './views/TodoList.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    { path: '/todo-lists/:id',
      name: 'TodoList',
      component: TodoList,
   }
  ],
});
