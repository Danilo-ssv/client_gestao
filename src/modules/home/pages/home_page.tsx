import { HomeState } from "../state/home_state";
import { useEffect, useRef, useState } from "react";
import { DynamicIcon, IconName } from 'lucide-react/dynamic';
import { ChevronDown, TrendingDown, TrendingUp } from "lucide-react";

export function HomePage() {
  const state = HomeState();

  const ref = useRef(null);
  const [headerWidth, setHeaderWidth] = useState(0);

  useEffect(() => {
    state.read();

    const resizeObserver = new ResizeObserver(() => {
      setHeaderWidth((ref.current as any).getBoundingClientRect().width as number);
    });

    if (ref.current) resizeObserver.observe(ref.current);
  }, []);

  return (<div className="h-full grid grid-cols-1 grid-rows-[auto_1fr_1rem] px-4 pt-4">
    <div
      ref={ref}
      style={{ gridTemplateColumns: `repeat(${headerWidth > 800 ? 4 : 2}, minmax(0, 1fr))` }}
      className="grid gap-4"
    >
      <div className="flex pl-2 pt-2 pb-3 rounded-md shadow-lg bg-white">
        <div className="mt-3">
          <Hexagon iconcolor="#32c96a" iconName={'users'} />
        </div>
        <div className="ml-2.5 flex flex-col items-start">
          <h1 className="text-sm font-semibold text-gray-500">Total <br /> Clientes</h1>
          <span className="font-bold text-2xl line-clamp-1">158</span>
        </div>
      </div>
      <div className="flex pl-2 pt-2 pb-3 rounded-md shadow-lg bg-white">
        <div className="mt-3">
          <Hexagon iconcolor="#ff5200" iconName={'archive'} />
        </div>
        <div className="ml-2.5 flex flex-col items-start">
          <h1 className="text-sm font-semibold text-gray-500">Total <br /> Produtos</h1>
          <span className="font-bold text-2xl line-clamp-1">349</span>
        </div>
      </div>
      <div className="flex pl-2 pt-2 pb-3 rounded-md shadow-lg bg-white">
        <div className="mt-3">
          <Hexagon iconcolor="#9078f3" iconName={'credit-card'} />
        </div>
        <div className="ml-2.5 flex flex-col items-start">
          <h1 className="text-sm font-semibold text-gray-500">Contas a <br /> Pagar</h1>
          <span className="font-bold text-2xl line-clamp-1">R$ 293,07</span>
        </div>
      </div>
      <div className="flex pl-2 pt-2 pb-3 rounded-md shadow-lg bg-white">
        <div className="mt-3">
          <Hexagon iconcolor="#2377fc" iconName={'dollar-sign'} />
        </div>
        <div className="ml-2.5 flex flex-col items-start">
          <h1 className="text-sm font-semibold text-gray-500">Contas a <br /> Receber</h1>
          <span className="font-bold text-2xl line-clamp-1">R$ 1.826,84</span>
        </div>
      </div>

    </div>
    <div className="mt-4 px-2 pt-4 grid grid-cols-1 grid-rows-[auto_1fr] rounded-md shadow-lg bg-white">
      <div>
        <div className="flex justify-between px-4 pt-1">
          <h1 className="font-bold text-2xl line-clamp-1">Vendas</h1>
          <div className="relative">
            <select className="appearance-none pl-3 pr-10 py-1 border-2 border-[#E7E7E7] rounded-md outline-none bg-[#F6F6F6]">
              <option value="">Último Ano</option>
              <option value="">Últimos 6 Meses</option>
              <option value="">Últimos 3 Meses</option>
              <option value="">Último Mês</option>
              <option value="">Última Semana</option>
              <option value="">Hoje</option>
              <option value="">Mês Atual</option>
              <option value="">Todos</option>
            </select>
            <ChevronDown
              className="absolute right-2 top-[55%] translate-y-[-50%] "
              size={15}
            />
          </div>
        </div>

        <div className="h-3"></div>

        <div className="flex flex-wrap gap-10 px-8">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-orange-500"></div>
              <span className="text-sm font-semibold text-gray-600">Painel</span>
            </div>
            <div className="flex items-center">
              <span className="font-bold text-xl text-gray-700 line-clamp-1">R$ 1.826,84</span>
              <TrendingUp className="text-green-500 ml-3 mr-1" />
              <span className="text-sm font-semibold text-gray-500">0.53%</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-purple-700"></div>
              <span className="text-sm font-semibold text-gray-600">App</span>
            </div>
            <div className="flex items-center">
              <span className="font-bold text-xl text-gray-700 line-clamp-1">R$ 3.439,98</span>
              <TrendingDown className="text-orange-600 ml-3 mr-1" />
              <span className="text-sm font-semibold text-gray-500">1.76%</span>
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-[300px] p-10">
        {/* <div className="min-h-[300px] bg-red-500"> */}
        <CustomBarChart />
      </div>
    </div>
    <div></div>
  </div>);
}

