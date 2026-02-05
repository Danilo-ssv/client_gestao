import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { InsertClientesModel } from "../models/insert_clientes_model";
import { ClientesState } from "../state/clientes_state";
import { CircularProgress } from "@mui/material";
import { Button } from "@/components/ui/button";
import { CustomSearchSelect } from "@/shared/components/custom_search_select";
import { globalProvider } from "@/shared/provider/global_provider";
import { showErrorMessage } from "@/shared/functions/show_error_message";
import { CustomInput } from "@/shared/components/custom_input";
import { CustomSelect } from "@/shared/components/custom_select";

interface QueryProps {
  id: string;
  clone: boolean;
}

export function InsertClientesPage() {
  const [searchParams] = useSearchParams();

  const queryProps: QueryProps = {
    id: searchParams.get('id') ?? '',
    clone: searchParams.get('clone') == 'true',
  };

  const state = ClientesState();

  let [blockSubmit, setBlockSubmit] = useState(false);
  const [controller, setController] = useState<InsertClientesModel>({
    id: '',
    nome: '',
    estadoCivil: '1',
    genero: '1',
    entidade: '1',
    aniversario: '',
    doc: '',
    rg: '',
    celular: '',
    email: '',
    cep: '',
    endereco: '',
    numero: '',
    idMunicipios: '0',
    nomeMunicipios: 'Selecione um Município',
    obs: '',
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

    if (controller.nome == '') {
      showErrorMessage({ type: "Common", message: 'Nome Completo é Obrigatório!' });
      return;
    }

    state.insert({
      id: queryProps.clone ? '' : controller.id,
      nome: controller.nome,
      estadoCivil: controller.estadoCivil,
      genero: controller.genero,
      entidade: controller.entidade,
      aniversario: controller.aniversario,
      doc: controller.doc,
      rg: controller.rg,
      celular: controller.celular,
      email: controller.email,
      cep: controller.cep,
      endereco: controller.endereco,
      numero: controller.numero,
      idMunicipios: controller.idMunicipios,
      nomeMunicipios: controller.nomeMunicipios,
      obs: controller.obs,
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
      <h1 className="text-2xl font-bold">Inserir Cliente</h1>
      <div className="h-2"></div>
      <form onSubmit={insert} action="">
        <div>
          <CustomInput
            id='nome'
            title='Nome Completo:'
            placeholder="Digite o Nome Completo"
            value={controller.nome}
            onChange={onChange}
            maxLength={150}
          />
        </div>
        <div className="grid grid-cols-2 gap-x-2">
          <CustomSelect
            id='estadoCivil'
            title='Estado Civil:'
            value={controller.estadoCivil}
            options={[
              <option value="1">Solteiro(a)</option>,
              <option value="2">Casado(a)</option>,
              <option value="3">Separado(a)</option>,
              <option value="4">Divorciado(a)</option>,
              <option value="5">Viúvo(a)</option>,
            ]}
            onChange={onChange}
          />
          <CustomSelect
            id='genero'
            title='Gênero:'
            value={controller.genero}
            options={[
              <option value="1">Masculino</option>,
              <option value="2">Feminino</option>,
              <option value="3">Não Declarar</option>,
            ]}
            onChange={onChange}
          />
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
            id='aniversario'
            title='Aniversário:'
            placeholder="Digite o Aniversário"
            value={controller.aniversario}
            onChange={onChange}
            type="date"
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
            id='rg'
            title='RG:'
            placeholder="Digite o RG"
            value={controller.rg}
            onChange={onChange}
            maxLength={20}
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
        <h1 className="text-1xl font-semibold">Detalhes de Endereço</h1>
        <div className="grid grid-cols-2 gap-x-2">
          <CustomInput
            id='cep'
            title='CEP:'
            placeholder="Digite o CEP"
            value={controller.cep}
            onChange={onChange}
            mask={['99.999-999']}
          />
          <CustomInput
            id='endereco'
            title='Endereço:'
            placeholder="Digite o Endereço"
            value={controller.endereco}
            onChange={onChange}
            maxLength={150}
          />
          <CustomInput
            id='numero'
            title='Número:'
            placeholder="Digite o Número"
            value={controller.numero}
            onChange={onChange}
            maxLength={20}
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
                // await new Promise(resolve => setTimeout(resolve, 2000));
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
        <CustomInput
          id='obs'
          title='Observação:'
          placeholder="Digite a Observação"
          value={controller.obs}
          onChange={onChange}
          maxLength={200}
        />
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
