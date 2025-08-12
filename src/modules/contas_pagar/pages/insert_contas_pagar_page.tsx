import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { Button } from "@/components/ui/button";
import { CustomSearchSelect } from "@/shared/components/custom_search_select";
import { globalProvider } from "@/shared/provider/global_provider";
import { showErrorMessage } from "@/shared/functions/show_error_message";
import { CustomInput } from "@/shared/components/custom_input";
import { ContasPagarState } from "../state/contas_pagar_state";
import { InsertContasPagarModel } from "../models/insert_contas_pagar_model";
import { currencyFormat } from "@/shared/functions/currency_format";
import { dateFormatToString } from "@/shared/functions/date_format";

interface QueryProps {
  id: string;
  clone: boolean;
}

export function InsertContasPagarPage() {
  const [searchParams] = useSearchParams();

  const queryProps: QueryProps = {
    id: searchParams.get('id') ?? '',
    clone: searchParams.get('clone') == 'true',
  };

  const state = ContasPagarState();

  let [blockSubmit, setBlockSubmit] = useState(false);
  const [controller, setController] = useState<InsertContasPagarModel>({
    id: '',
    idFornecedores: '0',
    nomeFornecedores: 'Selecione um Fornecedor',
    dataEmissao: '',
    dataVencimento: '',
    idDespesas: '0',
    nomeDespesas: 'Selecione uma Despesa',
    descricao: '',
    valor: '',
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

    if (controller.valor == '') {
      showErrorMessage({ type: "Common", message: 'Valor é Obrigatório!' });
      return;
    }

    state.insert({
      id: queryProps.clone ? '' : controller.id,
      idFornecedores: controller.idFornecedores,
      nomeFornecedores: controller.nomeFornecedores,
      dataEmissao: controller.dataEmissao,
      dataVencimento: controller.dataVencimento,
      idDespesas: controller.idDespesas,
      nomeDespesas: controller.nomeDespesas,
      descricao: controller.descricao,
      valor: (controller.valor as any).replaceAll('.', '').replaceAll(',', '.'),
    });
  }

  useEffect(() => {
    const now = new Date();

    setController({
      ...controller,
      dataEmissao: dateFormatToString(now, "yyyy-MM-dd"),
      dataVencimento: dateFormatToString(now, "yyyy-MM-dd"),
    });

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
      <h1 className="text-2xl font-bold">Inserir Conta à Pagar</h1>
      <div className="h-2"></div>
      <form onSubmit={insert} action="">
        <div className="grid grid-cols-2 gap-x-2">
          <div>
            <label htmlFor="idFornecedores">Fornecedor:</label>
            <CustomSearchSelect
              id={controller.idFornecedores}
              title={controller.nomeFornecedores}
              idForLabel="idFornecedores"
              placeholder={'Pesquise um Fornecedor...'}
              selectItem={{ id: '0', title: 'Selecione um Fornecedor', inLineSubTitle: null, subTitle: null }}
              getItems={async (value) => {
                const res = await globalProvider.readFornecedores(value) ?? [];
                return res.map(e => ({ id: e.id, title: e.nome, inLineSubTitle: null, subTitle: null }));
              }}
              onSelect={(id, title) => {
                setController({
                  ...controller,
                  idFornecedores: id,
                  nomeFornecedores: title,
                });
              }}
              blockSubmit={(block) => setBlockSubmit(block)}
            />
          </div>
          <div>
            <label htmlFor="idDespesas">Despesa:</label>
            <CustomSearchSelect
              id={controller.idDespesas}
              title={controller.nomeDespesas}
              idForLabel="idDespesas"
              placeholder={'Pesquise uma Despesa...'}
              selectItem={{ id: '0', title: 'Selecione uma Despesa', inLineSubTitle: null, subTitle: null }}
              getItems={async (value) => {
                const res = await globalProvider.readDespesas(value) ?? [];
                return res.map(e => ({ id: e.id, title: e.nome, inLineSubTitle: null, subTitle: null }));
              }}
              onSelect={(id, title) => {
                setController({
                  ...controller,
                  idDespesas: id,
                  nomeDespesas: title,
                });
              }}
              blockSubmit={(block) => setBlockSubmit(block)}
            />
          </div>
        </div>
        <CustomInput
          id='descricao'
          title='Descrição:'
          placeholder="Digite uma Descrição"
          value={controller.descricao}
          onChange={onChange}
        />
        <div className="grid grid-cols-2 gap-x-2">
          <CustomInput
            id='dataEmissao'
            title='Data de Emissão:'
            placeholder="Digite a data de Emissão"
            value={controller.dataEmissao}
            onChange={onChange}
            type="date"
          />
          <CustomInput
            id='dataVencimento'
            title='Data de Vencimento:'
            placeholder="Digite a data de Vencimento"
            value={controller.dataVencimento}
            onChange={onChange}
            type="date"
          />
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
          />
        </div>
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
      </form>
    </div>
  );
}
