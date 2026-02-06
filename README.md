# ES Database V2

Interface moderna para visualização e gerenciamento de conhecimento técnico, integrada ao **ES Data Base API Server**.

[![CI](https://github.com/ESousa97/esdatabasev2/actions/workflows/ci.yml/badge.svg)](https://github.com/ESousa97/esdatabasev2/actions/workflows/ci.yml)
[![CodeFactor](https://www.codefactor.io/repository/github/esousa97/esdatabasev2/badge)](https://www.codefactor.io/repository/github/esousa97/esdatabasev2)
[![License](https://img.shields.io/github/license/ESousa97/esdatabasev2)](LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/ESousa97/esdatabasev2)](https://github.com/ESousa97/esdatabasev2/commits/main)
[![Issues](https://img.shields.io/github/issues/ESousa97/esdatabasev2)](https://github.com/ESousa97/esdatabasev2/issues)
[![Stars](https://img.shields.io/github/stars/ESousa97/esdatabasev2)](https://github.com/ESousa97/esdatabasev2/stargazers)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.x-brightgreen)](https://nodejs.org)
[![Next.js](https://img.shields.io/badge/next.js-14.x-black)](https://nextjs.org)
[![React](https://img.shields.io/badge/react-18.x-blue)](https://react.dev)

---

## 📌 Visão Geral

O **ES Database V2** é o frontend do ecossistema ES Data Base. Ele fornece:

- Visualização dinâmica de projetos e procedimentos técnicos
- Múltiplos modos de listagem (cards, lista compacta, detalhada)
- Autenticação via NextAuth (Google e Azure AD)
- Páginas de erro customizadas
- Tema claro/escuro com tokens de design centralizados

---

## ⚙️ Tecnologias Principais

- **Next.js 14 (Pages Router)**
- **React 18**
- **MUI 5 + Emotion**
- **NextAuth.js**
- **Jest + Testing Library**
- **ESLint + Prettier**

---

## 📂 Estrutura de Pastas

```
.
├── pages/                 # Rotas Next.js
├── public/                # Assets estáticos
├── src/
│   ├── components/        # Componentes
│   ├── contexts/          # Contextos globais
│   ├── hooks/             # Hooks customizados
│   ├── styles/            # Tokens + Tema
│   └── utils/             # Funções utilitárias
├── docs/                  # Documentação estendida
└── __tests__/             # Testes automatizados
```

---

## 🚀 Como Rodar Localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000

---

## 🧪 Testes

```bash
npm run test
npm run test:watch
npm run test:coverage
```

---

## ✅ Lint & Formatação

```bash
npm run lint
npm run format:check
npm run format
```

---

## 🔐 Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env.local` e preencha:

```
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
AZURE_AD_CLIENT_ID=...
AZURE_AD_CLIENT_SECRET=...
AZURE_AD_TENANT_ID=...
ALLOWED_EMAILS=user1@example.com,user2@example.com
NEXT_PUBLIC_API_URL=https://serverdatabase.onrender.com/api/v1
```

---

## 🧭 Documentação

- [Architecture](docs/architecture.md)
- [Environment](docs/environment.md)
- [Development](docs/development.md)

---

## 🗺️ Roadmap

- [ ] Melhorar cobertura de testes
- [ ] Aumentar automação de releases
- [ ] Refatorar páginas de erro com design tokens

---

## 🤝 Contribuição

Leia o guia completo em [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 🔒 Segurança

Vulnerabilidades devem ser reportadas via [SECURITY.md](SECURITY.md)

---

## 📜 Licença

Distribuído sob licença MIT. Veja [LICENSE](LICENSE)
