# Como Iniciar

## Pré-requisitos
- Java 21+ instalado
- Git

## Instalação e Execução

### 1. Clonar o Repositório
```bash
git clone https://github.com/helxysa/aluguel-carro-java.git
cd aluguel-carro-java
```

### 2. Executar a Aplicação
```bash
# Linux/Mac
./mvnw spring-boot:run

# Windows
mvnw.cmd spring-boot:run
```

### 3. Acessar o Sistema
- **Interface Web**: http://localhost:8080/
- **API**: http://localhost:8080/api/carros
- **Documentação (Swagger)**: http://localhost:8080/swagger-ui.html

## Fluxo de Teste

1. **Cadastrar Carros**: Acesse a aba "Carros" e adicione alguns veículos
2. **Criar Aluguéis**: Vá para a aba "Aluguéis" e faça uma reserva
3. **Verificar Cálculos**: Observe os valores calculados automaticamente
4. **Finalizar Aluguel**: Termine o aluguel para liberar o carro

## Banco de Dados H2

Para acessar o console do banco:
- **URL**: `jdbc:h2:mem:testdb`
- **Usuário**: `sa`
- **Senha**: (deixe em branco)
- **Console**: http://localhost:8080/h2-console

## Comandos Úteis

```bash
# Compilar apenas
./mvnw compile

# Executar testes
./mvnw test

# Gerar JAR
./mvnw package

# Limpar build
./mvnw clean
```