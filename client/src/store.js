import { configureStore, createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

export const usuario = createSlice({
  name: "usuario",
  initialState: {
    usuario: "",
    email: "",
    produtosCarrinho: [],
    logado: false,
  },
  reducers: {
    entrar: (state, { payload }) => {
      state.logado = !state.logado;
      state.usuario = payload.username;
      state.email = payload.email;
      state.carrinho = payload.carrinho;
    },
    refreshUsuario: (state, { payload }) => {
      state.email = payload.payload;
    },
    sair: (state) => {
      state.logado = !state.logado;
      state.usuario = "";
      state.email = "";
    },
    carrinho: (state, { payload }) => {
      switch (payload.type) {
        case "ADD_TO_CART":
          state.produtosCarrinho = [...state.produtosCarrinho, payload.payload];
          break;

        case "REMOVE_FROM_CART":
          state.produtosCarrinho = state.produtosCarrinho.filter(
            (el) => el[0] !== payload.payload
          );
          break;

        case "EXCLUDE_ALL_CART":
          state.produtosCarrinho = [];
          break;

        case "INCREMENT_PRODUCT":
          state.produtosCarrinho = state.produtosCarrinho.map((item) => {
            if (item[0] === payload.payload) {
              item[7]++;
            }
            return item;
          });
          break;

        case "DECREMENT_PRODUCT":
          state.produtosCarrinho = state.produtosCarrinho.map((item) => {
            if (item[0] === payload.payload) {
              item[7]--;
            }
            return item;
          });
          break;

        default:
          return state;
      }
    },
  },
});

export const { entrar, refreshUsuario, sair, carrinho } = usuario.actions;

export const Usuario = (state) => state.usuario;
export const Logado = (state) => state.logado;
export const ProdutosCarrinho = (state) => state.produtosCarrinho;

const persistConfig = {
  key: "Estante-Literaria",
  storage,
};

const persistedReducer = persistReducer(persistConfig, usuario.reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;
