> Rol: Actúa como un Tech Lead Front-end y experto en Angular (con conocimientos profundos en las últimas versiones, Standalone Components, Signals, RxJS y buenas prácticas de arquitectura).
> Objetivo: Necesito que me ayudes a diseñar un plan de ejecución táctico y paso a paso para resolver una prueba técnica de Front-end.
> Contexto de la prueba:
Prueba Técnica – Ingeniero de Desarrollo Front-End
Caso de negocio: Manejo de Fondos (FPV/FIC) para clientes BTG
Objetivo: Diseñar e implementar una aplicación web interactiva y responsiva que permita a
un usuario final:
Requisitos funcionales
1. Visualizar la lista de fondos disponibles.
2. Suscribirse a un fondo, si cumple con el monto mínimo.
3. Cancelar su participación en un fondo, y ver el saldo actualizado.
4. Visualizar el historial de transacciones (suscripciones y cancelaciones).
5. Seleccionar método de notificación (email o SMS) al realizar una suscripción.
6. Mostrar mensajes de error apropiados si no hay saldo suficiente.
Requisitos técnicos
- Usar Flutter (preferido) o Angular.
- Utilizar buenas prácticas de diseño UI/UX.
- Manejo de estado (Provider, Riverpod, Bloc en Flutter o servicios y observables en
Angular).
- Validaciones de formularios.
- Diseño responsivo y experiencia de usuario clara.
- Consumo de datos desde una API REST simulada (puede usarse mocks locales o jsonserver).
- Manejo adecuado de errores, loading states y feedback visual.
- Código limpio, estructurado y comentado.
Extras valorados (no obligatorios)
- Pruebas unitarias de componentes (Flutter Test, Angular Testing Library).
- Uso de TypeScript en Angular.
- Navegación y ruteo (Flutter Navigator 2.0 o Angular Router).
- Uso de componentes y widgets reutilizables.
Consideraciones
- No es necesario implementar lógica de backend, autenticación ni despliegue.
- Se asume un usuario único con saldo inicial de COP $500.000.
- Fondos disponibles:
Fondos disponibles
ID Nombre Monto mínimo Categoría
1 FPV_BTG_PACTUAL_RECAUDADORA COP $75.000 FPV
2 FPV_BTG_PACTUAL_ECOPETROL COP $125.000 FPV
3 DEUDAPRIVADA COP $50.000 FIC
4 FDO-ACCIONES COP $250.000 FIC
5 FPV_BTG_PACTUAL_DINAMICA COP $100.000 FPV
Entregables
- Código en repositorio público (GitHub, GitLab, etc.).
- Instrucciones claras de ejecución (README.md).
- Capturas o video corto del funcionamiento de la app (opcional, pero valorado).
> Requerimientos técnicos y restricciones:
>  * Framework: Angular ultima version.
>  * Manejo de estado: Provider, Riverpod, Bloc o servicios y observables en
Angular.
>  * Estilos/UI: SCSS, TAILWIND, ANGULAR MATERIAL
>  * Testing: Angular testing library.
> Instrucciones:
> Por favor, entrégame el plan estructurado de la siguiente manera:
>  * Arquitectura de Carpetas: Estructura recomendada (Core, Shared, Features) priorizando escalabilidad y orden.
>  * Desglose de Componentes: Una lista de los componentes que debo crear, indicando claramente cuáles son "Smart" (manejan lógica/estado/inyección de dependencias) y cuáles son "Dumb" / "Presentacionales" (reciben @Input y emiten @Output).
>  * Ruta de Ejecución (Checklist): Un plan de acción dividido en fases secuenciales (ej. 1. Configuración y Enrutamiento, 2. Servicios e Interceptors, 3. Maquetado de UI, 4. Integración de Lógica y Estado, 5. Refactor y Detalles Finales).
>  * Puntos Clave para Destacar: Menciona 3 o 4 "Bonus points" de código limpio específicos de Angular que los evaluadores siempre buscan (ej. ChangeDetectionStrategy.OnPush, trackBy en @for/ngFor, async pipe, manejo correcto de desuscripciones).
> Formato de salida: Usa un tono directo y entrégame el plan usando Markdown, listas y checklists para que sea fácil de seguir mientras programo.
> Este es el diseño que se debe implementar: ## Stitch Instructions

Get the images and code for the following Stitch project's screens:

## Project

ID: 2293124761181877605

## Screens:
1. Dashboard Principal
    ID: a16dbbd70b5a4466bbbcf0ac7ac80043

2. Explorador de Fondos
    ID: 9835cf3dfbc741e08ce579e037daa20c

3. Mis Inversiones
    ID: 1a8b962602014c809320ae7e3f90bb89

4. Historial de Transacciones
    ID: 8806162249194849864c19734c4872b1

Use a utility like `curl -L` to download the hosted URLs.   
