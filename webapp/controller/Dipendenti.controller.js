sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller,Fragment,  Filter, FilterOperator) {
	"use strict";

	return Controller.extend("project.Project.controller.Dipendenti", {
		onInit: function () {
			

		},
		
		onOpenWindow: function (oEvent) {
			var oItem;
			oItem = oEvent.getSource();
			
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Responsabili",{
				ID :  window.encodeURIComponent(oItem.getBindingContext("Employee").getPath().substr(1))
			});
			 
		
		},
		
		onFilterDipendenti : function (oEvent) {

			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				var badgeFilter =new Filter("BADGE", FilterOperator.Contains, sQuery);
				var mansioneFilter =new Filter("MANSIONE", FilterOperator.Contains, sQuery);
				aFilter.push(badgeFilter);
				aFilter.push(mansioneFilter);
			}
				
			var oFilterTable = new Filter({
          filters: aFilter,
          or: true
              });

			// filter binding
			var oList = this.byId("tableDipendenti");
			var oBinding = oList.getBinding("items");
			oBinding.filter(oFilterTable, sap.ui.model.FilterType.Application);
		},
		
		onOpenFragment : function (oEvent) {
			var oSelectedItem = oEvent.getSource();
			var oContext = oSelectedItem.getBindingContext("Employee");
			var sPath = oContext.getPath();
			//var oProductDetailPanel = this.getView().byId("helloDialog").addDependent(this._oDialog);
			//oProductDetailPanel.bindElement({ path: sPath, model: "Employee" });
			var oView = this.getView();

			// create dialog lazily
			if (!this.byId("helloDialog")) {
				// load asynchronous XML fragment
				Fragment.load({
					id: oView.getId(),
					name: "project.Project.view.Resp",
					controller: this
				}).then(function (oDialog) {
					// connect dialog to the root view of this component (models, lifecycle)
					oView.addDependent(oDialog).bindElement({ path: sPath, model: "Employee" });
					oDialog.open();
				});
			} else {
				this.byId("helloDialog").open();
			}
		},

		onCloseDialog : function () {
			this.byId("helloDialog").close();
		}
		
	});
});