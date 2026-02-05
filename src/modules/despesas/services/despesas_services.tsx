import { ApiRoutes } from "@/shared/constants/api_routes";
import { apiProvider } from "@/shared/provider/api_provider";
import { errorReturn, ErrorModel } from "@/shared/functions/error_return";
import { AxiosError } from "axios";
import { LocalStorageProvider } from "@/shared/provider/local_storage_provider";
import { DespesasModel } from "../models/despesas_model";
import { InsertDespesasModel } from "../models/insert_despesas_model";

interface readReturnModel {
  data: DespesasModel[] | null,
  numberOfPages: number | null,
  recorsRange: string | null,
  error: ErrorModel | null,
}

export class DespesasServices {
  apiRoutes = new ApiRoutes();

  async read(search: string, page: number, limit: number): Promise<readReturnModel> {
    try {
      const res = await apiProvider.get(this.apiRoutes.despesasRead(search, page, limit),
        { headers: { Authorization: new LocalStorageProvider().getToken() } },
      );

      const data: DespesasModel[] = [
        ...(res.data['data'] as any[]).map(
          (e): DespesasModel => ({
            id: e.id,
            nome: e.nome,
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

  async insert(modelo: InsertDespesasModel): Promise<ErrorModel | null> {
    try {
      await apiProvider.post(this.apiRoutes.despesasInsert(),
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

  async delete(listaIds: string[]): Promise<ErrorModel | null> {
    try {
      await apiProvider.delete(this.apiRoutes.despesasDelete(), {
        data: { listaIds },
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

  async readById(id: string): Promise<{ data: InsertDespesasModel | null, error: ErrorModel | null }> {
    try {
      const res = await apiProvider.get(this.apiRoutes.despesasReadById(id),
        { headers: { Authorization: new LocalStorageProvider().getToken() } },
      );

      const data: InsertDespesasModel = {
        id: res.data.id,
        nome: res.data.nome,
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
}