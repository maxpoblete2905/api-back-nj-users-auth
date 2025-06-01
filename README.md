# Análisis de Arquitectura del Proyecto

## 🏗️ Arquitectura Detectada: Clean Architecture / Hexagonal

Esta arquitectura promueve la separación de responsabilidades en **capas concéntricas**, donde las dependencias solo pueden ir **desde afuera hacia adentro**, nunca al revés.

> **Regla clave:** La infraestructura depende del dominio, pero el dominio no sabe nada de la infraestructura.

---

## 🔍 Análisis de tu estructura por capa

### 1. `domain/` – Dominio puro
- Contiene las entidades (`model/`) como `User`, `Gender`, etc.
- Los contratos (`ports/`) como `user.repository.ts` definen interfaces que **abstraen la persistencia**.
- ✅ Correcto: el dominio está aislado y **no importa nada externo**.

---

### 2. `application/` – Casos de uso / lógica de negocio
- `usecase/`: servicios que orquestan la lógica de negocio.
- `dto/`: objetos para transportar datos de entrada/salida.
- ✅ Correcto: esta capa depende del dominio y los puertos, **no de la infraestructura**.

---

### 3. `infrastructure/` – Adaptadores externos
- `controller/`: recibe y maneja las peticiones (ej. HTTP).
- `repository/`: implementaciones de los puertos (`user-in-mysql.repository.ts`).
- `strategy/`: autenticación (ej. `jwt.strategy.ts`).
- ✅ Correcto: adapta el mundo externo (HTTP, DB, etc.) al sistema.

---

### 4. `user.module.ts` – Módulo de inyección de dependencias
- Aquí se deben **proveer los servicios y las implementaciones de interfaces** usando `provide`.
- 🔄 Verificar: Asegúrate de registrar correctamente los providers.

---

## 🔄 Flujo de Conexión entre Componentes

1. Un request llega a `auth.controller.ts` (ej. POST `/register`)
2. El controlador llama al caso de uso: `register-user.service.ts`
3. El usecase usa los modelos del dominio (`User`) y accede a datos mediante interfaces (`user.repository.ts`)
4. La implementación concreta (`user-in-mysql.repository.ts`) es inyectada en el módulo (`user.module.ts`)
5. La respuesta se devuelve desde el usecase al controlador

## 🔧 Recomendaciones Opcionales

- Considera renombrar `application/usecase` a `use-cases` o `services` para mayor claridad.
- En `repository/`, si planeas múltiples fuentes de datos, usa subcarpetas por tipo.
- Si agregas nuevos contextos (ej. `order`, `product`), replica esta misma estructura modular.

---