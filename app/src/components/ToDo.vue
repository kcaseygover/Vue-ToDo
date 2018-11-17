<template>
  <li class="todo" :class="{ completed: todo.completed, editing: editing }">
    <div class="view">
      <input class="toggle"
        type="checkbox"
        :checked="todo.completed"
        @change="editTodo({id: todo.id, title: todo.title, completed: !todo.completed})">
      <label v-text="todo.title" @dblclick="editing = true"></label>
      <button class="destroy" @click="removeTodo({ id: todo.id, todoListId: todo.todo_list_id})">
      </button>
    </div>
    <input class="edit"
      v-show="editing"
      v-focus="editing"
      :value="todo.title"
      @keyup.enter="doneEdit"
      @keyup.esc="cancelEdit"
      @blur="doneEdit">
  </li>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Todo',
  props: ['todo'],
  data() {
    return {
      editing: false,
    };
  },
  directives: {
    focus(el, binding) {
      if (binding.value) {
        el.focus();
      }
    },
  },
  methods: {
    ...mapActions([
      'editTodo',
      'removeTodo',
    ]),
    doneEdit(e) {
      const title = e.target.value.trim();
      const { todo } = this;
      if (!title) {
        this.removeTodo({ id: todo.id, todoListId: todo.todo_list_id });
      } else if (this.editing) {
        this.editTodo({
          id: todo.id,
          title,
        });
        this.editing = false;
      }
    },
    cancelEdit(e) {
      e.target.value = this.todo.title;
      this.editing = false;
    },
  },
};
</script>
