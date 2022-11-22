import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

import { api } from "../axios/index";

import auth from "./modules/auth";

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
  key: "vuex", // The key to store the state on in the storage provider.
  storage: window.localStorage, // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
});

export default new Vuex.Store({
  state: {
    generoHome: "Todos",
    hasCarrinho: false,
    carrinho: {
      id: 0,
      itens: [],
      preco_total: 0,
    },
  },
  mutations: {
    SET_ITENS_CARRINHO(state, carrinho) {
      state.carrinho = {
        id: 0,
        itens: [],
        preco_total: 0,
      };

      if (carrinho) {
        state.carrinho.itens = carrinho.itens;
        state.carrinho.id = carrinho.id;
        state.carrinho.preco_total = carrinho.preco_total;
      }
    },

    INCREMENTA_PRODUTO(state, id) {
      const produto = state.carrinho.itens.find(
        (item) => item.produto.id === id
      );

      produto.qtd_produto += 1;
    },

    SET_GENERO_HOME(state, payload) {
      state.generoHome = payload;
    },

    PUSH_CARRINHO(state, payload) {
      state.carrinho.itens.push(payload);
    },

    UPDATE_PRECO_TOTAL(state) {
      const preco_total = state.carrinho.itens.reduce(
        (total, item) =>
          (total += item.produto.valor_unitario * item.qtd_produto),
        0
      );

      state.carrinho.preco_total = preco_total;
    },
  },
  actions: {
    async UPDATE_CARRINHO({ state }) {
      const itens = state.carrinho.itens.map((item) => {
        return {
          produto: item.produto.id,
          qtd_produto: item.qtd_produto,
        };
      });

      await api.patch("api/pedidos/" + state.carrinho.id + "/", {
        itens: itens,
        preco_total: state.carrinho.preco_total,
      });
    },

    async GET_CARRINHO({ commit }) {
      const { data } = await api.get("api/carrinho/");
      const [carrinho] = data;

      commit("SET_ITENS_CARRINHO", carrinho);
    },
  },
  getters: {},
  modules: {
    auth,
  },
  plugins: [vuexLocalStorage.plugin],
});
