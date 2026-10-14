# Full Stack Store Management

Sistema de gestión para un comercio de accesorios para celulares, electrónica y servicio técnico. Proyecto en desarrollo para practicar **TypeScript, NestJS, TypeORM y React**.

## Stack tecnológico

- **Backend:** Node.js, NestJS y TypeScript.
- **Base de datos:** SQLite + TypeORM (`better-sqlite3`).
- **Validaciones:** `class-validator` y `class-transformer`.
- **Frontend previsto:** React + TypeScript.

## Estado actual

El backend cuenta con los módulos `Products` y `Categories`.

Los productos están relacionados con una categoría mediante una relación **Many-to-One**: una categoría puede tener varios productos y cada producto pertenece a una categoría.

### Endpoints de productos

|  Método  | Ruta            | Funcionalidad                                          |
| :------: | --------------- | ------------------------------------------------------ |
|  `GET`   | `/products`     | Listar productos con filtros por nombre y precio.      |
|  `GET`   | `/products/:id` | Obtener un producto con su categoría.                  |
|  `POST`  | `/products`     | Crear un producto validando su categoría.              |
| `PATCH`  | `/products/:id` | Actualizar un producto y, opcionalmente, su categoría. |
| `DELETE` | `/products/:id` | Eliminar un producto.                                  |

Las consultas incluyen las categorías relacionadas. Las actualizaciones rechazan las categorías inexistentes mediante errores HTTP `404`.

El módulo `Categories` permite consultar y crear categorías. Su CRUD completo y las reglas de eliminación están pendientes.

## Instalación y ejecución

Desde la carpeta `backend`, ejecutar:

```bash
npm install
npm run start:dev

La base de datos local se almacena en backend/database.sqlite y está excluida del repositorio Git.
Nota: Se utiliza synchronize: true durante el desarrollo. Esta configuración debe revisarse antes de utilizar el sistema en producción.

Próximos pasos
- [ ] Garantizar la integridad de las relaciones entre productos y categorías.
- [ ] Completar el CRUD de categorías.
- [ ] Implementar el control de stock.
- [ ] Incorporar módulos de clientes, reparaciones y ventas.
- [ ] Desarrollar el frontend con React e integrarlo con la API.
- [ ] Añadir pruebas unitarias y de integración.

Repositorio

GitHub — eduhartkopf/fullstack-project

Estado: En desarrollo activo.
```
