sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('com.myorg.expense.tracker.budgets.ext.controller.BudgetListReportExt', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf com.myorg.expense.tracker.budgets.ext.controller.BudgetListReportExt
             */
			onInit: function () {
				//you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				//var oModel = this.base.getExtensionAPI().getModel();
				const oModel = this.base.getAppComponent().getModel();
				const oListBinding = oModel.bindList("/Budgets");
				const oView = this.base.getView();
                oView.setBusy(true);
                oListBinding.requestContexts(0, 1).then(function (aContexts) {
                    if (aContexts.length > 0) {
                        const oContext = aContexts[0];
						oView.setBusy(false);
                        // Navigate directly to the Object Page for this specific record
                        this.base.getExtensionAPI().getRouting().navigate(oContext);
                    } else {
						oView.setBusy(false);
                        // Optional: If no budget exists, trigger a 'Create' 
                         this.base.getExtensionAPI().getEditFlow().createDocument(oListBinding);
                    }
                }.bind(this));
			}
		}
	});
});
