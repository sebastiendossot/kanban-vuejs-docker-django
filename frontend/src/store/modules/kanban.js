import apiKanban from '../../api/kanban';

// initial state
// shape: [{ id, quantity }]
const state = {
  columns: [],
  newItem: '',
  itemDragged: null,
  currentColumnDraggedOver: null,
  initialColumn: null,
  counterDrag: 0
};

// getters
const getters = {
  // kabanItems: (state, getters, rootState) => {
  //   this.columns = apiKanban.getItems(this.columns);
  //   this.$forceUpdate();
  //   return null;
  // },

  kanbanTotalItems: (state, getters) => {
    return null;
  }
}

// actions
const actions = {
  getColumns ({ state, commit }) {
    // commit(SET_LOADING, true);
    apiKanban.getColumns()
      .then((columns) => {
        commit('SET_COLUMNS', columns);
        // commit('SET_LOADING', false);
      })
      .catch((error) => console.log('Erreur getting user', error));
  },
  addItemToColumn ({ state, commit }, text, column, isNewItem) {
    if (isNewItem) {
      apiKanban.addItem(text, column)
        .then((item) => {
          commit('PUSH_ITEM', { id: item.id, text: item.text, column: item.column });
        });
    } else {
      apiKanban.updateItem(text, column)
        .then((item) => {
          commit('UPDATE_ITEM', { id: item.id, text: item.text, column: item.column });
        });
    }
  },
  dragging ({ commit, state }, column, index, item) {
    if (state.itemDragged !== item) {
      commit('UPDATE_ITEM_DRAGGED', item);
      commit('UPDATE_INITIAL_COLUMN', column);
    }
  },

  dropped ({ commit, state }, colNum, index) {
    // if (this.currentColumnDraggedOver !== null) {
    //   this.removeItem(colNum, index);
    //   if (this.currentColumnDraggedOver !== -1) {
    //     this.addItem(this.currentColumnDraggedOver, this.itemDragged);
    //   }
    // } else {
    //   this.addItem(this.initialColumn, this.itemDragged);
    // }
    // this.itemDragged = null;
    // this.currentColumnDraggedOver = null;
  },
  dragEnterColumn ({ commit, state }, colNum) {
    commit('INCREASE_COUNTER_DRAG');
    commit('SET_CURRENT_COLUMN_DRAGGED_OVER', colNum);
  },
  dragLeaveColumn ({ commit, state }, e) {
    commit('DECREASE_COUNTER_DRAG');
    if (state.counterDrag === 0 && (e.screenX !== 0 && e.screenY !== 0)) {
      this.currentColumnDraggedOver = this.initialColumn;
    }
  }
}

// mutations
const mutations = {
  PUSH_ITEM (state, { id }) {
    // state.items.push({
    //   id,
    //   quantity: 1
    // });
  },
  UPDATE_ITEM (state, { id }) {
    // state.items.push({
    //   id,
    //   quantity: 1
    // });
  },
  REMOVE_ITEM (state, { id }) {
    //
    // removeItem (colNum, index) {
    //   console.log("item", this.columns[colNum].items[index])
    //   var itemToDelete = this.columns[colNum].items[index].id;
    //   this.deleteItem(itemToDelete);
    //   this.columns[colNum].items.splice(index, 1);
    // },
  },
  SET_ITEMS (state, { items }) {
    state.items = items;
  },
  SET_CURRENT_COLUMN_DRAGGED_OVER (state, { items }) {
  },
  SET_ITEM_DRAGGED (state, { items }) {
    state.items = items;
  },  
  SET_INITIAL_COLUMN (state, { items }) {
    state.items = items;
  },
  INCREASE_COUNTER_DRAG () {
    state.counterDrag++;
  },
  DECREASE_COUNTER_DRAG () {
    state.counterDrag--;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
