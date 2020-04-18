const API_URL = 'http://localhost:8000';
export default {
  methods: {
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
      this.axios.post(`${API_URL}/api/item/`, data, this.getConfig());
    },
    async getItems () {
      this.axios.get(`${API_URL}/api/kanban/`, this.getConfig());
    },
    deleteItem (itemToDelete) {
      this.axios.delete(`${API_URL}/api/item/${itemToDelete}/`, this.getConfig());
    }
  }
};
