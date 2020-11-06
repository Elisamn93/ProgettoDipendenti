sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller,  Filter, FilterOperator) {
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
		}
		
	});
});