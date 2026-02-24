const cds = require('@sap/cds');

class ExpenseValidator {

     // Validation for Expenses
    static async validateExpense(req, Entities) {
        const { amount, budget_ID } = req.data;
        const { Budgets } = Entities;

        // No negative expenses (Sense Check)
        if (amount < 0) {
            return req.error(400, 'Expense amount cannot be negative.', 'amount');
        }

        // Budget Overrun Check
        if (budget_ID) {
            // Read Budget
            const budget = await SELECT.one.from(Budgets)
                .where({ ID: budget_ID })
                .columns('name', 'spent', 'totalBudget', 'remaining');

            if (budget_ID) {
                const projectedSpent = Number(budget.spent) + Number(amount);
                if (projectedSpent > Number(budget.totalBudget)) {
                    req.error(400, `Insufficient funds in "${budget.name}". Remaining: ${budget.remaining}`, 'amount');
                }
            }
        }
    }

     // Validation for Budgets
    static async validateBudget(req, Entities) {
        const { ID, totalBudget } = req.data;
        const { Budgets } = Entities;

        // No negative expenses (Sense Check)
        if (totalBudget < 0) {
            return req.error(400, 'Budget amount cannot be negative.', 'totalBudget');
        }

        // Budget Overrun Check
        if (ID) {
            // Read Budget
            const budget = await SELECT.one.from(Budgets)
                .where({ ID: ID })
                .columns('name', 'spent', 'totalBudget', 'remaining');
            if(totalBudget < budget.spent){
                return req.error(400, 'Budget amount cannot be less than Spent.', 'totalBudget');
            }
        }
    }
}

module.exports = ExpenseValidator;
