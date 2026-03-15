# 🏦 FundWise - BTG Funds Management

<p align="center">
  <img src="https://img.shields.io/badge/Angular-21-DD0031?style=for-the-badge&logo=angular&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/SCSS-Custom-CC6699?style=for-the-badge&logo=sass&logoColor=white" />
  <img src="https://img.shields.io/badge/Angular_Material-UI-0081CB?style=for-the-badge&logo=angular-material&logoColor=white" />
  <img src="https://img.shields.io/badge/JSON--Server-Mock_API-000000?style=for-the-badge&logo=json&logoColor=white" />
</p>

---

**FundWise** es una plataforma premium de gestión de fondos de inversión diseñada específicamente para clientes de BTG Pactual. Ofrece una experiencia fluida, visualmente impactante y completamente responsiva para administrar suscripciones a fondos FPV y FIC con total seguridad y transparencia.

## ✨ Características Destacadas

- 💎 **Diseño Premium**: Interfaz moderna con efectos de glassmorphism, gradientes suaves y micro-animaciones.
- 📱 **Totalmente Responsivo**: Experiencia optimizada para Desktop, Tablet y Mobile con navegación adaptativa.
- 📊 **Reportes Profesionales**: Motor de exportación mejorado a **Excel** capaz de procesar grandes volúmenes de datos.
- 🔔 **Centro de Notificaciones**: Panel interactivo para el seguimiento de operaciones en tiempo real.
- 🛡️ **Validaciones Blindadas**: Control estricto de montos mínimos de suscripción y saldo disponible.
- ⚡ **Arquitectura Moderna**: Standalone components, Routing Lazy Loading y manejo de estado con **Signals**.

---

## 📸 Vista Previa

### Dashboard & Analytics (Desktop)
![Dashboard](./screenshots/desktop_dashboard.png)

### Experiencia Mobile
<p align="center">
  <img src="./screenshots/mobile_dashboard.png" width="300" />
  <img src="./screenshots/mobile_funds.png" width="300" />
</p>

---

## 🛠️ Stack Tecnológico

- **Frontend**: Angular 21 (Standalone Architecture)
- **Lenguaje**: TypeScript 5.9
- **Estilos**: Vanilla SCSS con sistema de variables centralizado.
- **Librerías UI**: Angular Material (Icons, Dialogs, Tables).
- **Manejo de Estado**: Reactive Forms, Signals, y RxJS.
- **Mock API**: JSON Server.

---

## 🚀 Instalación y Ejecución

Siga estos pasos detallados para configurar el entorno de ejecución:

### 1. Requisitos Técnicos
Asegúrese de tener instalados los siguientes componentes:
- **Node.js**: Versión 18.x o superior (LTS recomendada).
- **npm**: Versión 9.x o superior.
- **Angular CLI** (Opcional): `npm install -g @angular/cli`.

### 2. Clonar y Preparar el Proyecto
```bash
# Descargar el repositorio
git clone https://github.com/tony0217/prueba-tecnica-front-BTG.git
cd prueba-tecnica-front-BTG

# Instalar todas las dependencias necesarias
npm install
```

### 3. Ejecución del Sistema
Para que la aplicación funcione correctamente, debe iniciar tanto el servidor de datos (Mock API) como el servidor de desarrollo de Angular. Se recomienda abrir dos terminales diferentes:

**Terminal 1: Servidor de Datos (Backend Mock)**
Este comando inicia `json-server` en el puerto `3000` utilizando el archivo `db.json` como base de datos persistente.
```bash
npm run server
```

**Terminal 2: Servidor Frontend (Angular)**
Este comando compila la aplicación y levanta un servidor dinámico en el puerto `4200`.
```bash
npm start
```

Una vez iniciados, navegue a `http://localhost:4200/` en su navegador preferido.

---

## 🏗️ Estructura del Proyecto

El proyecto utiliza una arquitectura modular basada en el patrón de **Smart/Dumb Components** y una clara separación de capas:

```
src/app/
├── core/
│   ├── interceptors/    # Interceptores para manejo de carga global (Spinner).
│   ├── models/          # Interfaces de datos (Fondos, Transacciones, Balance).
│   └── services/        # Lógica de negocio (Consultas API, Manejo de Estado con Signals).
├── features/            # Componentes "Smart" (Lógica y Rutas)
│   ├── dashboard/       # Vista de resumen y métricas.
│   ├── funds-explorer/  # Catálogo de fondos y filtros.
│   ├── my-investments/  # Gestión de portafolio y cancelaciones.
│   └── history/         # Registro de transacciones con exportación.
├── shared/              # Componentes "Dumb" (UI reutilizable)
│   ├── components/      # Botones, Cards, Diálogos y Sidebar.
│   ├── pipes/           # Formateadores de moneda (COP) y datos.
│   └── ui/              # Elementos básicos de diseño.
├── app.config.ts        # Configuración global de Providers y Material.
├── app.routes.ts        # Definición de rutas con Lazy Loading.
```

---

## 🧪 Pruebas Unitarias

Garantizamos la estabilidad del código mediante tests automatizados:

```bash
# Ejecutar tests una sola vez
npm test

# Ejecutar tests en modo escucha (desarrollo)
npx ng test
```

---

## 📄 Documentación Adicional
Para una guía detallada del paso a paso de uso, consulte:
- [📖 Manual de Usuario (Markdown)](./manual-usuario.md)

---

## 👤 Autor
**Anthony Henríquez Casallas**

---
<p align="center">Proyecto desarrollado para el proceso de selección técnica de BTG Pactual.</p>
