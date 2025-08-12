import { Archive, CreditCard, DollarSign, GraduationCap, Handshake, House, LogOutIcon, MenuIcon, ScrollText, SwatchBook, Tags, User, Users } from "lucide-react";
import { JSX, ReactNode, useState } from "react";
import { NavLink } from "react-router-dom";
import { ClientRoutes } from "../constants/client_routes";
import { AuthenticationState } from "@/modules/authentication/state/authentication_state";
import { LocalStorageProvider } from "../provider/local_storage_provider";
// import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export function DashboardContainer({ child }: { child: JSX.Element }) {
  // return (
  //   <SidebarProvider
  //     style={{
  //       "--sidebar-width": "20rem",
  //       "--sidebar-width-mobile": "20rem",

  //     }}
  //   >
  //     <Sidebar className="w-10">
  //       <SidebarHeader />
  //       <SidebarContent>
  //         <SidebarGroup />
  //         <SidebarGroup />
  //         <p>aqui</p>
  //       </SidebarContent>
  //       <p>aqui 3</p>

  //       <SidebarFooter />
  //     </Sidebar>

  //     <SidebarTrigger >
  //       PPP
  //     </SidebarTrigger>
  //     {/* <p>aqui 4</p> */}



  //   </SidebarProvider>
  // );

  const localStorageProvider = new LocalStorageProvider();
  const state = AuthenticationState();

  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className='flex'>
      {/* <aside className='w-[150px] h-dvh'> */}
      <aside className='min-w-[250px] h-dvh border-r-[2px] border-[#e5e5e5]'>
        <div className="flex justify-center items-center h-15 border-b-[2px] border-[#e5e5e5]">
          LOGO
        </div>
        <div className="p-2 h-[calc(100dvh_-_7.5rem)] overflow-y-auto">
          <ul>
            {CustomLink(0, <House size={19} />, 'HOME', ClientRoutes.dashboardHome())}
            {
              (localStorageProvider.getUser()?.permissoes.clientesRead == true ||
                localStorageProvider.getUser()?.permissoes.fornecedoresRead == true) &&
              CustomDivider('Pessoas')
            }
            {
              localStorageProvider.getUser()?.permissoes.clientesRead == true &&
              CustomLink(1, <Users size={19} />, 'Clientes', ClientRoutes.dashboardClientes())
            }
            {
              localStorageProvider.getUser()?.permissoes.fornecedoresRead == true &&
              CustomLink(2, <User size={19} />, 'Fornecedores', ClientRoutes.dashboardFornecedores())
            }
            {
              (localStorageProvider.getUser()?.permissoes.produtosRead == true ||
                localStorageProvider.getUser()?.permissoes.categoriasProdutosRead == true ||
                localStorageProvider.getUser()?.permissoes.marcasProdutosRead == true) &&
              CustomDivider('Produtos')
            }
            {
              localStorageProvider.getUser()?.permissoes.produtosRead == true &&
              CustomLink(3, <Archive size={19} />, 'Produtos', ClientRoutes.dashboardProdutos())
            }
            {
              localStorageProvider.getUser()?.permissoes.categoriasProdutosRead == true &&
              CustomLink(4, <SwatchBook size={19} />, 'Categorias de Produtos', ClientRoutes.dashboardCategoriasProdutos())
            }
            {
              localStorageProvider.getUser()?.permissoes.marcasProdutosRead == true &&
              CustomLink(5, <Tags size={19} />, 'Marcas de Produtos', ClientRoutes.dashboardMarcasProdutos())
            }
            {
              (localStorageProvider.getUser()?.permissoes.contasPagarRead == true ||
                localStorageProvider.getUser()?.permissoes.contasReceberRead == true ||
                localStorageProvider.getUser()?.permissoes.despesasRead == true) &&
              CustomDivider('Financeiro')
            }
            {
              localStorageProvider.getUser()?.permissoes.contasPagarRead == true &&
              CustomLink(6, <CreditCard size={19} />, 'Contas à Pagar', ClientRoutes.dashboardContasPagar())
            }
            {
              localStorageProvider.getUser()?.permissoes.contasReceberRead == true &&
              CustomLink(7, <DollarSign size={19} />, 'Contas à Receber', ClientRoutes.dashboardContasReceber())
            }
            {
              localStorageProvider.getUser()?.permissoes.despesasRead == true &&
              CustomLink(8, <ScrollText size={19} />, 'Despesas', ClientRoutes.dashboardDespesas())
            }
            {/* {CustomDivider('Vendas')} */}
            {/* receipt-text store */}
            {
              (localStorageProvider.getUser()?.permissoes.hfEscolasRead == true ||
                localStorageProvider.getUser()?.permissoes.hfContratosRead == true) &&
              CustomDivider('Contrato')
            }
            {
              localStorageProvider.getUser()?.permissoes.hfEscolasRead == true &&
              CustomLink(9, <GraduationCap size={19} />, 'Escolas', ClientRoutes.dashboardHfEscolas())
            }
            {
              localStorageProvider.getUser()?.permissoes.hfContratosRead == true &&
              CustomLink(10, <Handshake size={19} />, 'Contratos', ClientRoutes.dashboardHfContratos())
            }
            {/* <li>Fluxos</li>
          <li>Agenda</li> */}
          </ul>
        </div>
        <div
          className="flex justify-center items-center h-15 border-t-[2px] border-[#e5e5e5] cursor-pointer"
          onClick={() => state.logout()}
        >
          <LogOutIcon />
          Sair
        </div>
      </aside>
      <div className='flex-1'>
        <header className='flex justify-between items-center px-2 h-15 border-b-[2px] border-[#e5e5e5]'>
          {/* <header className='flex justify-between items-center px-2 h-14 border-b-[1px] border-black'> */}
          <div className='flex justify-center items-center w-10 h-10 rounded-full hover:bg-gray-300'>
            <MenuIcon />
          </div>
          <div className='flex'>
            <div className='flex justify-center items-center w-10 h-10 bg-purple-700 rounded-full'>
              {localStorageProvider.getUser()?.nome.split('')[0].toUpperCase()}
            </div>
            <div className='flex flex-col'>
              <span>{localStorageProvider.getUser()?.nome}</span>
              <span>{localStorageProvider.getUser()?.email}</span>
            </div>
          </div>
        </header>
        <main className='flex flex-col h-[calc(100dvh_-_3.75rem)] bg-[#f5f7fb] overflow-y-auto'>
          {/* <main className='h-[calc(100dvh_-_3.75rem)] bg-[#f5f7fb] overflow-y-auto '> */}
          {/* <NavLink to='/fluxo_vendas' end>
            Home
          </NavLink> */}
          {child}
        </main>
      </div>
    </div>
  );

  function CustomLink(index: number, icon: ReactNode, name: string, urlLink: string) {
    return <li onClick={() => setSelectedIndex(index)}><NavLink to={urlLink}>
      <div className="flex px-1 py-2 h-9 rounded-sm  hover:bg-[#ede8f0]">
        <div
          style={{ backgroundColor: selectedIndex == index ? '#2b7fff' : 'transparent' }}
          className="h-full w-[3px] mr-1 rounded-l-md bg-blue-500"
        ></div>
        {icon}
        <p className="ml-1 text-sm font-normal">{name}</p>
      </div>
    </NavLink></li>
  }

  function CustomDivider(name: string) {
    return <div className="flex items-center">
      <hr className="flex-1 border-1" />
      <p className="px-2 text-xs font-semibold">{name}</p>
      <hr className="flex-1 border-1" />
    </div>
  }
}
