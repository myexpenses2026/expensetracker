sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"com/myorg/expense/tracker/budgets/test/integration/pages/BudgetsList",
	"com/myorg/expense/tracker/budgets/test/integration/pages/BudgetsObjectPage"
], function (JourneyRunner, BudgetsList, BudgetsObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('com/myorg/expense/tracker/budgets') + '/test/flp.html#app-preview',
        pages: {
			onTheBudgetsList: BudgetsList,
			onTheBudgetsObjectPage: BudgetsObjectPage
        },
        async: true
    });

    return runner;
});

