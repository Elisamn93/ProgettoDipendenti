/*global QUnit*/

sap.ui.define([
	"project/Project/controller/Dipendenti.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Dipendenti Controller");

	QUnit.test("I should test the Dipendenti controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});