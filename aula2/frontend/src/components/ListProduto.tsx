import { useSelector } from "react-redux";
import { RootSate } from "../redux/store.aula1";


export default function ListagemProdutos() {
  const produto = useSelector((state: RootSate) => state.produto);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Estoque</th>
          </tr>
        </thead>
        <tbody>
          {produto.produtos.map((produto) => {
            return (
              <tr>
                <td>{produto.nome}</td>
                <td>{produto.preco}</td>
                <td>{produto.estoque}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
