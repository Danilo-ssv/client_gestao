import { ReactNode, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { InsertHfContratosModel } from "../models/insert_hf_contratos_model";
import { HfContratosState } from "../state/hf_contratos_state";
import { CircularProgress } from "@mui/material";
import { Button } from "@/components/ui/button";
import { CustomSearchSelect } from "@/shared/components/custom_search_select";
import { globalProvider } from "@/shared/provider/global_provider";
import { showErrorMessage } from "@/shared/functions/show_error_message";
import { CustomInput } from "@/shared/components/custom_input";
import { CustomSelect } from "@/shared/components/custom_select";
import { currencyFormat } from "@/shared/functions/currency_format";
import { Check, Info, Plus, Search, TableOfContents, X } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";
import { dateFormatToString } from "@/shared/functions/date_format";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { HfContatosContratosModel } from "../models/hf_contatos_contratos_model";

interface QueryProps {
  id: string;
  clone: boolean;
}

export function InsertHfContratosPage() {
  const [searchParams] = useSearchParams();

  const queryProps: QueryProps = {
    id: searchParams.get('id') ?? '',
    clone: searchParams.get('clone') == 'true',
  };

  const state = HfContratosState();

  let [blockSubmit, setBlockSubmit] = useState(false);
  const [controller, setController] = useState<InsertHfContratosModel>({
    id: '',
    idHfEscolas: '0',
    nomeHfEscolas: 'Selecione um Colégio',
    contrato: '',
    nome: '',
    avalista: '',
    cep: '',
    endereco: '',
    bairro: '',
    idMunicipios: '0',
    nomeMunicipios: 'Selecione um Município',
    doc: '',
    telefone: '',
    entrada: '',
    tipoParcela: '1',
    valor: '',
    numeroParcelas: '',
    listaParcelas: [],
    listaTelefones: [],
  });

  function onChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
    setController({
      ...controller,
      [event.target.id]: event.target.value,
    });
  }

  function insert(event: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();

    if (blockSubmit) return;

    if (state.loading == 'loadingInsertPage' || state.loading == 'savingInsert') return;

    if (controller.nome == "") {
      showErrorMessage({ type: "Common", message: 'Nome é Obrigatório!' });
      return;
    }

    if (controller.contrato == "") {
      showErrorMessage({ type: "Common", message: 'Contrato é Obrigatório!' });
      return;
    }

    if (controller.idHfEscolas == "0" || controller.idHfEscolas == "") {
      showErrorMessage({ type: "Common", message: 'Selecione um Colégio!' });
      return;
    }

    if (controller.id == '') {
      if (controller.listaParcelas.length == 0) {
        showErrorMessage({ type: "Common", message: 'Defina alguma Parcela! 2 ' });
        return;
      }
    }

    let listaTelefones: HfContatosContratosModel[] = [];

    if (controller.id == '') {
      listaTelefones = controller.listaTelefones;
    } else if (!queryProps.clone) {
      listaTelefones = controller.listaTelefones.filter(e => e.id == '' || e.delete);
    } else {
      controller.listaTelefones.map(e => {
        if (e.id == '') {
          listaTelefones.push(e)
        } else if (!e.delete) {
          listaTelefones.push({ id: '', telefone: e.telefone, delete: false })
        }
      });
    }

    state.insert({
      id: queryProps.clone ? '' : controller.id,
      idHfEscolas: controller.idHfEscolas,
      nomeHfEscolas: controller.nomeHfEscolas,
      contrato: controller.contrato,
      nome: controller.nome,
      avalista: controller.avalista,
      cep: controller.cep,
      endereco: controller.endereco,
      bairro: controller.bairro,
      idMunicipios: controller.idMunicipios,
      nomeMunicipios: controller.nomeMunicipios,
      doc: controller.doc,
      telefone: controller.telefone,
      entrada: controller.entrada,
      tipoParcela: controller.tipoParcela,
      valor: controller.valor,
      numeroParcelas: controller.numeroParcelas,
      listaParcelas: !queryProps.clone && controller.id != '' ? [] : controller.listaParcelas,
      listaTelefones: listaTelefones,
    });
  }

  function returnDate(date: Date, index: number): Date {
    if (date.getDate() == 31) {
      return new Date(date.getFullYear(), date.getMonth() + index + 1, 0);
    }
    if (new Date(date.getFullYear(), date.getMonth() + index, 1).getMonth() == 1) {
      if (date.getDate() == 30 || date.getDate() == 29) {
        return new Date(date.getFullYear(), date.getMonth() + index + 1, 0);
      }
    }
    return new Date(date.getFullYear(), date.getMonth() + index, date.getDate());
  }

  function changeParcelaValue(value: string, index: number) {
    let sum = 0;

    setController({
      ...controller,
      listaParcelas: controller.listaParcelas.map((e, i) => {
        if (index != i) {
          sum += Number.parseFloat((e.valor as any).replaceAll('.', '').replaceAll(',', '.'));
          return e;
        }

        const newValue = currencyFormat(value);
        sum += Number.parseFloat((newValue as any).replaceAll('.', '').replaceAll(',', '.'));

        return {
          id: e.id,
          status: e.status,
          nomeStatus: e.nomeStatus,
          color: e.color,
          dataVencimento: e.dataVencimento,
          dataBaixa: e.dataBaixa,
          valor: newValue,
        }
      }),
      valor: currencyFormat(sum.toFixed(2)),
    });
  }

  function insertParcela(date: Date, indexArg: number | null) {
    if (indexArg != null) {
      setController({
        ...controller,
        listaParcelas: controller.listaParcelas.map((e, i) => {
          if (indexArg != i) return e;

          return {
            id: e.id,
            status: e.status,
            nomeStatus: e.nomeStatus,
            color: e.color,
            dataVencimento: dateFormatToString(date, "yyyy-MM-dd"),
            dataBaixa: e.dataBaixa,
            valor: e.valor,
          }
        }),
      });
      return;
    }

    const valor = Number.parseFloat((controller.valor as any).replaceAll('.', '').replaceAll(',', '.'));
    const numeroParcelas = Number.parseInt(controller.numeroParcelas);

    let sum = 0;
    let listaParcelas = [];

    for (let index = 0; index < numeroParcelas; index++) {
      const partialValue = valor / numeroParcelas;
      sum += Number.parseFloat(partialValue.toFixed(2));

      const newValue = (index + 1 == numeroParcelas ? partialValue + valor - sum : partialValue).toFixed(2);

      listaParcelas.push({
        id: '',
        status: '',
        nomeStatus: '',
        color: '',
        dataVencimento: dateFormatToString(returnDate(date, index), "yyyy-MM-dd"),
        dataBaixa: '',
        valor: currencyFormat(newValue),
      });
    }

    setController({
      ...controller,
      listaParcelas: listaParcelas,
    });
  }

  function insertTelefone() {
    if (controller.telefone == '') return;

    setController({
      ...controller,
      telefone: '',
      listaTelefones: [
        ...controller.listaTelefones,
        {
          id: '',
          telefone: controller.telefone,
          delete: false,
        },
      ],
    });
  }

  function deleteTelefone(index: number) {
    let listaTelefones: HfContatosContratosModel[] = [];

    for (let i = 0; i < controller.listaTelefones.length; i++) {
      if (i != index) {
        listaTelefones.push(controller.listaTelefones[i]);
        continue;
      }
      const e = controller.listaTelefones[i];

      if (e.id != '') {
        listaTelefones.push({ id: e.id, telefone: e.telefone, delete: !e.delete })
      }
    }
    setController({
      ...controller,
      listaTelefones,
    });
  }

  async function readMunicipiosByCep() {
    const cep = (controller.cep as any).replaceAll('.', '').replaceAll('-', '');
    if (cep.length < 8) return;

    const res = await globalProvider.readMunicipiosByCep(cep)

    if (res != null) {
      setController({
        ...controller,
        endereco: res.endereco,
        bairro: res.bairro,
        idMunicipios: res.idMunicipios,
        nomeMunicipios: res.nomeMunicipios,
      });
    }
  }

  useEffect(() => {
    if (queryProps.id != '') {
      state.readById(queryProps.id).then((value) => {
        if (value != null) {
          setController(value);
        }
      });
    }
  }, []);

  return (
    <div className="px-1 pt-1">
      <h1 className="text-2xl font-bold">Inserir Contrato</h1>
      <div className="h-2"></div>
      <form onSubmit={insert} action="">
        <div className="grid grid-cols-2 gap-x-2">
          <CustomInput
            id='nome'
            title='Nome:'
            placeholder="Digite o Nome"
            value={controller.nome}
            onChange={onChange}
          />
          <CustomInput
            id='avalista'
            title='Avalista:'
            placeholder="Digite o Avalista"
            value={controller.avalista}
            onChange={onChange}
          />
          <CustomInput
            id='contrato'
            title='Contrato:'
            placeholder="Digite o Contrato"
            value={controller.contrato}
            onChange={onChange}
          />
          <div>
            <label htmlFor="idHfEscolas">Colégio:</label>
            <CustomSearchSelect
              id={controller.idHfEscolas}
              title={controller.nomeHfEscolas}
              idForLabel="idHfEscolas"
              placeholder={'Pesquise um Colégio...'}
              selectItem={{ id: '0', title: 'Selecione um Colégio', inLineSubTitle: null, subTitle: null }}
              getItems={async (value) => {
                const res = await globalProvider.readHfEscolas(value) ?? [];
                return res.map(e => ({ id: e.id, title: e.nome, inLineSubTitle: null, subTitle: null }));
              }}
              onSelect={(id, title) => {
                setController({
                  ...controller,
                  idHfEscolas: id,
                  nomeHfEscolas: title,
                });
              }}
              blockSubmit={(block) => setBlockSubmit(block)}
            />
          </div>
          <CustomInput
            id='doc'
            title='CPF/CNPJ:'
            placeholder="Digite o CPF/CNPJ"
            value={controller.doc}
            onChange={onChange}
            mask={['999.999.999-99', '99.999.999/9999-99']}
          />
          <div className="flex items-end">
            <CustomInput
              id='telefone'
              title='Telefone:'
              placeholder="Digite o Telefone"
              value={controller.telefone}
              onChange={onChange}
              mask={['(99) 99999-9999']}
              expand={true}
              blockSubmit={(block) => setBlockSubmit(block)}
              onEnter={insertTelefone}
              suffixIcon={
                <Popover>
                  <PopoverTrigger>
                    <button
                      className="absolute right-1.5 bottom-1 p-0.5 rounded-sm border border-gray-500 hover:bg-[#ede8f0] cursor-pointer"
                      type="button"
                    >
                      <TableOfContents size={18} />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-40 bg-white border-1 border-gray-300 shadow-xl/20 rounded-[8px] relative -top-1 right-5">
                    {
                      controller.listaTelefones.map((item, index) => (
                        <div
                          key={index}
                          style={{
                            borderBottom: index + 1 >= controller.listaTelefones.length ? undefined : '1px',
                            textDecoration: !item.delete ? undefined : 'line-through'
                          }}
                          className="py-1 pl-2 pr-1 flex justify-between items-centerx text-sm"
                        >
                          {item.telefone}
                          <div onClick={() => deleteTelefone(index)}>
                            {
                              <Tooltip>
                                <TooltipTrigger type="button">
                                  {
                                    item.delete
                                      ? <Check
                                        size={24}
                                        className="flex justify-center items-center p-1 rounded-full hover:bg-[#ede8f0] cursor-pointer"
                                      />
                                      : <X
                                        size={24}
                                        className="flex justify-center items-center p-1 rounded-full hover:bg-[#ede8f0] cursor-pointer"
                                      />
                                  }
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{item.delete ? 'Ativar' : 'Remover'}</p>
                                </TooltipContent>
                              </Tooltip>
                            }
                          </div>
                        </div>
                      ))
                    }
                  </PopoverContent>
                </Popover>
              }
            />
            <Tooltip>
              <TooltipTrigger type="button">
                <button
                  className="p-0.5 mx-2 mb-1 rounded-sm border border-gray-500 hover:bg-[#ede8f0] cursor-pointer"
                  type="button"
                  onClick={insertTelefone}
                >
                  <Plus size={22} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Adicionar Telefone</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        <h1 className="text-1xl font-semibold">Detalhes de Endereço</h1>
        <div className="grid grid-cols-2 gap-x-2">
          <CustomInput
            id='cep'
            title='CEP:'
            placeholder="Digite o CEP"
            value={controller.cep}
            onChange={onChange}
            mask={['99.999-999']}
            blockSubmit={(block) => setBlockSubmit(block)}
            onEnter={readMunicipiosByCep}
            suffixIcon={
              <button
                className="flex absolute right-1.5 bottom-1 p-0.5 rounded-sm border border-gray-500 hover:bg-[#ede8f0] cursor-pointer"
                type="button"
                onClick={readMunicipiosByCep}
              >
                <Tooltip>
                  <TooltipTrigger type="button">
                    <Search size={18} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Puchar Endereço</p>
                  </TooltipContent>
                </Tooltip>
              </button>
              // <Tooltip>
              //   <TooltipTrigger type="button">
              //     <button
              //       className="absolute right-1.5 bottom-1 p-0.5 rounded-sm border border-gray-500 hover:bg-[#ede8f0] cursor-pointer"
              //       type="button"
              //       onClick={readMunicipiosByCep}
              //     >
              //       <Search size={18} />
              //     </button>
              //   </TooltipTrigger>
              //   <TooltipContent>
              //     <p>Puchar Endereço</p>
              //   </TooltipContent>
              // </Tooltip>
            }
          />
          <CustomInput
            id='endereco'
            title='Endereço:'
            placeholder="Digite o Endereço"
            value={controller.endereco}
            onChange={onChange}
          />
          <CustomInput
            id='bairro'
            title='Bairro:'
            placeholder="Digite o Bairro"
            value={controller.bairro}
            onChange={onChange}
          />
          <div>
            <label htmlFor="idMunicipios">Município:</label>
            <CustomSearchSelect
              id={controller.idMunicipios}
              title={controller.nomeMunicipios}
              idForLabel="idMunicipios"
              placeholder={'Pesquise um Município...'}
              selectItem={{ id: '0', title: 'Selecione um Município', inLineSubTitle: null, subTitle: null }}
              getItems={async (value) => {
                const res = await globalProvider.readMunicipios(value, '') ?? [];
                return res.map(e => ({ id: e.id, title: e.nome, inLineSubTitle: e.id == '0' ? '' : ' - ' + e.uf, subTitle: null }));
              }}
              onSelect={(id, title) => {
                setController({
                  ...controller,
                  idMunicipios: id,
                  nomeMunicipios: title,
                });
              }}
              blockSubmit={(block) => setBlockSubmit(block)}
            />
          </div>
        </div>
        <h1 className="text-1xl font-semibold">Parcelas</h1>
        <div className="grid grid-cols-2 gap-x-2">
          <CustomSelect
            id='tipoParcela'
            title='Tipo de Parcela:'
            value={controller.tipoParcela}
            options={[
              <option value="1">Pix</option>,
              <option value="2">Cheque</option>,
              <option value="3">Cartão</option>,
              <option value="4">Boleto</option>,
            ]}
            onChange={onChange}
          />
          <CustomInput
            id='entrada'
            title='Entrada:'
            placeholder="Digite uma Entrada"
            value={controller.entrada}
            onChange={({ target }) => {
              setController({
                ...controller,
                entrada: currencyFormat(target.value),
              })
            }}
          />
        </div>
        <div
          style={!(!queryProps.clone && controller.id != '') ? undefined : {
            marginTop: '0.5rem',
            padding: '0.5rem',
            backgroundColor: '#d6d7d8',
          }}
          className="relative grid grid-cols-2 gap-x-2">
          {
            !(!queryProps.clone && controller.id != '')
              ? null
              : <div className="flex p-0.5 bg-white rounded-sm absolute top-1 right-1 text-amber-600">
                <Tooltip>
                  <TooltipTrigger type="button">
                    <Info size={20} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{'Desativado para Edição'}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
          }
          <ParcelaModal
            child={
              (callback) => <div>
                <CustomInput
                  id='valor'
                  title='Valor:'
                  placeholder="Digite o Valor"
                  value={controller.valor}
                  onChange={({ target }) => {
                    setController({
                      ...controller,
                      valor: currencyFormat(target.value),
                    })
                  }}
                  blockSubmit={(block) => setBlockSubmit(block)}
                  onEnter={() => {
                    if (!queryProps.clone && controller.id != '') return;
                    if (controller.valor != '' && controller.numeroParcelas != '') {
                      callback();
                    }
                  }}
                  readOnly={!queryProps.clone && controller.id != ''}
                  backgroundColor={!queryProps.clone && controller.id != '' ? '#eeeff0' : undefined}
                />
              </div>
            }
            onSave={(date) => insertParcela(date, null)}
          />
          <ParcelaModal
            child={
              (callback) => <div className="flex items-end">
                <CustomInput
                  id='numeroParcelas'
                  title='Parcelas:'
                  placeholder="Digite o Nº de Parcelas"
                  value={controller.numeroParcelas}
                  onChange={onChange}
                  type="number"
                  expand={true}
                  blockSubmit={(block) => setBlockSubmit(block)}
                  onEnter={() => {
                    if (!queryProps.clone && controller.id != '') return;
                    if (controller.valor != '' && controller.numeroParcelas != '') {
                      callback();
                    }
                  }}
                  readOnly={!queryProps.clone && controller.id != ''}
                  backgroundColor={!queryProps.clone && controller.id != '' ? '#eeeff0' : undefined}
                />
                <button
                  className={
                    "p-0.5 mx-2 mb-1 rounded-sm border border-gray-500 "
                    + (!queryProps.clone && controller.id ? '' : 'hover:bg-[#ede8f0] cursor-pointer')
                  }
                  type="button"
                  onClick={() => {
                    if (!queryProps.clone && controller.id != '') return;
                    if (controller.valor != '' && controller.numeroParcelas != '') {
                      callback();
                    }
                  }}
                >
                  <Check size={22} />
                </button>
              </div>
            }
            onSave={(date) => insertParcela(date, null)}
          />
        </div>
        {
          controller.listaParcelas.length == 0
            ? null
            : <div>
              <div
                style={{ backgroundColor: !queryProps.clone && controller.id != '' ? '#d6d7d8' : undefined }}
                className="h-2"
              >
              </div>
              <div
                style={{ backgroundColor: !queryProps.clone && controller.id != '' ? '#d6d7d8' : '#fff' }}
                className="px-2 pt-0.5 pb-2">
                {
                  controller.listaParcelas.map((item, index) => {
                    return <div
                      key={index}
                      style={{
                        marginTop: index == 0 ? '0.5rem' : undefined,
                        backgroundColor: index % 2 == 0 ? "#eeeff0" : '#FFF',
                      }}
                      className="flex"
                    >
                      <ParcelaModal
                        child={
                          (callback) => <span
                            className="px-2"
                            onClick={() => {
                              if (!queryProps.clone && controller.id != '') return;
                              let newDate = new Date();

                              const split = item.dataVencimento.split('-');
                              if (split.length == 3) {
                                newDate = new Date(Number.parseInt(split[0]), Number.parseInt(split[1]) - 1, Number.parseInt(split[2]));
                              }

                              callback(newDate);
                            }}
                          >
                            {dateFormatToString(item.dataVencimento, "dd/MM/yyyy")}
                          </span>
                        }
                        onSave={(date) => insertParcela(date, index)}
                      />
                      <p className="pr-2">-</p>
                      <input
                        onChange={({ target }) => changeParcelaValue(target.value, index)}
                        value={item.valor}
                        className="flex-1"
                        readOnly={!queryProps.clone && controller.id != ''}
                      />
                    </div>
                  })
                }
              </div>
            </div>
        }
        <div className="h-2"></div>
        <div className="relative inline-block">
          <Button className={state.loading == 'savingInsert' ? 'text-transparent' : '' + 'hover:cursor-pointer'} type="submit" >
            Enviar
          </Button>
          {
            state.loading == 'savingInsert' ?
              <CircularProgress size={30} color="inherit" className="absolute right-1/2 bottom-1/2 translate-1/2 text-white" />
              : null
          }
        </div>
        {state.loading == 'loadingInsertPage' ? <CircularProgress className="absolute bottom-1/2 right-1/2 translate-1/2" /> : null}
        <div className="h-2"></div>
      </form>
    </div>
  );
}

function ParcelaModal(props: { child: (callback: (date?: Date) => void) => ReactNode, onSave: (date: Date) => void }) {
  const [open, setOpen] = useState(false);

  const [controller, setController] = useState(new Date());

  useEffect(() => {
    if (!open) {
      setController(new Date());
    }
  }, [open]);

  return <Dialog modal={true} open={open} >
    <DialogTrigger asChild>
      {props.child((date) => {
        setOpen(true);
        setController(date ?? new Date());
      })}
    </DialogTrigger>
    <DialogContent className="sm:max-w-[300px]" onInteractOutside={() => setOpen(false)} showCloseButton={false}>
      <Calendar locale={ptBR} mode="single" selected={controller} defaultMonth={controller} onSelect={(value) => {
        if (value != undefined) {
          setController(value);
        }
      }} />
      <DialogFooter>
        <Button onClick={() => setOpen(false)}>Cancelar</Button>
        <Button onClick={() => {
          props.onSave(controller);
          setOpen(false);
        }}>OK</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
}