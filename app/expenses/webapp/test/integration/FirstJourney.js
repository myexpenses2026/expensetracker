sap.ui.define([
    "sap/ui/test/opaQunit",
    "./pages/JourneyRunner"
], function (opaTest, runner) {
    "use strict";

    function journey() {
        QUnit.module("First journey");

        opaTest("Start application", function (Given, When, Then) {
            Given.iStartMyApp();

            Then.onTheExpensesList.iSeeThisPage();
            Then.onTheExpensesList.onTable().iCheckColumns(3, {"description":{"header":"description"},"type":{"header":"type"},"amount":{"header":"amount"}});

        });


        opaTest("Navigate to ObjectPage", function (Given, When, Then) {
            // Note: this test will fail if the ListReport page doesn't show any data
            
            When.onTheExpensesList.onFilterBar().iExecuteSearch();
            
            Then.onTheExpensesList.onTable().iCheckRows();

            When.onTheExpensesList.onTable().iPressRow(0);
            Then.onTheExpensesObjectPage.iSeeThisPage();

        });

        opaTest("Teardown", function (Given, When, Then) { 
            // Cleanup
            Given.iTearDownMyApp();
        });
    }

    runner.run([journey]);
});