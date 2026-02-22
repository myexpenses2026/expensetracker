using ExpenseTrackerService from './expense-service';

// Expenses - Transaction App (List Report & Object Page)
annotate ExpenseTrackerService.Expenses with @(
    UI.HeaderInfo: {
        TypeName: 'Transaction',
        TypeNamePlural: 'Transactions',
        Title: { Value: description },
        Description: { Value: type }
    },
    
    // Selection Fields allow the user to pick a Budget
    //UI.SelectionFields: [ budget_ID ],

    // Columns in the List Report
    UI.LineItem: [
        { Value: description },
        { Value: type },
        { 
            Value: amount,
            Criticality: { $edmJson: { $If: [ { $Eq: [ { $Path: 'amount' }, 0 ] }, 0, 3 ] } } 
        },
        { 
            $Type: 'UI.DataFieldForAction', 
            Label: 'Reset Amount', 
            Action: 'ExpenseTrackerService.resetAmount',
            InvocationGrouping: #Isolated 
        }
    ],
    
    UI.DataPoint #SpentBudget: {
        Value: budget.spent,
        Title: 'Spent from Selected Budget',
        TargetValue  : budget.totalBudget,
        Visualization: #Progress
    },
    
    UI.DataPoint #RemainingBudget: {
        Value: budget.remaining,
        Title: 'Remaining in Selected Budget'
    },

    // Object Page Header: Show remaining budget from the parent
    UI.HeaderFacets: [
        { $Type: 'UI.ReferenceFacet', ID: 'ExpenseHeaderSpentBudget', Target: '@UI.DataPoint#SpentBudget' },
        { $Type: 'UI.ReferenceFacet', ID: 'ExpenseHeaderRemainingBudget', Target: '@UI.DataPoint#RemainingBudget' }
    ],

    // Object Page Content
    UI.Facets: [
        { $Type: 'UI.ReferenceFacet', ID: 'ExpenseDetailsFacet', Label: 'Main Information', Target: '@UI.FieldGroup#Main' }
    ],
    
    UI.FieldGroup #Main: {
        Data: [
            { Value: description },
            { Value: type },
            { Value: amount },
            { Value: budget_ID, Label: 'Assigned Budget' }
        ]
    },

    // Trigger UI refresh when the 'amount' field changes or the 'resetAmount' action runs
    Common.SideEffects #AmountChanged : {
        SourceProperties : [ amount ],
        TargetProperties : [
            'budget/spent',
            'budget/remaining'
        ]
    },
    Common.SideEffects #ActionExecuted : {
        SourceEntities : [ budget ],
        TargetProperties : [
            'budget/spent',
            'budget/remaining'
        ]
    },
    Common.SideEffects #UpdateBudgetOnExpenseChange: {
        SourceEntities  : [ expenses ], // Triggered by changes in the expense list
        TargetProperties: [ 'spent', 'remaining' ] // Refresh these budget fields
    }

);


// Budgets - Budget App 
annotate ExpenseTrackerService.Budgets with @(
    UI.CreateHidden: true,
    
    UI.DataPoint #Spent: {
        Value: spent,
        Title: 'Spent from Selected Budget',
        TargetValue  : totalBudget,
        Visualization: #Progress
    },

    UI.DataPoint #Remaining: {
        Value: remaining,
        Title: 'Remaining in Selected Budget'
    },
    
    UI.LineItem: [
        { Value: name },
        { Value: totalBudget },
        { Value: spent },
        { Value: remaining }
    ],

    UI.HeaderInfo: {
        TypeName: 'Budget',
        TypeNamePlural: 'Budgets',
        Title: { Value: name }
    },

    UI.HeaderFacets: [
        { $Type: 'UI.ReferenceFacet', ID: 'BudgetHeaderSpentBudget', Target: '@UI.DataPoint#Spent' },
        { $Type: 'UI.ReferenceFacet', ID: 'BudgetHeaderRemainingBudget', Target: '@UI.DataPoint#Remaining' }
    ],

    UI.Facets : [
        {
            $Type  : 'UI.ReferenceFacet',
            ID     : 'BudgetDetailsFacet',
            Label  : 'Budget Information',
            Target : '@UI.FieldGroup#BudgetDetails',
        }
    ],

    UI.FieldGroup #BudgetDetails : {
        Data : [
            {
                $Type : 'UI.DataField',
                Value : name,
            },
            {
                $Type : 'UI.DataField',
                Value : totalBudget,
            }
        ]
    }
);
