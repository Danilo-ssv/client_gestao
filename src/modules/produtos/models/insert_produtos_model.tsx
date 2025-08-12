export interface InsertProdutosModel {
  id: string;
  codigoBarra: string;
  codigo: string;
  nome: string;
  descricao: string;
  preco: string;
  custo: string;
  estoque: string;
  idMarcasProdutos: string;
  nomeMarcasProdutos: string;
  idCategoriasProdutos: string;
  nomeCategoriasProdutos: string;
  alertaEstoqueMinimo: string;
  genero: "1" | "2";
}