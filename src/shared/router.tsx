import { createBrowserRouter, Navigate } from "react-router-dom";
import { DashboardContainer } from "./pages/dashboard_container";
import { InsertClientesPage } from "@/modules/clientes/pages/insert_clientes_page";
import { ClientesPage } from "@/modules/clientes/pages/clientes_page";
import { HomePage } from "@/modules/home/pages/home_page";
import { ClientRoutes } from "./constants/client_routes";
import { LoginPage } from "@/modules/authentication/pages/login_page";
import { InsertFornecedoresPage } from "@/modules/fornecedores/pages/insert_fornecedores_page";
import { FornecedoresPage } from "@/modules/fornecedores/pages/fornecedores_page";
import { InsertDespesasPage } from "@/modules/despesas/pages/insert_despesas_page";
import { DespesasPage } from "@/modules/despesas/pages/despesas_page";
import { CategoriasProdutosPage } from "@/modules/categorias_produtos/pages/categorias_produtos_page";
import { InsertCategoriasProdutosPage } from "@/modules/categorias_produtos/pages/insert_categorias_produtos_page";
import { ContasPagarPage } from "@/modules/contas_pagar/pages/contas_pagar_page";
import { InsertContasPagarPage } from "@/modules/contas_pagar/pages/insert_contas_pagar_page";
import { InsertProdutosPage } from "@/modules/produtos/pages/insert_produtos_page";
import { ProdutosPage } from "@/modules/produtos/pages/produtos_page";
import { ContasReceberPage } from "@/modules/contas_receber/pages/contas_receber_page";
import { InsertContasReceberPage } from "@/modules/contas_receber/pages/insert_contas_receber_page";
import { HfEscolasPage } from "@/modules/hf_escolas/pages/hf_escolas_page";
import { InsertHfEscolasPage } from "@/modules/hf_escolas/pages/insert_hf_escolas_page";
import { HfContratosPage } from "@/modules/hf_contratos/pages/hf_contratos_page";
import { InsertHfContratosPage } from "@/modules/hf_contratos/pages/insert_hf_contratos_page";
import { MarcasProdutosPage } from "@/modules/marcas_produtos/pages/marcas_produtos_page";
import { InsertMarcasProdutosPage } from "@/modules/marcas_produtos/pages/insert_marcas_produtos_page";

