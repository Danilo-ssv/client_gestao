import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ClientRoutes } from "@/shared/constants/client_routes";
import { DeleteModal } from "@/shared/components/delete_modal";
import { CircularProgress } from "@mui/material";
import { CustomInput } from "@/shared/components/custom_input";
import { CustomTable, PageSelector } from "@/shared/components/custom_table";
import { MoreHorizontal } from "lucide-react";
import { ContasReceberState } from "../state/contas_receber_state";
import { ContasReceberModel } from "../models/contas_receber_model";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { dateFormatToString } from "@/shared/functions/date_format";
import { CustomSelect } from "@/shared/components/custom_select";
import { ContasReceberWriteOffModal } from "./components/contas_receber_write_off_modal";
import { ContasReceberParcellingModal } from "./components/contas_receber_parcelling_modal";
import { ptBR } from "date-fns/locale";
import { LocalStorageProvider } from "@/shared/provider/local_storage_provider";

export function ContasReceberPage() {
  const localStorageProvider = new LocalStorageProvider();
  const state = ContasReceberState();

  useEffect(() => {
    const now = new Date();

    state.changeDateRange({
      from: new Date(now.getFullYear(), now.getMonth(), 1),
      to: new Date(now.getFullYear(), now.getMonth() + 1, 0),
    });
  }, []);

  return (
    <>
      <div className="px-8 mt-1">
        <h1 className="text-2xl font-bold">Contas a Receber</h1>
        <div className="h-5"></div>
        <div className="flex justify-between">
          <div className="flex gap-1">
            {
              !(localStorageProvider.getUser()?.permissoes.contasReceberInsert ?? false)
                ? <div></div>
                : <NavLink to={ClientRoutes.dashboardContasReceberInserir('', false)}>
                  <Button className="hover:cursor-pointer">inserir</Button>
                </NavLink>
            }
            <Popover /*onOpenChange={(value) => { }}*/>
              <PopoverTrigger>
                <CustomInput
                  id="dateFilter"
                  className="w-40"

                  value={state.dateRange == null ? undefined : dateFormatToString(state.dateRange, "dd/MM/yyyy")}
                  readOnly={true}
                />
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  locale={ptBR}
                  mode="range"
                  selected={state.dateRange ?? undefined}
                  defaultMonth={state.dateRange?.from ?? undefined}
                  onSelect={(value) => {
                    if (value != undefined) {
                      state.changeDateRange(value);
                    }
                  }} />
              </PopoverContent>
            </Popover>
            <CustomSelect
              id='status'
              // title='Estado Civil:'
              value={state.status}
              options={[
                <option value="0">Todos</option>,
                <option value="1">Pendente</option>,
                <option value="2">Pago</option>,
                <option value="3">Atrasado</option>,
              ]}
              onChange={({ target }) => {
                state.changeStatus(target.value as "1" | "0" | "2" | "3");
              }}
            />
          </div>
          <CustomInput
            id=""
            className="w-[200px]"
            placeholder="Pesquisar..."
            onChange={(value => state.changeSearch(value.target.value))}
            value={state.search}
          />
        </div>
        <div className="h-4"></div>
      </div>
      <div className='mx-4 px-4 pb-4 bg-white relative'>
        <CustomTable
          data={state.data}
          columns={(item) => {
            const element = item as (ContasReceberModel | null);

            return [
              {
                label: 'ID',
                value: element?.id ?? '',
                width: 70,
                alignment: 'center',
              },
              {
                label: 'Cliente',
                value: element?.nomeClientes ?? '',
                width: 150,
              },
              // {
              //   label: 'Despesa',
              //   value: element?.nomeDespesas ?? '',
              //   width: 150,
              // },
              {
                label: 'Descrição',
                value: element?.descricao ?? '',
                width: 100,
                typeWidth: 'min-width',
              },
              {
                label: 'Vencimento',
                value: element?.dataVencimento ?? '',
                width: 120,
                alignment: 'center',
              },
              {
                label: 'Valor',
                value: element?.valor ?? '',
                width: 100,
                alignment: 'center',
              },
              {
                label: 'Status',
                value: element?.nomeStatus ?? '',
                width: 100,
                textColor: element?.color ?? '#000',
                alignment: 'center',
              },
              {
                label: 'Ações',
                value: <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal
                      className="flex justify-center items-center w-8 h-8 p-1 rounded-full hover:bg-[#ede8f0]"
                    />
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-40 bg-white border-1 border-gray-300 shadow-xl/20 rounded-[8px] relative -top-1 right-5">
                    {
                      !(localStorageProvider.getUser()?.permissoes.contasReceberUpdate ?? false)
                        ? null
                        : (
                          element?.status != '2' &&
                          <NavLink to={ClientRoutes.dashboardContasReceberInserir(element?.id ?? '', false)}>
                            <span className="m-1 py-1 px-2 rounded-[8px] hover:bg-gray-200 block">Editar</span>
                          </NavLink>
                        )
                    }
                    {
                      !(localStorageProvider.getUser()?.permissoes.contasReceberInsert ?? false)
                        ? null
                        : <NavLink to={ClientRoutes.dashboardContasReceberInserir(element?.id ?? '', true)}>
                          <span className="m-1 py-1 px-2 rounded-[8px] hover:bg-gray-200 block">Clonar</span>
                        </NavLink>
                    }
                    {
                      !(localStorageProvider.getUser()?.permissoes.contasReceberParcelling ?? false)
                        ? null
                        : (element?.status != '2' && <ContasReceberParcellingModal id={element?.id ?? ''} />)
                    }
                    {
                      !(localStorageProvider.getUser()?.permissoes.contasReceberWriteOff ?? false)
                        ? null
                        : (element?.status != '2' && < ContasReceberWriteOffModal id={element?.id ?? ''} />)
                    }
                    {
                      !(localStorageProvider.getUser()?.permissoes.contasReceberDelete ?? false)
                        ? null
                        : <div>
                          <hr />
                          <DeleteModal
                            onSave={async () => await state.delete([element?.id ?? ''])}
                          />
                        </div>
                    }
                  </PopoverContent>
                </Popover>,
                width: 100,
                alignment: 'center',
              },
            ];
          }}
          onTap={null}
          onDoubleTap={null}
        />
        <div className="flex justify-between">
          {/* <select id="entidade" value={controller.entidade} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"> */}
          <select className="w-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="200">200</option>
          </select>
          <h1>{state.recorsRange}</h1>
          <PageSelector
            page={state.page}
            numberOfPages={state.numberOfPages}
            selectPage={(page) => {
              state.changePage(page);
            }}
          />
        </div>
        {state.loading == 'loadingMore' ? <CircularProgress className="absolute bottom-1/2 right-1/2 translate-1/2" /> : null}
      </div>
      <div className="h-8"></div>
    </>
  );
}