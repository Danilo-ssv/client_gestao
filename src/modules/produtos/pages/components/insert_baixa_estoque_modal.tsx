import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { ProdutosState } from "../../state/produtos_state";
import { CustomInput } from "@/shared/components/custom_input";
import { showErrorMessage } from "@/shared/functions/show_error_message";
import { dateFormatToString } from "@/shared/functions/date_format";

interface Props {
  id: string,
}

export function InsertBaixaEstoqueModal(props: Props) {
  const state = ProdutosState();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [controller, setController] = useState({
    estoque: '',
    dataBaixa: '',
  });

  function onChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
    setController({
      ...controller,
      [event.target.id]: event.target.value,
    });
  }

  async function insert(event: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();

    if (loading) return;

    if (props.id == '') {
      showErrorMessage({ type: "Common", message: 'Produto é Obrigatório!' });
      return;
    }

    if (controller.estoque == '') {
      showErrorMessage({ type: "Common", message: 'Estoque é Obrigatório!' });
      return;
    }

    if (controller.dataBaixa == '') {
      showErrorMessage({ type: "Common", message: 'Data da baixa é Obrigatório!' });
      return;
    }

    setLoading(true);
    const res = await state.insertBaixaEstoque(props.id, Number.parseInt(controller.estoque), controller.dataBaixa);
    setLoading(false);

    if (!res) return;

    setOpen(false);
  }

  useEffect(() => {
    setController({
      estoque: '',
      dataBaixa: dateFormatToString(new Date(), "yyyy-MM-dd"),
    });
  }, [open]);

  return <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <span onClick={() => setOpen(true)} className="m-1 py-1 px-2 rounded-[8px] hover:bg-gray-200 block cursor-pointer">
        Dar baixa
      </span>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Dar baixa</DialogTitle>
      </DialogHeader>
      <form onSubmit={insert}>
        <div className="grid grid-cols-2 gap-x-2">
          <CustomInput
            id='estoque'
            title='Estoque:'
            placeholder="Digite o Estoque"
            value={controller.estoque}
            onChange={onChange}
            type="number"
          />
          <CustomInput
            id='dataBaixa'
            title='Data de Baixa:'
            placeholder="Digite a data de Baixa"
            value={controller.dataBaixa}
            onChange={onChange}
            type="date"
          />
        </div>
        <div className="h-2"></div>
        <DialogFooter>
          <DialogClose>
            <Button type="button">Cancelar</Button>
          </DialogClose>
          <Button type="submit">{loading ? 'Carregando' : 'Salvar'}</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
}