import { create } from 'zustand'
import { router } from '@/shared/router';
import { ClientRoutes } from '@/shared/constants/client_routes';
import { showErrorMessage } from '@/shared/functions/show_error_message';
import { ContasReceberModel } from '../models/contas_receber_model';
import { InsertContasReceberModel } from '../models/insert_contas_receber_model';
import { ContasReceberServices } from '../services/contas_receber_services';
import { DateRange } from 'react-day-picker';
import { dateFormatToString } from '@/shared/functions/date_format';

interface State {
  data: ContasReceberModel[],
  selectedItems: string[],
  loading: 'loadingMore' | 'loadingInsertPage' | 'savingInsert' | 'none',
  dateRange: DateRange | null,
  status: '0' | '1' | '2' | '3',
  search: string,
  recorsRange: string,
  numberOfPages: number,
  page: number,
  limit: number,
  read: () => void,
  insert: (modelo: InsertContasReceberModel) => void,
  delete: (listaIds: number[]) => Promise<boolean>,
  readById: (id: string) => Promise<InsertContasReceberModel | null>,
  writeOff: (id: string, dataBaixa: string, desconto: string) => Promise<boolean>,
  parcelling: (id: string, parcelas: number, frequencia: number) => Promise<boolean>,
  changeSearch: (value: string) => void,
  changeDateRange: (date: DateRange) => void,
  changeStatus: (value: '0' | '1' | '2' | '3') => void,
  changePage: (page: number) => void,
  changeSelectedItems: (id: string, selectAll: boolean | false) => void,
  resetOnDispose: () => void,
};

const ContasReceberState = create<State>()((set, get) => ({
  data: [],
  selectedItems: [],
  loading: 'none',
  dateRange: null,
  status: '1',
  search: '',
  recorsRange: '',
  numberOfPages: 1,
  page: 1,
  limit: 20,

  read: async function () {
    const state = get();

    set(() => ({ loading: 'loadingMore' }));

    let newDateRange: DateRange = { from: new Date(), to: new Date() };
    if (state.dateRange != null) {
      newDateRange = state.dateRange;
    }

    const res = await new ContasReceberServices().read(
      state.search,
      state.page,
      state.limit,
      dateFormatToString(newDateRange.from, "yyyy-MM-dd"),
      dateFormatToString(newDateRange.to, "yyyy-MM-dd"),
      state.status,
    );

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

  insert: async function (modelo: InsertContasReceberModel) {
    set(() => ({ loading: 'savingInsert' }));

    const res = await new ContasReceberServices().insert(modelo);

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
    const res = await new ContasReceberServices().delete(listaIds);

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

    const res = await new ContasReceberServices().readById(id);

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

  writeOff: async function (id: string, dataBaixa: string, desconto: string) {
    const res = await new ContasReceberServices().writeOff(id, dataBaixa, desconto);

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

  parcelling: async function (id: string, parcelas: number, frequencia: number) {
    const res = await new ContasReceberServices().parcelling(id, parcelas, frequencia);

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

  changeSearch: function (value: string) {
    set(_ => ({ search: value, selectedItems: [], page: 1 }));
    get().read();
  },

  changeDateRange: function (date: DateRange) {
    set(_ => ({ dateRange: date, selectedItems: [], page: 1 }));
    get().read();
  },

  changeStatus: function (value: '0' | '1' | '2' | '3') {
    set(_ => ({ status: value, selectedItems: [], page: 1 }));
    get().read();
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

export { ContasReceberState };