import axios from 'axios';

axios.defaults.baseURL = 'https://post-740a7.firebaseio.com';

export default {
  async getAllItems() {
    try {
      return await axios.get('/post.json');
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },
  async addItem(obj) {
    try {
      return await axios.post('/post.json', obj);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },
  async deleteItem(id) {
    try {
      return await axios.delete(`/post/${id}.json`);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },
};