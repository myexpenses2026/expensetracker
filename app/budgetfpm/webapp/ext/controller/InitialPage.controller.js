sap.ui.define(
    [
        'sap/fe/core/PageController'
    ],
    function(PageController) {
        'use strict';

        return PageController.extend('com.myorg.expense.tracker.budgetfpm.ext.view.InitialPage', {
            /**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf com.myorg.expense.tracker.budgetfpm.ext.view.InitialPage
             */
              onInit: function () {
            //  PageController.prototype.onInit.apply(this, arguments); // needs to be called to properly initialize the page controller
                const oModel = this.getAppComponent().getModel();
                const oRouter = this.getAppComponent().getRouter();
                // Attach to the route matched event
                oRouter.getRoute("BudgetsInitialPagePage").attachMatched(this._onRouteMatched, this);
            },

            _onRouteMatched: function(){
                const oModel = this.getAppComponent().getModel();
                const oHistory = sap.ui.core.routing.History.getInstance();
                const sDirection = oHistory.getDirection();
                //const sPreviousHash = oHistory.getPreviousHash();

                if (sDirection == 'Backwards') {
                    // Back from the Object Page
                    window.history.go(-1); 
                }else{
                    const oExtensionAPI = this.getExtensionAPI(); // If using FE, otherwise use Router

                    const oListBinding = oModel.bindList("/Budgets");

                    oListBinding.requestContexts(0, 1).then((aContexts) => {
                        if (aContexts.length > 0) {
                            oExtensionAPI.routing.navigate(aContexts[0], {
                                replaceHistory: true
                            });
                        }
                    });
                }
            },
            /**
             * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
             * (NOT before the first rendering! onInit() is used for that one!).
             * @memberOf com.myorg.expense.tracker.budgetfpm.ext.view.InitialPage
             */
            //  onBeforeRendering: function() {
            //
            //  },

            /**
             * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
             * This hook is the same one that SAPUI5 controls get after being rendered.
             * @memberOf com.myorg.expense.tracker.budgetfpm.ext.view.InitialPage
             */
            //  onAfterRendering: function() {
            //
            //  },

            /**
             * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
             * @memberOf com.myorg.expense.tracker.budgetfpm.ext.view.InitialPage
             */
            //  onExit: function() {
            //
            //  }
        });
    }
);