function Hexagon({ iconcolor, iconName }: { iconcolor: string, iconName: IconName }) {
  // .hex {
  //   width: 4rem;
  //   color: darkBlue;
  //   display: inline-block;
  //   filter: url('#goo');
  //   position: absolute;
  // }

  // .hex::before {
  //   content: "";
  //   display: block;
  //   background: currentColor;
  //   padding-top: 86.6%;
  //   clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
  // }

  const width = 60;
  const height = (width * 86.6) / 100;

  return (<div style={{ height }} className="relative">
    <div style={{
      width,
      height,
      backgroundColor: iconcolor,
      clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
      rotate: '90deg',
    }}></div>
    <DynamicIcon
      name={iconName}
      // style={selectedOption != link.option ? undefined : { scale: 1.1, color: '#000' }}
      className="absolute top-[50%] left-[50%] translate-[-50%] text-white"
    />
  </div>);
}

// function Hexagon() {
//   const parentSize = 50;
//   const childSize = Math.sqrt((parentSize * parentSize) / 2);

//   return (
//     <div
//       style={{ width: parentSize, height: childSize }}
//       className="relative items-center bg-orange-500"
//     >
//       <div
//         style={{ width: childSize, height: childSize }}
//         className="absolute top-[-50%] left-0 right-0 mx-auto bg-orange-500 rotate-45"
//       ></div>
//       <div
//         style={{ width: childSize, height: childSize }}
//         className="absolute bottom-[-50%] left-0 right-0 mx-auto bg-orange-500 rotate-45"
//       ></div>
//     </div>
//   );
// }



// interface VendasModel {
//   // type: 'painel' | 'app';
//   label: string,
//   valor: number,
//   formattedValor: string,

// }

