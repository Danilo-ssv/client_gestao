import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { ReactNode, useState } from "react";

interface ColumnModel {
  label: string,
  value: string | ReactNode;
  width: number,
  textColor?: string | undefined,
  typeWidth?: 'min-width' | 'default' | undefined,
  alignment?: 'start' | 'center' | 'end' | undefined,
}

interface PropsModel {
  data: any[],
  columns: (item: any) => ColumnModel[],
  onTap: ((item: any) => void) | null,
  onDoubleTap: ((item: any) => void) | null,
}

export function CustomTable(props: PropsModel) {
  const coluns = props.columns(null);

  return (
    <div>
      <div className="flex border-b-2 overflow-x-auto">
        {
          coluns.map((e, index) => {
            return <div
              key={index}
              className="flex items-center px-2 hover:bg-[#ede8f0]"
              style={{
                justifyContent: e.alignment,
                height: '2rem',
                width: e.width + 'px',
                flexGrow: e.typeWidth == 'min-width' ? 1 : undefined,
              }}
            >
              <p className="text-black font-semibold line-clamp-1 overflow-ellipsis">{e.label}</p>
            </div>;
          })
        }
      </div>
      {
        props.data.map((item, index) => (
          <div key={index} className="flex border-b-2" style={{ backgroundColor: index % 2 == 0 ? "#eeeff0" : '#FFF' }}>
            {
              props.columns(item).map((e, i) => {
                return <div
                  key={i}
                  className="flex items-center px-2 hover:bg-[#ede8f0]"
                  style={{
                    justifyContent: e.alignment,
                    height: '2rem',
                    width: e.width + 'px',
                    flexGrow: e.typeWidth == 'min-width' ? 1 : undefined,
                  }}
                >
                  {
                    typeof e.value == 'string'
                      ? <p className="text-black text-sm line-clamp-1 overflow-ellipsis" style={{ color: e.textColor }}>{e.value}</p>
                      : e.value
                  }
                </div>;
              })
            }
          </div>
        ))
      }
    </div>
  )
}

interface PageSelectorProps {
  page: number,
  numberOfPages: number,
  selectPage: (page: number) => void,
}

export function PageSelector(props: PageSelectorProps) {
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [hover3, setHover3] = useState(false);
  const [hover4, setHover4] = useState(false);

  return <div className="flex items-center gap-1">
    <div
      className='flex justify-center items-center w-7 h-7 rounded-sm'
      onMouseEnter={() => props.page > 1 ? setHover1(true) : undefined}
      onMouseLeave={() => setHover1(false)}
      style={{
        color: props.page > 1 ? '#898888' : '#d1d5dc',
        cursor: props.page > 1 ? 'pointer' : undefined,
        backgroundColor: hover1 ? '#ede8f0' : undefined,
      }}
      onClick={() => props.page > 1 ? props.selectPage(1) : undefined}
    ><ChevronsLeft /></div>
    <div
      className='flex justify-center items-center w-7 h-7 rounded-sm'
      onMouseEnter={() => props.page > 1 ? setHover2(true) : undefined}
      onMouseLeave={() => setHover2(false)}
      style={{
        color: props.page > 1 ? '#898888' : '#d1d5dc',
        cursor: props.page > 1 ? 'pointer' : undefined,
        backgroundColor: hover2 ? '#ede8f0' : undefined,
      }}
      onClick={() => props.page > 1 ? props.selectPage(props.page - 1) : undefined}
    ><ChevronLeft /></div>
    {
      props.page - 2 < 1
        ? undefined
        : <div
          className="flex items-center justify-center w-7 h-7 rounded-sm text-xs text-black font-semibold bg-gray-300 cursor-pointer"
          onClick={() => props.selectPage(props.page - 2)}
        ><p>{props.page - 2}</p></div>
    }
    {
      props.page - 1 < 1
        ? undefined
        : <div
          className="flex items-center justify-center w-7 h-7 rounded-sm text-xs text-black font-semibold bg-gray-300 cursor-pointer"
          onClick={() => props.selectPage(props.page - 1)}
        ><p>{props.page - 1}</p></div>
    }
    <div className="flex items-center justify-center w-7 h-7 rounded-sm text-xs text-white font-semibold bg-blue-500">
      <p>{props.page}</p>
    </div>
    {
      props.page + 1 > props.numberOfPages
        ? undefined
        : <div
          className="flex items-center justify-center w-7 h-7 rounded-sm text-xs text-black font-semibold bg-gray-300 cursor-pointer"
          onClick={() => props.selectPage(props.page + 1)}
        ><p>{props.page + 1}</p></div>
    }
    {
      props.page + 2 > props.numberOfPages
        ? undefined
        : <div
          className="flex items-center justify-center w-7 h-7 rounded-sm text-xs text-black font-semibold bg-gray-300 cursor-pointer"
          onClick={() => props.selectPage(props.page + 2)}
        ><p>{props.page + 2}</p></div>
    }
    <div
      className='flex justify-center items-center w-7 h-7 rounded-sm'
      onMouseEnter={() => props.page < props.numberOfPages ? setHover3(true) : undefined}
      onMouseLeave={() => setHover3(false)}
      style={{
        color: props.page < props.numberOfPages ? '#898888' : '#d1d5dc',
        cursor: props.page < props.numberOfPages ? 'pointer' : undefined,
        backgroundColor: hover3 ? '#ede8f0' : undefined,
      }}
      onClick={() => props.page < props.numberOfPages ? props.selectPage(props.page + 1) : undefined}
    ><ChevronRight /></div>
    <div
      className='flex justify-center items-center w-7 h-7 rounded-sm'
      onMouseEnter={() => props.page < props.numberOfPages ? setHover4(true) : undefined}
      onMouseLeave={() => setHover4(false)}
      style={{
        color: props.page < props.numberOfPages ? '#898888' : '#d1d5dc',
        cursor: props.page < props.numberOfPages ? 'pointer' : undefined,
        backgroundColor: hover4 ? '#ede8f0' : undefined,
      }}
      onClick={() => props.page < props.numberOfPages ? props.selectPage(props.numberOfPages) : undefined}
    ><ChevronsRight /></div>
  </div>;
}
