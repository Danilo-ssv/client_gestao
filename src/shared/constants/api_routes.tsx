export class ApiRoutes {
  // AUTHENTICATION
  login = (): string => '/login';
  logout = (): string => '/logout';
  // GLOBAL
  globalReadMunicipiosByCep = (codigo: string): string => `/global_read_municipios_by_cep?codigo=${codigo}`;
  globalReadMunicipios = (search: string, uf: string): string => `/global_read_municipios?search=${search}&uf=${uf}`;
  globalReadFornecedores = (search: string) => `/global_read_fornecedores?search=${search}`;
  globalReadCategoriasProdutos = (search: string) => `/global_read_categorias_produtos?search=${search}`;
  globalReadDespesas = (search: string) => `/global_read_despesas?search=${search}`;
  globalReadClientes = (search: string) => `/global_read_clientes?search=${search}`;
  globalReadHfEscolas = (search: string) => `/global_read_hf_escolas?search=${search}`;
  globalReadMarcasProdutos = (search: string) => `/global_read_marcas_produtos?search=${search}`;
  globalInsertFornecedores = () => '/global_insert_fornecedores';
  globalInsertCategoriasProdutos = () => '/global_insert_categorias_produtos';
  globalInsertDespesas = () => '/global_insert_despesas';
  globalInsertClientes = () => '/global_insert_clientes';
  globalInsertHfEscolas = () => '/global_insert_hf_escolas';
  globalInsertMarcasProdutos = () => '/global_insert_marcas_produtos';
  // HOME
  home = () => '/home';
  // CLIENTES
  clientesRead = (search: string, page: number, limit: number): string => `/clientes/read?search=${search}&page=${page}&limit=${limit}`;
  clientesInsert = (): string => '/clientes/insert';
  clientesDelete = (): string => '/clientes/delete';
  clientesReadById = (id: string): string => `/clientes/read_by_id?id=${id}`;
  // PRODUTOS
  produtosRead = (search: string, page: number, limit: number) => `/produtos/read?search=${search}&page=${page}&limit=${limit}`;
  produtosInsert = () => '/produtos/insert';
  produtosDelete = () => '/produtos/delete';
  produtosReadById = (id: string) => `/produtos/read_by_id?id=${id}`;
  produtosInsertBaixaEstoque = () => '/produtos/insert_baixa_estoque';
  // produtosReadByBarsCode = () => '/produtos/read_by_bars_code';
  // // AGENDA
  // agendaRead = () => '/agenda/read';
  // agendaInsert = () => '/agenda/insert';
  // agendaDelete = () => '/agenda/delete';
  // agendaReadById = () => '/agenda/read_by_id';
  // // USUARIOS
  // usuariosRead = () => '/usuarios/read';
  // usuariosInsert = () => '/usuarios/insert';
  // usuariosDelete = () => '/usuarios/delete';
  // usuariosReadById = () => '/usuarios/read_by_id';
  // FORNECEDORES
  fornecedoresRead = (search: string, page: number, limit: number) => `/fornecedores/read?search=${search}&page=${page}&limit=${limit}`;
  fornecedoresInsert = () => '/fornecedores/insert';
  fornecedoresDelete = () => '/fornecedores/delete';
  fornecedoresReadById = (id: string) => `/fornecedores/read_by_id?id=${id}`;
  // CATEGORIAS PRODUTOS
  categoriasProdutosRead = (search: string, page: number, limit: number) => `/categorias_produtos/read?search=${search}&page=${page}&limit=${limit}`;
  categoriasProdutosInsert = () => '/categorias_produtos/insert';
  categoriasProdutosDelete = () => '/categorias_produtos/delete';
  categoriasProdutosReadById = (id: string) => `/categorias_produtos/read_by_id?id=${id}`;
  // DESPESAS
  despesasRead = (search: string, page: number, limit: number) => `/despesas/read?search=${search}&page=${page}&limit=${limit}`;
  despesasInsert = () => '/despesas/insert';
  despesasDelete = () => '/despesas/delete';
  despesasReadById = (id: string) => `/despesas/read_by_id?id=${id}`;
  // Contas à Pagar
  contasPagarRead = (search: string, page: number, limit: number, startDate: string, endDate: string, status: string) => `/contas_pagar/read?search=${search}&page=${page}&limit=${limit}&start_date=${startDate}&end_date=${endDate}&status=${status}`;
  contasPagarInsert = () => '/contas_pagar/insert';
  contasPagarDelete = () => '/contas_pagar/delete';
  contasPagarReadById = (id: string) => `/contas_pagar/read_by_id?id=${id}`;
  contasPagarWriteOff = () => '/contas_pagar/write_off';
  contasPagarParcelling = () => '/contas_pagar/parcelling';
  // contasPagarReadForWriteOffParcelling = () => '/contas_pagar/read_for_write_off_parcelling';
  // Contas à Receber
  contasReceberRead = (search: string, page: number, limit: number, startDate: string, endDate: string, status: string) => `/contas_receber/read?search=${search}&page=${page}&limit=${limit}&start_date=${startDate}&end_date=${endDate}&status=${status}`;
  contasReceberInsert = () => '/contas_receber/insert';
  contasReceberDelete = () => '/contas_receber/delete';
  contasReceberReadById = (id: string) => `/contas_receber/read_by_id?id=${id}`;
  contasReceberWriteOff = () => '/contas_receber/write_off';
  contasReceberParcelling = () => '/contas_receber/parcelling';
  // contasReceberReadForWriteOffParcelling = () => '/contas_receber/read_for_write_off_parcelling';
  // // VENDAS
  // vendasRead = () => '/vendas/read';
  // vendasInsert = () => '/vendas/insert';
  // vendasDelete = () => '/vendas/delete';
  // vendasReadById = () => '/vendas/read_by_id';
  // vendasReadForFinalize = () => '/vendas/read_for_finalize';
  // vendasFinalize = () => '/vendas/finalize';
  // vendasReadForDetails = () => '/vendas/read_for_details';
  // HF ESCOLAS
  hfEscolasRead = (search: string, page: number, limit: number) => `/hf_escolas/read?search=${search}&page=${page}&limit=${limit}`;
  hfEscolasInsert = () => '/hf_escolas/insert';
  hfEscolasDelete = () => '/hf_escolas/delete';
  hfEscolasReadById = (id: string) => `/hf_escolas/read_by_id?id=${id}`;
  // HF CONTRATOS
  hfContratosRead = (search: string, searchCpf: string, searchCnpj: string, page: number, limit: number, startDate: string, endDate: string, status: string, idHfEscolas: string) => `/hf_contratos/read?search=${search}&search_cpf=${searchCpf}&search_cnpj=${searchCnpj}&page=${page}&limit=${limit}&start_date=${startDate}&end_date=${endDate}&status=${status}&id_hf_escolas=${idHfEscolas}`;
  hfContratosInsert = () => '/hf_contratos/insert';
  hfContratosDelete = () => '/hf_contratos/delete';
  hfContratosReadById = (id: string) => `/hf_contratos/read_by_id?id=${id}`;
  hfContratosWriteOff = () => '/hf_contratos/write_off';
  // MARCAS PRODUTOS
  marcasProdutosRead = (search: string, page: number, limit: number) => `/marcas_produtos/read?search=${search}&page=${page}&limit=${limit}`;
  marcasProdutosInsert = () => '/marcas_produtos/insert';
  marcasProdutosDelete = () => '/marcas_produtos/delete';
  marcasProdutosReadById = (id: string) => `/marcas_produtos/read_by_id?id=${id}`;
}