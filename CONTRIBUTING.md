# Contributing Guide

Obrigado por considerar contribuir com o **ES Database V2**! Este guia descreve como contribuir de maneira eficiente e alinhada ao padrão do projeto.

---

## 📌 Pré-requisitos

- Node.js 18+
- npm 9+
- Git

---

## 🛠️ Setup Local

```bash
# Clone o repositório

git clone https://github.com/ESousa97/esdatabasev2.git
cd esdatabasev2

# Instale as dependências
npm install

# Inicie em modo dev
npm run dev
```

---

## ✅ Padrões de Código

- Use **ESLint + Prettier** (rode `npm run lint` e `npm run format`)
- Prefira componentes reutilizáveis e estilos centralizados
- Evite estilos inline, use tokens de design (`src/styles/tokens.js`)
- Siga princípios **SOLID / DRY / KISS**

---

## 🧪 Testes

```bash
npm run test
npm run test:watch
npm run test:coverage
```

---

## 📝 Commits

Usamos o padrão **Conventional Commits**:

```
feat: add new component
fix: correct login error
chore: update dependencies
docs: update README
```

---

## 📦 Pull Requests

1. Crie uma branch a partir de `main`
2. Faça commits atômicos e claros
3. Abra PR com descrição detalhada
4. Garanta que os testes e lint passem

---

## 📢 Feedback

Abra uma issue ou discussão se precisar de ajuda.

---

Obrigado por contribuir! 🚀
