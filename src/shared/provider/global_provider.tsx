import { ClientRoutes } from "../constants/client_routes";
import { showErrorMessage } from "../functions/show_error_message";
import { GlobalCategoriasProdutosModel } from "../models/global_categorias_produtos_model";
import { GlobalClientesModel } from "../models/global_clientes_model";
import { GlobalDespesasModel } from "../models/global_despesas_model";
import { GlobalFornecedoresModel } from "../models/global_fornecedores_model";
import { GlobalHfEscolasModel } from "../models/global_hf_escolas_model";
import { GlobalMarcasProdutosModel } from "../models/global_marcas_produtos_model";
import { GlobalMunicipiosByCepModel } from "../models/global_municipios_by_cep_model";
import { GlobalMunicipiosModel } from "../models/global_municipios_model";
import { router } from "../router";
import { GlobalServices } from "./global_services";

interface Provider {
  readMunicipiosByCep: (cep: string) => Promise<GlobalMunicipiosByCepModel | null>,
  readMunicipios: (search: string, uf: string) => Promise<GlobalMunicipiosModel[] | null>,
  readFornecedores: (search: string) => Promise<GlobalFornecedoresModel[] | null>,
  readCategoriasProdutos: (search: string) => Promise<GlobalCategoriasProdutosModel[] | null>,
  readDespesas: (search: string) => Promise<GlobalDespesasModel[] | null>,
  readClientes: (search: string) => Promise<GlobalClientesModel[] | null>,
  readHfEscolas: (search: string) => Promise<GlobalHfEscolasModel[] | null>,
  readMarcasProdutos: (search: string) => Promise<GlobalMarcasProdutosModel[] | null>,
  insertFornecedores: (nome: string) => Promise<string | null>,
  insertCategoriasProdutos: (nome: string) => Promise<string | null>,
  insertDespesas: (nome: string) => Promise<string | null>,
  insertClientes: (nome: string) => Promise<string | null>,
  insertHfEscolas: (nome: string) => Promise<string | null>,
  insertMarcasProdutos: (nome: string) => Promise<string | null>,
};

