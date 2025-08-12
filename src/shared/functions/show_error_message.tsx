import { toast } from "sonner";
import { ErrorModel } from "./error_return";
import { BanIcon, TriangleAlertIcon } from "lucide-react";

export function showErrorMessage(error: ErrorModel) {
  toast(<span className="ml-1 text-sm">{error.type == "NotAllowed" ? "Sem Permissão!" : "Ocorreu um Erro!"}</span>, {
    icon: error.type == "NotAllowed"
      ? <BanIcon color="#ffc107" className="mr-2" /> // ShieldBanIcon
      : <TriangleAlertIcon color="#f44336" className="" />,
    description: <span className="ml-1.5 text-gray-500">{error.message}</span>,
    style: { height: "3.5rem" },
    action: {
      label: "Fechar",
      onClick: () => { },
    },
  });

}