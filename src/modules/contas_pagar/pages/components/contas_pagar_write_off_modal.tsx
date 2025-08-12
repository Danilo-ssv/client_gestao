import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { ContasPagarState } from "../../state/contas_pagar_state";
import { CustomInput } from "@/shared/components/custom_input";
import { currencyFormat } from "@/shared/functions/currency_format";
import { dateFormatToString } from "@/shared/functions/date_format";

interface Props {
  id: string,
}

export function ContasPagarWriteOffModal(props: Props) {
  const state = ContasPagarState();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [controller, setController] = useState({
    dataBaixa: '',
    desconto: '',
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

    setLoading(true);
    const res = await state.writeOff(props.id, controller.dataBaixa, controller.desconto);
    setLoading(false);

    if (!res) return;

    setOpen(false);
  }

  useEffect(() => {
    setController({
      dataBaixa: dateFormatToString(new Date(), "yyyy-MM-dd"),
      desconto: '',
    });
  }, [open]);

  return <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <span onClick={() => setOpen(true)} className="m-1 py-1 px-2 rounded-[8px] hover:bg-gray-200 block cursor-pointer">
        Dar Baixa
      </span>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Dar Baixa</DialogTitle>
      </DialogHeader>
      <form onSubmit={insert}>
        <div className="grid grid-cols-2 gap-x-2">
          <CustomInput
            id='dataBaixa'
            title='Data de Baixa:'
            placeholder="Digite uma Data de Baixa"
            value={controller.dataBaixa}
            onChange={onChange}
            type="date"
          />
          <CustomInput
            id='desconto'
            title='Desconto:'
            placeholder="Digite um Desconto"
            value={controller.desconto}
            onChange={({ target }) => {
              setController({
                ...controller,
                desconto: currencyFormat(target.value),
              });
            }}
          />
        </div>
        <div className="h-2"></div>
        <DialogFooter>
          <DialogClose>
            <Button type="button">Cancelar</Button>
          </DialogClose>
          <Button type="submit">{loading ? 'Carregando' : 'Dar Baixa'}</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
}