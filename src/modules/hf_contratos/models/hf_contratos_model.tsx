import { hfParcelasContratosModel } from "./hf_parcelas_contratos_model";

export interface HfContratosModel {
  id: string;
  contrato: string;
  nome: string;
  endereco: string;
  doc: string;
  tipoParcela: string;
  entrada: string;
  numeroParcelas: string;
  status: string;
  nomeStatus: string;
  color: string;
  listaParcelas: hfParcelasContratosModel[];
}