function CustomBarChart() {

  // const vendas: VendasModel[] = [
  //   { label: 'Julho', valor: 100, formattedValor: 'R$ 100,00' },
  //   { label: 'Agosto', valor: 150, formattedValor: 'R$ 150,00' },
  //   { label: 'Setembro', valor: 300, formattedValor: 'R$ 300,00' },
  //   { label: 'Outubro', valor: 250, formattedValor: 'R$ 250,00' },
  //   { label: 'Novembro', valor: 500, formattedValor: 'R$ 500,00' },
  //   { label: 'Dezembro', valor: 700, formattedValor: 'R$ 700,00' },
  // ];

  const numberOfColumns = 6;
  const columns = ['Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  const returnHeight = (index: number): string => {
    if (index == 0) return '10rem';
    if (index == 1) return '1rem';
    if (index == 2) return '2rem';
    if (index == 3) return '5rem';
    if (index == 4) return '9rem';
    if (index == 5) return '7rem';
    return '10rem';
  };

  const metricsWidth = 2.5;

  return (
    <div className="h-full w-full grid grid-cols-1 grid-rows-[1fr_2rem]">
      <div className="relative flex flex-col justify-between">
        <div className="relative flex justify-end">
          <span style={{ width: `${metricsWidth}rem` }} className="absolute top-0 left-0 pr-2 flex justify-end translate-y-[-50%]">400</span>
          <hr style={{ width: `calc(100% - ${metricsWidth}rem)` }} />
        </div>
        <div className="relative flex justify-end">
          <span style={{ width: `${metricsWidth}rem` }} className="absolute top-0 left-0 pr-2 flex justify-end translate-y-[-50%]">300</span>
          <hr style={{ width: `calc(100% - ${metricsWidth}rem)` }} />
        </div>
        <div className="relative flex justify-end">
          <span style={{ width: `${metricsWidth}rem` }} className="absolute top-0 left-0 pr-2 flex justify-end translate-y-[-50%]">200</span>
          <hr style={{ width: `calc(100% - ${metricsWidth}rem)` }} />
        </div>
        <div className="relative flex justify-end">
          <span style={{ width: `${metricsWidth}rem` }} className="absolute top-0 left-0 pr-2 flex justify-end translate-y-[-50%]">100</span>
          <hr style={{ width: `calc(100% - ${metricsWidth}rem)` }} />
        </div>
        <div className="relative flex justify-end">
          <span style={{ width: `${metricsWidth}rem` }} className="absolute top-0 left-0 pr-2 flex justify-end translate-y-[-50%]">0</span>
          <hr style={{ width: `calc(100% - ${metricsWidth}rem)` }} />
        </div>
        <div
          style={{
            marginLeft: `${metricsWidth}rem`,
            width: `calc(100% - ${metricsWidth}rem)`,
            gridTemplateColumns: `repeat(${numberOfColumns}, minmax(0, 1fr))`,
          }}
          className="absolute top-0 left-0 h-full grid grid-cols-1 items-end"
        >
          {Array.from({ length: numberOfColumns }).map((_, index) => (
            <div className="flex justify-center">
              <div
                style={{ height: returnHeight(index) }}
                className="w-10 rounded-t-lg cursor-pointer bg-[#ff8951]"
              >
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          marginLeft: `${metricsWidth}rem`,
          width: `calc(100% - ${metricsWidth}rem)`,
        }}
        className="flex justify-between"
      >
        {
          columns.map((value) => (
            <div className="flex-1 flex justify-center">{value}</div>
          ))
        }
      </div>
    </div>
  );

  return (
    // <div className="h-full w-full grid grid-cols-[1fr_1fr] grid-rows-[1fr_1fr]">
    <div className="h-full w-full grid grid-cols-[2rem_1fr] grid-rows-[1fr_2rem]">

      <div className="relative flex flex-col items-end pr-2">
        <div className="absolute top-0 flex-1 flex items-center translate-y-[-50%]">400</div>
        <div className="flex-1 flex items-center translate-y-[50%]">300</div>
        <div className="flex-1 flex items-center translate-y-[50%]">200</div>
        <div className="flex-1 flex items-center translate-y-[50%]">100</div>
        <div className="flex-1 flex items-center translate-y-[50%]">0</div>
      </div>
      <div className="relative flex flex-col">
        <div className="flex-1 border-b-2 border-t-2"></div>
        <div className="flex-1 border-b-2"></div>
        <div className="flex-1 border-b-2"></div>
        <div className="flex-1 border-b-2"></div>
        <div
          style={{
            gridTemplateColumns: `repeat(${numberOfColumns}, minmax(0, 1fr))`,
          }}
          className="absolute top-0 left-0 grid grid-cols-1 items-end h-full w-full"
        >
          {Array.from({ length: numberOfColumns }).map((_, index) => (
            <div className="flex justify-center">
              <div
                style={{ height: returnHeight(index) }}
                className="w-10 rounded-t-lg cursor-pointer bg-[#ff8951]"
              >
              </div>
            </div>
          ))}
        </div>
      </div>
      <div></div>
      <div className="flex">
        {columns.map((value) => (
          <div className="flex-1 flex justify-center">{value}</div>
        ))}
      </div>
    </div>
  );
}