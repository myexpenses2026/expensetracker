sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'com.myorg.expense.tracker.budgets',
            componentId: 'BudgetsObjectPage',
            contextPath: '/Budgets'
        },
        CustomPageDefinitions
    );
});