# Full Stack Store Management System

Sistema de gestión integral para un comercio dedicado a la **venta de accesorios para celulares, productos electrónicos y servicio técnico/reparación de dispositivos móviles**.

El proyecto está siendo desarrollado como una aplicación **Full Stack**, con una arquitectura orientada a separar responsabilidades entre frontend, backend y persistencia de datos.

> **Status:** 🚧 En desarrollo activo

---

## 🎯 Objetivo

El objetivo del proyecto es desarrollar una aplicación que permita gestionar las operaciones principales de un comercio, incluyendo:

- Gestión de productos.
- Control de stock.
- Gestión de precios.
- Registro y consulta de productos.
- Gestión de servicios de reparación.
- Administración de clientes.
- Carritos y ventas.
- Persistencia de información.
- Futuramente, reportes y funcionalidades administrativas.

Además del objetivo funcional, el proyecto está siendo utilizado como una instancia práctica para profundizar conocimientos de **TypeScript, NestJS, React, bases de datos relacionales, ORM y arquitectura de aplicaciones Full Stack**.

---

## 🛠️ Stack tecnológico

### Backend

- **Node.js**
- **NestJS**
- **TypeScript**
- **TypeORM**
- **SQLite**
- **better-sqlite3**
- **class-validator**
- **class-transformer**

### Frontend

- **React**
- **TypeScript**

### Herramientas

- Git
- GitHub
- VS Code
- npm

---

## 🏗️ Arquitectura

La aplicación está siendo construida utilizando una arquitectura por capas.

```text
┌───────────────────────────────┐
│           React               │
│          Frontend             │
└───────────────┬───────────────┘
                │ HTTP
                ▼
┌───────────────────────────────┐
│          NestJS               │
│           Backend             │
│                               │
│  Controller → Service         │
│                 ↓             │
│             Repository        │
└────────────────┬──────────────┘
                 │
                 ▼
┌───────────────────────────────┐
│           TypeORM             │
└────────────────┬──────────────┘
                 │
                 ▼
┌───────────────────────────────┐
│            SQLite             │
│       database.sqlite         │
└───────────────────────────────┘
```

---

# 🚀 Backend

El backend está desarrollado con **NestJS + TypeScript**.

Actualmente existe un módulo dedicado a productos:

```text
src/
├── app.module.ts
├── main.ts
└── products/
    ├── dto/
    │   └── create-product.dto.ts
    ├── entities/
    │   └── product.entity.ts
    ├── products.controller.ts
    ├── products.service.ts
    └── products.module.ts
```

### Products Module

El módulo de productos implementa actualmente endpoints para:

```http
GET    /products
GET    /products/:id
POST   /products
```

El `ProductsController` recibe las peticiones HTTP y delega la lógica al `ProductsService`.

```text
HTTP Request
     ↓
ProductsController
     ↓
ProductsService
```

---

# 🧱 DTO y validación

Para la creación de productos se utiliza un DTO:

```text
CreateProductDto
```

El DTO define y valida los datos recibidos por la API.

Actualmente un producto contempla:

| Campo   | Tipo   | Descripción         |
| ------- | ------ | ------------------- |
| `name`  | string | Nombre del producto |
| `price` | number | Precio              |
| `stock` | number | Stock disponible    |

La validación se realiza mediante **class-validator**.

Esto permite evitar que información inválida llegue a la lógica de negocio.

---

# 🗄️ Persistencia con SQLite + TypeORM

La persistencia de datos comenzó inicialmente utilizando un array en memoria durante las primeras etapas del desarrollo.

Actualmente el proyecto está migrando a una solución de persistencia real utilizando:

- SQLite
- TypeORM
- better-sqlite3

La base de datos local se encuentra en:

```text
database.sqlite
```

Este archivo **no forma parte del repositorio Git**, ya que está excluido mediante `.gitignore`.

---

## Entity

La entidad `Product` representa la estructura de los productos en la base de datos.

```text
Product Entity
      ↓
   TypeORM
      ↓
products table
      ↓
SQLite
```

La Entity define actualmente:

- `id`
- `name`
- `price`
- `stock`

El identificador utiliza:

```typescript
@PrimaryGeneratedColumn()
```

por lo que el ID es generado automáticamente.

---

## Repository

TypeORM proporciona un `Repository<Product>` para realizar las operaciones sobre la entidad.

La arquitectura de acceso a datos queda planteada de la siguiente manera:

```text
ProductsService
      ↓
Repository<Product>
      ↓
TypeORM
      ↓
SQLite
```

Esto permite separar la lógica de negocio del acceso directo a la base de datos.

---

# 🔐 Configuración

