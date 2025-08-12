import { HfContatosContratosModel } from "./hf_contatos_contratos_model";
import { hfParcelasContratosModel } from "./hf_parcelas_contratos_model";

export interface InsertHfContratosModel {
  id: string;
  idHfEscolas: string;
  nomeHfEscolas: string;
  contrato: string;
  nome: string;
  avalista: string;
  cep: string;
  endereco: string;
  bairro: string;
  idMunicipios: string;
  nomeMunicipios: string;
  doc: string;
  telefone: string;
  entrada: string;
  tipoParcela: "1" | "2" | "3" | "4";
  valor: string;
  numeroParcelas: string;
  listaParcelas: hfParcelasContratosModel[],
  listaTelefones: HfContatosContratosModel[],
}
