import { ReactNode } from "react"

interface Props {
  id: string,
  title?: string | undefined,
  value?: string | number | readonly string[] | undefined
  options: ReactNode[]
  // options: (React.JSX.IntrinsicElements['option'])[]
  onChange?: React.ChangeEventHandler<HTMLSelectElement> | undefined
}

export function CustomSelect(props: Props) {
  return (
    <div>
      {
        props.title == undefined
          ? null
          : <label htmlFor={props.id}>{props.title}</label>
      }
      <select id={props.id} value={props.value} onChange={props.onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        {...props.options}
        {/* <option value="1">Solteiro(a)</option>
        <option value="2">Casado(a)</option>
        <option value="3">Separado(a)</option>
        <option value="4">Divorciado(a)</option>
        <option value="5">Viúvo(a)</option> */}
        <div></div>
      </select>
    </div>
  )
}