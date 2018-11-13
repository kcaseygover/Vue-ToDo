<template>
  <header class="header">
    <input
      class="new-todo"
      autofocus
      autocomplete="off"
      placeholder="What needs to be done?"
      @keydown.enter="addTodo"
    >
  </header>
</template>

<script>
export default {
  name: 'CreateToDo',
  methods: {
    addTodo(e) {
      const value = e.target.value && e.target.value.trim();
      if (!value) {
        return;
      }
			this.$store.dispatch('addTodo', value);
			e.target.value = '';
    },
  }
};
</script>
