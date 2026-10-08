# 🤖 Incident AI Dashboard

Um painel de observabilidade e diagnóstico de erros em tempo real desenvolvido com **Vue 3**, **Vite** e **Tailwind CSS**. O dashboard consome microsserviços em **NestJS** que processam logs assincronamente através de filas no **RabbitMQ** e utilizam a API do **Gemini AI** para gerar diagnósticos de causa raiz e sugestões de correção técnica.

---

## 📐 Arquitetura do Sistema

[ Frontend: Vue 3 ] ──( HTTP POST )──> [ log-service (Porta 3000) ]
│
( Mensageria / RabbitMQ )
│
▼
[ Frontend: Vue 3 ] <──( HTTP GET )─── [ incident-ai-service (Porta 3003) ]
│
( Gemini AI API )

1. **`log-service` (Porta 3000):** API para ingestão e armazenamento primário de eventos de erro/log no PostgreSQL.
2. **RabbitMQ:** Message broker que garante o desacoplamento e processamento assíncrono dos eventos de log.
3. **`incident-ai-service` (Porta 3003):** Consumidor da fila do RabbitMQ que envia o contexto do erro ao Gemini AI para análise avançada e armazena os diagnósticos.
4. **`incident-ai-dashboard`:** Frontend reativo com interface Glassmorphism em Vue 3.

---

## 🚀 Tecnologias Utilizadas

### **Frontend**
- **Vue 3** (Composition API `<script setup lang="ts">`)
- **TypeScript** (Tipagem centralizada e estrita)
- **Tailwind CSS v4** (`@tailwindcss/vite` com estilos customizados)
- **Vite** (Build tool e servidor de desenvolvimento)

### **Backend & Infraestrutura**
- **NestJS** (Microsserviços)
- **RabbitMQ** (Fila de mensagens)
- **PostgreSQL** (Persistência de dados)
- **Google Gemini AI API** (Geração de diagnósticos de incidentes)

---

## 📁 Estrutura do Frontend

```text
src/
├── components/
│   ├── AnalysisModal.vue   # Modal glassmorphism para detalhes da IA
│   └── LogForm.vue         # Formulário para disparo de logs de teste
├── services/
│   └── api.ts              # Camada de comunicação HTTP (fetch)
├── types/
│   └── index.ts            # Interfaces TypeScript centralizadas
├── App.vue                 # Orquestrador do layout principal
├── style.css               # Estilos globais e utilitários Glassmorphism
└── main.ts                 # Ponto de entrada da aplicação

⚙️ Configuração e Instalação
Pré-requisitos
Node.js (v18+)

Gerenciador de pacotes npm

Instâncias do log-service e incident-ai-service em execução

git clone [https://github.com/seu-usuario/incident-ai-dashboard.git](https://github.com/seu-usuario/incident-ai-dashboard.git)
cd incident-ai-dashboard
npm install

git clone [https://github.com/seu-usuario/incident-ai-dashboard.git](https://github.com/seu-usuario/incident-ai-dashboard.git)
cd incident-ai-dashboard
npm install

🧪 Como Testar o Fluxo Completo
Abra o Incident AI Dashboard no navegador.

No formulário "Disparar Log de Teste", preencha os campos (ex: Serviço order-service, Severidade ERROR e mensagem de falha de conexão).

Clique em "Enviar Evento".

O evento será enviado ao log-service, enfileirado no RabbitMQ, analisado em segundo plano pelo Gemini AI e persistido pelo incident-ai-service.

Após alguns segundos, clique em "Atualizar" para visualizar o diagnóstico de causa raiz na lista.

Clique no card do incidente para abrir o modal de detalhes com a sugestão de correção técnica.

