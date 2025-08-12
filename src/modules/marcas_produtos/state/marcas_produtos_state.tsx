import { create } from 'zustand'
import { router } from '@/shared/router';
import { ClientRoutes } from '@/shared/constants/client_routes';
import { showErrorMessage } from '@/shared/functions/show_error_message';
import { MarcasProdutosModel } from '../models/marcas_produtos_model';
import { InsertMarcasProdutosModel } from '../models/insert_marcas_produtos_model';
import { MarcasProdutosServices } from '../services/marcas_produtos_services';

interface State {
  data: MarcasProdutosModel[],
  selectedItems: string[],
  loading: 'loadingMore' | 'loadingInsertPage' | 'savingInsert' | 'none',
  search: string,
  recorsRange: string,
  numberOfPages: number,
  page: number,
  limit: number,
  read: () => void,
  insert: (modelo: InsertMarcasProdutosModel) => void,
  delete: (listaIds: number[]) => Promise<boolean>,
  readById: (id: string) => Promise<InsertMarcasProdutosModel | null>,
  changeSearch: (value: string) => void,
  changePage: (page: number) => void,
  changeSelectedItems: (id: string, selectAll: boolean | false) => void,
  resetOnDispose: () => void,
};

const MarcasProdutosState = create<State>()((set, get) => ({
  data: [],
  selectedItems: [],
  loading: 'none',
  search: '',
  recorsRange: '',
  numberOfPages: 1,
  page: 1,
  limit: 20,

  read: async function () {
    const state = get();

    set(() => ({ loading: 'loadingMore' }));

    const res = await new MarcasProdutosServices().read(state.search, state.page, state.limit);

    set(_ => ({ loading: 'none' }));

    if (res.error?.type == 'NotAuthenticated') {
      router.navigate(ClientRoutes.login());
      return;
    }
    if (res.error?.type == 'NotAllowed' || res.error?.type == 'Common') {
      showErrorMessage(res.error);
      return;
    }

    set(_ => ({ data: res.data!, numberOfPages: res.numberOfPages!, recorsRange: res.recorsRange! }));
  },

  insert: async function (modelo: InsertMarcasProdutosModel) {
    set(() => ({ loading: 'savingInsert' }));

    const res = await new MarcasProdutosServices().insert(modelo);

    set(() => ({
      loading: 'none',
      search: modelo.id == '' ? '' : get().search,
      page: modelo.id == '' ? 1 : get().page,
    }));

    if (res?.type == 'NotAuthenticated') {
      router.navigate(ClientRoutes.login());
      return;
    }
    if (res?.type == 'NotAllowed' || res?.type == 'Common') {
      showErrorMessage(res);
      return;
    }

    router.navigate(-1);
  },

  delete: async function (listaIds: number[]) {
    const res = await new MarcasProdutosServices().delete(listaIds);

    if (res?.type == 'NotAuthenticated') {
      router.navigate(ClientRoutes.login());
      return false;
    }
    if (res?.type == 'NotAllowed' || res?.type == 'Common') {
      showErrorMessage(res);
      return false;
    }

    get().read();
    return true;
  },

  readById: async function (id: string) {
    set(_ => ({ loading: 'loadingInsertPage' }));

    const res = await new MarcasProdutosServices().readById(id);

    set(_ => ({ loading: 'none' }));

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

  changeSearch: function (value: string) {
    set(_ => ({ search: value, selectedItems: [], page: 1 }));
    get().read();
    // numberOfPages = 1;
  },

  changePage: function (page: number) {
    set(() => ({ page }));

    get().read();
  },

  changeSelectedItems: function (id: string, selectAll: boolean | false) {
    console.log(id, selectAll);
    // if (selectAll) {
    //   if (selectedItems.length == data.length) {
    //     selectedItems.clear();
    //   } else {
    //     selectedItems = [...data.map((e) => e.id)];
    //   }
    //   notifyListeners();
    //   return;
    // }

    // if (selectedItems.contains(id)) {
    //   selectedItems.remove(id);
    // } else {
    //   selectedItems.add(id);
    // }
    // notifyListeners();
  },

  resetOnDispose: function () {
    // data = [];
    // selectedItems = [];
    // search = '';
    // recorsRange = '';
    // numberOfPages = 1;
    // page = 1;
  },

}));

export { MarcasProdutosState };