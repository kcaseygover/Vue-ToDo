<template>
  <header class="header">
    <input
      class="new-todo"
      autofocus
      autocomplete="off"
      placeholder="What needs to be done?"
      @keyup.enter="addTodo"
    >
  </header>
</template>

<script>
export default {
  name: 'CreateToDo',
  methods: {
    addTodo(e) {
      const title = e.target.value.trim();
      const todoListId = this.$route.params.id;
      if (title) {
        this.$store.dispatch('addTodo', { todoListId, title });
        e.target.value = '';
      }
    },
  }
};
</script>
