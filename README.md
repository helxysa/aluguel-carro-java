# Sistema de Locadora de Carros - Spring Boot

![Java](https://img.shields.io/badge/Java-21-orange?style=flat&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.4-brightgreen?style=flat&logo=spring)
![H2 Database](https://img.shields.io/badge/Database-H2-blue?style=flat&logo=h2)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat)
![Status](https://img.shields.io/badge/Status-Active-success?style=flat)

Sistema RESTful em Spring Boot para gerenciar aluguel de carros com interface web moderna e API REST completa.

## Como Iniciar

### Pré-requisitos
- Java 21+ instalado
- Git

### Instalação e Execução
```bash
# 1. Clonar o repositório
git clone https://github.com/helxysa/aluguel-carro-java.git
cd aluguel-carro-java

# 2. Executar a aplicação
./mvnw spring-boot:run     # Linux/Mac
# ou
mvnw.cmd spring-boot:run   # Windows
```

### Acessar o Sistema
- **Interface Web**: http://localhost:8080/
- **API**: http://localhost:8080/api/carros
- **Documentação**: http://localhost:8080/swagger-ui.html

## Documentação

- **[Rotas da API](API_ROUTES.md)** - Endpoints e exemplos completos  
- **[Estrutura do Projeto](PROJECT_STRUCTURE.md)** - Arquitetura e organização

## Sobre o Sistema
<details>
<summary><strong>Ver detalhes</strong></summary>

### O que faz
- Cadastra veículos com modelo, valor e disponibilidade
- Controla aluguéis com cálculo automático de valores
- Interface web moderna + API REST

### Regras Básicas

**Carros:**
- Status: "Disponível" ou "Indisponível"
- Valor da diária = 0,5% do valor do carro
- Exemplo: Carro R$ 100.000 → Diária R$ 500

**Aluguéis:**
- Mínimo 1 dia
- Data início ≥ hoje, data fim > data início  
- Valor total = (Dias + 1) × Valor diária
- Carro fica indisponível quando alugado

### Tecnologias
- Java 21 + Spring Boot 3.5.4
- Banco H2 (em memória)
- Frontend: HTML + Tailwind CSS + JavaScript
- Arquitetura: MVC + Repository Pattern

</details>

## Interface do Sistema

### Tela de Carros
![Gestão de Carros](src/public/img/carros.png)

### Tela de Aluguéis
![Gestão de Aluguéis](src/public/img/aluguel.png)

---

<div align="center">
  <a href="https://github.com/helxysa/aluguel-carro-java">Repositório no GitHub</a>
</div>