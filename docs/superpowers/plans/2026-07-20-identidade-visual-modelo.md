# Identidade visual da página-modelo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir a paleta verde pela identidade vermelho/grafite da página-modelo e incorporar seus ativos oficiais de logo e favicon.

**Architecture:** A mudança permanece no site estático existente. `src/styles.css` concentra os tokens de marca; `src/index.html` referencia os ativos; `scripts/validate-site.mjs` protege os requisitos em builds futuros.

**Tech Stack:** HTML semântico, CSS, Node.js para validação, GitHub e Cloudflare Pages.

---

### Task 1: Criar as verificações de identidade

**Files:**
- Modify: `scripts/validate-site.mjs`
- Test: `scripts/validate-site.mjs`

- [ ] **Step 1: Escrever verificações que exijam logo, favicon, Apple touch icon, tema grafite e ausência do monograma e dos tokens verdes antigos**
- [ ] **Step 2: Executar `npm run validate` e confirmar falha pelos novos requisitos ainda ausentes**

### Task 2: Importar ativos oficiais e aplicar a marca

**Files:**
- Create: `src/assets/logo.webp`
- Create: `src/assets/favicon-32.png`
- Create: `src/assets/apple-touch-icon.png`
- Modify: `src/index.html`

- [ ] **Step 1: Baixar os três ativos diretamente da página-modelo**
- [ ] **Step 2: Adicionar os links de ícone no `<head>` e substituir os dois monogramas `VC` pela logo oficial**

### Task 3: Trocar o sistema cromático

**Files:**
- Modify: `src/styles.css`

- [ ] **Step 1: Substituir tokens verdes/laranja por vermelho, grafite e neutros da página-modelo**
- [ ] **Step 2: Ajustar estados de foco, botões, planos escuros, bordas e textos para preservar contraste**
- [ ] **Step 3: Manter verde somente no botão flutuante e demais ações explicitamente associadas ao WhatsApp**

### Task 4: Verificar e publicar

**Files:**
- Generated: `dist/**`

- [ ] **Step 1: Executar `npm run check` e confirmar validação e build sem falhas**
- [ ] **Step 2: Verificar visualmente desktop e mobile**
- [ ] **Step 3: Confirmar por busca que os tokens antigos e o monograma foram removidos**
- [ ] **Step 4: Criar commit, enviar para `main` e aguardar a implantação Git do Cloudflare Pages**
- [ ] **Step 5: Consultar a URL pública e confirmar os novos ativos, cores e contatos**

