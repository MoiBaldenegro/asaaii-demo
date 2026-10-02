# Infrastructure Layer - Modos de falla

## F-010
**ID:** F-010
**Categoría:** Condiciones de carrera
**Riesgo:** Creación duplicada de plantas/sensores con mismo ID
**Entrada que lo desestima:** Dos llamadas simultáneas a `createPlant` con el mismo `id_plant`
**Comportamiento actual observado en el código:** `MockPlantRepository.ts:8-14` — `save` hace read-then-write sin atomicidad. Si dos llamadas ocurren simultáneamente con el mismo ID, ambas pueden pasar el `findIndex` antes de que alguna inserte, resultando en duplicados.
**Contrato esperado recomendado:** Implementar restricciones de unicidad o transacciones.
**Estado del contrato:** pendiente de decisión
**Por qué importa para pagos:** En sistemas de inventario o facturación, duplicados causan errores de stock o doble facturación.
