sap.ui.define([
    "sap/ui/test/opaQunit",
    "./pages/JourneyRunner"
], function (opaTest, runner) {
    "use strict";

    function journey() {
        QUnit.module("First journey");

        opaTest("Start application", function (Given, When, Then) {
            Given.iStartMyApp();

            Then.onTheBudgetsList.iSeeThisPage();
            Then.onTheBudgetsList.onTable().iCheckColumns(4, {"name":{"header":"Budget Description"},"totalBudget":{"header":"Total Budget"},"spent":{"header":"Spent Budget"},"remaining":{"header":"Remaining Budget"}});

        });


        opaTest("Navigate to ObjectPage", function (Given, When, Then) {
            // Note: this test will fail if the ListReport page doesn't show any data
            
            When.onTheBudgetsList.onFilterBar().iExecuteSearch();
            
            Then.onTheBudgetsList.onTable().iCheckRows();

            When.onTheBudgetsList.onTable().iPressRow(0);
            Then.onTheBudgetsObjectPage.iSeeThisPage();

        });

        opaTest("Teardown", function (Given, When, Then) { 
            // Cleanup
            Given.iTearDownMyApp();
        });
    }

    runner.run([journey]);
});