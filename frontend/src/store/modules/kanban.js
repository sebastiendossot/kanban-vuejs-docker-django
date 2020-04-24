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
  nothingDragged (state, getters) {
    return state.currentColumnDraggedOver === null;
  },

  isHoveringDelete (state, getters) {
    return {
      'border border-primary': state.currentColumnDraggedOver === -1
    };
  },

  columns (state, getters) {
    return state.columns;
  }
};

// actions
const actions = {
  fetchColumns ({ state, commit }) {
    // commit(SET_LOADING, true);
    apiKanban.getColumns()
      .then((columns) => {
        console.log(columns);
        commit('SET_COLUMNS', { columns });
        // commit('SET_LOADING', false);
      })
      .catch((error) => console.log('Erreur getting columns', error));
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
  dropped ({ commit, dispatch, state }, colNum, index) {
    if (state.currentColumnDraggedOver !== null) {
      if (state.currentColumnDraggedOver === -1) {
        dispatch('deleteItem');
      } else {
        dispatch('addItemToColumn');
      }
    }
    commit('RESET_DRAGGED');
  },
  dragEnterColumn ({ commit, state }, colNum) {
    commit('INCREASE_COUNTER_DRAG');
    commit('SET_CURRENT_COLUMN_DRAGGED_OVER', colNum);
  },
  dragLeaveColumn ({ commit, state }, e) {
    commit('DECREASE_COUNTER_DRAG');
    if (state.counterDrag === 0 && (e.screenX !== 0 && e.screenY !== 0)) {
      commit('SET_CURRENT_COLUMN_DRAGGED_OVER', state.initialColumn);
    }
  },
  deleteItem ({ commit, state }, itemToDelete) {
    apiKanban.deleteItem(itemToDelete).then(() => {
      commit('DELETE_ITEM', this.currentColumnDraggedOver, this.itemDragged);
    });
  }
};

// mutations
const mutations = {
  PUSH_ITEM (state, { id, text, column }) {
    state.columns[column].items.push({
      id,
      text,
      column
    });
  },
  UPDATE_ITEM (state, {id, text, column, newColumn}) { // Can be modified towork with text too
    const items = state.columns[column].items;
    const index = items.findIndex(obj => obj.id === id);
    state.columns[column].items[index].column = newColumn;
  },
  REMOVE_ITEM (state, { id, column }) {
    const items = state.columns[column].items;
    const index = items.findIndex(obj => obj.id === id);
    state.columns[state.initialColumn].items.splice(index, 1);
  },
  SET_COLUMNS (state, { columns }) {
    console.log(columns);
    state.columns = columns;
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
  },
  RESET_DRAGGED () {
    state.itemDragged = null;
    state.currentColumnDraggedOver = null;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
