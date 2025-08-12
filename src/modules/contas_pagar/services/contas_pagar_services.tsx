import { ApiRoutes } from "@/shared/constants/api_routes";
import { instance } from "@/shared/provider/axios_provider";
import { errorReturn, ErrorModel } from "@/shared/functions/error_return";
import { AxiosError } from "axios";
import { LocalStorageProvider } from "@/shared/provider/local_storage_provider";
import { ContasPagarModel } from "../models/contas_pagar_model";
import { InsertContasPagarModel } from "../models/insert_contas_pagar_model";
import { currencyFormat } from "@/shared/functions/currency_format";
import { dateFormatToString } from "@/shared/functions/date_format";

interface readReturnModel {
  data: ContasPagarModel[] | null,
  numberOfPages: number | null,
  recorsRange: string | null,
  error: ErrorModel | null,
}

export class ContasPagarServices {
  apiRoutes = new ApiRoutes();

  async read(search: string, page: number, limit: number, startDate: string, endDate: string, status: string): Promise<readReturnModel> {
    try {
      const res = await instance.get(this.apiRoutes.contasPagarRead(search, page, limit, startDate, endDate, status),
        { headers: { Authorization: new LocalStorageProvider().getToken() } },
      );

      const data: ContasPagarModel[] = [
        ...(res.data['data'] as any[]).map(
          (e): ContasPagarModel => ({
            id: e.id,
            dataVencimento: dateFormatToString(e.dataVencimento.toString(), "dd/MM/yyyy"),
            nomeFornecedores: e.nomeFornecedores,
            nomeDespesas: e.nomeDespesas,
            descricao: e.descricao,
            valor: currencyFormat(e.valor, true),
            status: e.status,
            nomeStatus: e.nomeStatus,
            color: e.color,
          }),
        ),
      ];

      const numberOfPages: number = res.data['numberOfPages'];
      const recorsRange: string = res.data['recorsRange'];

      return { data, numberOfPages, recorsRange, error: null };
    } catch (err) {
      if (err instanceof AxiosError) return { data: null, numberOfPages: null, recorsRange: null, error: errorReturn(err.response?.data ?? 'Erro Inesperado') };

      if (err instanceof TypeError) return { data: null, numberOfPages: null, recorsRange: null, error: errorReturn(err.message) };

      return { data: null, numberOfPages: null, recorsRange: null, error: errorReturn(err?.toString() ?? 'Erro Inesperado') };
    }
  }

  async insert(modelo: InsertContasPagarModel): Promise<ErrorModel | null> {
    try {
      await instance.post(this.apiRoutes.contasPagarInsert(),
        { ...modelo },
        { headers: { Authorization: new LocalStorageProvider().getToken() } },
      );

      return null;
    } catch (err) {
      if (err instanceof AxiosError) return errorReturn(err.response?.data ?? 'Erro Inesperado');

      if (err instanceof TypeError) return errorReturn(err.message);

      return errorReturn(err?.toString() ?? 'Erro Inesperado');
    }
  }

  async delete(listaIds: number[]): Promise<ErrorModel | null> {
    try {
      await instance.delete(this.apiRoutes.contasPagarDelete(), {
        data: { listaIds },
        headers: { Authorization: new LocalStorageProvider().getToken() },
      },
      );

      return null;
    } catch (err) {
      if (err instanceof AxiosError) return errorReturn(err.response?.data ?? 'Erro Inesperado');

      if (err instanceof TypeError) return errorReturn(err.message);

      return errorReturn(err?.toString() ?? 'Erro Inesperado');
    }
  }

  async readById(id: string): Promise<{ data: InsertContasPagarModel | null, error: ErrorModel | null }> {
    try {
      const res = await instance.get(this.apiRoutes.contasPagarReadById(id),
        { headers: { Authorization: new LocalStorageProvider().getToken() } },
      );

      const data: InsertContasPagarModel = {
        id: res.data.id,
        idFornecedores: res.data.idFornecedores,
        nomeFornecedores: res.data.nomeFornecedores,
        dataEmissao: res.data.dataEmissao,
        dataVencimento: res.data.dataVencimento,
        idDespesas: res.data.idDespesas,
        nomeDespesas: res.data.nomeDespesas,
        descricao: res.data.descricao,
        valor: currencyFormat(res.data.valor),
      };

      return { data, error: null };
    } catch (err) {
      if (err instanceof AxiosError) return { data: null, error: errorReturn(err.response?.data ?? 'Erro Inesperado') };

      if (err instanceof TypeError) return { data: null, error: errorReturn(err.message) };

      return { data: null, error: errorReturn(err?.toString() ?? 'Erro Inesperado') };
    }
  }

  async writeOff(id: string, dataBaixa: string, desconto: string): Promise<ErrorModel | null> {
    try {
      await instance.post(this.apiRoutes.contasPagarWriteOff(),
        { id, dataBaixa, desconto },
        { headers: { Authorization: new LocalStorageProvider().getToken() } },
      );

      return null;
    } catch (err) {
      if (err instanceof AxiosError) return errorReturn(err.response?.data ?? 'Erro Inesperado');

      if (err instanceof TypeError) return errorReturn(err.message);

      return errorReturn(err?.toString() ?? 'Erro Inesperado');
    }
  }

  async parcelling(id: string, parcelas: number, frequencia: number): Promise<ErrorModel | null> {
    try {
      await instance.post(this.apiRoutes.contasPagarParcelling(),
        { id, parcelas, frequencia },
        { headers: { Authorization: new LocalStorageProvider().getToken() } },
      );

      return null;
    } catch (err) {
      if (err instanceof AxiosError) return errorReturn(err.response?.data ?? 'Erro Inesperado');

      if (err instanceof TypeError) return errorReturn(err.message);

      return errorReturn(err?.toString() ?? 'Erro Inesperado');
    }
  }
}