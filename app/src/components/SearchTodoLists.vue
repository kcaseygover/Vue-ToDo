<template>
  <div id="SearchTodoLists">
    <section class="autocomplete">
      <input
        class="new-todo"
        autofocus
        autocomplete="on"
        placeholder="Search todo lists..."
        v-focus="searchValue"
        v-model="searchValue"
        @input="onChange"
        @keydown.enter="redirect"
      >
      <ul v-show="isOpen" class="todo-list autocomplete-results">
        <li
        v-for="(result, i) in results"
        :key="i"
        class="autocomplete-result"
        @click="setResult(result)"
      >
        {{ result.name }}
      </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: 'SearchTodoLists',
  data() {
    return {
      searchValue: '',
      searchValueId: '',
      results: [],
      isOpen: false
    }
  },
  directives: {
      focus(el, binding) {
      if (binding.value) {
        el.focus();
      }
    }
  },
  methods: {
    onChange() {
      this.isOpen = true;
      this.filterResults();
    },
    filterResults() {
      this.results = this.todoLists.filter((todoList) => {
        return todoList.name.toLowerCase().indexOf(this.searchValue.toLowerCase() > -1);
      })
    },
    setResult(result) {
      this.searchValue = result.name;
      this.searchValueId = result.id;
      this.isOpen = false;
    },
    redirect() {
      if (this.todoLists.some(list => list.id === this.searchValueId)) {
        this.$router.push({ name: 'TodoList', params: { id: this.searchValueId }});
        this.searchValue = '';
        this.searchValueId = '';
        this.results = [];
      } else {
        this.searchValue = '';
        this.searchValueId = '';
        this.results = [];
      }
    },
  },
  computed: {
    todoLists() {
			return this.$store.state.todoLists;
		},
  }
};
</script>
<style>
.autocomplete {
  position: relative;

}
.autocomplete-results {
  padding: 0;
  margin: 0;
  border: 1px solid #eeeeee;

  overflow: auto;
}
.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}
.autocomplete-result:hover {
  background-color: #4AAE9B;
  color: white;
}
</style>
