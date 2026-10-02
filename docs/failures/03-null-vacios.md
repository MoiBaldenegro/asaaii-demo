# Null / Vacíos

## F-006
**ID:** F-006
**Categoría:** Null / Vacíos
**Riesgo:** Valores por defecto (0) indistinguibles de datos reales
**Entrada que lo desestima:** `humidity: 0` (enviado explícitamente) vs `humidity: undefined` (no enviado)
**Comportamiento actual observado en el código:** `SensorApplicationService.ts:58-60` — `dto.humidity ?? 0` convierte undefined en 0, pero también acepta 0 como valor válido. No se puede distinguir entre "sensor no envió dato" y "sensor envió 0".
**Contrato esperado recomendado:** Usar `null` o un flag de "dato faltante" para distinguir entre "no enviado" y "valor cero". O hacer los campos obligatorios en el DTO.
**Estado del contrato:** pendiente de decisión
**Por qué importa para pagos:** En facturación, no distinguir entre "no aplica" (null) y "cero" (0) puede causar cobros incorrectos o pérdida de ingresos.

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
