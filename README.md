# BTG Funds Management App

> Aplicación web interactiva y responsiva para la gestión de fondos de inversión (FPV/FIC) de clientes BTG Pactual.

## 🚀 Tecnologías

| Tecnología | Versión |
|---|---|
| Angular | 21.x (Standalone Components) |
| Angular Material | 21.x |
| TypeScript | 5.9 |
| SCSS | - |
| RxJS | 7.8 |
| json-server | 1.x (Mock API) |

## 📦 Instalación y Ejecución

### Prerrequisitos

- **Node.js** v18+ (recomendado LTS)
- **npm** v9+

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/tony0217/prueba-tecnica-front-BTG.git
cd prueba-tecnica-front-BTG

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor mock (API REST simulada)
npm run server
# El servidor se levanta en http://localhost:3000

# 4. En otra terminal, iniciar la aplicación Angular
npm start
# La app se abre en http://localhost:4200
```

> ⚠️ **Importante:** El servidor mock (`npm run server`) debe estar corriendo para que la aplicación funcione correctamente.

## 🏗️ Arquitectura

El proyecto sigue una arquitectura modular con separación de responsabilidades:

```
src/app/
├── core/                         # Capa central (singleton services, modelos, interceptors)
│   ├── interceptors/
│   │   └── loading-interceptor.ts
│   ├── models/
│   │   ├── fund.model.ts
│   │   ├── transaction.model.ts
│   │   └── user-balance.model.ts
│   └── services/
│       ├── balance.ts            # Estado del saldo (Signals)
│       ├── funds.ts              # Consulta fondos (HttpClient)
│       ├── loading.ts            # Estado de carga global
│       ├── notification.ts       # Notificaciones (SnackBar)
│       └── transaction.ts        # Transacciones CRUD
├── features/                     # Componentes "Smart" por funcionalidad
│   ├── dashboard/
│   ├── funds-explorer/
│   ├── my-investments/
│   └── transaction-history/
├── shared/                       # Componentes reutilizables "Dumb"
│   ├── components/
│   │   ├── balance-card/
│   │   ├── fund-card/
│   │   ├── loading-spinner/
│   │   ├── sidebar/
│   │   ├── subscription-dialog/
│   │   └── transaction-row/
│   └── pipes/
│       └── currency-format-pipe.ts
├── app.config.ts                 # Configuración de providers
├── app.routes.ts                 # Rutas lazy-loaded
├── app.ts                        # Componente raíz
└── app.html / app.scss
```

## ✨ Funcionalidades

### 1. Dashboard Principal (`/`)
- Resumen del portafolio (saldo disponible, invertido, total)
- Listado de transacciones recientes
- Cards informativos con métricas clave

### 2. Explorador de Fondos (`/funds-explorer`)
- Visualización de todos los fondos disponibles (FPV y FIC)
- Filtrado por categoría (Todos, FPV, FIC)
- Botón de suscripción con diálogo modal

### 3. Suscripción a un Fondo
- Diálogo modal con validación de formulario
- Validación de monto mínimo del fondo
- Validación de saldo disponible
- Selección de método de notificación (Email / SMS)
- Botones rápidos MIN / MAX para el monto

### 4. Mis Inversiones (`/my-investments`)
- Visualización de suscripciones activas
- Cancelación de suscripción con confirmación
- Actualización inmediata del saldo disponible
- Cards con resumen: valor invertido, fondos activos, saldo restante

### 5. Historial de Transacciones (`/transaction-history`)
- Tabla completa con todas las transacciones
- Filtros por tipo (Suscripciones / Cancelaciones)
- Badges de estado con colores diferenciados
- Paginación visual

## 💰 Fondos Disponibles

| ID | Nombre | Monto Mínimo | Categoría |
|---|---|---|---|
| 1 | FPV_BTG_PACTUAL_RECAUDADORA | COP $75.000 | FPV |
| 2 | FPV_BTG_PACTUAL_ECOPETROL | COP $125.000 | FPV |
| 3 | DEUDAPRIVADA | COP $50.000 | FIC |
| 4 | FDO-ACCIONES | COP $250.000 | FIC |
| 5 | FPV_BTG_PACTUAL_DINAMICA | COP $100.000 | FPV |

**Saldo inicial del usuario:** COP $500.000

## 🧪 Tests

```bash
# Ejecutar pruebas unitarias
npx ng test --watch=false
```

Los tests cubren:
- **Services:** BalanceService (deducción, adición, validaciones), FundsService, TransactionService, NotificationService, LoadingService
- **Components:** Dashboard, FundsExplorer (filtros), MyInvestments, TransactionHistory (filtros), SubscriptionDialog (formulario), FundCard (eventos), Sidebar
- **Pipes:** CurrencyFormatPipe

## 🎨 Patrones y Buenas Prácticas

- **Standalone Components:** Sin NgModules, todos los componentes son standalone
- **Signals:** Estado del saldo manejado con Angular Signals (`signal()`)
- **Lazy Loading:** Todas las rutas de features cargan de forma diferida
- **HTTP Interceptor:** Interceptor funcional para estado de carga global
- **Smart/Dumb Pattern:** Separación clara entre componentes inteligentes y presentacionales
- **Reactive Forms:** Validaciones de formulario con `FormBuilder` y `Validators`
- **Pipes personalizados:** `CurrencyFormatPipe` para formateo de moneda COP
- **SCSS:** Archivos de estilos modulares por componente
- **Angular Material:** Íconos, diálogos, SnackBar, form-fields

## 📋 Scripts Disponibles

| Comando | Descripción |
|---|---|
| `npm start` | Inicia el servidor de desarrollo Angular |
| `npm run server` | Inicia json-server (API mock en puerto 3000) |
| `npm run build` | Genera el bundle de producción |
| `npx ng test --watch=false` | Ejecuta las pruebas unitarias |

## 👤 Autor

Anthony Henríquez Casallas — [GitHub](https://github.com/tony0217)