const globalProvider: Provider = {
  readMunicipiosByCep: async function (cep: string) {
    const res = await new GlobalServices().readMunicipiosByCep(cep);

    if (res.error?.type == 'NotAuthenticated') {
      router.navigate(ClientRoutes.login());
      return null;
    }
    if (res.error?.type == 'NotAllowed' || res.error?.type == 'Common') {
      showErrorMessage(res.error);
      return null;
    }

    return res.data;
  },

  readMunicipios: async function (search: string, uf: string) {
    const res = await new GlobalServices().readMunicipios(search, uf);

    if (res.error?.type == 'NotAuthenticated') {
      router.navigate(ClientRoutes.login());
      return null;
    }
    if (res.error?.type == 'NotAllowed' || res.error?.type == 'Common') {
      showErrorMessage(res.error);
      return null;
    }

    return res.data;
  },

  readFornecedores: async function (search: string) {
    const res = await new GlobalServices().readFornecedores(search);

    if (res.error?.type == 'NotAuthenticated') {
      router.navigate(ClientRoutes.login());
      return null;
    }
    if (res.error?.type == 'NotAllowed' || res.error?.type == 'Common') {
      showErrorMessage(res.error);
      return null;
    }

    return res.data;
  },

  readCategoriasProdutos: async function (search: string) {
    const res = await new GlobalServices().readCategoriasProdutos(search);

    if (res.error?.type == 'NotAuthenticated') {
      router.navigate(ClientRoutes.login());
      return null;
    }
    if (res.error?.type == 'NotAllowed' || res.error?.type == 'Common') {
      showErrorMessage(res.error);
      return null;
    }

    return res.data;
  },

  readDespesas: async function (search: string) {
    const res = await new GlobalServices().readDespesas(search);

    if (res.error?.type == 'NotAuthenticated') {
      router.navigate(ClientRoutes.login());
      return null;
    }
    if (res.error?.type == 'NotAllowed' || res.error?.type == 'Common') {
      showErrorMessage(res.error);
      return null;
    }

    return res.data;
  },

  readClientes: async function (search: string) {
    const res = await new GlobalServices().readClientes(search);

    if (res.error?.type == 'NotAuthenticated') {
      router.navigate(ClientRoutes.login());
      return null;
    }
    if (res.error?.type == 'NotAllowed' || res.error?.type == 'Common') {
      showErrorMessage(res.error);
      return null;
    }

    return res.data;
  },

  readHfEscolas: async function (search: string) {
    const res = await new GlobalServices().readHfEscolas(search);

    if (res.error?.type == 'NotAuthenticated') {
      router.navigate(ClientRoutes.login());
      return null;
    }
    if (res.error?.type == 'NotAllowed' || res.error?.type == 'Common') {
      showErrorMessage(res.error);
      return null;
    }

    return res.data;
  },

  readMarcasProdutos: async function (search: string) {
    const res = await new GlobalServices().readMarcasProdutos(search);

    if (res.error?.type == 'NotAuthenticated') {
      router.navigate(ClientRoutes.login());
      return null;
    }
    if (res.error?.type == 'NotAllowed' || res.error?.type == 'Common') {
      showErrorMessage(res.error);
      return null;
    }

    return res.data;
  },

  insertFornecedores: async function (nome: string) {
    const res = await new GlobalServices().insertFornecedores(nome);

    if (res.error?.type == 'NotAuthenticated') {
      router.navigate(ClientRoutes.login());
      return null;
    }
    if (res.error?.type == 'NotAllowed' || res.error?.type == 'Common') {
      showErrorMessage(res.error);
      return null;
    }

    return res.id;
  },

  insertCategoriasProdutos: async function (nome: string) {
    const res = await new GlobalServices().insertCategoriasProdutos(nome);

    if (res.error?.type == 'NotAuthenticated') {
      router.navigate(ClientRoutes.login());
      return null;
    }
    if (res.error?.type == 'NotAllowed' || res.error?.type == 'Common') {
      showErrorMessage(res.error);
      return null;
    }

    return res.id;
  },

  insertDespesas: async function (nome: string) {
    const res = await new GlobalServices().insertDespesas(nome);

    if (res.error?.type == 'NotAuthenticated') {
      router.navigate(ClientRoutes.login());
      return null;
    }
    if (res.error?.type == 'NotAllowed' || res.error?.type == 'Common') {
      showErrorMessage(res.error);
      return null;
    }

    return res.id;
  },

  insertClientes: async function (nome: string) {
    const res = await new GlobalServices().insertClientes(nome);

    if (res.error?.type == 'NotAuthenticated') {
      router.navigate(ClientRoutes.login());
      return null;
    }
    if (res.error?.type == 'NotAllowed' || res.error?.type == 'Common') {
      showErrorMessage(res.error);
      return null;
    }

    return res.id;
  },

  insertHfEscolas: async function (nome: string) {
    const res = await new GlobalServices().insertHfEscolas(nome);

    if (res.error?.type == 'NotAuthenticated') {
      router.navigate(ClientRoutes.login());
      return null;
    }
    if (res.error?.type == 'NotAllowed' || res.error?.type == 'Common') {
      showErrorMessage(res.error);
      return null;
    }

    return res.id;
  },

  insertMarcasProdutos: async function (nome: string) {
    const res = await new GlobalServices().insertMarcasProdutos(nome);

    if (res.error?.type == 'NotAuthenticated') {
      router.navigate(ClientRoutes.login());
      return null;
    }
    if (res.error?.type == 'NotAllowed' || res.error?.type == 'Common') {
      showErrorMessage(res.error);
      return null;
    }

    return res.id;
  },
}

export { globalProvider };
