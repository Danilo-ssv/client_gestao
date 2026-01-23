import { useSearchParams } from "react-router-dom";
import { ProdutosState } from "../state/produtos_state";
import { useEffect, useState } from "react";
import { InsertProdutosModel } from "../models/insert_produtos_model";
import { showErrorMessage } from "@/shared/functions/show_error_message";
import { CustomInput } from "@/shared/components/custom_input";
import { CustomSelect } from "@/shared/components/custom_select";
import { CircularProgress } from "@mui/material";
import { Button } from "@/components/ui/button";
import { CustomSearchSelect } from "@/shared/components/custom_search_select";
import { globalProvider } from "@/shared/provider/global_provider";
import { currencyFormat } from "@/shared/functions/currency_format";

interface QueryProps {
  id: string;
  clone: boolean;
}

export function InsertProdutosPage() {
  const [searchParams] = useSearchParams();

  const queryProps: QueryProps = {
    id: searchParams.get('id') ?? '',
    clone: searchParams.get('clone') == 'true',
  };

  const state = ProdutosState();

  const [blockSubmit, setBlockSubmit] = useState(false);
  const [controller, setController] = useState<InsertProdutosModel>({
    id: '',
    codigoBarra: '',
    codigo: '',
    nome: '',
    descricao: '',
    preco: '',
    custo: '',
    estoque: '',
    idMarcasProdutos: '0',
    nomeMarcasProdutos: 'Selecione uma Marca de Produtos',
    idCategoriasProdutos: '0',
    nomeCategoriasProdutos: 'Selecione uma Categoria de Produtos',
    alertaEstoqueMinimo: '',
    genero: '1',
    image: { imageOrigin: 'none', urlName: null, localFile: null }
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
      showErrorMessage({ type: "Common", message: 'Nome do Produto é Obrigatório!' });
      return;
    }

    state.insert({
      id: queryProps.clone ? '' : controller.id,
      codigoBarra: controller.codigoBarra,
      codigo: controller.codigo,
      nome: controller.nome,
      descricao: controller.descricao,
      preco: (controller.preco as any).replaceAll('.', '').replaceAll(',', '.'),
      custo: (controller.custo as any).replaceAll('.', '').replaceAll(',', '.'),
      estoque: controller.estoque,
      idMarcasProdutos: controller.idMarcasProdutos,
      nomeMarcasProdutos: controller.nomeMarcasProdutos,
      idCategoriasProdutos: controller.idCategoriasProdutos,
      nomeCategoriasProdutos: controller.nomeCategoriasProdutos,
      alertaEstoqueMinimo: controller.alertaEstoqueMinimo,
      genero: controller.genero,
      image: controller.image,
    });
  }

  useEffect(() => {
    if (queryProps.id != '') {
      state.readById(queryProps.id).then((value) => {
        if (value != null) {
          setController(value);
          console.log(value.image);
        }
      });
    }
  }, []);

  return (
    <div className="px-1 pt-1">
      <h1 className="text-2xl font-bold">Inserir Produtos</h1>
      <div className="h-2"></div>
      <form onSubmit={insert} action="">
        <div className="grid grid-cols-2 gap-x-2">
          <CustomInput
            id='codigoBarra'
            title='Código de Barra:'
            placeholder="Digite o Código de Barra"
            value={controller.codigoBarra}
            onChange={onChange}
          />
          <CustomInput
            id='codigo'
            title='Código:'
            placeholder="Digite o Código"
            value={controller.codigo}
            onChange={onChange}
          />
        </div>
        <div>
          <CustomInput
            id='nome'
            title='Nome do Produto:'
            placeholder="Digite o Nome do Produto"
            value={controller.nome}
            onChange={onChange}
          />
        </div>
        <div className="grid grid-cols-2 gap-x-2">
          <CustomInput
            id='descricao'
            title='Descrição:'
            placeholder="Digite uma Descrição"
            value={controller.descricao}
            onChange={onChange}
          />
          <CustomInput
            id='preco'
            title='Preço:'
            placeholder="Digite o Preço"
            value={controller.preco}
            onChange={({ target }) => {
              setController({
                ...controller,
                preco: currencyFormat(target.value),
              })
            }}
          />
          <CustomInput
            id='estoque'
            title='Estoque:'
            placeholder="Digite o Estoque"
            value={controller.estoque}
            onChange={onChange}
            type="number"
          />
          <CustomInput
            id='custo'
            title='Custo:'
            placeholder="Digite o Custo"
            value={controller.custo}
            onChange={({ target }) => {
              setController({
                ...controller,
                custo: currencyFormat(target.value),
              });
            }}
          />
          <div>
            <label htmlFor="idMarcasProdutos">Marcas de Produtos:</label>
            <CustomSearchSelect
              id={controller.idMarcasProdutos}
              title={controller.nomeMarcasProdutos}
              idForLabel="idMarcasProdutos"
              placeholder={'Pesquise um Marca de Produtos...'}
              selectItem={{ id: '0', title: 'Selecione uma Marca de Produtos', inLineSubTitle: null, subTitle: null }}
              getItems={async (value) => {
                const res = await globalProvider.readMarcasProdutos(value) ?? [];
                return res.map(e => ({ id: e.id, title: e.nome, inLineSubTitle: null, subTitle: null }));
              }}
              onSelect={(id, title) => {
                setController({
                  ...controller,
                  idMarcasProdutos: id,
                  nomeMarcasProdutos: title,
                });
              }}
              blockSubmit={(block) => setBlockSubmit(block)}
            />
          </div>
          <div>
            <label htmlFor="idCategoriasProdutos">Categorias de Produtos:</label>
            <CustomSearchSelect
              id={controller.idCategoriasProdutos}
              title={controller.nomeCategoriasProdutos}
              idForLabel="idCategoriasProdutos"
              placeholder={'Pesquise uma Categoria de Produtos...'}
              selectItem={{ id: '0', title: 'Selecione uma Categoria de Produtos', inLineSubTitle: null, subTitle: null }}
              getItems={async (value) => {
                const res = await globalProvider.readCategoriasProdutos(value) ?? [];
                return res.map(e => ({ id: e.id, title: e.nome, inLineSubTitle: null, subTitle: null }));
              }}
              onSelect={(id, title) => {
                setController({
                  ...controller,
                  idCategoriasProdutos: id,
                  nomeCategoriasProdutos: title,
                });
              }}
              blockSubmit={(block) => setBlockSubmit(block)}
            />
          </div>
          <CustomInput
            id='alertaEstoqueMinimo'
            title='Alerta Estoque Mínimo:'
            placeholder="Digite o Estoque Mínimo"
            value={controller.alertaEstoqueMinimo}
            onChange={onChange}
            type="number"
          />
          <CustomSelect
            id='genero'
            title='Gênero:'
            value={controller.genero}
            options={[
              <option value="1">Masculino</option>,
              <option value="2">Feminino</option>,
            ]}
            onChange={onChange}
          />
        </div>
        <div>
          {
            controller.image.imageOrigin != "none" && (
              <img
                src={controller.image.localFile?.path ?? controller.image.urlName!}
                style={{ maxWidth: '300px', maxHeight: '300px', border: '1px solid gray' }}
              />
            )
          }
          <input
            type="file"
            accept="image/*"
            onChange={({ target }) => {
              const file = target.files![0];

              if (!file || file.type.substring(0, 5) !== "image") {
                setController({
                  ...controller,
                  image: { imageOrigin: "none", urlName: null, localFile: null },
                });
                return;
              }

              const reader = new FileReader();

              reader.readAsDataURL(file);

              reader.onloadend = () => {
                if (typeof reader.result == 'string') {
                  setController({
                    ...controller,
                    image: { imageOrigin: "local", urlName: null, localFile: { path: reader.result, file } },
                  });
                }
              };
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
