import axios, { AxiosError } from "axios";
import { ApiRoutes } from "../constants/api_routes";
import { errorReturn, ErrorModel } from "../functions/error_return";
import { GlobalMunicipiosModel } from "../models/global_municipios_model";
import { apiProvider } from "./api_provider";
import { LocalStorageProvider } from "./local_storage_provider";
import { GlobalFornecedoresModel } from "../models/global_fornecedores_model";
import { GlobalCategoriasProdutosModel } from "../models/global_categorias_produtos_model";
import { GlobalDespesasModel } from "../models/global_despesas_model";
import { GlobalClientesModel } from "../models/global_clientes_model";
import { GlobalHfEscolasModel } from "../models/global_hf_escolas_model";
import { GlobalMunicipiosByCepModel } from "../models/global_municipios_by_cep_model";
import { GlobalMarcasProdutosModel } from "../models/global_marcas_produtos_model";

export class GlobalServices {
  apiRoutes = new ApiRoutes();

  async readMunicipiosByCep(cep: string): Promise<{ data: GlobalMunicipiosByCepModel | null, error: ErrorModel | null }> {
    try {
      const resCep = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

      const endereco = resCep.data.logradouro;
      const bairro = resCep.data.bairro;
      const codigo = resCep.data.ibge;

      const res = await apiProvider.get(this.apiRoutes.globalReadMunicipiosByCep(codigo),
        { headers: { Authorization: new LocalStorageProvider().getToken() } },
      );

      const data: GlobalMunicipiosByCepModel = {
        endereco: endereco,
        bairro: bairro,
        idMunicipios: res.data.idMunicipios,
        nomeMunicipios: res.data.nomeMunicipios,
        uf: res.data.uf,
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

  async readMunicipios(search: string, uf: string): Promise<{ data: GlobalMunicipiosModel[] | null, error: ErrorModel | null }> {
    try {
      const res = await apiProvider.get(this.apiRoutes.globalReadMunicipios(search, uf),
        { headers: { Authorization: new LocalStorageProvider().getToken() } },
      );

      const data: GlobalMunicipiosModel[] = [
        ...(res.data as any[]).map(
          (e): GlobalMunicipiosModel => ({
            id: e.id,
            codigo: e.codigo,
            nome: e.nome,
            uf: e.uf,
          }),
        ),
      ];

      return { data, error: null };
    } catch (err) {
      if (err instanceof AxiosError)
        return { data: null, error: errorReturn(err.response?.data ?? 'Erro Inesperado') };

      if (err instanceof TypeError)
        return { data: null, error: errorReturn(err.message) };

      return { data: null, error: errorReturn(err?.toString() ?? 'Erro Inesperado') };
    }
  }

  async readFornecedores(search: string): Promise<{ data: GlobalFornecedoresModel[] | null, error: ErrorModel | null }> {
    try {
      const res = await apiProvider.get(this.apiRoutes.globalReadFornecedores(search),
        { headers: { Authorization: new LocalStorageProvider().getToken() } },
      );

      const data: GlobalFornecedoresModel[] = [
        ...(res.data as any[]).map(
          (e): GlobalFornecedoresModel => ({
            id: e.id,
            nome: e.nome,
          }),
        ),
      ];

      return { data, error: null };
    } catch (err) {
      if (err instanceof AxiosError)
        return { data: null, error: errorReturn(err.response?.data ?? 'Erro Inesperado') };

      if (err instanceof TypeError)
        return { data: null, error: errorReturn(err.message) };

      return { data: null, error: errorReturn(err?.toString() ?? 'Erro Inesperado') };
    }
  }

  async readCategoriasProdutos(search: string): Promise<{ data: GlobalCategoriasProdutosModel[] | null, error: ErrorModel | null }> {
    try {
      const res = await apiProvider.get(this.apiRoutes.globalReadCategoriasProdutos(search),
        { headers: { Authorization: new LocalStorageProvider().getToken() } },
      );

      const data: GlobalCategoriasProdutosModel[] = [
        ...(res.data as any[]).map(
          (e): GlobalCategoriasProdutosModel => ({
            id: e.id,
            nome: e.nome,
          }),
        ),
      ];

      return { data, error: null };
    } catch (err) {
      if (err instanceof AxiosError)
        return { data: null, error: errorReturn(err.response?.data ?? 'Erro Inesperado') };

      if (err instanceof TypeError)
        return { data: null, error: errorReturn(err.message) };

      return { data: null, error: errorReturn(err?.toString() ?? 'Erro Inesperado') };
    }
  }

  async readDespesas(search: string): Promise<{ data: GlobalDespesasModel[] | null, error: ErrorModel | null }> {
    try {
      const res = await apiProvider.get(this.apiRoutes.globalReadDespesas(search),
        { headers: { Authorization: new LocalStorageProvider().getToken() } },
      );

      const data: GlobalDespesasModel[] = [
        ...(res.data as any[]).map(
          (e): GlobalDespesasModel => ({
            id: e.id,
            nome: e.nome,
          }),
        ),
      ];

      return { data, error: null };
    } catch (err) {
      if (err instanceof AxiosError)
        return { data: null, error: errorReturn(err.response?.data ?? 'Erro Inesperado') };

      if (err instanceof TypeError)
        return { data: null, error: errorReturn(err.message) };

      return { data: null, error: errorReturn(err?.toString() ?? 'Erro Inesperado') };
    }
  }

  async readClientes(search: string): Promise<{ data: GlobalClientesModel[] | null, error: ErrorModel | null }> {
    try {
      const res = await apiProvider.get(this.apiRoutes.globalReadClientes(search),
        { headers: { Authorization: new LocalStorageProvider().getToken() } },
      );

      const data: GlobalClientesModel[] = [
        ...(res.data as any[]).map(
          (e): GlobalClientesModel => ({
            id: e.id,
            nome: e.nome,
          }),
        ),
      ];

      return { data, error: null };
    } catch (err) {
      if (err instanceof AxiosError)
        return { data: null, error: errorReturn(err.response?.data ?? 'Erro Inesperado') };

      if (err instanceof TypeError)
        return { data: null, error: errorReturn(err.message) };

      return { data: null, error: errorReturn(err?.toString() ?? 'Erro Inesperado') };
    }
  }

  async readHfEscolas(search: string): Promise<{ data: GlobalHfEscolasModel[] | null, error: ErrorModel | null }> {
    try {
      const res = await apiProvider.get(this.apiRoutes.globalReadHfEscolas(search),
        { headers: { Authorization: new LocalStorageProvider().getToken() } },
      );

      const data: GlobalHfEscolasModel[] = [
        ...(res.data as any[]).map(
          (e): GlobalHfEscolasModel => ({
            id: e.id,
            nome: e.nome,
          }),
        ),
      ];

      return { data, error: null };
    } catch (err) {
      if (err instanceof AxiosError)
        return { data: null, error: errorReturn(err.response?.data ?? 'Erro Inesperado') };

      if (err instanceof TypeError)
        return { data: null, error: errorReturn(err.message) };

      return { data: null, error: errorReturn(err?.toString() ?? 'Erro Inesperado') };
    }
  }

  async readMarcasProdutos(search: string): Promise<{ data: GlobalMarcasProdutosModel[] | null, error: ErrorModel | null }> {
    try {
      const res = await apiProvider.get(this.apiRoutes.globalReadMarcasProdutos(search),
        { headers: { Authorization: new LocalStorageProvider().getToken() } },
      );

      const data: GlobalMarcasProdutosModel[] = [
        ...(res.data as any[]).map(
          (e): GlobalMarcasProdutosModel => ({
            id: e.id,
            nome: e.nome,
          }),
        ),
      ];

      return { data, error: null };
    } catch (err) {
      if (err instanceof AxiosError)
        return { data: null, error: errorReturn(err.response?.data ?? 'Erro Inesperado') };

      if (err instanceof TypeError)
        return { data: null, error: errorReturn(err.message) };

      return { data: null, error: errorReturn(err?.toString() ?? 'Erro Inesperado') };
    }
  }

  async insertFornecedores(nome: string): Promise<{ id: string | null, error: ErrorModel | null }> {
    try {
      const res = await apiProvider.post(this.apiRoutes.globalInsertFornecedores(),
        { nome },
        { headers: { Authorization: new LocalStorageProvider().getToken() } },
      );

      const id: string = res.data;

      return { id, error: null };
    } catch (err) {
      if (err instanceof AxiosError)
        return { id: null, error: errorReturn(err.response?.data ?? 'Erro Inesperado') };

      if (err instanceof TypeError)
        return { id: null, error: errorReturn(err.message) };

      return { id: null, error: errorReturn(err?.toString() ?? 'Erro Inesperado') };
    }
  }

  async insertCategoriasProdutos(nome: string): Promise<{ id: string | null, error: ErrorModel | null }> {
    try {
      const res = await apiProvider.post(this.apiRoutes.globalInsertCategoriasProdutos(),
        { nome },
        { headers: { Authorization: new LocalStorageProvider().getToken() } },
      );

      const id: string = res.data;

      return { id, error: null };
    } catch (err) {
      if (err instanceof AxiosError)
        return { id: null, error: errorReturn(err.response?.data ?? 'Erro Inesperado') };

      if (err instanceof TypeError)
        return { id: null, error: errorReturn(err.message) };

      return { id: null, error: errorReturn(err?.toString() ?? 'Erro Inesperado') };
    }
  }

  async insertDespesas(nome: string): Promise<{ id: string | null, error: ErrorModel | null }> {
    try {
      const res = await apiProvider.post(this.apiRoutes.globalInsertDespesas(),
        { nome },
        { headers: { Authorization: new LocalStorageProvider().getToken() } },
      );

      const id: string = res.data;

      return { id, error: null };
    } catch (err) {
      if (err instanceof AxiosError)
        return { id: null, error: errorReturn(err.response?.data ?? 'Erro Inesperado') };

      if (err instanceof TypeError)
        return { id: null, error: errorReturn(err.message) };

      return { id: null, error: errorReturn(err?.toString() ?? 'Erro Inesperado') };
    }
  }

  async insertClientes(nome: string): Promise<{ id: string | null, error: ErrorModel | null }> {
    try {
      const res = await apiProvider.post(this.apiRoutes.globalInsertClientes(),
        { nome },
        { headers: { Authorization: new LocalStorageProvider().getToken() } },
      );

      const id: string = res.data;

      return { id, error: null };
    } catch (err) {
      if (err instanceof AxiosError)
        return { id: null, error: errorReturn(err.response?.data ?? 'Erro Inesperado') };

      if (err instanceof TypeError)
        return { id: null, error: errorReturn(err.message) };

      return { id: null, error: errorReturn(err?.toString() ?? 'Erro Inesperado') };
    }
  }

  async insertHfEscolas(nome: string): Promise<{ id: string | null, error: ErrorModel | null }> {
    try {
      const res = await apiProvider.post(this.apiRoutes.globalInsertHfEscolas(),
        { nome },
        { headers: { Authorization: new LocalStorageProvider().getToken() } },
      );

      const id: string = res.data;

      return { id, error: null };
    } catch (err) {
      if (err instanceof AxiosError)
        return { id: null, error: errorReturn(err.response?.data ?? 'Erro Inesperado') };

      if (err instanceof TypeError)
        return { id: null, error: errorReturn(err.message) };

      return { id: null, error: errorReturn(err?.toString() ?? 'Erro Inesperado') };
    }
  }

  async insertMarcasProdutos(nome: string): Promise<{ id: string | null, error: ErrorModel | null }> {
    try {
      const res = await apiProvider.post(this.apiRoutes.globalInsertMarcasProdutos(),
        { nome },
        { headers: { Authorization: new LocalStorageProvider().getToken() } },
      );

      const id: string = res.data;

      return { id, error: null };
    } catch (err) {
      if (err instanceof AxiosError)
        return { id: null, error: errorReturn(err.response?.data ?? 'Erro Inesperado') };

      if (err instanceof TypeError)
        return { id: null, error: errorReturn(err.message) };

      return { id: null, error: errorReturn(err?.toString() ?? 'Erro Inesperado') };
    }
  }
}
