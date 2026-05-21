# ⛽ AbasteCerto — App de Fidelidade para Postos

MVP de sistema de fidelidade para postos de gasolina.  
Desenvolvido com React + Vite.

---

## 🚀 Como rodar localmente

```bash
# 1. Instalar dependências
npm install

# 2. Rodar em modo desenvolvimento
npm run dev

# 3. Abrir no navegador
http://localhost:5173
```

---

## 📦 Como fazer deploy na Vercel

### Opção 1 — Via GitHub (recomendado)
1. Suba este projeto no GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Clique em **Add New Project**
4. Conecte seu repositório do GitHub
5. Framework: **Vite** (detectado automaticamente)
6. Clique em **Deploy**

### Opção 2 — Via Vercel CLI
```bash
npm install -g vercel
vercel
```

---

## 🔑 Usuário de teste
- **Telefone:** 38999990001
- **Nome:** Nathan Henrique

---

## ✨ Funcionalidades
- Login por telefone
- Cadastro de novo usuário
- Registro de abastecimento manual
- Cálculo automático de pontos (1 pt a cada R$ 5)
- Sistema de níveis: Bronze → Prata → Ouro
- Histórico completo de abastecimentos
- Perfil do usuário com estatísticas

---

## 🗂️ Estrutura
```
abastecerto/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx       ← componente principal
│   ├── main.jsx      ← entrada React
│   └── index.css     ← estilos globais
├── index.html
├── package.json
└── vite.config.js
```

---

Desenvolvido por M.AI.T.E Studio
