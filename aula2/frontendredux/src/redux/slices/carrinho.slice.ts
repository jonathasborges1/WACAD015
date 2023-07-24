import { createSlice } from "@reduxjs/toolkit";

export const carrinhoSlice = createSlice({
  name: "carrinhoSlice",
  initialState: {
    produtos: [] as string[],
  },

  reducers: {
    addProdutoNome(state, action) {
      state.produtos.push(action.payload);
      return state;
    },
    removeProdutoNome(state, action) {
      const indice = action.payload;
      if (indice >= 0 && indice < state.produtos.length) {
        state.produtos.splice(indice, 1);
      }
    },
  },
});

export const { addProdutoNome, removeProdutoNome } = carrinhoSlice.actions;
export default carrinhoSlice.reducer;
