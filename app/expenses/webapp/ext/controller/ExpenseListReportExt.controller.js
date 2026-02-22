sap.ui.define([
		'sap/ui/core/mvc/ControllerExtension',
		"sap/ui/model/json/JSONModel"
	], 
	function (ControllerExtension, JSONModel) {
	'use strict';

	return ControllerExtension.extend('com.myorg.expense.tracker.expenses.ext.controller.ExpensionListReportExt', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf com.myorg.expense.tracker.expenses.ext.controller.ExpensionListReportExt
             */
			onInit: function () {
				//you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
			},
			routing: {
                /**
                 * This hook is specifically designed for V4 FPM to trigger
                 * after the page binding is complete.
                 */
                onAfterBinding: function (oBindingContext) {
                    this._updateHeaderStats();
                }
            }
		},
		
		_updateHeaderStats: function () {
            const oView = this.base.getView();
            const oModel = this.base.getExtensionAPI().getModel(); // OData V4 Model
            const oHboxC = oView.byId("BudgetKPIHboxC");
            
            // Create a binding to the Budgets collection
            // Since Auth restricts this to 1 record, we just request the first one
            const oBinding = oModel.bindList("/Budgets", null, null, null, { $select: "spent,remaining,totalBudget,name" });

            oBinding.requestContexts(0, 1).then(function (aContexts) {
                if (aContexts && aContexts.length > 0) {
                    const oData = aContexts[0].getObject();

                    //  Create the flattened JSON structure
                    const oHeaderData = {
                        spent: oData.spent,
                        remaining: oData.remaining,
                        limit: oData.totalBudget,
                        title: oData.name,
                        percentage: ((oData.spent / oData.totalBudget) * 100).toFixed(1)
                    };

                    // Set the local model named 'header'
                    oView.setModel(new JSONModel(oHeaderData), "header");

                    // Bind the Collpased HBox to reuse the Annotation from UI cds
                    var sPath = "/Budgets(ID='"+ oData.ID +"')";
                    oHboxC.bindElement({ path: sPath });
    
                }
            }).catch(err => console.error("Budget Load Failed", err));
        }
	});
});
