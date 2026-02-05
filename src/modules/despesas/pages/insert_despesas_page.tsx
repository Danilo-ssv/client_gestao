import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { Button } from "@/components/ui/button";
import { showErrorMessage } from "@/shared/functions/show_error_message";
import { CustomInput } from "@/shared/components/custom_input";
import { DespesasState } from "../state/despesas_state";
import { InsertDespesasModel } from "../models/insert_despesas_model";

interface QueryProps {
  id: string;
  clone: boolean;
}

export function InsertDespesasPage() {
  const [searchParams] = useSearchParams();

  const queryProps: QueryProps = {
    id: searchParams.get('id') ?? '',
    clone: searchParams.get('clone') == 'true',
  };

  const state = DespesasState();

  const [controller, setController] = useState<InsertDespesasModel>({
    id: '',
    nome: '',
  });

  function onChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
    setController({
      ...controller,
      [event.target.id]: event.target.value,
    });
  }

  function insert(event: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();

    if (state.loading == 'loadingInsertPage' || state.loading == 'savingInsert') return;

    if (controller.nome == '') {
      showErrorMessage({ type: "Common", message: 'Nome é Obrigatório!' });
      return;
    }

    state.insert({
      id: queryProps.clone ? '' : controller.id,
      nome: controller.nome,
    });
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
      <h1 className="text-2xl font-bold">Inserir Despesa</h1>
      <div className="h-2"></div>
      <form onSubmit={insert} action="">
        <div>
          <CustomInput
            id='nome'
            title='Nome:'
            placeholder="Digite o Nome"
            value={controller.nome}
            onChange={onChange}
            maxLength={100}
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
