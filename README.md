# DMS — Defect Management System (Frontend)

A frontend-only Angular application for tracking semiconductor manufacturing defects.

## **Live demo:** https://dms-system-khaki.vercel.app/defects

## Why this project

Semiconductor manufacturing quality workflows revolve around catching, tracking, and resolving defects quickly. This project demonstrates the frontend patterns that kind of system needs, including filterable data tables, validated data-entry forms, and at-a-glance dashboards.

## What it does

- **Report a defect** — a validated form (title, description, lot/product ID, station, severity, status, assignee) for logging new defects.
- **Defect list** — a searchable, filterable table (by status and severity) of all reported defects.
- **Dashboard** — summary stat cards (total / open / critical) and a severity breakdown chart, built with plain CSS (no charting library).

All three views read from the same in-memory data store, so a defect reported through the form appears immediately in the list and dashboard.

## Tech stack & decisions

- **Angular 18**
- **Signals**
- **Reactive Forms** with validation

## Known limitation

Because there's no backend or persistent storage, data resets on page refresh (back to the seeded sample records).

## Running locally

```bash
npm install
ng serve
```

Then open `http://localhost:4200`.

## Project structure

```
src/app/
├── core/
│   ├── models/       # Defect, DefectStatus, DefectSeverity types
│   └── services/      # DefectService — single source of truth for defect data
├── shared/
│   └── components/    # Reusable UI (nav, status badge)
└── features/
    ├── defect-list/    # Searchable/filterable defect table
    ├── defect-form/    # Report-defect form with validation
    └── dashboard/      # Summary stats + severity chart
```

---

---

# DMS — 缺陷管理系統（前端）

一個純前端的 Angular 應用程式，作為半導體製造業缺陷管理系統相關的作品集專案。

**線上展示：** https://dms-system-khaki.vercel.app/defects

---

## 專案發想

半導體製造業的品質管理流程，核心就是快速發現、追蹤、解決缺陷。此專案展示了這類系統需要的前端能力，包含可篩選的資料表格、有驗證機制的資料輸入表單、一目了然的統計儀表板。

## 功能

- **回報缺陷** ——有驗證機制的表單（標題、描述、批號/產品編號、站別、嚴重度、狀態、負責人），用來記錄新缺陷。
- **缺陷列表** ——可搜尋篩選（依狀態、嚴重度）的缺陷資料表。
- **儀表板** ——統計卡片（總數 / 待處理 / 嚴重）跟嚴重度分布圖，純 CSS 實作，未使用圖表套件。

三個畫面共用同一份記憶體內的資料，透過表單新增的缺陷，會立刻反映在列表跟儀表板上。

## 技術選型與決策說明

- **Angular 18**
- **Signal**
- **Reactive Forms** 搭配驗證規則

## 已知限制

因為沒有後端或永久儲存機制，重新整理頁面資料會重置（回到預設的種子資料）。

## 本機執行方式

```bash
npm install
ng serve
```

接著打開 `http://localhost:4200`。

## 專案結構

```
src/app/
├── core/
│   ├── models/       # Defect、DefectStatus、DefectSeverity 型別定義
│   └── services/      # DefectService —— 缺陷資料的單一真實來源
├── shared/
│   └── components/    # 共用 UI 元件（導覽列、狀態標籤）
└── features/
    ├── defect-list/    # 可搜尋/篩選的缺陷列表
    ├── defect-form/    # 缺陷回報表單（含驗證）
    └── dashboard/      # 統計卡片 + 嚴重度圖表
```
