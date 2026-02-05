import { ApiRoutes } from "@/shared/constants/api_routes";
import { apiProvider } from "@/shared/provider/api_provider";
import { errorReturn, ErrorModel } from "@/shared/functions/error_return";
import { AxiosError } from "axios";
import { LocalStorageProvider } from "@/shared/provider/local_storage_provider";
import { FornecedoresModel } from "../models/fornecedores_model";
import { InsertFornecedoresModel } from "../models/insert_fornecedores_model";

interface readReturnModel {
  data: FornecedoresModel[] | null,
  numberOfPages: number | null,
  recorsRange: string | null,
  error: ErrorModel | null,
}

export class FornecedoresServices {
  apiRoutes = new ApiRoutes();

  async read(search: string, page: number, limit: number): Promise<readReturnModel> {
    try {
      const res = await apiProvider.get(this.apiRoutes.fornecedoresRead(search, page, limit),
        { headers: { Authorization: new LocalStorageProvider().getToken() } },
      );

      const data: FornecedoresModel[] = [
        ...(res.data['data'] as any[]).map(
          (e): FornecedoresModel => ({
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

  async insert(modelo: InsertFornecedoresModel): Promise<ErrorModel | null> {
    try {
      await apiProvider.post(this.apiRoutes.fornecedoresInsert(),
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
      await apiProvider.delete(this.apiRoutes.fornecedoresDelete(), {
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

  async readById(id: string): Promise<{ data: InsertFornecedoresModel | null, error: ErrorModel | null }> {
    try {
      const res = await apiProvider.get(this.apiRoutes.fornecedoresReadById(id),
        { headers: { Authorization: new LocalStorageProvider().getToken() } },
      );

      const data: InsertFornecedoresModel = {
        id: res.data.id,
        nome: res.data.nome,
        entidade: res.data.entidade,
        doc: res.data.doc,
        celular: res.data.celular,
        email: res.data.email,
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