La conexión de TypeORM se configura desde `AppModule`.

Actualmente SQLite se utiliza como base de datos local para simplificar el desarrollo y permitir una persistencia real sin requerir un servidor de base de datos externo.

Durante esta etapa de desarrollo se utiliza:

```typescript
synchronize: true;
```

para permitir que TypeORM sincronice automáticamente la estructura de las entidades con la base de datos.

> Esta configuración está destinada al entorno de desarrollo y deberá revisarse antes de utilizar el sistema en producción.

---

# 📦 Estado actual

### Backend

- [x] Proyecto NestJS creado
- [x] TypeScript configurado
- [x] Products Module
- [x] Products Controller
- [x] Products Service
- [x] DTO para creación de productos
- [x] Validación mediante `class-validator`
- [x] Product Entity
- [x] TypeORM integrado
- [x] SQLite integrado
- [x] `better-sqlite3` instalado
- [x] Repository de Product preparado
- [x] Base de datos SQLite creada
- [x] Proyecto versionado con Git
- [x] Repositorio remoto en GitHub

### Frontend

- [ ] Inicialización del frontend React
- [ ] Diseño de interfaz
- [ ] Conexión con API
- [ ] Gestión de productos
- [ ] Gestión de stock

---

# 🗺️ Roadmap

El proyecto continuará evolucionando progresivamente.

## Backend

### Productos

- [ ] Completar persistencia CRUD con SQLite.
- [ ] Actualizar productos.
- [ ] Eliminar productos.
- [ ] Manejo de errores y respuestas HTTP.
- [ ] Mejorar DTOs.
- [ ] Implementar búsqueda y filtros.
- [ ] Control de stock.

### Clientes

- [ ] Crear módulo de clientes.
- [ ] Entity de clientes.
- [ ] CRUD de clientes.
- [ ] Relación entre clientes y reparaciones/ventas.

### Reparaciones

- [ ] Crear módulo de reparaciones.
- [ ] Registro de dispositivos.
- [ ] Estado de reparación.
- [ ] Diagnóstico.
- [ ] Presupuesto.
- [ ] Historial.
- [ ] Relación con clientes.

### Ventas

- [ ] Carrito de compra.
- [ ] Registro de ventas.
- [ ] Detalle de venta.
- [ ] Actualización automática de stock.

---

# 🖥️ Frontend

Una vez consolidado el backend, se desarrollará la interfaz utilizando React.

La aplicación tendrá como objetivo proporcionar una interfaz para:

- Dashboard.
- Productos.
- Stock.
- Clientes.
- Reparaciones.
- Ventas.
- Carritos.
- Reportes.

La comunicación entre frontend y backend se realizará mediante una API HTTP.

---

# 🧪 Testing

El proyecto incluye la estructura inicial de testing proporcionada por NestJS.

A medida que avance el desarrollo se incorporarán:

- Unit tests.
- Tests de servicios.
- Tests de controllers.
- Tests de integración.
- Tests end-to-end.

---

# 📁 Git & Version Control

El proyecto utiliza Git para el control de versiones.

El repositorio remoto se encuentra en:

**GitHub — `eduhartkopf/fullstack-project`**

El proyecto utiliza una estrategia de commits descriptivos para registrar la evolución de las funcionalidades.

Los archivos de base de datos SQLite y otros archivos locales no forman parte del repositorio mediante `.gitignore`.

---

# 📚 Objetivo de aprendizaje

Este proyecto no está planteado únicamente como una aplicación CRUD.

Se utiliza como proyecto práctico para profundizar progresivamente en conceptos de desarrollo profesional:

- JavaScript y TypeScript.
- Programación orientada a objetos.
- NestJS.
- Arquitectura modular.
- Dependency Injection.
- DTOs.
- Validación.
- Controllers.
- Services.
- Repositories.
- ORM.
- SQL y bases de datos relacionales.
- SQLite.
- APIs REST.
- React.
- Integración Frontend/Backend.
- Testing.
- Git y GitHub.
- Buenas prácticas de arquitectura y desarrollo.

La intención es que cada nueva funcionalidad se incorpore entendiendo **por qué se implementa de esa manera**, no solamente utilizando abstracciones o frameworks sin comprender su funcionamiento.

---

## 🚧 Development Status

Este proyecto se encuentra actualmente en **desarrollo**.

La primera etapa del backend ya cuenta con la estructura base de NestJS y una transición desde almacenamiento en memoria hacia persistencia utilizando **TypeORM + SQLite**.

El próximo objetivo es completar la integración del `Repository<Product>` y terminar el CRUD persistente de productos antes de comenzar a ampliar el sistema con nuevas áreas funcionales.
