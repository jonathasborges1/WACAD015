import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Button } from "reactstrap";
import { addProdutoNome } from "../redux/slices/carrinho.slice";
import { RootState } from "../redux/store";
import ProductCard from "./ProductCard";
import { Grid } from "@mui/material";

export default function ProdutosList() {
  const dispatch = useDispatch();

  const { produtos } = useSelector((state: RootState) => state.apiProduto);
  const { isAdmin } = useSelector((state: RootState) => state.apiLogin);

  function inserirCarrinho(name: string) {
    dispatch(addProdutoNome(name));
  }

  console.log("[ProdutosList]-produtos.length -> ", produtos.length)

  const TableAdmin: React.FC = () => {
    return (
      <table className="table table-responsive table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">Preço</th>
            <th scope="col">Estoque</th>
            {isAdmin ? null : <th scope="col">Inserir Carrinho</th>}
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto, index) => {
            if(!isAdmin){ // Quando usuario nao for admin, exibi os produtos em formato grid
              return(<ProductCard key={index} product={produto}></ProductCard>)
            }
            return (
              <tr key={produto.id}>
                <th scope="row">{index + 1}</th>
                <td>{produto.nome}</td>
                <td>R$ {produto.preco}</td>
                <td>{produto.estoque}</td>
                <td>
                  {isAdmin ? null : (
                    <Button
                      onClick={() => {
                        inserirCarrinho(produto.nome);
                      }}
                    >
                      Inserir no Carrinho
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    )
  }
  
  return (
    <Grid container sx={{border: "0px solid red"}}>
      {isAdmin ? 
        (<TableAdmin></TableAdmin>) 
      : 
        (
          <Grid container justifyContent={"center"} gap={4} sx={{border: "0px solid blue"}}>
            {produtos.map((produto, index) => {
              return(<Grid xs={2.5}><ProductCard key={index} product={produto} ></ProductCard></Grid>)
            })}
          </Grid>
        )
      }
    </Grid>

  );
}
