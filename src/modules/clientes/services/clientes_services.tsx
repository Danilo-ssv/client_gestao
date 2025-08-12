import { ApiRoutes } from "@/shared/constants/api_routes";
import { instance } from "@/shared/provider/axios_provider";
import { ClientesModel } from "../models/clientes_model";
import { InsertClientesModel } from "../models/insert_clientes_model";
import { errorReturn, ErrorModel } from "@/shared/functions/error_return";
import { AxiosError } from "axios";
import { LocalStorageProvider } from "@/shared/provider/local_storage_provider";

interface readReturnModel {
  data: ClientesModel[] | null,
  numberOfPages: number | null,
  recorsRange: string | null,
  error: ErrorModel | null,
}

export class ClientesServices {
  apiRoutes = new ApiRoutes();

  async read(search: string, page: number, limit: number): Promise<readReturnModel> {
    try {
      const res = await instance.get(this.apiRoutes.clientesRead(search, page, limit),
        { headers: { Authorization: new LocalStorageProvider().getToken() } },
      );

      const data: ClientesModel[] = [
        ...(res.data['data'] as any[]).map(
          (e): ClientesModel => ({
            id: e.id,
            nome: e.nome,
            celular: e.celular,
            email: e.email,
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

  async insert(modelo: InsertClientesModel): Promise<ErrorModel | null> {
    try {
      await instance.post(this.apiRoutes.clientesInsert(),
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
      await instance.delete(this.apiRoutes.clientesDelete(), {
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

  async readById(id: string): Promise<{ data: InsertClientesModel | null, error: ErrorModel | null }> {
    try {
      const res = await instance.get(this.apiRoutes.clientesReadById(id),
        { headers: { Authorization: new LocalStorageProvider().getToken() } },
      );

      const data: InsertClientesModel = {
        id: res.data.id,
        nome: res.data.nome,
        estadoCivil: res.data.estadoCivil,
        genero: res.data.genero,
        entidade: res.data.entidade,
        aniversario: res.data.aniversario,
        doc: res.data.doc,
        rg: res.data.rg,
        celular: res.data.celular,
        email: res.data.email,
        cep: res.data.cep,
        endereco: res.data.endereco,
        numero: res.data.numero,
        idMunicipios: res.data.idMunicipios,
        nomeMunicipios: res.data.nomeMunicipios,
        obs: res.data.obs,
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