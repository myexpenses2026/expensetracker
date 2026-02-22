using { ExpenseTrackerService } from './expense-service';

// Generic Service Access
annotate ExpenseTrackerService with @(requires: 'authenticated-user');

// Admin Full Access for Budgets
// User Read Access
annotate ExpenseTrackerService.Budgets with @(
    restrict: [
        { 
            grant: '*', to: 
            'Admin', 
            where: 'ID = $user.BudgetID' 
        },
        { 
            grant: 'READ', 
            to: 'User',
            where: 'ID = $user.BudgetID'  }
    ]
);

// Admin & User Access to Expenses
annotate ExpenseTrackerService.Expenses with @(
    restrict: [
        { 
            grant: ['READ', 'CREATE', 'UPDATE', 'resetAmount'], 
            to: 'Admin',
            where: 'budget.ID = $user.BudgetID'
        },
        { 
            grant: ['READ', 'CREATE', 'UPDATE', 'resetAmount'], 
            to: 'User',
            where: 'budget.ID = $user.BudgetID' 
        } 
    ]
);