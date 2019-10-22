# README

Estes documento README tem como objetivo fornecer as informações necessárias para realização do projeto Empresas.

### O QUE FAZER ?

- Você deve realizar um fork deste repositório e, ao finalizar, enviar o link do seu repositório para a nossa equipe. Lembre-se, NÃO é necessário criar um Pull Request para isso, nós iremos avaliar e retornar por email o resultado do seu teste.

### ESCOPO DO PROJETO

- Deve ser criada uma API em **NodeJS** ou **Ruby on Rails**.
- A API deve fazer o seguinte:

1. Login e acesso de Usuário já registrado;
2. Para o login usamos padrões **JWT** ou **OAuth 2.0**;
3. Listagem de Empresas
4. Detalhamento de Empresas
5. Filtro de Empresas por nome e tipo

### Informações Importantes

- A API deve funcionar exatamente da mesma forma que a disponibilizada na collection do postman, mais abaixo os acessos a API estarão disponíveis em nosso servidor.

  - Para o login usamos padrões OAuth 2.0. Na resposta de sucesso do login a api retornará 3 custom headers (access-token, client, uid);

  - Para ter acesso as demais APIS precisamos enviar esses 3 custom headers para a API autorizar a requisição;

- Mantenha a mesma estrutura do postman em sua API, ou seja, ela deve ter os mesmo atributos, respostas, rotas e tratamentos, funcionando igual ao nosso exemplo.

- Quando seu código for finalizado e disponibilizado para validarmos, vamos subir em nosso servidor e realizar a integração com o app.

- Independente de onde conseguiu chegar no teste é importante disponibilizar seu fonte para analisarmos.

- É obrigatório utilização de Banco de Dados MySql/PostgreSQL

### Dados para Teste

- Servidor: https://empresas.ioasys.com.br/
- Versão da API: v1
- Usuário de Teste: testeapple@ioasys.com.br
- Senha de Teste : 12341234

### Dicas

- Documentação JWT https://jwt.io/
- Frameworks NodeJS:

  1. https://expressjs.com/pt-br/
  2. https://sailsjs.com/

- Guideline rails http://guides.rubyonrails.org/index.html
- Componente de autenticação https://github.com/lynndylanhurley/devise_token_auth
