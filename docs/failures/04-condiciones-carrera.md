# Condiciones de carrera

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

## F-010
**ID:** F-010
**Categoría:** Condiciones de carrera
**Riesgo:** Creación duplicada de plantas/sensores con mismo ID
**Entrada que lo desestima:** Dos llamadas simultáneas a `createPlant` con el mismo `id_plant`
**Comportamiento actual observado en el código:** `MockPlantRepository.ts:8-14` — `save` hace read-then-write sin atomicidad. Si dos llamadas ocurren simultáneamente con el mismo ID, ambas pueden pasar el `findIndex` antes de que alguna inserte, resultando en duplicados.
**Contrato esperado recomendado:** Implementar restricciones de unicidad o transacciones.
**Estado del contrato:** pendiente de decisión
**Por qué importa para pagos:** En sistemas de inventario o facturación, duplicados causan errores de stock o doble facturación.

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
