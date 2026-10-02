# Bypass de autorización

## F-012
**ID:** F-012
**Categoría:** Bypass de autorización
**Riesgo:** Cualquier cliente puede crear/modificar plantas y sensores sin autenticación
**Entrada que lo desestima:** Solicitud sin token de autenticación
**Comportamiento actual observado en el código:** No hay middleware de autenticación ni autorización en ningún endpoint. `PlantApplicationService` y `SensorApplicationService` no verifican permisos.
**Contrato esperado recomendado:** Implementar autenticación (JWT, API keys) y autorización basada en roles (admin, operador, solo-lectura).
**Estado del contrato:** pendiente de decisión
**Por qué importa para pagos:** En un sistema de facturación, permitir que cualquier usuario modifique datos de clientes o tarifas es un riesgo crítico de fraude.

---

## F-013
**ID:** F-013
**Categoría:** Bypass de autorización
**Riesgo:** Cualquier cliente puede asignar sensores a plantas ajenas
**Entrada que lo desestima:** `assignSensor` con `plantId` de otra organización
**Comportamiento actual observado en el código:** `PlantApplicationService.ts:35-44` — No verifica que la planta pertenezca al usuario/organización que hace la solicitud.
**Contrato esperado recomendado:** Validar que la planta pertenezca al tenant/usuario autenticado.
**Estado del contrato:** pendiente de decisión
**Por qué importa para pagos:** En un sistema multi-tenant, modificar recursos de otro tenant es un error de seguridad y facturación.

---

## F-014
**ID:** F-014
**Categoría:** Bypass de autorización
**Riesgo:** Lecturas manipuladas por usuarios no autorizados
**Entrada que lo desestima:** `takeReading` con `sensorId` de otra organización
**Comportamiento actual observado en el código:** `SensorApplicationService.ts:53-67` — No verifica que el sensor pertenezca al usuario autenticado.
**Contrato esperado recomendado:** Validar propiedad del sensor antes de guardar la lectura.
**Estado del contrato:** pendiente de decisión
**Por qué importa para pagos:** En un sistema de monitoreo con facturación por datos, permitir que usuarios no autorizados inyectan datos contamina las métricas de facturación.
