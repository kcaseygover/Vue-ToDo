<template>
  <header class="header">
    <h1>todos</h1>
    <input
      type="text"
      class="new-todo"
      autofocus autocomplete="off"
      placeholder="What needs to be done?"
      v-on="listeners"
    >
  </header>
</template>

<script>
export default {
  name: 'CreateToDo',
  computed: {
    listeners() {
      return {
        // Pass all component listeners directly to input
        ...this.$listeners,
        // Override input listener to work with v-model
        input: event => this.$emit('input', event.target.value),
      };
    },
  },
  method: {
  }
};
</script>
