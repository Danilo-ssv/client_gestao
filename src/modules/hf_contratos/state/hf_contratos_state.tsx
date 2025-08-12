import { create } from 'zustand'
import { HfContratosModel } from '../models/hf_contratos_model';
import { InsertHfContratosModel } from '../models/insert_hf_contratos_model';
import { HfContratosServices } from '../services/hf_contratos_services';
import { router } from '@/shared/router';
import { ClientRoutes } from '@/shared/constants/client_routes';
import { showErrorMessage } from '@/shared/functions/show_error_message';
import { DateRange } from 'react-day-picker';
import { dateFormatToString } from '@/shared/functions/date_format';
import { hfParcelasContratosModel } from '../models/hf_parcelas_contratos_model';
import { formatCnpj, formatCpf } from '@/shared/functions/doc_format';

interface State {
  data: HfContratosModel[],
  selectedItems: string[],
  loading: 'loadingMore' | 'loadingInsertPage' | 'savingInsert' | 'none',
  dateRange: DateRange | null,
  status: '0' | '1' | '2' | '3',
  idHfEscolas: string,
  nomeHfEscolas: string,
  search: string,
  recorsRange: string,
  numberOfPages: number,
  page: number,
  limit: number,
  read: () => void,
  insert: (modelo: InsertHfContratosModel) => void,
  delete: (listaIds: number[]) => Promise<boolean>,
  readById: (id: string) => Promise<InsertHfContratosModel | null>,
  writeOff: (idContrato: string, id: string, dataBaixa: string) => Promise<boolean>,
  changeSearch: (value: string) => void,
  changeDateRange: (date: DateRange) => void,
  changeStatus: (value: '0' | '1' | '2' | '3') => void,
  changeHfEscolas: (idHfEscolas: string, nomeHfEscolas: string) => void,
  changePage: (page: number) => void,
  changeSelectedItems: (id: string, selectAll: boolean | false) => void,
  resetOnDispose: () => void,
};

const HfContratosState = create<State>()((set, get) => ({
  data: [],
  selectedItems: [],
  loading: 'none',
  dateRange: null,
  status: '1',
  idHfEscolas: '0',
  nomeHfEscolas: 'Todos Colégios',
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

    const res = await new HfContratosServices().read(
      state.search,
      formatCpf(state.search),
      formatCnpj(state.search),
      state.page,
      state.limit,
      dateFormatToString(newDateRange.from, "yyyy-MM-dd"),
      dateFormatToString(newDateRange.to, "yyyy-MM-dd"),
      state.status,
      state.idHfEscolas,
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

  insert: async function (modelo: InsertHfContratosModel) {
    set(() => ({ loading: 'savingInsert' }));

    const res = await new HfContratosServices().insert(modelo);

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
    const res = await new HfContratosServices().delete(listaIds);

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

    const res = await new HfContratosServices().readById(id);

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

  writeOff: async function (idContrato: string, id: string, dataBaixa: string) {
    const res = await new HfContratosServices().writeOff(id, dataBaixa);

    if (res.error?.type == 'NotAuthenticated') {
      router.navigate(ClientRoutes.login());
      return false;
    }
    if (res.error?.type == 'NotAllowed' || res.error?.type == 'Common') {
      showErrorMessage(res.error);
      return false;
    }

    set({
      data: get().data.map(e => {
        if (e.id != idContrato) return e;

        return {
          id: e.id,
          contrato: e.contrato,
          nome: e.nome,
          endereco: e.endereco,
          doc: e.doc,
          tipoParcela: e.tipoParcela,
          entrada: e.entrada,
          numeroParcelas: e.numeroParcelas,
          status: e.status,
          nomeStatus: e.nomeStatus,
          color: e.color,
          listaParcelas: e.listaParcelas.map(el => el.id != id ? el : ({
            id: el.id,
            status: res.status,
            nomeStatus: res.nomeStatus,
            color: res.color,
            dataVencimento: el.dataVencimento,
            dataBaixa: dateFormatToString(dataBaixa, 'dd/MM/yyyy'),
            valor: el.valor,
          }) as hfParcelasContratosModel),
        } as HfContratosModel;
      }),
    });

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

  changeHfEscolas: function (idHfEscolas: string, nomeHfEscolas: string) {
    set(_ => ({ idHfEscolas, nomeHfEscolas, selectedItems: [], page: 1 }));
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

export { HfContratosState };