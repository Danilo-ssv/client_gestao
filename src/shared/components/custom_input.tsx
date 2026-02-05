import * as React from "react"
import { cn } from "@/lib/utils"
import { useHookFormMask, withMask } from "use-mask-input"
import { useForm } from "react-hook-form";

interface Props {
  id: string,
  title?: string | undefined,
  placeholder?: string | undefined,
  value?: string | number | readonly string[] | undefined,
  className?: string | undefined,
  maxLength?: number | undefined,
  backgroundColor?: string | undefined,
  type?: React.HTMLInputTypeAttribute | undefined,
  required?: boolean | undefined,
  readOnly?: boolean | undefined,
  autoFocus?: boolean | undefined,
  ref?: React.Ref<HTMLInputElement> | undefined,
  expand?: boolean | undefined,
  suffixIcon?: React.ReactNode | undefined,
  mask?: string[] | undefined,
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined,
  blockSubmit?: ((block: boolean) => void) | undefined,
  onEnter?: (() => void) | undefined,
}

export function CustomInput(props: Props) {
  const { register } = useForm();
  const registerWithMask = useHookFormMask(register);

  return (
    <div style={{
      display: props.expand ? 'flex' : undefined,
      flexDirection: props.expand ? 'column' : undefined,
      flex: props.expand ? '1' : undefined,
      position: props.suffixIcon != undefined ? 'relative' : undefined,
    }}>
      {
        props.title == undefined
          ? null
          : <label htmlFor={props.id}>{props.title}</label>
      }
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        value={(props.mask?.length ?? 0) > 1 ? undefined : props.value}
        onClick={undefined}
        onChange={props.onChange}
        className={cn(
          'block w-full p-2 text-gray-900 border border-gray-300 rounded-sm bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
          props.className
        )}
        maxLength={props.maxLength}
        style={{ backgroundColor: props.backgroundColor }}
        required={props.required}
        readOnly={props.readOnly}
        autoFocus={props.autoFocus}
        onFocus={() => {
          if (props.blockSubmit != undefined) {
            props.blockSubmit(true)
          }
        }}
        onBlur={() => {
          if (props.blockSubmit != undefined) {
            props.blockSubmit(false)
          }
        }}
        onKeyDown={({ key }) => {
          if (props.onEnter != undefined && key == 'Enter') {
            props.onEnter();
          }
        }}
        ref={props.mask?.length == 1 ? withMask(props.mask[0]) : undefined}
        {...((props.mask?.length ?? 0) < 2 ? undefined : registerWithMask("phone", props.mask!, {
          onChange: props.onChange,
          value: props.value,
        }))}
      />
      {props.suffixIcon != undefined && props.suffixIcon}
    </div>
  )
}

// import * as React from "react"

// import { cn } from "@/lib/utils"

// export function CustomInput({ className, type, ...props }: React.ComponentProps<"input">) {
//   return (
//     <input
//       type={type}
//       data-slot="input"
//       className={cn(
//         // 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
//         'block w-full p-2 text-gray-900 border border-gray-300 rounded-sm bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
//         // "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
//         // "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
//         // "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
//         className
//       )}
//       {...props}
//     />
//   )
// }
