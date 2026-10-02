No escribas test todavia.

No cambies codigo de producccion.

Usa FAILURE_MODES.md

Cierra exactamente estos modos pendientes y no otros:

- FM-EQUIV-01: Decision humana = parse_amounr debe rechazar entradas floatcon AmountError.

- FM-FRONT-03: Decision humana = los montos de cobro en cero son invalidos; validate_amount(Decimal("0")) debe fallar con AmountError.

Para cada uno, ayudame a convertir la decision humana en contrato verificable.

Entrega las respuestas con esta estructura:

- ID:

- Decision humana:

- Contrato resultante:

- Razon de negocio:

- Impacto esperado en tests:

- Cambio recomendado en FAILURE-MODES.md:

No cambies estas decisiones.

No cierres otros pendientes.

No conviertas el comportamiento actual del codigo en especificaiones si contradice estas decisiones.

2.1. prompt

[INSTRUCCIONES]

- No cambies codigo de produccion.

- No inventes contratos nuevos.

- Genera tests unitarios para los modos de falla cuyo estado del contrato sea confirmado en los archivos FAILURE_MODES.md. Si encuentras otro modo pendiente de decision, no escribas tests para el; listalo al final como pregunta abierta.

[CAPA 1 - Sistema bajo prueba]

Modulo: src/payments_svc/amounts.py

Framwork de test: unittest de la libreria estandar.

Archivo destino: tests/payments_svc/amounts_test.py

Funciones bajo prueba: parse_amounts, normalize_currency, validate_amounts, round_amount, round_money, calculate_fee, y total_with_fee.

[CAPA 2 - Modos de falla a cubrir]

- Lee FAILURE-MODES.md y usa las decisiones de contrato ya reflejados en sus contratos esperados.

- Usa solo los modos de falla de amounts.py cuyo Estado del contrato sea confirmado.

- No escribas test para otros modos que sigan pendientes de decisión.

[CAPA 3 - Forma de salida]

- Entrega solo el contenido test/test_amounts.py.

- Usa unittest.

- Cada test debe tener un comentario corto con el ID del modo de falla que cubre.

- Nombra cada test segun el contrato que protege.

- Usa la estructura Arrange, Act, Assert mediante comentarios dentro de cada test.

- No pruebes detalles internos irrelevantes si no estan conectados con un modo de falla confirmado.

- Al final del archivo, no incluyas explicaciones en prosa.

[SALIDAS ADICIONALES DESPUES DEL CODIGO]

- Test generados y modo de falla que cubren.

- Modos pendientes que no se convirtieron en test, y por que.

