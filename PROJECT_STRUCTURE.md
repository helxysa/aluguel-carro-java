# Estrutura do Projeto

## Visão Geral

```
aluguel-carro-java/
├── src/
│   ├── main/
│   │   ├── java/projeto/demo/
│   │   │   ├── Application.java              # Classe principal
│   │   │   ├── config/                       # Configurações
│   │   │   │   ├── CorsConfig.java          # CORS
│   │   │   │   ├── OpenApiConfig.java       # Swagger
│   │   │   │   └── StartupMessage.java      # Mensagem de inicialização
│   │   │   ├── controller/                   # Controllers REST
│   │   │   │   ├── AluguelRestController.java
│   │   │   │   └── CarroRestController.java
│   │   │   ├── model/                        # Entidades JPA
│   │   │   │   ├── Aluguel.java
│   │   │   │   └── Carro.java
│   │   │   ├── repository/                   # Repositórios
│   │   │   │   ├── AluguelRepository.java
│   │   │   │   └── CarroRepository.java
│   │   │   └── service/                      # Lógica de negócio
│   │   │       ├── AluguelService.java
│   │   │       ├── CarroService.java
│   │   │       └── impl/
│   │   │           ├── AluguelServiceImpl.java
│   │   │           └── CarroServiceImpl.java
│   │   └── resources/
│   │       ├── application.properties        # Configurações da aplicação
│   │       ├── banner.txt                   # Banner customizado
│   │       └── static/                      # Frontend
│   │           ├── app.js                   # JavaScript
│   │           └── index.html               # Interface web
│   └── test/
│       └── java/projeto/demo/
│           └── DemoApplicationTests.java    # Testes
├── target/                                  # Arquivos compilados
├── mvnw                                     # Maven Wrapper (Linux/Mac)
├── mvnw.cmd                                # Maven Wrapper (Windows)
├── pom.xml                                 # Dependências Maven
└── README.md                               # Documentação principal
```

## Descrição das Camadas

### Controllers
Responsáveis por receber as requisições HTTP e retornar as respostas.
- `AluguelRestController.java` - Endpoints para aluguéis
- `CarroRestController.java` - Endpoints para carros

### Services
Contém a lógica de negócio da aplicação.
- `AluguelService.java` - Interface do serviço de aluguéis
- `CarroService.java` - Interface do serviço de carros
- `impl/` - Implementações concretas dos serviços

### Repositories
Interface com o banco de dados usando Spring Data JPA.
- `AluguelRepository.java` - Operações de banco para aluguéis
- `CarroRepository.java` - Operações de banco para carros

### Models
Entidades JPA que representam as tabelas do banco.
- `Aluguel.java` - Entidade de aluguel
- `Carro.java` - Entidade de carro

### Config
Configurações da aplicação.
- `CorsConfig.java` - Configuração de CORS
- `OpenApiConfig.java` - Configuração do Swagger
- `StartupMessage.java` - Mensagem exibida na inicialização

### Frontend
Interface web simples e moderna.
- `index.html` - Página principal com Tailwind CSS
- `app.js` - Lógica JavaScript para interação com a API

## Tecnologias por Camada

| Camada | Tecnologias |
|--------|-------------|
| **Backend** | Spring Boot, Spring Data JPA, Spring Web |
| **Banco** | H2 Database (em memória) |
| **Frontend** | HTML5, Tailwind CSS, JavaScript ES6 |
| **Documentação** | Swagger/OpenAPI 3 |
| **Build** | Maven |

## Padrões Utilizados

- **MVC (Model-View-Controller)** - Separação de responsabilidades
- **Repository Pattern** - Abstração do acesso aos dados  
- **Service Layer** - Lógica de negócio centralizada
- **DTO Pattern** - Transferência de dados entre camadas
- **RESTful API** - Arquitetura REST para endpoints