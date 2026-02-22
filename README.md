# 📊 ExpenseTracker — Personal Expense Tracker

ExpenseTracker is a sample SAP CAP-based personal expense tracking application.  
It demonstrates a modular project structure with:

- **CAP CDS** domain models  
- **OData V4 services**  
- Extendable UI (Fiori Elements)  
- In-memory / persistent backend  
- Test suite  

This README explains how to get started, build, run, and contribute.

---

## Project Structure

The repository follows a clean, standard CAP layout:


app/ — Fiori/UI5 front-end (UI content, if added)
db/ — Domain models and data definitions
srv/ — Service definitions and custom logic
test/ — Automated tests
package.json — Node.js project metadata
README.md — This file


Each folder serves a purpose:

- **db/** — CDS models (entities, types, enums)  
- **srv/** — OData services, business logic handlers  
- **app/** — UI content (Fiori Elements / custom UI5)  
- **test/** — Unit and integration tests  
- **package.json** — Dependencies & scripts  

---

## Getting Started

### Prerequisites

Install the following tools if not already installed:

- **Node.js** (≥ 16)
- **@sap/cds CLI** globally:
  ```bash
  npm install -g @sap/cds

Optionally, install the VS Code CAP Extension Pack for better development experience.

### Run Locally

Clone the repository:

git clone https://github.com/myexpenses2026/expensetracker.git

cd expensetracker

Install dependencies:

**npm install**

Start the CAP server in watch mode:

**cds watch**

This runs OData V4 service at /ExpenseTracker/

In-memory SQLite by default (no external DB required)

Open your browser and navigate to:

http://localhost:4004/
📡 Services

http://localhost:4004/$launchpad CAP Launchpad

The project exposes the following OData service:
ExpenseTrackerService

Defined in srv/service.cds, it includes:

- Entity	Description

- Budgets	Budget master data

- Expenses	Expense transactions (draft enabled)

- resetAmount (action)	Custom bound action to reset expense amount

The base service path is configured as: /ExpenseTracker/

🧾 License

This project does not currently include a license file — you may want to add one (e.g., MIT, Apache 2.0) to clarify usage rights.