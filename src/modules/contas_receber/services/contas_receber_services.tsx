import { ApiRoutes } from "@/shared/constants/api_routes";
import { instance } from "@/shared/provider/axios_provider";
import { errorReturn, ErrorModel } from "@/shared/functions/error_return";
import { AxiosError } from "axios";
import { LocalStorageProvider } from "@/shared/provider/local_storage_provider";
import { ContasReceberModel } from "../models/contas_receber_model";
import { InsertContasReceberModel } from "../models/insert_contas_receber_model";
import { currencyFormat } from "@/shared/functions/currency_format";
import { dateFormatToString } from "@/shared/functions/date_format";

interface readReturnModel {
  data: ContasReceberModel[] | null,
  numberOfPages: number | null,
  recorsRange: string | null,
  error: ErrorModel | null,
}

export class ContasReceberServices {
  apiRoutes = new ApiRoutes();

  async read(search: string, page: number, limit: number, startDate: string, endDate: string, status: string): Promise<readReturnModel> {
    try {
      const res = await instance.get(this.apiRoutes.contasReceberRead(search, page, limit, startDate, endDate, status),
        { headers: { Authorization: new LocalStorageProvider().getToken() } },
      );

      const data: ContasReceberModel[] = [
        ...(res.data['data'] as any[]).map(
          (e): ContasReceberModel => ({
            id: e.id,
            dataVencimento: dateFormatToString(e.dataVencimento.toString(), "dd/MM/yyyy"),
            nomeClientes: e.nomeClientes,
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

  async insert(modelo: InsertContasReceberModel): Promise<ErrorModel | null> {
    try {
      await instance.post(this.apiRoutes.contasReceberInsert(),
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
      await instance.delete(this.apiRoutes.contasReceberDelete(), {
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

  async readById(id: string): Promise<{ data: InsertContasReceberModel | null, error: ErrorModel | null }> {
    try {
      const res = await instance.get(this.apiRoutes.contasReceberReadById(id),
        { headers: { Authorization: new LocalStorageProvider().getToken() } },
      );

      const data: InsertContasReceberModel = {
        id: res.data.id,
        idClientes: res.data.idClientes,
        nomeClientes: res.data.nomeClientes,
        dataEmissao: res.data.dataEmissao,
        dataVencimento: res.data.dataVencimento,
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
      await instance.post(this.apiRoutes.contasReceberWriteOff(),
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
      await instance.post(this.apiRoutes.contasReceberParcelling(),
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