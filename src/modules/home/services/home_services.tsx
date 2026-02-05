import { errorReturn, ErrorModel } from "@/shared/functions/error_return";
import { ApiRoutes } from "@/shared/constants/api_routes";
import { apiProvider } from "@/shared/provider/api_provider";
import { LocalStorageProvider } from "@/shared/provider/local_storage_provider";
import { AxiosError } from "axios";

interface readReturnModel {
  // data: HomeModel[] | null,
  // numberOfPages: number | null,
  // recorsRange: string | null,
  error: ErrorModel | null,
}

export class HomeServices {
  apiRoutes = new ApiRoutes();

  async read(): Promise<readReturnModel> {
    try {
      await apiProvider.get(this.apiRoutes.home(),
        { headers: { Authorization: new LocalStorageProvider().getToken() } },
      );

      // const data: HomeModel[] = [
      //   ...(res.data['data'] as any[]).map(
      //     (e): HomeModel => ({
      //       id: e.id,
      //       codigo: e.codigo,
      //       nome: e.nome,
      //       preco: currencyFormat(e.preco, true),
      //       estoque: e.estoque,
      //     }),
      //   ),
      // ];

      // const numberOfPages: number = res.data['numberOfPages'];
      // const recorsRange: string = res.data['recorsRange'];

      return { error: null };
    } catch (err) {
      if (err instanceof AxiosError)
        return { error: errorReturn(err.response?.data ?? 'Erro Inesperado') };

      if (err instanceof TypeError)
        return { error: errorReturn(err.message) };

      return { error: errorReturn(err?.toString() ?? 'Erro Inesperado') };
    }
  }

  //   async insert(modelo: InsertHomeModel): Promise<ErrorModel | null> {
  //     try {
  //       await apiProvider.post(this.apiRoutes.HomeInsert(),
  //         { ...modelo },
  //         { headers: { Authorization: new LocalStorageProvider().getToken() } },
  //       );

  //       return null;
  //     } catch (err) {
  //       if (err instanceof AxiosError)
  //         return errorReturn(err.response?.data ?? 'Erro Inesperado');

  //       if (err instanceof TypeError)
  //         return errorReturn(err.message);

  //       return errorReturn(err?.toString() ?? 'Erro Inesperado');
  //     }
  //   }

  //   async delete(listaIds: number[]): Promise<ErrorModel | null> {
  //     try {
  //       await apiProvider.delete(this.apiRoutes.HomeDelete(), {
  //         data: { listaIds: listaIds },
  //         headers: { Authorization: new LocalStorageProvider().getToken() },
  //       },
  //       );

  //       return null;
  //     } catch (err) {
  //       if (err instanceof AxiosError)
  //         return errorReturn(err.response?.data ?? 'Erro Inesperado');

  //       if (err instanceof TypeError)
  //         return errorReturn(err.message);

  //       return errorReturn(err?.toString() ?? 'Erro Inesperado');
  //     }
  //   }

  //   async readById(id: string): Promise<{ data: InsertHomeModel | null, error: ErrorModel | null }> {
  //     try {
  //       const res = await apiProvider.get(this.apiRoutes.HomeReadById(id),
  //         { headers: { Authorization: new LocalStorageProvider().getToken() } },
  //       );

  //       const data: InsertHomeModel = {
  //         id: res.data.id,
  //         codigoBarra: res.data.codigoBarra,
  //         codigo: res.data.codigo,
  //         nome: res.data.nome,
  //         descricao: res.data.descricao,
  //         preco: currencyFormat(res.data.preco),
  //         custo: currencyFormat(res.data.custo),
  //         estoque: res.data.estoque,
  //         idMarcasHome: res.data.idMarcasHome,
  //         nomeMarcasHome: res.data.nomeMarcasHome,
  //         idCategoriasHome: res.data.idCategoriasHome,
  //         nomeCategoriasHome: res.data.nomeCategoriasHome,
  //         alertaEstoqueMinimo: res.data.alertaEstoqueMinimo,
  //         genero: res.data.genero,
  //       };

  //       return { data, error: null };
  //     } catch (err) {
  //       if (err instanceof AxiosError)
  //         return { data: null, error: errorReturn(err.response?.data ?? 'Erro Inesperado') };

  //       if (err instanceof TypeError)
  //         return { data: null, error: errorReturn(err.message) };

  //       return { data: null, error: errorReturn(err?.toString() ?? 'Erro Inesperado') };
  //     }
  //   }

  //   async insertBaixaEstoque(idHome: string, estoque: number, dataBaixa: string): Promise<ErrorModel | null> {
  //     try {
  //       await apiProvider.post(this.apiRoutes.HomeInsertBaixaEstoque(),
  //         { idHome, estoque, dataBaixa },
  //         { headers: { Authorization: new LocalStorageProvider().getToken() } },
  //       );

  //       return null;
  //     } catch (err) {
  //       if (err instanceof AxiosError) return errorReturn(err.response?.data ?? 'Erro Inesperado');

  //       if (err instanceof TypeError) return errorReturn(err.message);

  //       return errorReturn(err?.toString() ?? 'Erro Inesperado');
  //     }
  //   }
}