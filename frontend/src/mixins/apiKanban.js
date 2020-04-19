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
    getItems (columns) {
      return this.axios.get(`${API_URL}/api/kanban/`, this.getConfig())
        .then(r => {
          console.log('Le fion', r.data);
          r.data.forEach((element, index) => {
            this.columns[index] = r.data[index];
          });
          return columns;
        }
        );
    },
    deleteItem (itemToDelete) {
      this.axios.delete(`${API_URL}/api/item/${itemToDelete}/`, this.getConfig());
    }
  }
};
