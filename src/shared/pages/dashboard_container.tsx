import { Archive, CreditCard, DollarSign, GraduationCap, Handshake, House, LogOutIcon, Menu, MenuIcon, ScrollText, SwatchBook, Tags, User, Users } from "lucide-react";
import { JSX, ReactNode, useState } from "react";
import { NavLink } from "react-router-dom";
import { ClientRoutes } from "../constants/client_routes";
import { AuthenticationState } from "@/modules/authentication/state/authentication_state";
import { LocalStorageProvider } from "../provider/local_storage_provider";
import { Sheet, SheetContent } from "@/components/ui/sheet";
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

  const [stretchMenu, setStretchMenu] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className='flex'>
      {/* <aside className='w-[150px] h-dvh'> */}
      <aside
        style={{
          minWidth: stretchMenu ? '250px' : '60px',
          maxWidth: stretchMenu ? '250px' : '60px',
          justifyContent: 'stretch'
        }}
        className='max-[800px]:hidden transition-[200ms] h-dvh border-r-[2px] border-[#e5e5e5]'>
        <div className="flex justify-center items-center h-15 border-b-[2px] border-[#e5e5e5]">
          {/* LOGO */}
          <img className="w-48" src="/src/assets/logo.png" alt="" />
        </div>
        {/* pt-2 px-2 */}
        <div className="h-[calc(100dvh_-_7.5rem)] overflow-y-auto overflow-x-hidden">
          <ul>
            {CustomLink(0, <House size={19} />, 'HOME', ClientRoutes.dashboardHome())}
            {
              (localStorageProvider.getUser()?.permissoes.clientesRead == true ||
                localStorageProvider.getUser()?.permissoes.fornecedoresRead == true) &&
              CustomDivider('Pessoas', stretchMenu)
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
              CustomDivider('Produtos', stretchMenu)
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
              CustomDivider('Financeiro', stretchMenu)
            }
            {
              localStorageProvider.getUser()?.permissoes.contasPagarRead == true &&
              CustomLink(6, <CreditCard size={19} />, 'Contas a Pagar', ClientRoutes.dashboardContasPagar())
            }
            {
              localStorageProvider.getUser()?.permissoes.contasReceberRead == true &&
              CustomLink(7, <DollarSign size={19} />, 'Contas a Receber', ClientRoutes.dashboardContasReceber())
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
              CustomDivider('Contrato', stretchMenu)
            }
            {
              localStorageProvider.getUser()?.permissoes.hfEscolasRead == true &&
              CustomLink(9, <GraduationCap size={19} />, 'Colégios', ClientRoutes.dashboardHfEscolas())
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
          <Menu
            className="max-[800px]:hidden p-1.5 rounded-full hover:bg-[#e1e1e1] active:bg-[#e1e1e1] cursor-pointer"
            size={35}
            onClick={() => setStretchMenu(!stretchMenu)}
          />

          <Sheet open={openModal} onOpenChange={setOpenModal}>
            {/* <div className="flex items-center gap-1"> */}
            <Menu
              className="max-[800px]:inline-block hidden p-1.5 rounded-full hover:bg-[#e1e1e1] active:bg-[#e1e1e1] cursor-pointer"
              size={35}
              onClick={() => setOpenModal(true)}
            />
            <SheetContent side="left" className="outline-none max-sm:w-[65%] max-md:w-[50%] w-[300px] rounded-r-2xl">
              {/*  */}
              {/*  */}
              {/*  */}
              {/*  */}
              {/*  */}
              <div className="flex justify-center items-center h-15 border-b-[2px] border-[#e5e5e5]">
                LOGO
                <img src="src/assets/logo.png" alt="" />
              </div>
              {/* pt-2 px-2 */}
              <div className="h-[calc(100dvh_-_7.5rem)] overflow-y-auto overflow-x-hidden">
                <ul>
                  {CustomLink(0, <House size={19} />, 'HOME', ClientRoutes.dashboardHome())}
                  {
                    (localStorageProvider.getUser()?.permissoes.clientesRead == true ||
                      localStorageProvider.getUser()?.permissoes.fornecedoresRead == true) &&
                    CustomDivider('Pessoas', stretchMenu)
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
                    CustomDivider('Produtos', stretchMenu)
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
                    CustomDivider('Financeiro', stretchMenu)
                  }
                  {
                    localStorageProvider.getUser()?.permissoes.contasPagarRead == true &&
                    CustomLink(6, <CreditCard size={19} />, 'Contas a Pagar', ClientRoutes.dashboardContasPagar())
                  }
                  {
                    localStorageProvider.getUser()?.permissoes.contasReceberRead == true &&
                    CustomLink(7, <DollarSign size={19} />, 'Contas a Receber', ClientRoutes.dashboardContasReceber())
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
                    CustomDivider('Contrato', stretchMenu)
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
              {/*  */}
              {/*  */}
              {/*  */}
              {/*  */}
              {/*  */}
            </SheetContent>
          </Sheet>



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
        {/* f5f7fb */}
        <main className='flex flex-col h-[calc(100dvh_-_3.75rem)] bg-[#f1f1f1] overflow-y-auto'>
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
      <div
        style={{ marginTop: index == 0 ? '.5rem' : '0' }}
        className="mx-2 flex px-1 py-2 h-9 rounded-sm hover:bg-[#ede8f0] active:bg-[#ede8f0]"
      >
        <div
          style={{ backgroundColor: selectedIndex == index ? '#2b7fff' : 'transparent' }}
          className="h-full w-[3px] mr-1 rounded-l-md bg-blue-500"
        ></div>
        {/* {icon} */}
        <div className="w-5 mr-2">
          {icon}
        </div>
        <p className="flex-1 line-clamp-1 text-sm font-normal">{name}</p>
      </div>
    </NavLink></li>
  }

  function CustomDivider(name: string, stretchMenu: boolean) {
    return <div style={{ display: stretchMenu ? 'flex' : 'none' }} className="mx-2 items-center">
      <hr className="flex-1 border-1" />
      <p className="px-2 text-xs font-semibold">{name}</p>
      <hr className="flex-1 border-1" />
    </div>
  }
}