const router = createBrowserRouter([
  {
    path: ClientRoutes.login(),
    loader: () => <Navigate to={ClientRoutes.dashboardHome()} />,
    element: <LoginPage />,
  },
  {
    path: ClientRoutes.dashboardHome(),
    loader: () => <Navigate to={ClientRoutes.dashboardHome()} />,
    element: <DashboardContainer child={<HomePage />} />,
  },
  {
    path: ClientRoutes.dashboardClientes(),
    loader: () => <Navigate to={ClientRoutes.dashboardClientes()} />,
    element: <DashboardContainer child={<ClientesPage />} />,
  },
  {
    path: ClientRoutes.dashboardClientesInserir(null),
    loader: () => <Navigate to={ClientRoutes.dashboardClientesInserir(null)} />,
    element: <DashboardContainer child={<InsertClientesPage />} />,
  },
  // 
  // 
  // 
  {
    path: ClientRoutes.dashboardFornecedores(),
    loader: () => <Navigate to={ClientRoutes.dashboardFornecedores()} />,
    element: <DashboardContainer child={<FornecedoresPage />} />,
  },
  {
    path: ClientRoutes.dashboardFornecedoresInserir(null),
    loader: () => <Navigate to={ClientRoutes.dashboardFornecedoresInserir(null)} />,
    element: <DashboardContainer child={<InsertFornecedoresPage />} />,
  },
  {
    path: ClientRoutes.dashboardDespesas(),
    loader: () => <Navigate to={ClientRoutes.dashboardDespesas()} />,
    element: <DashboardContainer child={<DespesasPage />} />,
  },
  {
    path: ClientRoutes.dashboardDespesasInserir(null),
    loader: () => <Navigate to={ClientRoutes.dashboardDespesasInserir(null)} />,
    element: <DashboardContainer child={<InsertDespesasPage />} />,
  },
  {
    path: ClientRoutes.dashboardCategoriasProdutos(),
    loader: () => <Navigate to={ClientRoutes.dashboardCategoriasProdutos()} />,
    element: <DashboardContainer child={<CategoriasProdutosPage />} />,
  },
  {
    path: ClientRoutes.dashboardCategoriasProdutosInserir(null),
    loader: () => <Navigate to={ClientRoutes.dashboardCategoriasProdutosInserir(null)} />,
    element: <DashboardContainer child={<InsertCategoriasProdutosPage />} />,
  },
  {
    path: ClientRoutes.dashboardContasPagar(),
    loader: () => <Navigate to={ClientRoutes.dashboardContasPagar()} />,
    element: <DashboardContainer child={<ContasPagarPage />} />,
  },
  {
    path: ClientRoutes.dashboardContasPagarInserir(null),
    loader: () => <Navigate to={ClientRoutes.dashboardContasPagarInserir(null)} />,
    element: <DashboardContainer child={<InsertContasPagarPage />} />,
  },
  {
    path: ClientRoutes.dashboardContasReceber(),
    loader: () => <Navigate to={ClientRoutes.dashboardContasReceber()} />,
    element: <DashboardContainer child={<ContasReceberPage />} />,
  },
  {
    path: ClientRoutes.dashboardContasReceberInserir(null),
    loader: () => <Navigate to={ClientRoutes.dashboardContasReceberInserir(null)} />,
    element: <DashboardContainer child={<InsertContasReceberPage />} />,
  },
  {
    path: ClientRoutes.dashboardProdutos(),
    loader: () => <Navigate to={ClientRoutes.dashboardProdutos()} />,
    element: <DashboardContainer child={<ProdutosPage />} />,
  },
  {
    path: ClientRoutes.dashboardProdutosInserir(null),
    loader: () => <Navigate to={ClientRoutes.dashboardProdutosInserir(null)} />,
    element: <DashboardContainer child={<InsertProdutosPage />} />,
  },
  {
    path: ClientRoutes.dashboardHfEscolas(),
    loader: () => <Navigate to={ClientRoutes.dashboardHfEscolas()} />,
    element: <DashboardContainer child={<HfEscolasPage />} />,
  },
  {
    path: ClientRoutes.dashboardHfEscolasInserir(null),
    loader: () => <Navigate to={ClientRoutes.dashboardHfEscolasInserir(null)} />,
    element: <DashboardContainer child={<InsertHfEscolasPage />} />,
  },
  {
    path: ClientRoutes.dashboardHfContratos(),
    loader: () => <Navigate to={ClientRoutes.dashboardHfContratos()} />,
    element: <DashboardContainer child={<HfContratosPage />} />,
  },
  {
    path: ClientRoutes.dashboardHfContratosInserir(null),
    loader: () => <Navigate to={ClientRoutes.dashboardHfContratosInserir(null)} />,
    element: <DashboardContainer child={<InsertHfContratosPage />} />,
  },
  {
    path: ClientRoutes.dashboardMarcasProdutos(),
    loader: () => <Navigate to={ClientRoutes.dashboardMarcasProdutos()} />,
    element: <DashboardContainer child={<MarcasProdutosPage />} />,
  },
  {
    path: ClientRoutes.dashboardMarcasProdutosInserir(null),
    loader: () => <Navigate to={ClientRoutes.dashboardMarcasProdutosInserir(null)} />,
    element: <DashboardContainer child={<InsertMarcasProdutosPage />} />,
  },
]);

//  <Route path='/' element={} />
//           <Route path='/clientes' element={} />
//           <Route path='' element={} />

export { router };