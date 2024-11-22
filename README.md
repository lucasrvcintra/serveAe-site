# serveAe-site
# Desafio Técnico - Falaê

Este é o repositório do frontend do **Desafio Técnico** para o processo seletivo de estágio na **Falaê**. A aplicação foi desenvolvida para **gestão de pedidos de um restaurante**. Ela permite cadastrar clientes, realizar CRUD completo de produtos, criar e listar pedidos, e calcular o total de cada pedido, tudo utilizando **React**, **Vite**, **TailwindCSS** e **Shadcn**.

## 🚀 Tecnologias Utilizadas

### **Frontend**:
- **React com TypeScript**: Biblioteca para construção da interface do usuário.
- **Vite**: Build tool que acelera o desenvolvimento com uma experiência de recarga mais rápida.
- **TailwindCSS**: Framework de CSS para estilização rápida e responsiva.
- **Shadcn**: Biblioteca de componentes UI, usada para estilizar componentes de forma elegante e funcional.

### **Comunicação com API**:
- **Axios**: Para fazer chamadas HTTP para o backend.

### **Ferramentas de Desenvolvimento**:
- **VSCode**: Editor de código.
- **Git**: Controle de versão.

## 💻 Como Rodar o Projeto

1. **Clonar o Repositório**
   ```bash
   git clone https://github.com/lucasrvcintra/serveAe-site.git
   cd serveAe-site
2. **Instalar dependências
   ```bash
   npm install
3. **Rodar o projeto
   ```bash
   npm run dev
3. **Abrir no navegador
   ```bash
    ➜  Local:   http://localhost:5173/
## 📝 Funcionalidades Implementadas

### 1. Cadastro de Clientes
- **Objetivo**: Permite registrar um novo cliente no sistema com informações como nome, email, endereço e telefone.
- **Funcionalidade**: Ao preencher o formulário e enviar, os dados são validados e armazenados no banco de dados.

### 2. Cadastro de Produtos
- **Objetivo**: Permite cadastrar novos produtos no sistema, com dados como nome, preço, categoria, descrição e imagem.
- **Funcionalidade**: Produtos podem ser criados e visualizados diretamente pela interface.

### 3. Visualização de Produtos
- **Objetivo**: Exibe uma lista de produtos cadastrados, ao clicar no card o usuário visualiza informações detalhadas como nome, categoria, preço e descrição.

### 4. Criação de Pedidos
- **Objetivo**: Permite que o cliente crie um pedido, selecionando produtos e suas respectivas quantidades.
- **Funcionalidade**: O pedido é processado e o total é calculado automaticamente.

### 5. Visualização e Detalhamento de Pedidos
- **Objetivo**: Permite visualizar detalhes de um pedido específico, incluindo os produtos comprados, quantidades e valor total.
- **Funcionalidade**: O pedido é exibido com todos os itens, permitindo uma rápida visualização.

### 6. Edição e Exclusão de Produtos
- **Objetivo**: Permite atualizar ou excluir produtos do banco de dados.
- **Funcionalidade**: Produtos podem ser editados ou removidos pela interface.

### 7. Cálculo de Total do Pedido
- **Objetivo**: Calcular automaticamente o valor total de cada pedido com base nos preços e nas quantidades dos produtos.
- **Funcionalidade**: Ao criar ou editar um pedido, o total é recalculado automaticamente.

## 💡 Possíveis Melhorias Futuras
- **Notificações**: Implementação de notificações para os clientes quando o pedido mudar de status.
- **Controle de Estoque**: Adicionar funcionalidades de controle de estoque de produtos.
- **Filtro Avançado de Produtos**: Implementar filtros para facilitar a busca de produtos (por preço, categoria, etc).
