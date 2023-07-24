import { useState } from "react";
import { useDispatch } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap";
import { AppDispatch } from "../redux/store";
import { addProduto } from "../redux/slices/api.slice.produtos";

export default function FormularioProduto() {
  const dispatch = useDispatch<AppDispatch>();

  const [inputProduto, SetProduto] = useState({
    nome: "",
    preco: 0,
    estoque: 0,
  });

  const handleInput = (e: any) => {
    SetProduto({ ...inputProduto, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(addProduto(inputProduto));
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h3 className="mt-3">Inserir Novo Produto</h3>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label className="col-sm-3 col-form-lable">Nome</label>
          <div className="col-md-8">
            <input
              type="text"
              className="form-control"
              name="nome"
              value={inputProduto.nome}
              onChange={handleInput}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-3 col-form-lable">Preço</label>
          <div className="col-md-8">
            <input
              type="number"
              className="form-control"
              name="preco"
              value={inputProduto.preco}
              onChange={handleInput}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-3 col-form-lable">Estoque</label>
          <div className="col-md-8">
            <input
              type="number"
              className="form-control"
              name="estoque"
              value={inputProduto.estoque}
              onChange={handleInput}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-3 col-form-lable"></label>
{/* (2) Estilizacao do componente de Insercao de produtos */}
          <div className="col-md-8">
            <button type="submit" className="btn btn-primary bnt-lg" style={{backgroundColor: "black"}}>
              Cadastrar Produto
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
