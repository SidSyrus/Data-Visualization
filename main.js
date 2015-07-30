'use strict';

$(document).ready(function(){
//global variables and functions

var data={"info":[]},
	field = $("input[name='name-value']"),
	id=0,
	RegEx = /^[a-zA-Z0-9=]+$/,
	isValid = function(element){
		return RegEx.test(element.val());
	},
	addData = function(element){
		var splitValue=element.val().split('=');
		console.log(splitValue);
		dataToJson(splitValue);
		$("select[name='name-value-list']").append($('<option>', {
		    value: element.val(),
		    text: element.val()
		}));
	},
	dataToJson = function(element){
		data.info.push({"id":id,"name":element[0],"value":element[1]});
		id++;
	};


	$("#add-btn").on('click',function(e){
		if(isValid(field)){
			addData(field);				
			field.val('').focus();
			return;
		}
		$('#err').show();
	});

});