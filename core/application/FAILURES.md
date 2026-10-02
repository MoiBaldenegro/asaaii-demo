# Application Layer - Modos de falla

## F-003
**ID:** F-003
**Categoría:** Particiones de equivalencia
**Riesgo:** Lecturas guardadas para sensores inexistentes
**Entrada que lo desestima:** `sensorId: "S-999"` (sensor no registrado)
**Comportamiento actual observado en el código:** `SensorApplicationService.ts:54-55` — Si el sensor no existe, usa el `sensorId` del DTO directamente: `const sensorId = sensor ? sensor.id : dto.sensorId;` y guarda la lectura de todas formas.
**Contrato esperado recomendado:** Si el sensor no existe, rechazar la lectura con error. No se deben persistir lecturas huérfanas.
**Estado del contrato:** confirmado
**Por qué importa para pagos:** En un sistema de suscripciones o facturación por uso, permitir operaciones con referencias inexistentes permite fraude o errores de facturación.

---

## F-005
**ID:** F-005
**Categoría:** Particiones de equivalencia
**Riesgo:** Asignación de sensor a planta sin validar existencia del sensor
**Entrada que lo desestima:** `sensorId: "S-999"` (sensor inexistente)
**Comportamiento actual observado en el código:** `PlantApplicationService.ts:42` — `this.plantDomain.assignSensor(plant, dto.sensorId)` asigna cualquier string como sensorId sin verificar que el sensor exista.
**Contrato esperado recomendado:** Validar que el sensor existe antes de asignarlo, o definir si se permite asignación diferida.
**Estado del contrato:** pendiente de decisión
**Por qué importa para pagos:** En un sistema de inventario o asignación de recursos, asignar referencias inexistentes rompe la integridad referencial y causa errores de facturación.

---

## F-007
**ID:** F-007
**Categoría:** Null / Vacíos
**Riesgo:** sensorId vacío o nulo en takeReading
**Entrada que lo desestima:** `sensorId: ""` o `sensorId: null`
**Comportamiento actual observado en el código:** `SensorApplicationService.ts:54` — No hay validación de que `dto.sensorId` no sea vacío. Se pasa directamente a `getByIdSensor`.
**Contrato esperado recomendado:** Validar que `sensorId` sea un string no vacío antes de procesar.
**Estado del contrato:** pendiente de decisión
**Por qué importa para pagos:** En procesamiento de pagos, un ID vacío puede causar que una transacción se asigne a la cuenta incorrecta o se pierda.

---

## F-008
**ID:** F-008
**Categoría:** Null / Vacíos
**Riesgo:** Campos obligatorios de planta/sensor sin validar
**Entrada que lo desestima:** `name: ""` o `slug: null`
**Comportamiento actual observado en el código:** `PlantApplicationService.ts:21-33` y `SensorApplicationService.ts:37-47` — No hay validación de campos obligatorios. Se aceptan strings vacíos o undefined.
**Contrato esperado recomendado:** Validar que campos obligatorios (name, slug, id_plant, id_sensor) sean strings no vacíos.
**Estado del contrato:** pendiente de decisión
**Por qué importa para pagos:** En un sistema de clientes o productos, datos incompletos causan errores en facturación y reporting.

---

## F-009
**ID:** F-009
**Categoría:** Condiciones de carrera
**Riesgo:** Pérdida de actualizaciones en asignación de sensor
**Entrada que lo desestima:** Dos llamadas simultáneas a `assignSensor` para la misma planta
**Comportamiento actual observado en el código:** `PlantApplicationService.ts:36-43` — Read-then-write sin atomicidad. Lee la planta, la modifica, la guarda. Si dos llamadas ocurren simultáneamente, la última sobrescribe la primera.
**Contrato esperado recomendado:** Implementar transacciones u optimismo con versión. O definir si la última escritura gana (last-write-wins) es aceptable.
**Estado del contrato:** pendiente de decisión
**Por qué importa para pagos:** En sistemas financieros, condiciones de carrera en saldos o transacciones causan pérdida de dinero o doble cobro.

---

## F-011
**ID:** F-011
**Categoría:** Condiciones de carrera
**Riesgo:** Riego duplicado o inconsistente
**Entrada que lo desestima:** Dos lecturas simultáneas con humidity < 40 para el mismo sensor
**Comportamiento actual observado en el código:** `SensorApplicationService.ts:63-65` — `irrigatePlant` se fire-and-forget (`.catch()`) sin deduplicación. Dos lecturas simultáneas pueden disparar dos riegos.
**Contrato esperado recomendado:** Implementar debouncing o bloqueo por sensor/planta para evitar riegos duplicados.
**Estado del contrato:** pendiente de decisión
**Por qué importa para pagos:** En un sistema de automatización con costos por acción (ej. riego cobrado por evento), duplicación causa cobros excesivos.

---

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
