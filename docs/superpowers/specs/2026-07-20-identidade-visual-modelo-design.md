# Identidade visual alinhada à página-modelo

## Objetivo

Corrigir a identidade cromática do site institucional para que ela siga a página-modelo `pinturafachadas.verticalchao.com.br` e usar os ativos oficiais de marca publicados nessa página.

## Direção visual aprovada

- Usar vermelho `#E8333B` como cor de marca e ação.
- Usar grafite `#14171F` e suas variações nos planos escuros.
- Usar `#FAFAF8` e branco nos planos claros.
- Reservar verde `#25D366` exclusivamente para ações diretamente identificadas como WhatsApp.
- Preservar layout, conteúdo, imagens de obra, contatos e comportamento existentes.

## Ativos

- Baixar `assets/img/webp/logo.webp` da página-modelo para `src/assets/logo.webp`.
- Baixar `assets/favicon-32.png` da página-modelo para `src/assets/favicon-32.png`.
- Baixar `assets/apple-touch-icon.png` da página-modelo para `src/assets/apple-touch-icon.png`.
- Exibir a logo real no cabeçalho e no rodapé, removendo o monograma textual `VC`.
- Referenciar favicon e Apple touch icon no documento HTML.

## Qualidade e verificação

- A validação estática deve falhar se os tokens verdes antigos, o monograma `brand-mark` ou os links de ícone estiverem incorretos.
- A validação deve confirmar a existência física dos três ativos.
- O site deve manter contraste legível, foco visível e funcionamento responsivo.
- O build deve ser publicado pelo repositório GitHub já conectado ao Cloudflare Pages.

