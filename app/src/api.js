import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000'
});

export default {
  async getTodoLists() {
    const response = await axiosInstance.get('todo_lists');
    return response.data;
  },
  async createTodoList(name) {
    const response = await axiosInstance.post('todo_lists', { name });
    return response.data;
  },
  async deleteTodoList(id) {
    const response = await axiosInstance.delete(`todo_lists/${id}`);
    return response.data;
  },
  async getTodoList(id) {
    const response = await axiosInstance.get(`todo_lists/${id}`);
    return response.data;
  },
  async getTodo(id) {
    const response = await axiosInstance.get(`todo/${id}`);
    return response.data;
  },
  async createTodo(payload) {
    const response = await axiosInstance.post('todo');
    return response.data;
  },
  async deleteTodo(id) {
    const response = await axiosInstance.delete(`todo/${id}`);
    return response.data;
  },
  async updateTodo(id) {
    const response = await axiosInstance.patch(`todo/${id}`);
    return response.data;
  },
}
