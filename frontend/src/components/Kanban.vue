<template>
  <div class="kanban">
    <h1>Kanban</h1>
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="New TODO" aria-label="New TODO" v-model="newItem" aria-describedby="button-addon2">
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" v-on:click="addItem(0, newItem)">Button</button>
      </div>
    </div>
    <div class="row">
      <div class="col"  v-for="(column, colNum) in columns" v-bind:key="column.title" v-on:dragenter="dragEnterColumn(colNum)" v-on:dragleave="dragLeaveColumn">
         <h1>{{column.title}}</h1>
        <div class="card text-white bg-dark mb-3" v-for="(item, index) in column.items" v-on:dragstart="dragging(colNum,index, item.text)"  v-on:dragend="dropped(colNum,index)" v-bind:key="index" draggable="true">
          <div class="card-body">
            <h5 class="card-title">{{item.text}}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const API_URL = 'http://localhost:8000';

export default {
  name: 'Kanban',
  data () {
    return {
      columns: [],
      newItem: '',
      itemDragged: null,
      currentColumnDraggedOver: null,
      initialColumn: null
    };
  },
  methods: {
    addItem (colNum, text) {
      var colNumDb = colNum + 1; // array starts at 0 but colNums start at 1
      if (text !== '') {
        this.newItem = text;
      }
      this.columns[colNum].items.push({text: this.newItem});
      this.$forceUpdate();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        }
      };
      console.log(this.newItem)
      colNum++; // array starts at 0 but colNums start at 1
      var data = {
            text: this.newItem,
            column: colNumDb 
            }
      this.axios.post(`${API_URL}/api/item/`, data, config);
      this.newItem = '';
    },
    removeItem (colNum, index) {
      var itemToDelete = this.columns[colNum].items[index].id; // array starts at 0 but colNums start at 1
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        }
      };    
      this.axios.delete(`${API_URL}/api/item/${itemToDelete}/`, config);
      this.columns[colNum].items.splice(index, 1);
    },
    dragging (colNum, index, item) {
      
      if (this.itemDragged !== item) {
        this.itemDragged = item;
        this.initialColumn = colNum;
      }
    },
    dropped (colNum, index) {
      
      if (this.currentColumnDraggedOver !== null) {
        this.removeItem(colNum, index);
        this.addItem(this.currentColumnDraggedOver, this.itemDragged);
      } else {
        this.addItem(this.initialColumn, this.itemDragged);
      }
      this.itemDragged = null;
    },
    dragEnterColumn (colNum) {
      
      this.currentColumnDraggedOver = colNum;
    },
    dragLeaveColumn (e) {
      
      if (this.counterDrag === 0 && (e.screenX !== 0 && e.screenY !== 0 && e.clientX !== 0 && e.clientY !== 0)) {
        this.currentColumnDraggedOver = null;
      }
    }

  },
  beforeMount () {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      }
    };
    this.axios.get(`${API_URL}/api/kanban/`, config).then((response) => {
      console.log(response.data);
      response.data.forEach((element, index) => {
        this.columns[index] = response.data[index];
      });
      this.columns.forEach((elounet, index) => {
        console.log(this.columns[index]);
      });
      this.$forceUpdate();
      console.log(this.columns);
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.hidden {
  display: none;
}
</style>
