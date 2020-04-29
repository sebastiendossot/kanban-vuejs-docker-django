<template>
  <div class="kanban">
    <h1>Kanban</h1>
    <div class="input-group mb-3" v-if="nothingDragged">
      <input type="text" class="form-control" placeholder="New TODO" aria-label="New TODO" v-model="newItem" aria-describedby="button-addon2">
      <div class="input-group-append" >
        <button class="btn btn-outline-secondary" v-on:click="addItemToColumn({item: newItem, colNum: columns[0].id, isNewItem: true})">Button</button>
      </div>
    </div>
    <div class="alert alert-danger"  v-bind:class="isHoveringDelete" v-if="!nothingDragged" v-on:dragenter="dragEnterColumn(-1)" v-on:dragleave="dragLeaveColumn">
      <div>x</div>
    </div>
    <div class="row">
      <div class="col" v-for="(column, colNum) in columns" v-bind:key="column.title" v-on:dragenter="dragEnterColumn(column.id)" v-on:dragleave="dragLeaveColumn">
        <h1>{{column.title}}</h1>
        <div class="card text-white bg-dark mb-3" v-for="(item, index) in column.items" v-on:dragstart="dragging({ colNum: column.id, index, item })"  v-on:dragend="dropped" v-bind:key="index" draggable="true">
          <div class="card-body">{{colNum}}
            <h5 class="card-title">{{item.text}}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Kanban',
  data () {
    return {
      newItem: ''
    };
  },
  computed: mapGetters('kanban', [
    'nothingDragged',
    'isHoveringDelete',
    'columns',
    'currentColumnDraggedOver'
  ]),
  methods: mapActions('kanban', [
    'fetchColumns',
    'addItemToColumn',
    'dragging',
    'dropped',
    'dragEnterColumn',
    'dragLeaveColumn',
    'deleteItem'
  ]),
  beforeMount () {
    this.$store.dispatch('kanban/fetchColumns');
  }
};
</script>

<style scoped>
.hidden {
  display: none;
}
</style>
