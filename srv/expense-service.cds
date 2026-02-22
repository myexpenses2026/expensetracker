using com.myorg.expense.tracker as db from '../db/schema';

service ExpenseTrackerService @(path: '/ExpenseTracker') {

    
    @odata.draft.enabled
    entity Budgets as projection on db.Budgets;

    @odata.draft.enabled
    entity Expenses as projection on db.Expenses
    
    actions {
        @Common.IsActionCritical: true
        // Bound action for the confirmation popup requirement
        @Common.SideEffects : { 
            SourceEntities : [ expenses ],
            TargetEntities : [ budget ], 
            TargetProperties : [ 'budget/spent', 'budget/remaining' ] 
        }
        action resetAmount() returns Expenses;
    };
}

