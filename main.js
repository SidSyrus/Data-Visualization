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

	},
	sortData = function(){
		var id = this.id;

		if(id === 'sort-name'){
			data.info.sort(function(a,b){
				var a = a.name.toLowerCase(),
				    b = b.name.toLowerCase();
				return (a < b) ? -1 : (a > b) ? 1 : 0;
			});
		}else if(id === 'sort-value'){
			data.info.sort(function(a,b){
				var a = a.value.toLowerCase(),
				    b = b.value.toLowerCase();
				return (a < b) ? -1 : (a > b) ? 1 : 0;
			});
		}
		updateSelectBox();
	},
	updateSelectBox = function(){
		select.empty();
		data.info.forEach(function(e){
			select.append($('<option>', {
				id: e.id,
		    	value: e.name+"="+e.value,
		    	text: e.name+"="+e.value
			}));
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
	$("#sort-name, #sort-value").on("click",sortData);
	$("#show-xml").on("click",function(){console.log(JSON.stringify(data.info));});
});