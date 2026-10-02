# 🌱 asaaii-demo

> **Demostración de metodología para crear tests unitarios con Inteligencia Artificial**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Vitest](https://img.shields.io/badge/Vitest-5.0+-green.svg)](https://vitest.dev/)
[![License](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

---

## 📋 Descripción

Este proyecto es un **sistema de monitoreo de plantas con sensores** diseñado como caso de estudio para demostrar una metodología de creación de tests unitarios asistida por IA.

El sistema permite:
- 🌿 Crear y gestionar plantas
- 📡 Registrar sensores de humedad, temperatura y conductividad eléctrica
- 🔗 Asignar sensores a plantas
- 📊 Tomar lecturas y disparar riego automático cuando la humedad < 40%

---

## 🧠 Metodología IA para Tests

Este repositorio demuestra un flujo de trabajo donde la IA ayuda a:

### 1. **Análisis de Modos de Falla**
Se identifican sistemáticamente los modos de falla usando categorías estándar:

| Categoría | Pregunta clave |
|-----------|----------------|
| **Valores de frontera** | ¿Qué pasa justo en los límites? |
| **Particiones de equivalencia** | ¿Qué clases de entrada se comportan distinto? |
| **Null / Vacíos** | ¿Y si falta el dato? |
| **Condiciones de carrera** | ¿Y si pasa dos veces a la vez? |
| **Bypass de autorización** | ¿Puede actuar quien no debería? |

### 2. **Catálogo de Fallos**
Cada modo de falla se documenta con:
- **ID** único
- **Categoría** de análisis
- **Riesgo** para el negocio
- **Entrada** que lo desestima
- **Comportamiento actual** observado
- **Contrato esperado** recomendado
- **Estado** del contrato (confirmado / pendiente)
- **Impacto** en el negocio

### 3. **Generación de Tests**
Se crean tests unitarios **solo para contratos confirmados**, garantizando que cada test verifica un comportamiento esperado definido.

---

## 📁 Estructura del Proyecto

```
asaaii-demo/
├── core/
│   ├── application/
│   │   ├── dtos/              # Data Transfer Objects
│   │   ├── ports/in/          # Casos de uso (interfaces)
│   │   ├── services/          # Servicios de aplicación
│   │   └── FAILURES.md        # Fallos de capa aplicación
│   └── domain/
│       ├── entities/          # Entidades del dominio
│       ├── outbound/          # Puertos de repositorio
│       ├── services/          # Servicios de dominio
│       └── FAILURES.md        # Fallos de capa dominio
├── infrastructure/
│   └── adapters/mock/        # Repositorios en memoria
│   └── FAILURES.md            # Fallos de infraestructura
├── docs/
│   └── failures/              # Catálogo por categoría
│       ├── 01-valores-frontera.md
│       ├── 02-particiones-equivalencia.md
│       ├── 03-null-vacios.md
│       ├── 04-condiciones-carrera.md
│       └── 05-bypass-autorizacion.md
├── FAILURES.md                # Catálogo principal
├── index.ts                   # Punto de entrada
└── package.json
```

---

## 🐛 Hallazgos Confirmados

### F-004: Riego con identificador incorrecto
**Estado:** ✅ Confirmado (bug)

En `SensorApplicationService.ts:64`, la función `irrigatePlant` recibe un `sensorId` pero busca plantas por `plantid`, por lo que **nunca encuentra la planta correcta** para regar.

```typescript
// ❌ Comportamiento actual (bug)
this.irrigatePlant(sensorId)  // Busca planta por sensorId — nunca coincide

// ✅ Contrato esperado
this.irrigatePlant(plantId)   // Buscar planta por su ID
```

**Test:** `core/application/services/SensorApplicationService.takeReading.test.ts`

---

## 🚀 Ejecución

### Instalación
```bash
npm install
```

### Ejecutar aplicación
```bash
npm start
```

### Ejecutar tests
```bash
npm test
```

---

## 📊 Catálogo de Modos de Falla

| ID | Categoría | Riesgo | Estado |
|----|-----------|--------|--------|
| F-001 | Valores de frontera | Umbral de riego ambiguo | ⏳ Pendiente |
| F-002 | Valores de frontera | Valores físicamente imposibles | ⏳ Pendiente |
| F-003 | Particiones de equivalencia | Lecturas de sensores inexistentes | ⏳ Pendiente |
| **F-004** | **Particiones de equivalencia** | **Riego con ID incorrecto** | **✅ Confirmado** |
| F-005 | Particiones de equivalencia | Asignar sensores inexistentes | ⏳ Pendiente |
| F-006 | Null / Vacíos | 0 vs undefined indistinguibles | ⏳ Pendiente |
| F-007 | Null / Vacíos | sensorId vacío | ⏳ Pendiente |
| F-008 | Null / Vacíos | Campos obligatorios sin validar | ⏳ Pendiente |
| F-009 | Condiciones de carrera | Pérdida de actualizaciones | ⏳ Pendiente |
| F-010 | Condiciones de carrera | Creación duplicada | ⏳ Pendiente |
| F-011 | Condiciones de carrera | Riego duplicado | ⏳ Pendiente |
| F-012 | Bypass de autorización | Sin autenticación | ⏳ Pendiente |
| F-013 | Bypass de autorización | Modificar recursos ajenos | ⏳ Pendiente |
| F-014 | Bypass de autorización | Lecturas manipuladas | ⏳ Pendiente |

---

## 🎯 Principios de la Metodología

1. **No asumir que la implementación actual es correcta**
2. **Marcar como "pendiente" lo que no se puede inferir del negocio**
3. **Crear tests solo para contratos confirmados**
4. **Documentar el "por qué" de cada modo de falla**
5. **Priorizar por impacto en el negocio (pagos, datos, seguridad)**

---

## 📄 Licencia

ISC License

---

## 👤 Autor

**Moisés Baldenegro**

---

<div align="center">

**🌱 asaaii-demo** — *Metodología de tests con IA*

</div>
