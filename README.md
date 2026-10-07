# Vertical Chão Institucional

Site institucional estático da Vertical Chão para Cloudflare Pages.

## Formulário por e-mail

O formulário está preparado para um Cloudflare Worker que encaminha as solicitações para `verticalchao@gmail.com`. A configuração pública fica em `src/contact-config.js`; o estado de publicação e a verificação do destinatário são conferidos no processo de deploy. Se `endpoint` ou `turnstileSiteKey` estiver vazio, o botão fica desabilitado, um aviso informa a indisponibilidade e o contato manual por e-mail permanece acessível. Os CTAs de WhatsApp continuam independentes.

Antes de publicar, confira o endpoint HTTPS completo do Worker e a sitekey pública real do Turnstile em `src/contact-config.js`. Não coloque tokens, credenciais nem a chave secreta nesse arquivo. O widget deve autorizar os domínios publicados; o Worker deve permitir essas origens e validar a ação `contact`. Chaves oficiais de teste do Turnstile são recusadas pelo cliente.

`src/contact-form.js` carrega o Turnstile explicitamente e envia JSON por POST com `nome`, `email`, `telefone`, `servico`, `mensagem`, `website` (honeypot), `turnstileToken` e `pageUrl` (somente origem e caminho). Nome tem 2–120 caracteres, e-mail é obrigatório (até 254), telefone é opcional (10–15 dígitos quando preenchido), serviço tem até 120 e mensagem é obrigatória (até 5.000). O destinatário é fixado no Worker, nunca recebido do formulário.

O cliente confirma recebimento para envio apenas após HTTP de sucesso com `{ "ok": true, "requestId": "..." }`. Isso não comprova entrega na caixa do Gmail. Erros 400/403/429/502/503 preservam os campos. Há timeout de 15 segundos, prevenção de duplo envio e renovação do Turnstile após a tentativa. O evento `form_submitted` ocorre apenas após essa confirmação, com nome do formulário e `contact_method: "email"`, sem dados pessoais.

Sem JavaScript, o botão permanece desabilitado e o aviso oferece o endereço de e-mail. O formulário usa POST também no HTML para não colocar dados pessoais na URL. A entrada completa é transmitida ao Worker, não armazenada em `localStorage` ou enviada ao analytics.

`npm run check` valida o cliente e o build; ele não declara que endpoint, domínio ou envio real estejam configurados. Após preencher a configuração, valide Turnstile, CORS e recebimento com um envio identificado como teste antes de anunciar o formulário operacional.

## Galeria e revisão de setembro de 2026

`src/gallery.js` amplia as oito fotos em um diálogo nativo, com fechamento por botão, Escape ou clique no fundo, foco contido no diálogo e retorno à miniatura. Sem JavaScript, os links abrem os arquivos das fotos. As miniaturas usam quatro colunas no desktop, três no tablet e duas no celular, sempre quadradas.

As fotos de limpeza de vidros e de EcoGranito vieram das páginas públicas da própria empresa. A foto anteriormente nomeada `limpeza-fachada.jpg` foi mantida com esse nome de arquivo e movida para pintura conforme indicação do cliente. As notas, origens, hashes e capturas da revisão estão em `../outputs/verticalchao/lp/qa/2026-09-10-publicacao-home/`.

## Contatos obrigatórios

- Principal: `(31) 93301-1440` / `tel:+5531933011440`
- WhatsApp: `https://api.whatsapp.com/send?phone=5531933011440&text=Ol%C3%A1,%20preciso%20de%20um%20atendimento!`
- Engenharia Ademar (rodapé): `(31) 98712-2106`
- Removido: qualquer uso público do número comercial antigo substituído neste projeto.

## Comandos

- `npm run build`
- `npm run validate`
- `npm run check`

## Deploy

O projeto foi preparado para Cloudflare Pages.

- Build command: `npm run build`
- Build output directory: `dist`
- Production branch: `main`
