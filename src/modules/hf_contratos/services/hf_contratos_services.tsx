import { ApiRoutes } from "@/shared/constants/api_routes";
import { apiProvider } from "@/shared/provider/api_provider";
import { HfContratosModel } from "../models/hf_contratos_model";
import { InsertHfContratosModel } from "../models/insert_hf_contratos_model";
import { errorReturn, ErrorModel } from "@/shared/functions/error_return";
import { AxiosError } from "axios";
import { LocalStorageProvider } from "@/shared/provider/local_storage_provider";
import { currencyFormat } from "@/shared/functions/currency_format";
import { hfParcelasContratosModel } from "../models/hf_parcelas_contratos_model";
import { dateFormatToString } from "@/shared/functions/date_format";
import { HfContatosContratosModel } from "../models/hf_contatos_contratos_model";

interface readReturnModel {
  data: HfContratosModel[] | null,
  numberOfPages: number | null,
  recorsRange: string | null,
  error: ErrorModel | null,
}

interface writeOffReturnModel {
  status: string | null,
  nomeStatus: string | null,
  color: string | null,
  error: ErrorModel | null,
}

export class HfContratosServices {
  apiRoutes = new ApiRoutes();

  async read(
    search: string,
    searchCpf: string,
    searchCnpj: string,
    page: number,
    limit: number,
    startDate: string,
    endDate: string,
    status: string,
    idHfEscolas: string
  ): Promise<readReturnModel> {
    try {
      const res = await apiProvider.get(
        this.apiRoutes.hfContratosRead(search, searchCpf, searchCnpj, page, limit, startDate, endDate, status, idHfEscolas),
        { headers: { Authorization: new LocalStorageProvider().getToken() } },
      );

      const data: HfContratosModel[] = [
        ...(res.data['data'] as any[]).map(
          (e): HfContratosModel => ({
            id: e.id,
            contrato: e.contrato,
            nome: e.nome,
            endereco: e.endereco,
            doc: e.doc,
            tipoParcela: e.tipoParcela,
            entrada: currencyFormat(e.entrada, true),
            numeroParcelas: e.numeroParcelas,
            status: e.status,
            nomeStatus: e.nomeStatus,
            color: e.color,
            listaParcelas: (e.listaParcelas as any[]).map((el): hfParcelasContratosModel => ({
              id: el.id,
              status: el.status,
              nomeStatus: el.nomeStatus,
              color: el.color,
              dataVencimento: dateFormatToString(el.dataVencimento.toString(), "dd/MM/yyyy"),
              dataBaixa: dateFormatToString(el.dataBaixa.toString(), "dd/MM/yyyy"),
              valor: currencyFormat(el.valor, true),
            })),
          }),
        ),
      ];

      const numberOfPages: number = res.data['numberOfPages'];
      const recorsRange: string = res.data['recorsRange'];

      return { data, numberOfPages, recorsRange, error: null };
    } catch (err) {
      if (err instanceof AxiosError)
        return { data: null, numberOfPages: null, recorsRange: null, error: errorReturn(err.response?.data ?? 'Erro Inesperado') };

      if (err instanceof TypeError)
        return { data: null, numberOfPages: null, recorsRange: null, error: errorReturn(err.message) };

      return { data: null, numberOfPages: null, recorsRange: null, error: errorReturn(err?.toString() ?? 'Erro Inesperado') };
    }
  }

  async insert(modelo: InsertHfContratosModel): Promise<ErrorModel | null> {
    try {
      await apiProvider.post(this.apiRoutes.hfContratosInsert(),
        { ...modelo },
        { headers: { Authorization: new LocalStorageProvider().getToken() } },
      );

      return null;
    } catch (err) {
      if (err instanceof AxiosError)
        return errorReturn(err.response?.data ?? 'Erro Inesperado');

      if (err instanceof TypeError)
        return errorReturn(err.message);

      return errorReturn(err?.toString() ?? 'Erro Inesperado');
    }
  }

  async delete(listaIds: number[]): Promise<ErrorModel | null> {
    try {
      await apiProvider.delete(this.apiRoutes.hfContratosDelete(), {
        data: { listaIds: listaIds },
        headers: { Authorization: new LocalStorageProvider().getToken() },
      },
      );

      return null;
    } catch (err) {
      if (err instanceof AxiosError)
        return errorReturn(err.response?.data ?? 'Erro Inesperado');

      if (err instanceof TypeError)
        return errorReturn(err.message);

      return errorReturn(err?.toString() ?? 'Erro Inesperado');
    }
  }

  async readById(id: string): Promise<{ data: InsertHfContratosModel | null, error: ErrorModel | null }> {
    try {
      const res = await apiProvider.get(this.apiRoutes.hfContratosReadById(id),
        { headers: { Authorization: new LocalStorageProvider().getToken() } },
      );

      const data: InsertHfContratosModel = {
        id: res.data.id,
        idHfEscolas: res.data.idHfEscolas,
        nomeHfEscolas: res.data.nomeHfEscolas,
        contrato: res.data.contrato,
        nome: res.data.nome,
        avalista: res.data.avalista,
        cep: res.data.cep,
        endereco: res.data.endereco,
        bairro: res.data.bairro,
        idMunicipios: res.data.idMunicipios,
        nomeMunicipios: res.data.nomeMunicipios,
        doc: res.data.doc,
        telefone: '',
        entrada: currencyFormat(res.data.entrada),
        tipoParcela: res.data.tipoParcela,
        valor: currencyFormat(res.data.valor),
        numeroParcelas: res.data.numeroParcelas,
        listaParcelas: (res.data.listaParcelas as any[]).map((e): hfParcelasContratosModel => ({
          id: e.id,
          status: e.status,
          nomeStatus: e.nomeStatus,
          color: e.color,
          dataVencimento: e.dataVencimento,
          dataBaixa: dateFormatToString(e.dataBaixa, "dd/MM/yyyy"),
          valor: currencyFormat(e.valor),
        })),
        listaTelefones: (res.data.listaTelefones as any[]).map((e): HfContatosContratosModel => ({
          id: e.id,
          telefone: e.telefone,
          delete: e.delete,
        })),
      };

      return { data, error: null };
    } catch (err) {
      if (err instanceof AxiosError)
        return { data: null, error: errorReturn(err.response?.data ?? 'Erro Inesperado') };

      if (err instanceof TypeError)
        return { data: null, error: errorReturn(err.message) };

      return { data: null, error: errorReturn(err?.toString() ?? 'Erro Inesperado') };
    }
  }

  async writeOff(id: string, dataBaixa: string): Promise<writeOffReturnModel> {
    try {
      const res = await apiProvider.post(this.apiRoutes.hfContratosWriteOff(),
        { id, dataBaixa },
        { headers: { Authorization: new LocalStorageProvider().getToken() } },
      );

      const status = res.data['status'];
      const nomeStatus = res.data['nomeStatus'];
      const color = res.data['color'];

      return { status, nomeStatus, color, error: null };
    } catch (err) {
      if (err instanceof AxiosError)
        return { status: null, nomeStatus: null, color: null, error: errorReturn(err.response?.data ?? 'Erro Inesperado') };

      if (err instanceof TypeError)
        return { status: null, nomeStatus: null, color: null, error: errorReturn(err.message) };

      return { status: null, nomeStatus: null, color: null, error: errorReturn(err?.toString() ?? 'Erro Inesperado') };
    }
  }
}