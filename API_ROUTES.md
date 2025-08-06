# Rotas da API

## Base URL
```
http://localhost:8080/api
```

## Carros Endpoints

### Listar Todos os Carros
```http
GET /carros
```

**Resposta:**
```json
[
  {
    "id": 1,
    "modelo": "Honda Civic",
    "valor": 85000.00,
    "status": "Disponível"
  }
]
```

### Criar Novo Carro
```http
POST /carros
Content-Type: application/json

{
  "modelo": "Toyota Corolla",
  "valor": 90000.00
}
```

### Atualizar Carro
```http
PUT /carros/{id}
Content-Type: application/json

{
  "modelo": "Honda Civic 2024",
  "valor": 95000.00,
  "status": "Disponível"
}
```

### Remover Carro
```http
DELETE /carros/{id}
```

## Aluguéis Endpoints

### Listar Todos os Aluguéis
```http
GET /alugueis
```

### Listar Apenas Aluguéis Ativos
```http
GET /alugueis/ativos
```

### Criar Novo Aluguel
```http
POST /alugueis/alugar
Content-Type: application/json

{
  "carroId": 1,
  "dataInicio": "2025-01-15",
  "dataFim": "2025-01-20"
}
```

**Resposta:**
```json
{
  "id": 1,
  "carro": {
    "id": 1,
    "modelo": "Honda Civic"
  },
  "dataInicio": "2025-01-15",
  "dataFim": "2025-01-20",
  "valorTotal": 2500.00,
  "status": "Ativo"
}
```

### Finalizar Aluguel
```http
PUT /alugueis/finalizar/{id}
```

### Verificar Disponibilidade do Carro
```http
GET /alugueis/disponibilidade/{carroId}
```

## Códigos de Status

| Código | Descrição |
|--------|-----------|
| 200 | Sucesso |
| 201 | Criado com sucesso |
| 400 | Dados inválidos |
| 404 | Recurso não encontrado |
| 500 | Erro interno do servidor |

## Regras de Negócio

### Carros
- Valor da diária = 0,5% do valor do carro
- Status automático baseado na disponibilidade

### Aluguéis
- Mínimo de 1 dia de aluguel
- Data início deve ser >= hoje
- Data fim deve ser > data início
- Valor total = (Dias + 1) × Valor da diária