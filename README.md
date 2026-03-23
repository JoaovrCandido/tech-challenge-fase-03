# Tech Challenge Fase 3 - App de Gerenciamento de Transações Financeiras

Um aplicativo móvel para gerenciamento pessoal de transações financeiras, desenvolvido com React Native e Expo. Permite aos usuários rastrear entradas (depósitos) e saídas (transferências), visualizar saldo em tempo real, fazer upload de recibos e analisar dados financeiros através de dashboards interativos.

## 🚀 Tecnologias Utilizadas

### Framework e Linguagem

- **Expo** (v54.0.33) - Framework universal para React Native
- **React Native** (0.81.5) com React 19.1.0
- **TypeScript** (5.9.2) - Para tipagem estática e segurança de código
- **Expo Router** (6.0.23) - Sistema de roteamento baseado em arquivos

### Backend e Serviços

- **Firebase** (12.10.0):
  - Authentication para gerenciamento de usuários
  - Firestore para banco de dados em tempo real
  - Storage para upload de arquivos (recibos)

### UI e Animações

- React Navigation (abas inferiores e gaveta)
- React Native SVG para renderização de gráficos
- React Native Reanimated para animações suaves
- @expo/vector-icons para ícones

### Desenvolvimento

- ESLint para linting de código
- TypeScript para configuração de compilação

## 📱 Funcionalidades Principais

### 🔐 Sistema de Autenticação

- Cadastro de usuários com validação de nome, email e senha
- Login com tratamento de erros (usuário não encontrado, credenciais inválidas)
- Logout e persistência de sessão
- Proteção de rotas baseada em estado de autenticação

### 💰 Dashboard Financeiro

- Cálculo de saldo em tempo real
- Gráfico de pizza animado mostrando distribuição de depósitos/transferências
- Análise de volume diário de transações
- Toggle para mostrar/ocultar saldo

### 📊 Gerenciamento de Transações

- Criar transações (depósitos e transferências)
- Editar transações existentes
- Excluir transações com confirmação
- Filtragem por categoria (todas/depósitos/transferências) e período
- Carregamento lazy de transações (5 itens por vez)

### 📎 Gerenciamento de Recibos

- Upload de recibos junto com transações (imagens ou PDFs)
- Armazenamento seguro no Firebase Storage
- Vinculação de recibos às transações no Firestore
- Visualização/download de links de recibos

## 🏗️ Estrutura do Projeto

```
├── app/                    # Páginas e navegação
│   ├── _layout.tsx        # Layout raiz com lógica de roteamento
│   ├── login.tsx          # Tela de login
│   ├── register.tsx       # Tela de cadastro
│   ├── new-transaction.tsx # Criar nova transação
│   ├── edit-transaction.tsx # Editar transação
│   └── (tabs)/            # Navegação por abas
│       ├── _layout.tsx    # Configuração das abas
│       ├── index.tsx      # Dashboard principal
│       └── transacoes.tsx # Lista de transações
├── components/            # Componentes reutilizáveis
│   ├── BankHeader/        # Cabeçalho com saudação e saldo
│   ├── FinancialDashboard/ # Dashboard financeiro
│   ├── TransactionList/   # Lista de transações
│   └── Header/           # Componentes de cabeçalho
├── hooks/                 # Hooks customizados
│   ├── useAuth.ts        # Gerenciamento de estado de auth
│   ├── useBalance.ts     # Cálculo de saldo
│   └── useTransactions.ts # Lista de transações
├── services/              # Integração com backend
│   ├── firebase.ts       # Configuração do Firebase
│   ├── auth.ts           # Funções de autenticação
│   ├── transactions.ts   # CRUD de transações
│   └── receipts.ts       # Gerenciamento de recibos
├── types/                 # Definições TypeScript
│   └── index.ts          # Interfaces e tipos
├── utils/                 # Funções utilitárias
│   ├── financeUtils.ts   # Cálculos financeiros
│   ├── formatCurrency.ts # Formatação de moeda BRL
│   ├── formatters.ts     # Formatação de datas
│   └── ...               # Outros utilitários
└── mocks/                 # Dados mockados para desenvolvimento
    └── transactions.ts   # Transações de exemplo
```

## 🛠️ Instalação e Execução

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Conta no Firebase (para configuração do backend)

### Passos de Instalação

1. **Clone o repositório**

   ```bash
   git clone <url-do-repositorio>
   cd tech-challenge-fase3
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Configure o Firebase**
   - Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
   - Habilite Authentication, Firestore e Storage
   - Copie as configurações do SDK para `services/firebase.ts`

4. **Inicie o aplicativo**
   ```bash
   npx expo start
   ```

### Opções de Execução

- **Desenvolvimento**: `npx expo start` - Abre o menu do Expo CLI
- **Android**: Pressione `a` no terminal do Expo
- **iOS**: Pressione `i` no terminal do Expo (macOS necessário)
- **Web**: Pressione `w` no terminal do Expo

## 📖 Como Usar

### Primeiro Acesso

1. Abra o app e vá para "Cadastrar"
2. Preencha nome, email e senha
3. Faça login com suas credenciais

### Adicionando Transações

1. Na aba "Transações", toque em "+" ou "Nova Transação"
2. Selecione tipo (Depósito ou Transferência)
3. Insira valor e descrição
4. Opcionalmente, anexe um recibo
5. Salve a transação

### Visualizando Dados

- **Dashboard**: Visualize saldo e gráfico de distribuição
- **Transações**: Filtre por tipo e período
- **Saldo**: Toque no ícone do olho para mostrar/ocultar

## 🔧 Scripts Disponíveis

```bash
npm start          # Inicia o servidor de desenvolvimento
npm run android    # Executa no emulador Android
npm run ios        # Executa no simulador iOS
npm run web        # Executa na web
npm run reset-project # Reseta para projeto em branco
```

## 📊 Padrões Técnicos

### Arquitetura

- **Separação de responsabilidades**: Componentes, hooks, serviços e utilitários
- **Assinaturas em tempo real**: Firestore listeners para atualização automática
- **Gerenciamento de estado**: Hooks customizados para lógica de negócio
- **Tipagem forte**: TypeScript em todo o projeto

### Fluxo de Dados

```
Autenticação → Layout Raiz verifica estado
    ↓
useBalance → Assina transações do usuário
    ↓
Dashboard processa dados para gráficos
    ↓
Lista mostra transações filtradas
    ↓
Criação → Upload de recibo → Vinculação
    ↓
Sincronização via Firestore em tempo real
```

### Tratamento de Erros

- Mapeamento de códigos de erro do Firebase para mensagens em português
- Validação de formulários no frontend
- Confirmações para ações destrutivas

## 🌐 Recursos Adicionais

- [Documentação do Expo](https://docs.expo.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [React Navigation](https://reactnavigation.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

**Desenvolvido como parte do Tech Challenge - Fase 3**
