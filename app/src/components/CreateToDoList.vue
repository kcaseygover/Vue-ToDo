<template>
  <header class="header">
    <input
      type="text"
      class="new-todo"
      autofocus
      autocomplete="off"
      placeholder="Name your New Todo List"
      @keyup.enter="createTodoList"
    >
  </header>
</template>

<script>
export default {
  name: 'CreateToDoList',
  methods: {
    createTodoList(e) {
      const name = e.target.value.trim();
      if (!name) {
        return;
      }
      this.$store.dispatch('createTodoList', name);
			e.target.value = '';
    },
  },
};
</script>
