'use strict';

$(document).ready(function(){
//global variables and functions

var data={"info":[]},
	field = $("input[name='name-value']"),
	select = $("select[name='name-value-list']"),
	id=0,
	RegEx = /^[a-z0-9]+=[a-z0-9]+$/i,	
	isValid = function(element){
		return RegEx.test(element.val());
	},
	addData = function(element){
		var splitValue=element.val().split('=');
		data.info.push({"id":id,"name":splitValue[0],"value":splitValue[1]});
		select.append($('<option>', {
			id: id,
		    value: element.val(),
		    text: element.val()
		}));
		id++;
	},
	deleteData = function(){
		var selectedData = $("select[name='name-value-list'] option:selected");

		selectedData.each(function(){
			var selectId = $(this)[0].id;
			data.info.forEach(function(e, index){
				if(e.id == selectId){
					data.info.splice(index,1);
				}
			});
			$(this).remove();
		});

	};

	$("#add-btn").on("click",function(e){
		if(isValid(field)){
			$('#err').hide();
			addData(field);				
			field.val('').focus();
			return;
		}
		$('#err').show();
	});

	$("#delete").on("click",deleteData);
	$("#show-xml").on("click",function(){console.log(JSON.stringify(data.info));});
});