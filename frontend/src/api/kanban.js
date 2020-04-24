import axios from 'axios';
const API_URL = 'http://localhost:8000';
export default {
  getConfig () {
    return {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      }
    };
  },
  postItem (data) {
    axios.post(`${API_URL}/api/item/`, data, this.getConfig());
  },
  updateItem (data, itemToUpdate) {
    axios.put(`${API_URL}/api/item/${itemToUpdate}/`, data, this.getConfig());
  },
  getColumns () {
    return axios.get(`${API_URL}/api/kanban/`, this.getConfig())
      .then(r => {
        console.log('blablabla', r.data);
        // r.data.forEach((element, index) => {
        //   columns[index] = r.data[index];
        // });
        return r.data;
      }
      );
  },
  deleteItem (itemToDelete) {
    axios.delete(`${API_URL}/api/item/${itemToDelete}/`, this.getConfig());
  }
};
