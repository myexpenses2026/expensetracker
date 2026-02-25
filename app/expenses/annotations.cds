using ExpenseTrackerService as service from '../../srv/expense-service';
annotate service.Expenses with {
    budget @Common.ValueList : {
        $Type : 'Common.ValueListType',
        CollectionPath : 'Budgets',
        Parameters : [
            {
                $Type : 'Common.ValueListParameterInOut',
                LocalDataProperty : budget_ID,
                ValueListProperty : 'ID',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'name',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'totalBudget',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'spent',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'remaining',
            },
        ],
    }
};

