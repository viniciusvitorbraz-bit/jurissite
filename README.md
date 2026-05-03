# Juris.Admin — Landing Page

Landing page do **Juris.Admin**, um SaaS de gestão para escritórios de advocacia. O site apresenta as funcionalidades do produto, diferenciais de segurança, inteligência artificial integrada e planos de assinatura.

---

## Stack

- **HTML5** — estrutura e conteúdo
- **React 18** via CDN — componentes interativos sem build system
- **Babel Standalone** — transpila JSX diretamente no browser
- **CSS Animations** — animações customizadas com `@keyframes`
- **Geist Font** (Google Fonts) — tipografia

Nenhuma instalação necessária. O site roda abrindo um único arquivo HTML no browser.

---

## Estrutura de arquivos

```
JURI SITE/
├── index-v2.html          # Página principal (versão atual)
├── index.html             # Versão anterior
├── juris-neuronix.html    # Página alternativa
├── glowing-card.jsx       # Componente React: card com efeito tilt e spotlight
├── hover-button.jsx       # Componente React: botão com efeito de partículas
├── tweaks-panel.jsx       # Painel de ajustes para desenvolvimento
├── components/
│   └── ui/
│       └── scroll-steps.tsx   # Componente de scroll em etapas (referência)
└── assets/
    ├── hero-bg.webp           # Background da hero section
    ├── logo.webp              # Logo do produto
    └── ...                    # Demais imagens e ícones
```

---

## Como rodar localmente

### Opção 1 — Abrir direto no browser
Clique duas vezes no arquivo `index-v2.html`. Funciona sem nenhuma configuração.

### Opção 2 — Servidor local (recomendado para desenvolvimento)
Com Node.js instalado, rode no terminal dentro da pasta do projeto:

```bash
npx live-server --port=3000 index-v2.html
```

Depois acesse `http://localhost:3000/index-v2.html`. O browser recarrega automaticamente ao salvar o arquivo.

Ou com Python (sem auto-reload):

```bash
python3 -m http.server 3000
```

---

## Seções do site

| Seção | Descrição |
|---|---|
| **Hero** | Headline principal com palavra rotativa, CTA e imagem do dashboard |
| **Dashboard** | Preview do produto em perspectiva 3D |
| **Funcionalidades** | Cards de Gestão Processual, Financeiro e outros módulos |
| **Implementação** | Passo a passo de onboarding com scroll animado |
| **Segurança** | Cards animados com diferenciais de proteção de dados |
| **Inteligência Artificial** | Funcionalidades de IA integrada ao produto |
| **Preços** | Planos de assinatura |
| **Footer** | Links e informações de contato |
