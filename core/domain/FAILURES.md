# Domain Layer - Modos de falla

## F-001
**ID:** F-001
**Categoría:** Valores de frontera
**Riesgo:** Riego incorrecto en el límite exacto del umbral
**Entrada que lo desestima:** `humidity: 40` (valor exacto del umbral)
**Comportamiento actual observado en el código:** `SensorApplicationService.ts:63` — `if(reading.humidity < 40)` — Con humidity = 40 exactamente, NO se riega. Con 39.99 sí. El contrato no especifica si el umbral es inclusivo o exclusivo.
**Contrato esperado recomendado:** Definir explícitamente si el umbral es `< 40` (exclusivo) o `<= 40` (inclusivo) y documentarlo. Para riego, típicamente se riega cuando humidity **es menor o igual** al umbral crítico.
**Estado del contrato:** pendiente de decisión
**Por qué importa para pagos:** En un sistema de riego automatizado, un umbral mal definido puede causar riego excesivo (costos de agua/energía) o déficit hídrico (pérdida de cultivo). En pagos, umbrales mal definidos en comisiones o tarifas causan discrepancias financieras.

---

## F-002
**ID:** F-002
**Categoría:** Valores de frontera
**Riesgo:** Aceptación de valores físicamente imposibles
**Entrada que lo desestima:** `humidity: 101` o `temperature: -50`
**Comportamiento actual observado en el código:** `SensorApplicationService.ts:58-60` — No hay validación de rangos. Se aceptan cualquier número, incluyendo negativos o >100 para humidity.
**Contrato esperado recomendado:** Validar rangos físicos: humidity [0, 100], temperature [-40, 85] (típicos de sensores), electrical_conductivity >= 0.
**Estado del contrato:** pendiente de decisión
**Por qué importa para pagos:** Datos inválidos contaminan métricas de negocio. En pagos, montos negativos o excesivos no validados causan pérdidas financieras directas.

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

## F-006
**ID:** F-006
**Categoría:** Null / Vacíos
**Riesgo:** Valores por defecto (0) indistinguibles de datos reales
**Entrada que lo desestima:** `humidity: 0` (enviado explícitamente) vs `humidity: undefined` (no enviado)
**Comportamiento actual observado en el código:** `SensorApplicationService.ts:58-60` — `dto.humidity ?? 0` convierte undefined en 0, pero también acepta 0 como valor válido. No se puede distinguir entre "sensor no envió dato" y "sensor envió 0".
**Contrato esperado recomendado:** Usar `null` o un flag de "dato faltante" para distinguir entre "no enviado" y "valor cero". O hacer los campos obligatorios en el DTO.
**Estado del contrato:** pendiente de decisión
**Por qué importa para pagos:** En facturación, no distinguir entre "no aplica" (null) y "cero" (0) puede causar cobros incorrectos o pérdida de ingresos.
