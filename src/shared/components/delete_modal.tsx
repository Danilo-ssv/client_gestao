import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

export function DeleteModal({ onSave }: { onSave: () => Promise<boolean> }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <span onClick={() => setOpen(true)} className="m-1 py-1 px-2 rounded-[8px] hover:bg-gray-200 block text-red-600 cursor-pointer">
        Excluir
      </span>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Exclusão</DialogTitle>
        <DialogDescription>
          Deseja realmente excluir este Item ?
        </DialogDescription>
      </DialogHeader>
      {/* <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="name" className="text-right">
                                  Name
                                </label>
                                <Input id="name" value="Pedro Duarte" className="col-span-3" />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="username" className="text-right">
                                  Username
                                </label>
                                <Input id="username" value="@peduarte" className="col-span-3" />
                              </div>
                            </div> */}
      <DialogFooter>
        <DialogClose>
          <Button>Cancelar</Button>
        </DialogClose>
        <Button onClick={async () => {
          if (loading) return;

          setLoading(true);
          const res = await onSave();
          setLoading(false);

          if (!res) return;

          setOpen(false);
        }}>{loading ? 'Carregando' : 'Excluir'}</Button>
        {/* <CustomButton title="TESTE" /> */}
      </DialogFooter>
    </DialogContent>
  </Dialog>
}