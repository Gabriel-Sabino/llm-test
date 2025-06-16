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

```
.
├── constants.ts           # Constantes e configurações do sistema
├── interfaces/           # Interfaces do sistema
│   ├── Address.ts       # Interface para endereços
│   ├── LLMService.ts    # Interface para o serviço de LLM
│   ├── Order.ts         # Interface para pedidos
│   ├── OrderFormatter.ts # Interface para formatação
│   ├── OrderProcessor.ts # Interface para processamento
│   ├── OrderValidator.ts # Interface para validação
│   ├── PriceCalculator.ts # Interface para cálculos
│   ├── Product.ts       # Interface para produtos
│   └── index.ts         # Exportações das interfaces
├── services/            # Implementações dos serviços
│   ├── LLMService.ts    # Serviço de processamento de linguagem
│   ├── Logger.ts        # Serviço de logging
│   ├── OrderFormatter.ts # Formatação de pedidos
│   ├── OrderProcessor.ts # Processamento de pedidos
│   ├── OrderValidator.ts # Validação de pedidos
│   └── PriceCalculator.ts # Cálculo de preços
├── index.ts             # Ponto de entrada da aplicação
├── normalizationUtils.ts # Utilitários de normalização
├── store.ts             # Configuração dos produtos
├── structurize.ts       # Função principal de estruturação
├── testCases.ts         # Casos de teste
└── testComparison.ts    # Comparação de resultados
```

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
- Normalizar endereços e formas de pagamento
- Calcular preços automaticamente
- Formatar pedidos com emojis e formatação amigável

## 🧪 Testes

O projeto inclui uma suíte de testes que verifica:
- Processamento de pedidos simples
- Lidar com erros de português
- Processamento de abreviações
- Extração de informações em diferentes ordens
- Cálculo correto de preços
- Normalização de endereços
- Validação de dados
- Formatação de saída

## 🔄 Fluxo de Processamento

1. Recebe a mensagem do usuário
2. Processa o texto usando LLM (OpenAI)
3. Extrai e normaliza informações relevantes
4. Valida os dados usando Zod
5. Calcula o preço total
6. Formata o pedido com emojis
7. Retorna o pedido estruturado

## 📊 Tipos de Dados

### Product
```typescript
interface IProduct {
    name: string;
    quantity: number;
    price: string;
}
```

### Address
```typescript
interface IAddress {
    street: string;
    number: string | number;
    neighboorhood: string;
}
```

### Order
```typescript
interface IOrder {
    products: IProduct[];
    address: IAddress;
    payment: 'pix' | 'money' | 'credit' | 'debit' | 'VR' | 'VA';
    totalPrice: number;
}
```

## 🤝 Contribuindo

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request
