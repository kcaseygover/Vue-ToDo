import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000'
});

export default {
  async getTodoLists() {
    const response = await axiosInstance.get('todo_lists');
    return response.data;
  },
}
