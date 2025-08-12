import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { ContasPagarState } from "../../state/contas_pagar_state";
import { CustomInput } from "@/shared/components/custom_input";
import { CustomSelect } from "@/shared/components/custom_select";

interface Props {
  id: string,
}

export function ContasPagarParcellingModal(props: Props) {
  const state = ContasPagarState();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [controller, setController] = useState({
    parcelas: '',
    frequencia: '',
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
    const res = await state.parcelling(
      props.id,
      Number.parseInt(controller.parcelas),
      Number.parseInt(controller.frequencia),
    );
    setLoading(false);

    if (!res) return;

    setOpen(false);
  }

  useEffect(() => {
    setController({
      parcelas: '',
      frequencia: '30',
    });
  }, [open]);

  return <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <span onClick={() => setOpen(true)} className="m-1 py-1 px-2 rounded-[8px] hover:bg-gray-200 block cursor-pointer">
        Parcelar
      </span>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Parcelar</DialogTitle>
      </DialogHeader>
      <form onSubmit={insert}>
        <div className="grid grid-cols-2 gap-x-2">
          <CustomInput
            id='parcelas'
            title='Qt. Parcelas:'
            placeholder="Digite alguma Parcela"
            value={controller.parcelas}
            onChange={onChange}
            type="number"
          />
          <CustomSelect
            id='frequencia'
            title='Frequência das Parcelas:'
            value={controller.frequencia}
            options={[
              <option value="1">Diária</option>,
              <option value="7">Semanal</option>,
              <option value="30">Mensal</option>,
              <option value="45">45 Dias</option>,
              <option value="90">Trimestral</option>,
              <option value="180">Semestral</option>,
              <option value="365">Anual</option>,
            ]}
            onChange={onChange}
          />
        </div>
        <div className="h-2"></div>
        <DialogFooter>
          <DialogClose>
            <Button type="button">Cancelar</Button>
          </DialogClose>
          <Button type="submit">{loading ? 'Carregando' : 'Parcelar'}</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
}