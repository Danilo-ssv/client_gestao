const ClientRoutes = {
  login: () => '/login',
  dashboardHome: () => '/',
  // dashboardHome: () => '/dashboard/home',
  dashboardClientes: () => '/dashboard/clientes',
  dashboardClientesInserir: (id: string | null, clone: boolean = false) => {
    if (id == null) return '/dashboard/clientes/inserir';
    return `/dashboard/clientes/inserir?id=${id}&clone=${clone}`;
  },
  // 
  // 
  // 
  dashboardFornecedores: () => '/dashboard/fornecedores',
  dashboardFornecedoresInserir: (id: string | null, clone: boolean = false) => {
    if (id == null) return '/dashboard/fornecedores/inserir';
    return `/dashboard/fornecedores/inserir?id=${id}&clone=${clone}`;
  },
  dashboardDespesas: () => '/dashboard/despesas',
  dashboardDespesasInserir: (id: string | null, clone: boolean = false) => {
    if (id == null) return '/dashboard/despesas/inserir';
    return `/dashboard/despesas/inserir?id=${id}&clone=${clone}`;
  },
  dashboardCategoriasProdutos: () => '/dashboard/categorias_produtos',
  dashboardCategoriasProdutosInserir: (id: string | null, clone: boolean = false) => {
    if (id == null) return '/dashboard/categorias_produtos/inserir';
    return `/dashboard/categorias_produtos/inserir?id=${id}&clone=${clone}`;
  },
  dashboardContasPagar: () => '/dashboard/contas_pagar',
  dashboardContasPagarInserir: (id: string | null, clone: boolean = false) => {
    if (id == null) return '/dashboard/contas_pagar/inserir';
    return `/dashboard/contas_pagar/inserir?id=${id}&clone=${clone}`;
  },
  dashboardContasReceber: () => '/dashboard/contas_receber',
  dashboardContasReceberInserir: (id: string | null, clone: boolean = false) => {
    if (id == null) return '/dashboard/contas_receber/inserir';
    return `/dashboard/contas_receber/inserir?id=${id}&clone=${clone}`;
  },
  dashboardProdutos: () => '/dashboard/produtos',
  dashboardProdutosInserir: (id: string | null, clone: boolean = false) => {
    if (id == null) return '/dashboard/produtos/inserir';
    return `/dashboard/produtos/inserir?id=${id}&clone=${clone}`;
  },
  dashboardHfEscolas: () => '/dashboard/hf_escolas',
  dashboardHfEscolasInserir: (id: string | null, clone: boolean = false) => {
    if (id == null) return '/dashboard/hf_escolas/inserir';
    return `/dashboard/hf_escolas/inserir?id=${id}&clone=${clone}`;
  },
  dashboardHfContratos: () => '/dashboard/hf_contratos',
  dashboardHfContratosInserir: (id: string | null, clone: boolean = false) => {
    if (id == null) return '/dashboard/hf_contratos/inserir';
    return `/dashboard/hf_contratos/inserir?id=${id}&clone=${clone}`;
  },
  dashboardMarcasProdutos: () => '/dashboard/marcas_produtos',
  dashboardMarcasProdutosInserir: (id: string | null, clone: boolean = false) => {
    if (id == null) return '/dashboard/marcas_produtos/inserir';
    return `/dashboard/marcas_produtos/inserir?id=${id}&clone=${clone}`;
  },
};

export { ClientRoutes };