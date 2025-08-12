# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
# SISTEMA SOMA

- CAMPOS DE Clientes / Empresas / Fornecedores / Funcionários / Prestadores de Serviço / Pessoas Físicas

[ ] Nome Completo
[ ] Classificação (Outros, clientes, fornecedores, funcionários, empresas, prestadores de serviço e pessoa física)
[ ] Email
[ ] Telefone Principal
[ ] Telefone Secundário
[ ] CPF / CNPJ
[ ] Cidade
[ ] CEP
[ ] Bairro
[ ] Rua / Logradouro
[ ] Número
[ ] Complemento
[ ] Informações Bancárias
[ ] Anotações

<!--  -->
<!--  -->
<!--  -->

# AFAZERES

- [x] Fazer filtro de data e escola (contratos);
- [x] Estilizar melhor a tabela de parcelas (contratos);
- [x] Inputs tanto de telefote quanto de parcelas funcionarem ao dar enter (contratos);
- [x] Puchar delathes do endereço automático com CEP (contratos);
- [x] Apontar para marcas_de_produtos ao invés de fornecedores (produtos);
- [x] listagem de e-mail e celular (clientes);

- [x] Trazer o Token para a memória e arrumar as permissões;
- [ ] Estilizar melhor os links, menu lateral e logout;
- [ ] Estilizar melhor tela de login;
- [ ] criar variáveis no servidor para cores e nome de status (contas à pagar, contas à receber e contratos);
- [ ] Seleção múltipla de linhas, deixar melhor seletor de páginas, duplo clique para editar, colocar opções de limites,  (se der);

- [ ] Criar Módulo de Vendas
- [ ] Criar Módulo de Usuários