import { cn } from "@/lib/utils"

interface Props {
  title: string,
  className?: string | undefined,
  type?: "submit" | "reset" | "button" | undefined,
}

export function CustomButton(props: Props) {
  return <button
    className={cn(
      "h-9 px-4 py-2 has-[>svg]:px-3 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
      props.className,
    )}
    type={props.type}
  >
    {props.title}
  </button>
}