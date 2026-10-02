# Valores de frontera

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
