// import { createSlice } from "@reduxjs/toolkit";

// interface Produto {
//   nome: string;
//   preco: number;
//   estoque: number;
//   login?: string;
// }

// interface ProdutosState {
//   produtos: Produto[];
// }

// const initialState: ProdutosState = {
//   produtos: [
//     {
//       preco: 1.9,
//       nome: "Sabonete",
//       estoque: 10,
//     },
//     {
//       preco: 1.9,
//       nome: "Sabonete",
//       estoque: 10,
//     },
//   ],
// };

// const produtoSlice = createSlice({
//   name: "produtoSlice",
//   initialState: initialState,
//   reducers: {
//     addProduto(state, action) {
//       state.produtos.push(action.payload);
//     },
//   },
// });

// export const { addProduto } = produtoSlice.actions;
// export default produtoSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { api } from "../../service/instanceAxios";
import { config } from "../../config";

export interface Produto {
  id?: string;
  nome: string;
  preco: number;
  estoque: number;
  createdAt?: string;
  updatedAt?: string;
}

interface ApiState {
  loading: boolean;
  produtos: Produto[];
  error: string;
}

const initialState: ApiState = {
  loading: false,
  produtos: [],
  error: "",
};

export const fetchProdutos = createAsyncThunk<Produto[]>(
  "api/get/produtos",
  async () => {
    const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));
    await wait(1000);

    const response: AxiosResponse<Produto[]> = await axios.get(
      `${config.API_URL}/v1/produto`
    );

    return response.data;
  }
);

export const addProduto = createAsyncThunk(
  "api/post/produto",
  async (produto: Produto) => {
    const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));
    await wait(1000);

    const response: AxiosResponse<Produto> = await api.post(
      `${config.API_URL}/v1/produto`,
      // "http://localhost:3333/v1/produto",
      produto,
      { withCredentials: true }
    );

    return response.data;
  }
);

const apiProdutoSlice = createSlice({
  name: "apiProduto",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProdutos.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(
        fetchProdutos.fulfilled,
        (state, action: PayloadAction<Produto[]>) => {
          state.loading = false;
          state.produtos = action.payload;
        }
      )
      .addCase(fetchProdutos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "";
      })
    .addCase(
      addProduto.fulfilled,
      (state, action: PayloadAction<Produto>) => {
        state.loading = false;
        state.produtos.push(action.payload);
      }
    );
  },
});

export const { reducer: apiProdutoReducer } = apiProdutoSlice;