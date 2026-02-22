sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"com/myorg/expense/tracker/budgetfpm/test/integration/pages/BudgetsMain"
], function (JourneyRunner, BudgetsMain) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('com/myorg/expense/tracker/budgetfpm') + '/test/flp.html#app-preview',
        pages: {
			onTheBudgetsMain: BudgetsMain
        },
        async: true
    });

    return runner;
});

