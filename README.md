# Átimo Soluções Integradas

Projeto inicial de front-end estático para a landing page, formulário de solicitação, acompanhamento e painel administrativo da Átimo Soluções Integradas.

## Visão geral

Esta etapa implementa a base estrutural do produto com:

- landing page profissional provisória
- formulário de solicitação de análise documental
- página de acompanhamento público
- painel administrativo com fluxo de autenticação em etapa de configuração
- integração de demonstração com a API pública ViaCEP
- navegação SPA em seções principais
- CSS Grid, Flexbox e layout responsivo

## Estrutura de arquivos

- `index.html` — página inicial
- `solicitacao.html` — formulário de análise documental
- `acompanhar.html` — consulta de status
- `admin.html` — painel administrativo
- `css/` — estilos globais e específicos
- `js/` — módulos de roteamento, API, validação e interação
- `js/storage.js` — armazenamento local das solicitações em navegador via localStorage
- `assets/images/` — material visual futuro

## Execução local

1. Abra a pasta do projeto em um servidor local estático.
2. Se estiver usando Python:
   ```bash
   cd "c:\Users\eduardo.machado\Desktop\Átimo Soluções Integradas"
   python -m http.server 8000
   ```
3. Acesse:
   ```text
   http://localhost:8000
   ```

## Observações importantes

- O painel administrativo desta etapa usa autenticação local em demonstração e armazenamento via localStorage.
- O contato via WhatsApp e os dados oficiais da empresa devem ser revisados quando houver informação definitiva.
- O frontend não expõe chaves de serviço, senhas ou segredos.
- O fluxo atual é compatível com execução local e com testes em navegador sem backend externo.

## Próximos passos sugeridos

1. Definir identidade visual oficial.
2. Validar a experiência de persistência localStorage em dispositivos e navegadores reais.
3. Migrar para backend real caso a solução avance para produção.
4. Reforçar autenticação e regras de acesso do painel administrativo.
5. Publicar em Netlify ou outro host com domínio oficial.
