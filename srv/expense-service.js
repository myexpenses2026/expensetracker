const cds = require('@sap/cds');
const Validator = require('./lib/validator');
const ExpenseCalculator = require('./lib/calculator');

// ExpenseTrackerService Implementation
class ExpenseTrackerService extends cds.ApplicationService {
    async init() {
        const { Expenses, Budgets } = this.entities;
        
        /*this.on('*', (req,next) => { 
            console.log("Incoming Request:", req.event, "on", req.target.name);
            return next(); 
        });*/

        // Validation
        this.before(['CREATE','UPDATE'], [Expenses,Expenses.drafts], async (req) => {
            const userBudgetID = req.user.attr.BudgetID;

            if (userBudgetID) {
                // Map the budget_ID in the data payload
                req.data.budget_ID = userBudgetID;
                console.log(`Auto-assigned BudgetID ${userBudgetID} to new Expense`);
            } else {
                // 3. Safety Check: if user has no BudgetID attribute, block the create
                return req.error(403, 'User profile is missing an assigned Budget ID.');
            }

            if (req.data.amount !== undefined) {
                //console.log("Negative Amount validation started");
                await Validator.validateExpense(req, { Budgets });
            }
        });

        this.before(['CREATE','UPDATE'], [Budgets,Budgets.drafts], async (req) => {

            if (req.data.totalBudget !== undefined) {
                //console.log("Negative Amount validation started");
                await Validator.validateBudget(req, { Budgets });
            }
        });

        // Calaculation: After Save (Activation of Draft)
        this.after('SAVE', Expenses, async (data) => {
            await ExpenseCalculator.updateBudget(data.budget_ID, { Expenses, Budgets });
        });

        // Bound Action: RESET AMOUNT
        this.on('resetAmount', Expenses, async (req) => {
            const { ID } = req.params[0];

            // Update amount to zero
            //console.log("Expense ID: ", ID, "; Params: ",req.params);
            await UPDATE(Expenses, ID).with({ amount: 0 });

            // Fetch budget ID to trigger backend recalculation
            const exp = await SELECT.one.from(Expenses, ID).columns('budget_ID');
            if (exp.budget_ID) {
                await ExpenseCalculator.updateBudget(exp.budget_ID, { Expenses, Budgets });
            }

            // Return updated entity to trigger Fiori Side Effects
            return SELECT.one.from(Expenses, ID);
        });

        return super.init();
    }
}

module.exports = ExpenseTrackerService ;
