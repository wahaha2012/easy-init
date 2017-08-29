const app = {
  namespaced: true,
  state: {
    title: 'Hello World Title',
  },
  mutations: {
    UPDATE_TITLE(state, title) {
      state.title = title;
    },
  },
  actions: {
    updateTitle: ({ commit }, newTitle) => {
      commit('UPDATE_TITLE', newTitle);
    },
  },
};

export default app;
