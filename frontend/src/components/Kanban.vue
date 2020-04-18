<template>
  <div class="kanban">
    <h1>Kanban</h1>
    <div class="input-group mb-3" v-if="currentColumnDraggedOver==null">
      <input type="text" class="form-control" placeholder="New TODO" aria-label="New TODO" v-model="newItem" aria-describedby="button-addon2">
      <div class="input-group-append" >
        <button class="btn btn-outline-secondary" v-on:click="addItem(0, newItem)">Button</button>
      </div>
    </div>
    <div class="alert alert-danger"  v-bind:class="isHoveringDelete" v-if="currentColumnDraggedOver!==null" v-on:dragenter="dragEnterColumn(-1)" v-on:dragleave="dragLeaveColumn">
      <div>x</div>{{currentColumnDraggedOver}}
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

import apiKanban from '../mixins/apiKanban';
// const API_URL = 'http://localhost:8000';

export default {
  name: 'Kanban',
  mixins: [apiKanban],
  data () {
    return {
      columns: [],
      newItem: '',
      itemDragged: null,
      currentColumnDraggedOver: null,
      initialColumn: null
    };
  },
  computed: {
    isHoveringDelete: function () {
      return {
        "btn btn-outline-primary": this.currentColumnDraggedOver == -1
      }
    }
  },
  methods: {
    addItem (colNum, text) {
      var colNumDb = colNum + 1; // array starts at 0 but colNums start at 1
      if (text !== '') {
        this.newItem = text;
      }
      this.columns[colNum].items.push({text: this.newItem});
      this.$forceUpdate();
      var data = {
            text: this.newItem,
            column: colNumDb
            }
      this.postItem(data)
      this.newItem = '';
    },
    removeItem (colNum, index) {
      var itemToDelete = this.columns[colNum].items[index].id;
      this.deleteItem(itemToDelete);
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
        if (this.currentColumnDraggedOver !== -1) {
          this.addItem(this.currentColumnDraggedOver, this.itemDragged);
        }
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
  async beforeMount () {
    var r = await this.getItems();
    console.log(r)
    r.data.forEach((element, index) => {
      this.columns[index] = r.data[index];
    })
      // .catch(e => console.log(e));
      this.$forceUpdate();
    // });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.hidden {
  display: none;
}
</style>
