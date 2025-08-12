export interface InsertClientesModel {
  id: string;
  nome: string;
  estadoCivil: "1" | "2" | "3" | "4" | "5";
  genero: "1" | "2" | "3";
  entidade: "1" | "2";
  aniversario: string;
  doc: string;
  rg: string;
  celular: string;
  email: string;
  cep: string;
  endereco: string;
  numero: string;
  idMunicipios: string;
  nomeMunicipios: string;
  obs: string;
}