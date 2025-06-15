# Sistema de Processamento de Pedidos de Restaurante

Este é um sistema de processamento de pedidos de restaurante que utiliza processamento de linguagem natural para interpretar e estruturar pedidos de clientes.

## 🚀 Tecnologias Utilizadas

- TypeScript
- Node.js
- OpenAI API
- Zod (para validação de dados)
- dotenv (para gerenciamento de variáveis de ambiente)

## 📋 Pré-requisitos

- Node.js instalado
- NPM ou Yarn
- Chave de API da OpenAI

## 🔧 Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```
3. Crie um arquivo `.env` na raiz do projeto e adicione sua chave da OpenAI:
```
OPENAI_API_KEY=sua_chave_aqui
```

## 🏃‍♂️ Executando o Projeto

Para iniciar o servidor de desenvolvimento:
```bash
npm run dev
```

## 📁 Estrutura do Projeto

- `index.ts` - Ponto de entrada da aplicação
- `testCases.ts` - Casos de teste e tipos de dados
- `store.ts` - Configuração dos produtos disponíveis
- `structurize.ts` - Lógica de processamento de pedidos
- `normalizationUtils.ts` - Utilitários para normalização de texto
- `testComparison.ts` - Comparação de resultados dos testes

## 📝 Funcionalidades

O sistema é capaz de:
- Processar pedidos em linguagem natural
- Extrair informações como:
  - Produtos e quantidades
  - Endereço de entrega
  - Forma de pagamento
  - Preço total
- Lidar com variações de escrita e erros comuns
- Validar e estruturar os dados do pedido

## 🧪 Testes

O projeto inclui uma suíte de testes que verifica:
- Processamento de pedidos simples
- Lidar com erros de português
- Processamento de abreviações
- Extração de informações em diferentes ordens
- Cálculo correto de preços

## 🔄 Fluxo de Processamento

1. Recebe a mensagem do usuário
2. Processa o texto usando NLP
3. Extrai informações relevantes
4. Estrutura os dados do pedido
5. Valida as informações
6. Retorna o pedido estruturado

## 📊 Tipos de Dados

### Product
```typescript
type Product = {
    name: string;
    quantity: number;
}
```

### TestCase
```typescript
type TestCase = {
    userMessage: string;
    expectedResults: {
        products: Product[];
        address: {
            street: string;
            number: string | number;
            neighboorhood: string;
        };
        payment: 'pix' | 'money' | 'credit' | 'debit' | 'VR' | 'VA';
        totalPrice: number;
    };
}
```

## 🤝 Contribuindo

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request
