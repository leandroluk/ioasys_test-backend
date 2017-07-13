# README #

Estes documento README tem como objetivo fornecer as informações necessárias para realização do projeto Empresas.

### O QUE FAZER ? ###

* Você deve fazer um fork deste repositório, criar o código e ao finalizar realizar o commit e solicitar um pull request, nós iremos avaliar e retornar por email o resultado do seu teste.

### ESCOPO DO PROJETO ###

* Login e acesso de Usuário já registrado
	* Para o login usamos padrões OAuth 2.0. Na resposta de sucesso do login a api retornará 3 custom headers (access-token, client, uid);
	* Para ter acesso as demais APIS precisamos enviar esses 3 custom headers para a API autorizar a requisição;
* Listagem de Empresas
* Detalhamento de Empresas
* Filtro de Empresas por nome e tipo


### Informações Importantes ###

* Modelo de Integração disponível a partir de uma collection para Postman (https://www.getpostman.com/apps) disponível neste repositório.

* A API deve funcionar exatamente da mesma forma que a disponibilizada na collection do postman, mais abaixo os acessos a API estarão disponíveis em nosso servidor.

* Mantenha a mesma estrutura do postman em sua API, ou seja, ela deve ter os mesmo atributos, respostas, rotas e tratamentos, funcionando igual ao nosso exemplo.

* Quando seu código for finalizado e disponibilizado para validarmos, vamos subir em nosso servidor e realizar a integração com o app. 

* Independente de onde conseguiu chegar no teste é importante disponibilizar seu fonte para analisarmos.

* É obrigatório utilização de Banco de Dados MySql

### Dados para Teste ###

* Servidor: http://54.94.179.135:8090
* Versão da API: v1
* Usuário de Teste: testeapple@ioasys.com.br
* Senha de Teste : 12341234

### Dicas ###

* Guideline rails http://guides.rubyonrails.org/index.html
* Componente de autenticação https://github.com/rizel10/simple_token_auth
* Componente de autenticação https://github.com/lynndylanhurley/devise_token_auth