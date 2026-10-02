# Particiones de equivalencia

## F-003
**ID:** F-003
**Categoría:** Particiones de equivalencia
**Riesgo:** Lecturas guardadas para sensores inexistentes
**Entrada que lo desestima:** `sensorId: "S-999"` (sensor no registrado)
**Comportamiento actual observado en el código:** `SensorApplicationService.ts:54-55` — Si el sensor no existe, usa el `sensorId` del DTO directamente: `const sensorId = sensor ? sensor.id : dto.sensorId;` y guarda la lectura de todas formas.
**Contrato esperado recomendado:** Si el sensor no existe, rechazar la lectura con error. No se deben persistir lecturas huérfanas.
**Estado del contrato:** pendiente de decisión
**Por qué importa para pagos:** En un sistema de suscripciones o facturación por uso, permitir operaciones con referencias inexistentes permite fraude o errores de facturación.

---

## F-004
**ID:** F-004
**Categoría:** Particiones de equivalencia
**Riesgo:** Riego ejecutado con identificador incorrecto
**Entrada que lo desestima:** `sensorId` válido pero que no corresponde a ninguna planta
**Comportamiento actual observado en el código:** `SensorApplicationService.ts:64` — `this.irrigatePlant(sensorId)` pasa un **sensorId** a una función que busca **plantas** por `p.id === plantId || p.id_plant === plantId`. Nunca encontrará la planta correcta porque está buscando un ID de sensor en IDs de planta.
**Contrato esperado recomendado:** La función debería recibir un `plantId` y buscar la planta por su ID, luego verificar que tenga un sensor asignado. O alternativamente, buscar la planta asociada al sensor.
**Estado del contrato:** confirmado (es un bug)
**Por qué importa para pagos:** En un sistema de automatización, ejecutar acciones en el recurso incorrecto (ej. cobrar al cliente equivocado) es un error crítico.

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
