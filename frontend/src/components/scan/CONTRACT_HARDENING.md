# Contract Hardening Report: Scan Results UI

## ✅ SAFE

### Worker Components (All 6)

- [x] Accept `perspective` prop
- [x] Handle `loading` state with skeletons
- [x] Handle `error` state gracefully
- [x] Handle `results.length === 0` empty state
- [x] AI context accessed via optional chaining (`result.ai?.attacker?.field`)
- [x] AI blocks render ONLY when `hasAI = !!aiContext`
- [x] Falls back to "No AI analysis" text when AI missing
- [x] No data mutation or transformation
- [x] No severity calculation
- [x] No cross-worker correlation

### PerspectiveToggle

- [x] Checks `features.ai_analysis === true` (strict equality)
- [x] Disables Attacker/Defender when feature off
- [x] Shows upgrade tooltip for disabled states
- [x] Does NOT affect data fetching
- [x] No role-based or plan-name checks

### ScanLogs

- [x] Handles empty logs array
- [x] `formatTime()` has try/catch fallback
- [x] `getLevelColor()` has default case
- [x] Connection status visually displayed
- [x] Append-only log rendering (no mutation)

---

## ⚠️ ASSUMPTIONS MADE

| Component          | Assumption                                      | Risk   |
| ------------------ | ----------------------------------------------- | ------ |
| `SubdomainResults` | `result.subdomain` always exists                | Medium |
| `PortResults`      | `result.port` always a number                   | Medium |
| `NucleiResults`    | `result.severity` is string                     | Low    |
| `ScanLogs`         | `log.scanId`, `log.source`, `log.message` exist | Medium |
| All Workers        | `results` is always an array                    | High   |

---

## ⚠️ ISSUES FOUND

### 1. ScanLogs timestamp source incorrect

- **File**: `ScanLogs.tsx:101`
- **Issue**: Uses `formatTime(log.message)` instead of `formatTime(log.timestamp)`
- **Fix**: Change to `log.timestamp`

### 2. Missing undefined guard on results array

- **Risk**: If `results` is `undefined` instead of `[]`, component crashes
- **Fix**: Add `?? []` fallback or early return

### 3. ScanLogs type mismatch

- **File**: `ScanLogs.tsx:4`
- **Issue**: Uses `ScanLogEvent` from `@/types` but type is `ScanLogPayload`
- **Fix**: Update import

---

## 🔧 REQUIRED BACKEND GUARANTEES

1. **Worker results** MUST be arrays (never `null` or `undefined`)
2. **Finding severity** MUST be uppercase string: `CRITICAL|HIGH|MEDIUM|LOW|INFO`
3. **AI context** fields are optional; absence is valid
4. **WebSocket events** MUST follow `WSEvent<T>` structure
5. **FeatureFlags.ai_analysis** MUST be explicit boolean

---

## 🛡️ ERROR BOUNDARY PLACEMENT (RECOMMENDED)

```
/scan/[scanId]/page.tsx
├── ErrorBoundary → ScanHeader
├── ErrorBoundary → ScanProgress
├── ErrorBoundary → ScanLogs       ← WebSocket can fail
└── ErrorBoundary → TabContent     ← Wrap each worker
    ├── SubdomainResults
    ├── PortResults
    ├── TechResults
    ├── HeadersResults
    ├── TLSResults
    └── NucleiResults
```

---

## 📋 SUMMARY

| Category                 | Status                  |
| ------------------------ | ----------------------- |
| Contract Guards          | ✅ Adequate             |
| Perspective Safety       | ✅ Complete             |
| WebSocket Safety         | ⚠️ Needs timestamp fix  |
| Feature Flag Enforcement | ✅ Complete             |
| Error Boundary Ready     | 🔜 Structure identified |
