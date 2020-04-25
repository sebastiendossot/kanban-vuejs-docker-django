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
  },

  currentColumnDraggedOver (state, getters) {
    return state.currentColumnDraggedOver;
  }
};

// actions
const actions = {
  fetchColumns ({ state, commit }) {
    // commit(SET_LOADING, true);
    apiKanban.getColumns()
      .then((columns) => {
        commit('SET_COLUMNS', { columns });
        // commit('SET_LOADING', false);
      })
      .catch((error) => console.log('Erreur getting columns', error));
  },
  addItemToColumn ({ state, commit }, {item, colNum, isNewItem}) {
    if (isNewItem) {
      return apiKanban.postItem({ text: item.text, column: item.column })
        .then((itemReturned) => {
          console.log('Returned posted', itemReturned);
          commit('PUSH_ITEM', { id: itemReturned.id, text: itemReturned.text, column: itemReturned.column });
        });
    } else {
      return apiKanban.updateItem(item.id, {column: colNum})
        .then((itemReturned) => {
          console.log('Returned updated', itemReturned);
          commit('UPDATE_ITEM', { id: item.id, text: item.text, column: itemReturned.column });
        });
    }
  },
  dragging ({ commit, state }, { column, index, item }) {
    if (state.itemDragged !== item) {
      commit('SET_ITEM_DRAGGED', { item });
      commit('SET_INITIAL_COLUMN', { column });
    }
  },
  dropped ({ commit, dispatch, state }) {
    if (state.currentColumnDraggedOver !== null) {
      if (state.currentColumnDraggedOver === -1) {
        dispatch('deleteItem');
      } else {
        dispatch('addItemToColumn', { item: state.itemDragged, colNum: state.currentColumnDraggedOver, isNewItem: false });
      }
    }
    commit('RESET_DRAGGED');
  },
  dragEnterColumn ({ commit, state }, colNum) {
    console.log('enter column', colNum);
    commit('INCREASE_COUNTER_DRAG');
    commit('SET_CURRENT_COLUMN_DRAGGED_OVER', { colNum: colNum });
  },
  dragLeaveColumn ({ commit, state }, e) {
    commit('DECREASE_COUNTER_DRAG');
    if (state.counterDrag === 0 && (e.screenX !== 0 && e.screenY !== 0)) {
      commit('SET_CURRENT_COLUMN_DRAGGED_OVER', { colNum: state.initialColumn });
    }
  },
  deleteItem ({ commit, state }, itemToDelete) {
    apiKanban.deleteItem(itemToDelete).then(() => {
      commit('DELETE_ITEM');
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
  DELETE_ITEM (state) { // Might simplify that easily
    const item = state.itemDragged;
    const items = state.columns[state.initialColumn].items;
    const index = items.findIndex(obj => obj.id === item.id);
    state.columns[state.initialColumn].items.splice(index, 1);
  },
  SET_COLUMNS (state, { columns }) {
    state.columns = columns;
  },
  SET_CURRENT_COLUMN_DRAGGED_OVER (state, { colNum }) {
    
    state.currentColumnDraggedOver = colNum;
  },
  SET_ITEM_DRAGGED (state, { item }) {
    state.itemDragged = item;
  },
  SET_INITIAL_COLUMN (state, { colNum }) {
    state.initialColumn = colNum;
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
