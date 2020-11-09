sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent"
], function (Controller, History,UIComponent) {
	"use strict";
	return Controller.extend("project.Project.controller.Responsabili", {
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Responsabili").attachPatternMatched(this._onObjectMatched, this);
				
		},
		_onObjectMatched: function (oEvent) {
			this.getView().bindElement({
				path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").ID),
				model: "Employee"
			});
		},
		onNavBack: function () {
		
				var oRouter = UIComponent.getRouterFor(this);
				oRouter.navTo("Dipendenti");
			}
		
	});
});