import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { hfParcelasContratosModel } from "../../models/hf_parcelas_contratos_model";
import { HfContratosState } from "../../state/hf_contratos_state";
import { CustomTable } from "@/shared/components/custom_table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MoreHorizontal } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";
import { dateFormatToString } from "@/shared/functions/date_format";

interface Props {
  id: string,
  listaParcelas: hfParcelasContratosModel[],
}

export function HfParcelasContratosModal(props: Props) {
  const state = HfContratosState();

  const [open, setOpen] = useState(false);
  const [readMoreOnClose, setReadMoreOnClose] = useState(false);

  useEffect(() => {
    if (!open && readMoreOnClose) {
      state.read();
    }
    setReadMoreOnClose(false);
  }, [open]);

  return <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <span onClick={() => setOpen(true)} className="m-1 py-1 px-2 rounded-[8px] hover:bg-gray-200 block cursor-pointer">
        Parcelas
      </span>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[558px]">
      <DialogHeader>
        <DialogTitle>Parcelas</DialogTitle>
      </DialogHeader>
      <CustomTable
        data={props.listaParcelas}
        columns={(item) => {
          const element = item as (hfParcelasContratosModel | null);

          return [
            {
              label: 'Vencimento',
              value: element?.dataVencimento ?? '',
              width: 110,
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
              alignment: 'center',
              textColor: element?.color ?? '',
            },
            {
              label: 'Baixa',
              value: element?.status != '1' ? '-' : element?.dataBaixa ?? '',
              width: 100,
              alignment: 'center',
            },
            {
              label: 'Ações',
              value: element?.status != '1' && <Popover modal={true}>
                <PopoverTrigger>
                  <MoreHorizontal
                    className="flex justify-center items-center w-8 h-8 p-1 rounded-full hover:bg-[#ede8f0]"
                  />
                </PopoverTrigger>
                <PopoverContent className="p-0 w-40 bg-white border-1 border-gray-300 shadow-xl/20 rounded-[8px] relative -top-1 right-5">
                  <ConfirmModal idContrato={props.id} id={element?.id ?? ''} setReadMoreOnClose={() => setReadMoreOnClose(true)} />
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
    </DialogContent>
  </Dialog>
}

function ConfirmModal(props: { idContrato: string, id: string, setReadMoreOnClose: () => void }) {
  const state = HfContratosState();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [controller, setController] = useState(new Date());

  async function insert() {
    if (loading) return;

    setLoading(true);
    const res = await state.writeOff(
      props.idContrato,
      props.id,
      dateFormatToString(controller, "yyyy-MM-dd"),
    );
    setLoading(false);

    setOpen(false);

    if (res) props.setReadMoreOnClose();
  }

  useEffect(() => {
    setController(new Date());
  }, [open]);

  return <Dialog modal={true} open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <span onClick={() => setOpen(true)} className="m-1 py-1 px-2 rounded-[8px] hover:bg-gray-200 block cursor-pointer">
        Dar Baixa
      </span>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[300px]">
      <Calendar locale={ptBR} mode="single" selected={controller} defaultMonth={controller} onSelect={(value) => {
        if (value != undefined) {
          setController(value);
        }
      }} />
      <DialogFooter>
        <DialogClose>
          <Button>Cancelar</Button>
        </DialogClose>
        <Button onClick={insert}>{loading ? 'Carregando' : 'Dar Baixa'}</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
}