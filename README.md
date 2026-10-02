# 🌱 asaaii-demo

> **A methodology demo for creating unit tests with Artificial Intelligence**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Vitest](https://img.shields.io/badge/Vitest-5.0+-green.svg)](https://vitest.dev/)
[![License](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

---

## 📋 Description

This project is a **plant monitoring system with sensors** designed as a case study to demonstrate an AI-assisted unit testing methodology.

The system allows you to:
- 🌿 Create and manage plants
- 📡 Register sensors for humidity, temperature, and electrical conductivity
- 🔗 Assign sensors to plants
- 📊 Take readings and trigger automatic irrigation when humidity < 40%

---

## 🧠 AI Testing Methodology

This repository demonstrates a workflow where AI assists with:

### 1. **Failure Mode Analysis**
Failure modes are systematically identified using standard categories:

| Category | Key Question |
|----------|--------------|
| **Boundary Values** | What happens right at the limits? |
| **Equivalence Partitions** | Which input classes behave differently? |
| **Null / Empty** | What if the data is missing? |
| **Race Conditions** | What if it happens twice at once? |
| **Authorization Bypass** | Can someone act who shouldn't be able to? |

### 2. **Failure Catalog**
Each failure mode is documented with:
- Unique **ID**
- **Category** of analysis
- **Risk** to the business
- **Input** that triggers it
- **Current behavior** observed
- **Expected contract** recommended
- **Status** of the contract (confirmed / pending)
- **Business impact**

### 3. **Test Generation**
Unit tests are created **only for confirmed contracts**, ensuring that each test verifies a defined expected behavior.

---

## 📁 Project Structure

```
asaaii-demo/
├── core/
│   ├── application/
│   │   ├── dtos/              # Data Transfer Objects
│   │   ├── ports/in/          # Use case ports (interfaces)
│   │   ├── services/          # Application services
│   │   └── FAILURES.md        # Application layer failures
│   └── domain/
│       ├── entities/          # Domain entities
│       ├── outbound/          # Repository ports
│       ├── services/          # Domain services
│       └── FAILURES.md        # Domain layer failures
├── infrastructure/
│   └── adapters/mock/        # In-memory repositories
│   └── FAILURES.md            # Infrastructure failures
├── docs/
│   └── failures/              # Catalog by category
│       ├── 01-boundary-values.md
│       ├── 02-equivalence-partitions.md
│       ├── 03-null-empty.md
│       ├── 04-race-conditions.md
│       └── 05-authorization-bypass.md
├── FAILURES.md               # Main catalog
├── index.ts                   # Entry point
└── package.json
```

---

## 🐛 Confirmed Findings

### F-004: Irrigation with incorrect identifier
**Status:** ✅ Confirmed (bug)

In `SensorApplicationService.ts:64`, the `irrigatePlant` function receives a `sensorId` but searches for plants by `plantId`, so it **never finds the correct plant** to irrigate.

```typescript
// ❌ Current behavior (bug)
this.irrigatePlant(sensorId)  // Searches plant by sensorId — never matches

// ✅ Expected contract
this.irrigatePlant(plantId)   // Search plant by its ID
```

**Test:** `core/application/services/SensorApplicationService.takeReading.test.ts`

---

## 🚀 Running

### Install
```bash
npm install
```

### Run the app
```bash
npm start
```

### Run tests
```bash
npm test
```

---

## 📊 Failure Mode Catalog

| ID | Category | Risk | Status |
|----|-----------|------|--------|
| F-001 | Boundary Values | Ambiguous irrigation threshold | ⏳ Pending |
| F-002 | Boundary Values | Physically impossible values | ⏳ Pending |
| F-003 | Equivalence Partitions | Readings from non-existent sensors | ⏳ Pending |
| **F-004** | **Equivalence Partitions** | **Irrigation with wrong ID** | **✅ Confirmed** |
| F-005 | Equivalence Partitions | Assigning non-existent sensors | ⏳ Pending |
| F-006 | Null / Empty | 0 vs undefined indistinguishable | ⏳ Pending |
| F-007 | Null / Empty | Empty sensorId | ⏳ Pending |
| F-008 | Null / Empty | Required fields not validated | ⏳ Pending |
| F-009 | Race Conditions | Lost updates | ⏳ Pending |
| F-010 | Race Conditions | Duplicate creation | ⏳ Pending |
| F-011 | Race Conditions | Duplicate irrigation | ⏳ Pending |
| F-012 | Authorization Bypass | No authentication | ⏳ Pending |
| F-013 | Authorization Bypass | Modifying others' resources | ⏳ Pending |
| F-014 | Authorization Bypass | Manipulated readings | ⏳ Pending |

---

## 🎯 Methodology Principles

1. **Do not assume the current implementation is correct**
2. **Mark as "pending" what cannot be inferred from the business**
3. **Create tests only for confirmed contracts**
4. **Document the "why" behind each failure mode**
5. **Prioritize by business impact (payments, data, security)**

---

## 📄 License

ISC License

---

## 👤 Author

**Moisés Baldenegro**

---

<div align="center">

**🌱 asaaii-demo** — *AI-assisted testing methodology*

</div>
