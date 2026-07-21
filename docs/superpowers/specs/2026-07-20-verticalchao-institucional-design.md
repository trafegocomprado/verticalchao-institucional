# Design do site institucional Vertical Chão

## Objetivo

Substituir a hospedagem paga do site institucional da Vertical Chão por uma página estática moderna, responsiva e de baixa manutenção, publicada no Cloudflare Pages a partir de um repositório GitHub da conta `trafegocomprado`.

O novo site preservará o conteúdo institucional e a cobertura de serviços de `www.verticalchao.com.br`, adotando o padrão visual e técnico de `pinturafachadas.verticalchao.com.br`.

## Escopo

O projeto será um site institucional de uma página, em português do Brasil, preparado para futura expansão com páginas individuais de serviços. A primeira versão não terá banco de dados, painel administrativo, autenticação ou processamento de formulários no servidor.

## Direção visual

- Manter a identidade reconhecível da Vertical Chão, com verde e laranja como cores principais.
- Usar tipografia forte, hierarquia clara, fundos alternados e CTAs de alto contraste.
- Priorizar fotografias reais de obras e da equipe, reutilizadas dos canais públicos do cliente quando tecnicamente adequadas.
- Adotar o ritmo visual, os componentes e o nível de acabamento da landing page de referência, sem limitar o conteúdo ao serviço de pintura.
- Garantir boa leitura, alvos de toque confortáveis e CTAs visíveis em telas móveis.

## Arquitetura da página

1. Header com logomarca, navegação por âncoras, ligação comercial e WhatsApp.
2. Hero com proposta de valor, experiência, prova de execução e CTA de orçamento.
3. Faixa de confiança destacando segurança, eficiência, pontualidade e qualificação.
4. Seção "Quem somos" com histórico, credenciais, responsáveis e indicadores.
5. Grade com o catálogo completo de serviços da empresa.
6. Blocos de destaque para limpeza de fachadas, reposição de pastilhas, pintura de fachadas e aplicação de Ecogranito.
7. Galeria responsiva de obras.
8. Depoimentos de clientes.
9. Seção de orçamento e contato com formulário que prepara uma mensagem no WhatsApp.
10. Rodapé com endereço, CNPJ, responsável técnico, telefones, e-mail e atalhos.
11. Botão flutuante de WhatsApp com um único atendimento comercial.

## Conteúdo e contatos

O conteúdo será adaptado do site institucional atual, com correções de clareza e consistência que não alterem alegações comerciais ou técnicas.

Os contatos obrigatórios são:

- Ligação e telefone comercial principal: `(31) 99684-8477`, com `tel:+5531996848477`.
- WhatsApp comercial: `https://api.whatsapp.com/send?phone=5531996848477&text=Ol%C3%A1,%20preciso%20de%20um%20atendimento!`.
- Segundo telefone no rodapé: `(31) 98712-2106`, com `tel:+5531987122106`.
- E-mail: `verticalchao@gmail.com`.
- O número comercial antigo e qualquer link correspondente serão removidos de todo o site.
- O card antigo do widget Ninja Team vinculado ao número removido não será reproduzido.
- O botão flutuante apontará somente para o WhatsApp comercial `99684-8477`.

Mensagens específicas de campanha poderão existir em CTAs contextuais, desde que sempre apontem para o número comercial correto. O header, o rodapé e o widget usarão exatamente o link comercial definido acima.

## Comportamento

- A navegação principal rolará até as seções da mesma página.
- O menu móvel abrirá e fechará por toque e teclado, com estado acessível.
- O formulário validará no navegador os campos obrigatórios e abrirá o WhatsApp com a mensagem preenchida; nenhum dado será armazenado pelo site.
- Links de telefone permanecerão como alternativa caso o WhatsApp não esteja disponível.
- A galeria terá imagens responsivas e carregamento adiado fora da primeira dobra.
- Animações, se usadas, serão discretas e respeitarão a preferência de movimento reduzido do sistema.

## SEO, acessibilidade e desempenho

- Título, descrição, URL canônica e metadados sociais serão específicos do site institucional.
- Dados estruturados `LocalBusiness` representarão a Vertical Chão e os telefones vigentes.
- O HTML terá landmarks, hierarquia correta de títulos, textos alternativos e foco visível.
- As imagens serão dimensionadas e comprimidas em formatos modernos, preservando qualidade suficiente para apresentar as obras.
- CSS e JavaScript serão mínimos, sem dependências de um CMS ou serviços pagos.
- O layout será responsivo desde celulares pequenos até telas grandes.

## Código e publicação

- O código ficará em um novo repositório GitHub da conta `trafegocomprado`.
- O site será compatível com build e hospedagem estática no Cloudflare Pages.
- Um novo projeto Pages será integrado ao repositório GitHub; pushes na branch `main` gerarão novas publicações automaticamente.
- O primeiro deploy utilizará o subdomínio gratuito `pages.dev` fornecido pela Cloudflare.
- O domínio personalizado será configurado manualmente pelo usuário após a entrega.
- Nenhuma configuração do domínio principal atual será alterada durante este trabalho.

## Tratamento de falhas

- Falhas de validação do formulário serão mostradas junto aos campos e não abrirão o WhatsApp.
- Imagens terão dimensões reservadas e texto alternativo; o conteúdo essencial não dependerá de imagens.
- Se o JavaScript estiver indisponível, os links diretos de telefone e WhatsApp continuarão funcionando.
- A publicação só será considerada concluída após o build local e o deploy do Pages terminarem sem erros.

## Validação

- Executar o build de produção.
- Verificar navegação por teclado, foco, menu móvel e formulário.
- Verificar os principais layouts em desktop e celular.
- Confirmar que links de ligação e WhatsApp usam os destinos aprovados.
- Buscar no conteúdo público e no código de produção por variações do número removido; nenhuma ocorrência poderá permanecer.
- Confirmar que o rodapé contém apenas `99684-8477` e `98712-2106`.
- Confirmar que o widget flutuante oferece somente o atendimento comercial.
- Conferir metadados, dados estruturados, imagens e links internos.
- Confirmar que o GitHub é a origem do projeto Cloudflare Pages e que um push na `main` aciona uma publicação.

## Critérios de aceite

O trabalho estará concluído quando o site institucional estiver acessível em um novo endereço `pages.dev`, o repositório pertencer a `trafegocomprado`, a integração GitHub–Cloudflare estiver ativa, todos os contatos corresponderem a esta especificação e não houver dependência da hospedagem atual para servir o novo site.
