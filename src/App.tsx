import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './shared/router'
import { Toaster } from './components/ui/sonner'

function App() {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   navigate(ClientRoutes.dashboardHome());
  // }, []);

  return (
    <>
      {/* <BrowserRouter>
        <Routes>
          <Route path='/' element={<DashboardContainer child={<HomePage />} />} />
          <Route path='/clientes' element={<DashboardContainer child={<ClientesPage />} />} />
          <Route path='/clientes/inserir' element={<DashboardContainer child={<InsertClientesPage  />} />} />
          <Route path='/fluxo_vendas' element={<FluxoVendasPage />} />
        </Routes>
      </BrowserRouter> */}
      <RouterProvider router={router} />
      <Toaster
      // style={{ color: "#0F0" }}
      />
    </>
  )
}

export default App
