import { errorReturn, ErrorModel } from "@/shared/functions/error_return";
import { ProdutosModel } from "../models/produtos_model";
import { ApiRoutes } from "@/shared/constants/api_routes";
import { apiProvider } from "@/shared/provider/api_provider";
import { LocalStorageProvider } from "@/shared/provider/local_storage_provider";
import { AxiosError } from "axios";
import { InsertProdutosModel } from "../models/insert_produtos_model";
import { currencyFormat } from "@/shared/functions/currency_format";

interface readReturnModel {
  data: ProdutosModel[] | null,
  numberOfPages: number | null,
  recorsRange: string | null,
  error: ErrorModel | null,
}

export class ProdutosServices {
  apiRoutes = new ApiRoutes();

  async read(search: string, page: number, limit: number): Promise<readReturnModel> {
    try {
      const res = await apiProvider.get(this.apiRoutes.produtosRead(search, page, limit),
        { headers: { Authorization: new LocalStorageProvider().getToken() } },
      );

      const data: ProdutosModel[] = [
        ...(res.data['data'] as any[]).map(
          (e): ProdutosModel => ({
            id: e.id,
            codigo: e.codigo,
            nome: e.nome,
            preco: currencyFormat(e.preco, true),
            estoque: e.estoque,
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

  async insert(modelo: InsertProdutosModel): Promise<ErrorModel | null> {
    try {
      const formData = new FormData();
      for (const key in modelo) {
        if (key == "image") continue;
        formData.append(key, (modelo as any)[key]);
      }
      if (modelo.image.imageOrigin == "local" && modelo.image.localFile != null) {
        formData.append('file', modelo.image.localFile.file);
      }

      await apiProvider.post(this.apiRoutes.produtosInsert(),
        formData,
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
      await apiProvider.delete(this.apiRoutes.produtosDelete(), {
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

  async readById(id: string): Promise<{ data: InsertProdutosModel | null, error: ErrorModel | null }> {
    try {
      const res = await apiProvider.get(this.apiRoutes.produtosReadById(id),
        { headers: { Authorization: new LocalStorageProvider().getToken() } },
      );

      const data: InsertProdutosModel = {
        id: res.data.id,
        codigoBarra: res.data.codigoBarra,
        codigo: res.data.codigo,
        nome: res.data.nome,
        descricao: res.data.descricao,
        preco: currencyFormat(res.data.preco),
        custo: currencyFormat(res.data.custo),
        estoque: res.data.estoque,
        idMarcasProdutos: res.data.idMarcasProdutos,
        nomeMarcasProdutos: res.data.nomeMarcasProdutos,
        idCategoriasProdutos: res.data.idCategoriasProdutos,
        nomeCategoriasProdutos: res.data.nomeCategoriasProdutos,
        alertaEstoqueMinimo: res.data.alertaEstoqueMinimo,
        genero: res.data.genero,
        image: res.data.image == ""
          ? { imageOrigin: "none", urlName: null, localFile: null }
          : { imageOrigin: "network", urlName: res.data.image, localFile: null },
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

  async insertBaixaEstoque(idProdutos: string, estoque: number, dataBaixa: string): Promise<ErrorModel | null> {
    try {
      await apiProvider.post(this.apiRoutes.produtosInsertBaixaEstoque(),
        { idProdutos, estoque, dataBaixa },
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