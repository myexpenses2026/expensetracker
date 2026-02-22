sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'com.myorg.expense.tracker.expenses',
            componentId: 'ExpensesList',
            contextPath: '/Expenses'
        },
        CustomPageDefinitions
    );
});