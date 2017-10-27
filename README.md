## Instalação básica

##### Instalar dependencia de servidor local para testes:
```$ npm install connect serve-static```

##### Executar servidor:
```$ node server.js```

##### Acesso ao aplicativo em localhost:
url: ```http://localhost:8080/app```

## Bibliotecas utilizadas
- AngularJS v1.6.6
- Bootstrap v3.3.7
- Firebase v4.2.0

## Estrutura de arquivos

``` 
App
├── assets
├── scripts
│   ├── components
│   |   ├── example
│   |   |   ├── example.html
│   |   |   └── exampleController.js
|   |   ...
│   |   └── example2
│   ├── directives
│   ├── services
│   ├── app.constants.js
│   ├── app.controller.js
│   ├── app.js
│   ├── app.route.js
│   └── app.toastr.js
|── bower_components
└── index.html

```

- assets: mídias e estilo de páginas
- scripts:
	- components: armazena features do sistema, onde cada uma possui controller e template.
	- directives: armazena scripts genéricos utilizados por mais de uma feature.
	- services: armazena classes de serviços que são utilizadas no app.
	- app.constants.js: Contantes e enums.
	- app.controller.js: Controladora global, presente no app inteiro.
	- app.js: Núcleo do app, organize módulos e instancia o app.
	- app.route.js: Configuração de rotas das features existentes no app.
	- app.toastr.js: Configuração do módulo toastr (alertas)
- bower_components: armazena bibliotecas utilizadas no projeto.
- index.html: Arquivo html principal, carrega todos arquivos js e engloba features.

### Criando uma nova feature

1 - Criar controller e template, conforme a estrutura sugerida acima.

2 - Incluir declaração dos arquivos no final do arquivo index.html.

3 - Declarar rota de acesso para a feature, especificando controller e template.
> obs: É possível acessar rotas do sistema pelo método "go(string url)" presente na controller principal, através do $rootScope.
