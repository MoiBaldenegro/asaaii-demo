# FAILURE_MODES.ms Catálogo de fallos

## Stack
- Se utilizara Vitest para la implementacion

## Siempre cuestionar las siguientes categorias de la siguiente forma

- Valores de frontera --> Que pasa justo en los limites? 
- Particiones de equivalencia -->   Que clases de entrada se comportan distinto?
- Null / Vacios -->  y si falta el dato?
- Consiciones de carrera --> y si pasa dos veces a la vez?
- Bypass de autorizaion --> Puede actuar quien no deberia?


## Sistema bajo prueba (SBP)
- Describe la funcion, que hace, firmas contratos, dependencias

## Modos de falla
- verificar las clases y fronteras, se deben cubrir bien los bordes, no solo le happy path.

## Forma del test
- Un test por clase con estructura AAA y fixtures ricos. la salida debe ser uniforme legible y auditable.







