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
      <div class="col"  v-for="(column, colNum) in data.columns" v-bind:key="column.title" v-on:dragenter="dragEnterColumn(colNum)" v-on:dragleave="dragLeaveColumn">
         <h1>{{column.title}}</h1>
        <div class="card text-white bg-dark mb-3" v-for="(item, index) in column.content" v-on:dragstart="dragging(colNum,index, item.text)"  v-on:dragend="dropped(colNum,index)" v-bind:key="index" draggable="true">
          <div class="card-body">
            <h5 class="card-title">{{item.text}}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Kanban',
  data () {
    return {
      data: {
        columns: [
          {
            title: 'To Do',
            content: [
              { text: 'Learn JtestavaScript' },
              { text: 'Learn Vue' },
              { text: 'Build something awesome' }
            ]

          },
          {
            title: 'In Progress',
            content: [
              { text: 'Learning Vuejs' }
            ]

          },
          {
            title: 'Done',
            content: [
              { text: '42' },
              { text: 'Learn Vue' }
            ]
          }
        ]
      },
      newItem: '',
      itemDragged: null,
      currentColumnDraggedOver: null,
      initialColumn: null
    };
  },
  methods: {
    addItem (colNum, text) {
      if (text !== '') {
        this.data.columns[colNum].content.push({text: text});
      }
      this.newItem = '';
      // Shaaall weeeee push to the baaack?
    },
    removeItem (colNum, index) {
      this.data.columns[colNum].content.splice(index, 1);
    },
    dragging (colNum, index, item) {
      if (this.itemDragged !== item) {
        this.itemDragged = item;
        this.initialColumn = colNum;
      }  
    },
    dropped (colNum, index) {
      if (this.currentColumnDraggedOver !== null) {
        this.removeItem (colNum, index);        
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

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.hidden {
  display: none;
}
</style>