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
    return axios.post(`${API_URL}/api/item/`, data, this.getConfig());
  },
  updateItem (id, data) {
    return axios.put(`${API_URL}/api/item/${id}/`, data, this.getConfig());
  },
  getColumns () {
    return axios.get(`${API_URL}/api/kanban/`, this.getConfig())
      .then(r => r.data);
  },
  deleteItem (itemToDelete) {
    return axios.delete(`${API_URL}/api/item/${itemToDelete}/`, this.getConfig());
  }
};
