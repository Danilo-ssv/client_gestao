import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { Button } from "@/components/ui/button";
import { showErrorMessage } from "@/shared/functions/show_error_message";
import { CustomInput } from "@/shared/components/custom_input";
import { CustomSelect } from "@/shared/components/custom_select";
import { FornecedoresState } from "../state/fornecedores_state";
import { InsertFornecedoresModel } from "../models/insert_fornecedores_model";

interface QueryProps {
  id: string;
  clone: boolean;
}

export function InsertFornecedoresPage() {
  const [searchParams] = useSearchParams();

  const queryProps: QueryProps = {
    id: searchParams.get('id') ?? '',
    clone: searchParams.get('clone') == 'true',
  };

  const state = FornecedoresState();

  const [controller, setController] = useState<InsertFornecedoresModel>({
    id: '',
    nome: '',
    entidade: '1',
    doc: '',
    celular: '',
    email: '',
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
      showErrorMessage({ type: "Common", message: 'Nome do Fornecedor é Obrigatório!' });
      return;
    }

    state.insert({
      id: queryProps.clone ? '' : controller.id,
      nome: controller.nome,
      entidade: controller.entidade,
      doc: controller.doc,
      celular: controller.celular,
      email: controller.email,
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
      <h1 className="text-2xl font-bold">Inserir Fornecedor</h1>
      <div className="h-2"></div>
      <form onSubmit={insert} action="">
        <div>
          <CustomInput
            id='nome'
            title='Nome do Fornecedor:'
            placeholder="Digite o Nome do Fornecedor"
            value={controller.nome}
            onChange={onChange}
            maxLength={150}
          />
        </div>
        <div className="grid grid-cols-2 gap-x-2">
          <CustomSelect
            id='entidade'
            title='Entidade:'
            value={controller.entidade}
            options={[
              <option value="1">Pessoa Física</option>,
              <option value="2">Pessoa Jurídica</option>,
            ]}
            onChange={onChange}
          />
          <CustomInput
            id='doc'
            title='CPF/CNPJ:'
            placeholder="Digite o CPF/CNPJ"
            value={controller.doc}
            onChange={onChange}
            mask={['999.999.999-99', '99.999.999/9999-99']}
          />
          <CustomInput
            id='celular'
            title='Celular:'
            placeholder="Digite o Celular"
            value={controller.celular}
            onChange={onChange}
            mask={['(99) 99999-9999']}
          />
          <CustomInput
            id='email'
            title='E-mail:'
            placeholder="Digite o E-mail"
            value={controller.email}
            onChange={onChange}
            maxLength={150}
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
