import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SearchIcon, XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CircularProgress } from "@mui/material";

export interface SearchSelectItems {
  id: string,
  title: string,
  inLineSubTitle: string | null,
  subTitle: string | null,
}

interface Props {
  id: string,
  title: string,
  idForLabel: string,
  placeholder: string | null,
  selectItem: SearchSelectItems | null,
  getItems: (value: string) => Promise<SearchSelectItems[]>,
  onSelect: (id: string, title: string) => void,
  blockSubmit: (block: boolean) => void,
}

export function CustomSearchSelect(props: Props) {
  const ref = useRef(null);
  const [width, setWidth] = useState(500)

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [items, setItems] = useState<SearchSelectItems[]>([])
  const [selectItem, setSelectItem] = useState('');
  const refs = useRef([]);

  const [value, setValue] = useState('');

  async function getItems(value: string) {
    if (loading) return;

    setLoading(true);

    const res = await props.getItems(value);
    setItems(res);

    setLoading(false);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (items.length == 0) return;

    if (event.key === "Enter") {

      if (value == '' && props.selectItem != null && selectItem == '0') {
        props.onSelect(props.selectItem.id, props.selectItem.title);
        setOpen(false);
        return;
      }

      const index = items.findIndex((e) => e.id == selectItem);

      if (index != -1) {
        props.onSelect(items[index].id, items[index].title);
        setOpen(false);
      }

      return;
    }

    const index = items.findIndex((e) => e.id == selectItem);

    if (event.key === 'ArrowUp') {
      if (index == -1) return scroolToItem(items.length - 1);

      if (index - 1 > -1) return scroolToItem(index - 1);

      if (value == '' && props.selectItem != null) return scroolToItem(-1);

      scroolToItem(items.length - 1);
    }

    if (event.key === 'ArrowDown') {
      if (index == -1) return scroolToItem(0);

      if (index + 1 < items.length) return scroolToItem(index + 1);

      if (value == '' && props.selectItem != null) return scroolToItem(-1);

      scroolToItem(0);
    }
  }

  function scroolToItem(index: number) {
    if (index == -1) {
      setSelectItem('0');
      (refs.current[0] as any)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      setSelectItem(items[index].id);
      (refs.current[index] as any)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  useEffect(() => {
    if (open) {
      props.blockSubmit(true);
      getItems(props.id == '0' ? '' : props.title);
      setValue(props.id == '0' ? '' : props.title);
      setSelectItem(props.id);

      if (ref.current) {
        setWidth((ref.current as any).getBoundingClientRect().width);
      }
    } else {
      props.blockSubmit(false);
      setItems([]);
    }
  }, [open]);

  return <Popover open={open} onOpenChange={setOpen}>
    <PopoverTrigger asChild>
      <input
        ref={ref}
        id={props.idForLabel}
        value={props.title}
        className='text-start block w-full p-2 text-gray-900 border border-gray-300 rounded-sm bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      />
    </PopoverTrigger>
    <PopoverContent
      style={{ width }}
      className="p-0 w-40 bg-white border-1 border-gray-300 shadow-xl/20 rounded-[8px] relative -top-1"
    // className="bg-white border-1 border-gray-300 shadow-xl/20 rounded-[8px] relative right-5 translate-x-5" MODELO ANTIGO
    >
      <div className="flex items-center gap-2 px-2">
        <SearchIcon className="size-4 shrink-0 opacity-50" />
        <input
          value={value}
          className="placeholder:text-muted-foreground flex h-9 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
          placeholder={props.placeholder ?? undefined}
          onChange={(event) => {
            setValue(event.target.value);
            getItems(event.target.value);
          }}
          onKeyDown={onKeyDown}
          autoFocus
        />
        <XIcon className="size-4 shrink-0 opacity-50 cursor-pointer" onClick={() => setOpen(false)} />
      </div>
      <hr />
      <div className="min-h-[100px] max-h-[300px] overflow-y-auto relative">
        {
          value != '' || props.selectItem == null
            ? null
            : <div
              key={props.selectItem!.id}
              onClick={() => {
                props.onSelect(props.selectItem!.id, props.selectItem!.title);
                setOpen(false);
              }}
              style={{ backgroundColor: selectItem == props.selectItem!.id ? '#f5f5f5' : undefined }}
              className="hover:bg-[#f5f5f5] hover:text-accent-foreground flex flex-col cursor-default gap-1 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none"
            >
              {props.selectItem!.title + (props.selectItem!.inLineSubTitle ?? '')}
              {props.selectItem!.subTitle != null ? <span className="text-sm">{props.selectItem!.subTitle}</span> : null}
            </div>
        }
        {
          items.map((item, index) => (
            <div
              key={item.id}
              ref={(e) => ((refs.current as any[])[index] = e) as any}
              onClick={() => {
                props.onSelect(item.id, item.title);
                setOpen(false);
              }}
              style={{ backgroundColor: selectItem == item.id ? '#f5f5f5' : undefined }}
              className="hover:bg-[#f5f5f5] hover:text-accent-foreground flex flex-col cursor-default gap-1 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none"
            >
              {item.title + (item.inLineSubTitle ?? '')}
              {item.subTitle != null ? <span className="text-sm">{item.subTitle}</span> : null}
            </div>
          ))
        }
        <div className="absolute bottom-1/2 right-1/2 translate-1/2">{
          loading ? <CircularProgress /> : items.length == 0 ? <span className="text-sm">Não há itens para Listar</span> : null
        }</div>
      </div>
    </PopoverContent>
  </Popover>;
}