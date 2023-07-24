import "./index.css";

import { useDispatch, useSelector } from "react-redux";
import { ListGroup, ListGroupItem } from "reactstrap";

import { Avatar, Button } from "@mui/material";


import NavBarCustom from "../../components/navbar";
import { AppDispatch, RootState } from "../../redux/store";

import { removeProdutoNome } from "../../redux/slices/carrinho.slice";
import { Produto, fetchProdutos } from "../../redux/slices/api.slice.produtos";
import { useEffect } from "react";
import { configApi } from "../../constans";
import QuantityCounter from "../../components/QuantityCounter";

export default function Carrinho() {

  const dispatch = useDispatch();
  const dispatchProdutos = useDispatch<AppDispatch>();

  const { isAdmin } = useSelector((state: RootState) => state.apiLogin);
  const produtosCarrinho = useSelector((state: RootState) => state.carrinho);
  const { produtos } = useSelector((state: RootState) => state.apiProduto);

  function removerCarrinho(index: number) {
    dispatch(removeProdutoNome(index));
  }

  useEffect(() => {
    dispatchProdutos(fetchProdutos());
  }, []);

  console.log("[Carrinho]-produtos.length -> ", produtos.length)

  return (
    <div className="containerCart">
      <div style={{ width: "100%" }}>
        <NavBarCustom />
      </div>
      <h2>CARRINHO</h2>

      {isAdmin ? 
        (
          <div style={{ overflow: "scroll", height: "500px" }}>
            <ListGroup flush>
              {produtosCarrinho.produtos.map((produto,index) => {
                return <ListGroupItem key={index} >{produto}</ListGroupItem>;
              })}
            </ListGroup>
          </div>
        ) 
      : 
        (
          <table className="table table-responsive table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Produto</th>
              <th scope="col">Produto Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Remove</th>
              {/* {isAdmin ? null : <th scope="col">Inserir Carrinho</th>} */}
            </tr>
          </thead>
          <tbody>
            {produtosCarrinho.produtos.map((produtoNome, index) => {
              console.log("produtos -> ", produtos);
              console.log("produtosCarrinho -> ", produtosCarrinho);
              console.log("produtosCarrinho.produtos -> ", produtosCarrinho.produtos);
  
              const productDetails: Produto | undefined = produtos?.find((produtoDetails) => produtoDetails.nome === produtoNome);
              console.log("productDetails -> ", productDetails);
              return (
                <tr key={productDetails?.id}>
                  <th scope="row">{index + 1}</th>
                  <td><Avatar alt="miniatura do produto" src={configApi.photoUrl} /></td>
                  <td>{productDetails?.nome}</td>
                  <td>R$ {productDetails?.preco.toFixed(2)}</td>
                  <td> <QuantityCounter quantidadeInicial={1} quantidadeMaxima={productDetails?.estoque || 0} />  </td>
                  <td>
                    <Button variant="outlined" 
                      sx={{
                        backgroundColor: "rgba(255,0,0,0.6)", 
                        color: "white",
                        "&:hover": {
                          backgroundColor: "rgba(255,255,0,0.4)", // Define a cor do fundo ao passar o mouse por cima
                          color: "black",
                        },
                      }}
                        onClick={() => {
                          removerCarrinho(index);
                        }}
                      >
                        Remover do Carrinho
                      </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>  
        )
      }
    </div>
  );
}
