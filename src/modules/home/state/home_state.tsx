import { create } from "zustand";
// import { InsertHomeModel } from "../models/insert_Home_model";
// import { HomeModel } from "../models/Home_model";
import { HomeServices } from "../services/home_services";
import { router } from "@/shared/router";
import { showErrorMessage } from "@/shared/functions/show_error_message";
import { ClientRoutes } from "@/shared/constants/client_routes";

interface State {
  // data: HomeModel[],
  selectedItems: string[],
  loading: 'loadingMore' | 'loadingInsertPage' | 'savingInsert' | 'none',
  search: string,
  recorsRange: string,
  numberOfPages: number,
  page: number,
  limit: number,
  read: () => void,
  // insert: (modelo: InsertHomeModel) => void,
  // delete: (listaIds: number[]) => Promise<boolean>,
  // readById: (id: string) => Promise<InsertHomeModel | null>,
  // insertBaixaEstoque: (idHome: string, estoque: number, dataBaixa: string) => Promise<boolean>,
  // changeSearch: (value: string) => void,
  // changePage: (page: number) => void,
  // changeSelectedItems: (id: string, selectAll: boolean | false) => void,
  // resetOnDispose: () => void,
};

const HomeState = create<State>()((set) => ({
  // data: [],
  selectedItems: [],
  loading: 'none',
  search: '',
  recorsRange: '',
  numberOfPages: 1,
  page: 1,
  limit: 20,

  read: async function () {
    // const state = get();

    set(() => ({ loading: 'loadingMore' }));

    const res = await new HomeServices().read();

    set(_ => ({ loading: 'none' }));

    if (res.error?.type == 'NotAuthenticated') {
      router.navigate(ClientRoutes.login());
      return;
    }
    if (res.error?.type == 'NotAllowed' || res.error?.type == 'Common') {
      showErrorMessage(res.error);
      return;
    }

    // set(_ => ({ data: res.data!, numberOfPages: res.numberOfPages!, recorsRange: res.recorsRange! }));
  },

  // insert: async function (modelo: InsertHomeModel) {
  //   set(() => ({ loading: 'savingInsert' }));

  //   const res = await new HomeServices().insert(modelo);

  //   set(() => ({
  //     loading: 'none',
  //     search: modelo.id == '' ? '' : get().search,
  //     page: modelo.id == '' ? 1 : get().page,
  //   }));

  //   if (res?.type == 'NotAuthenticated') {
  //     router.navigate(ClientRoutes.login());
  //     return;
  //   }
  //   if (res?.type == 'NotAllowed' || res?.type == 'Common') {
  //     showErrorMessage(res);
  //     return;
  //   }

  //   router.navigate(-1);
  // },

  // delete: async function (listaIds: number[]) {
  //   const res = await new HomeServices().delete(listaIds);

  //   if (res?.type == 'NotAuthenticated') {
  //     router.navigate(ClientRoutes.login());
  //     return false;
  //   }
  //   if (res?.type == 'NotAllowed' || res?.type == 'Common') {
  //     showErrorMessage(res);
  //     return false;
  //   }

  //   get().read();
  //   return true;
  // },

  // readById: async function (id: string) {
  //   set(_ => ({ loading: 'loadingInsertPage' }));

  //   const res = await new HomeServices().readById(id);

  //   set(_ => ({ loading: 'none' }));

  //   if (res.error?.type == 'NotAuthenticated') {
  //     router.navigate(ClientRoutes.login());
  //     return null;
  //   }
  //   if (res.error?.type == 'NotAllowed' || res.error?.type == 'Common') {
  //     showErrorMessage(res.error);
  //     return null;
  //   }

  //   return res.data;
  // },

  // insertBaixaEstoque: async function (idHome: string, estoque: number, dataBaixa: string) {
  //   const res = await new HomeServices().insertBaixaEstoque(idHome, estoque, dataBaixa);

  //   if (res?.type == 'NotAuthenticated') {
  //     router.navigate(ClientRoutes.login());
  //     return false;
  //   }
  //   if (res?.type == 'NotAllowed' || res?.type == 'Common') {
  //     showErrorMessage(res);
  //     return false;
  //   }

  //   get().read();
  //   return true;
  // },

  // changeSearch: function (value: string) {
  //   set(_ => ({ search: value, selectedItems: [], page: 1 }));
  //   get().read();
  //   // numberOfPages = 1;
  // },

  // changePage: function (page: number) {
  //   set(() => ({ page }));

  //   get().read();
  // },

  // changeSelectedItems: function (id: string, selectAll: boolean | false) {
  //   console.log(id, selectAll);
  //   // if (selectAll) {
  //   //   if (selectedItems.length == data.length) {
  //   //     selectedItems.clear();
  //   //   } else {
  //   //     selectedItems = [...data.map((e) => e.id)];
  //   //   }
  //   //   notifyListeners();
  //   //   return;
  //   // }

  //   // if (selectedItems.contains(id)) {
  //   //   selectedItems.remove(id);
  //   // } else {
  //   //   selectedItems.add(id);
  //   // }
  //   // notifyListeners();
  // },

  // resetOnDispose: function () {
  //   // data = [];
  //   // selectedItems = [];
  //   // search = '';
  //   // recorsRange = '';
  //   // numberOfPages = 1;
  //   // page = 1;
  // },

}));

export { HomeState };