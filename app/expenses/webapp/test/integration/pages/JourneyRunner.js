sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"com/myorg/expense/tracker/expenses/test/integration/pages/ExpensesList",
	"com/myorg/expense/tracker/expenses/test/integration/pages/ExpensesObjectPage"
], function (JourneyRunner, ExpensesList, ExpensesObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('com/myorg/expense/tracker/expenses') + '/test/flp.html#app-preview',
        pages: {
			onTheExpensesList: ExpensesList,
			onTheExpensesObjectPage: ExpensesObjectPage
        },
        async: true
    });

    return runner;
});

