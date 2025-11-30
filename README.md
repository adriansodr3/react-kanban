# React Kanban

Um quadro Kanban moderno e responsivo desenvolvido com React, TypeScript e Radix UI para gerenciamento eficiente de tarefas.

## Sobre o Projeto

Este projeto é uma aplicação web de gerenciamento de tarefas no estilo Kanban, desenvolvida como parte dos meus estudos em React e TypeScript. A aplicação permite criar, editar, atualizar status e excluir tarefas, organizando-as em três colunas: "Para fazer", "Em progresso" e "Concluídas".

## Demonstração

![React Kanban Board](https://img.shields.io/badge/Status-Completo-success)

### Funcionalidades Principais

- Criação de tarefas com título, descrição, status e prioridade
- Edição completa de tarefas existentes
- Sistema de prioridades (Baixa, Média, Alta) com cores distintas
- Transição de tarefas entre estados (Iniciar → Concluir → Arquivar)
- Exclusão de tarefas
- Interface responsiva e moderna
- Persistência de dados com JSON Server

## Tecnologias Utilizadas

### Core
- **React 19.2.0** - Biblioteca JavaScript para construção de interfaces
- **TypeScript 5.9.3** - Superset JavaScript com tipagem estática
- **Vite 7.2.4** - Build tool e dev server de alta performance

### UI/UX
- **Radix UI** - Sistema de componentes acessíveis e customizáveis
  - `@radix-ui/themes` - Tema e componentes visuais
  - `@radix-ui/react-icons` - Biblioteca de ícones

### Validação & Utilities
- **Zod 4.1.13** - Validação de schemas TypeScript-first

### Backend (Desenvolvimento)
- **JSON Server 1.0.0-beta.3** - REST API fake para desenvolvimento

### Ferramentas de Desenvolvimento
- **ESLint** - Linter para manter qualidade do código
- **Vite Plugin React** - Suporte otimizado para React no Vite

## Estrutura do Projeto

```
react-kanbam/
├── src/
│   ├── components/
│   │   ├── CreateTaskForm.tsx    # Formulário de criação de tarefas
│   │   ├── TaskBoard.tsx          # Quadro Kanban principal
│   │   └── TaskCard.tsx           # Card individual de tarefa
│   ├── contexts/
│   │   └── TasksContext.tsx       # Context API para gerenciamento de estado
│   ├── entities/
│   │   └── Task.ts                # Tipos e interfaces de Task
│   ├── hooks/
│   │   └── useTask.ts             # Hook customizado para tarefas
│   ├── services/
│   │   └── api.ts                 # Serviço de comunicação com API
│   ├── App.tsx                    # Componente raiz
│   ├── main.tsx                   # Ponto de entrada da aplicação
│   └── index.css                  # Estilos globais
├── db.json                        # Banco de dados JSON Server
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Arquitetura e Conceitos Aplicados

### Padrões Utilizados
- **Context API** - Gerenciamento de estado global das tarefas
- **Custom Hooks** - Encapsulamento de lógica reutilizável
- **Service Layer** - Separação de lógica de comunicação com API
- **Type Safety** - Tipagem forte com TypeScript e Zod

### Conceitos React
- Componentes funcionais com TypeScript
- Hooks (useState, useEffect, useContext)
- Controlled Forms
- Event Handlers tipados
- Props com interfaces

## Instalação e Execução

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Passos para Execução

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/react-kanbam.git
cd react-kanbam
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente
```bash
# Crie um arquivo .env.local na raiz do projeto
echo "VITE_API_URL=http://localhost:3000" > .env.local
```

4. Execute o JSON Server (em um terminal)
```bash
npm run json-server
```

5. Execute a aplicação (em outro terminal)
```bash
npm run dev
```

6. Acesse no navegador
```
http://localhost:5173
```

## Scripts Disponíveis

```bash
npm run dev          # Inicia o servidor de desenvolvimento
npm run build        # Cria build de produção
npm run preview      # Preview da build de produção
npm run lint         # Executa o linter
npm run json-server  # Inicia o JSON Server na porta 3000
npm start            # Inicia o servidor em produção
```

## Deploy no Render

Este projeto pode ser facilmente implantado no Render em dois serviços separados:

### 1. Deploy do Backend (JSON Server)

1. Acesse [Render](https://render.com) e faça login
2. Clique em "New +" e selecione "Web Service"
3. Conecte seu repositório GitHub
4. Configure o serviço:
   - **Name**: `react-kanban-api` (ou nome de sua preferência)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`
5. Clique em "Create Web Service"
6. Após o deploy, copie a URL do serviço (ex: `https://react-kanban-api.onrender.com`)

### 2. Deploy do Frontend (React)

1. No Render, clique em "New +" e selecione "Static Site"
2. Conecte o mesmo repositório GitHub
3. Configure o site:
   - **Name**: `react-kanban` (ou nome de sua preferência)
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Adicione uma variável de ambiente:
   - **Key**: `VITE_API_URL`
   - **Value**: URL do seu backend (ex: `https://react-kanban-api.onrender.com`)
5. Clique em "Create Static Site"

### Configurações Importantes

- O backend (JSON Server) deve ser implantado como **Web Service** (não Static Site)
- O frontend deve ser implantado como **Static Site**
- Certifique-se de que a variável `VITE_API_URL` aponta para a URL correta do backend
- O plano gratuito do Render pode ter cold start (demora inicial quando inativo)

### Após o Deploy

Sua aplicação estará disponível em duas URLs:
- **Frontend**: `https://react-kanban.onrender.com` (ou o nome que você escolheu)
- **Backend API**: `https://react-kanban-api.onrender.com` (usado internamente pelo frontend)

**Nota**: No plano gratuito do Render, os serviços podem ficar inativos após 15 minutos sem uso e levar alguns segundos para reativar na primeira requisição.

## Estrutura de Dados

### Task Entity
```typescript
interface Task {
  id: number | string;
  title: string;
  description: string;
  status: "todo" | "doing" | "done";
  priority: "low" | "medium" | "high";
}
```

## Funcionalidades Detalhadas

### Gerenciamento de Tarefas
- **Criar**: Formulário modal com validação via Zod
- **Editar**: Edição completa de todos os campos da tarefa
- **Status**: Progressão linear (Para fazer → Em progresso → Concluída)
- **Prioridades**: Sistema visual com badges coloridas
- **Excluir**: Remoção permanente de tarefas

### Sistema de Prioridades
- **Baixa** (Sky): Tarefas de menor urgência
- **Média** (Amber): Tarefas de urgência moderada
- **Alta** (Tomato): Tarefas prioritárias

### Interface do Usuário
- Design clean e moderno com Radix UI
- Feedback visual para diferentes estados
- Modais para criação e edição
- Layout responsivo em grid
- Scroll horizontal no quadro

## Aprendizados

Este projeto foi desenvolvido como parte da minha jornada de aprendizado em React e TypeScript, onde pude praticar:

- Arquitetura de componentes React
- Gerenciamento de estado com Context API
- Tipagem estática com TypeScript
- Integração com APIs REST
- Validação de formulários com Zod
- UI moderna com Radix UI
- Hooks customizados
- Boas práticas de desenvolvimento

## Licença

Este projeto é de código aberto e está disponível para fins educacionais.

## Contato

Desenvolvido como projeto de estudo em React e TypeScript.

---

**Nota**: Este é um projeto educacional desenvolvido para demonstrar habilidades em desenvolvimento frontend com React, TypeScript e ferramentas modernas do ecossistema JavaScript.
