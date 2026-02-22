const cds = require('@sap/cds');

class ExpenseCalculator {
    static async updateBudget(budget_ID, Entities) {
        if (!budget_ID) return;
        const { Expenses, Budgets } = Entities;

        // Get Sum of Expenses
        const result = await SELECT.one.from(Expenses)
            .where({ budget_ID })
            .columns('sum(amount) as totalSpent');

        const totalSpent = result.totalSpent || 0;
        
        // Update Budget
        return UPDATE(Budgets, budget_ID).with({
            spent: totalSpent,
            remaining: { xpr: [ {ref:['totalBudget']}, '-', {val:totalSpent} ] }
        });
    }
}
module.exports = ExpenseCalculator;
