function getParameter(parameter) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
         var pair = vars[i].split("=");
         if (pair[0] == parameter) {
            return pair[1];
         }
    }
    return(false);
}

var startnewControl = {
	
};

var cocomoData = null;
if(sessionStorage.getItem('cocomoData') != undefined || sessionStorage.getItem('cocomoData') != null){
	cocomoData = JSON.parse(sessionStorage.getItem('cocomoData'));
}

if(cocomoData == null)
{
	cocomoData = {};
	// setDefaultValues(cocomoData);
	setDefaultValues(cocomoData);
}

function clickSlider(){
	var slider = $(this);
	var sliderId = slider.attr('id').replace('_ad', '');
	var costDriverId = sliderId+"_active_cost_driver";
	var output = $("#"+sliderId+"_value");
	var activeOutput = $("#"+sliderId+"_ad_value");
	
	$('.active_cost_driver').each(function(index, element){
		var costDriver = $(element);
		if(costDriver.hasClass('shown')){
		costDriver.removeClass('shown');
		costDriver.addClass('hidden');
		}
		
		if(costDriver.attr('id') == costDriverId){
			if(costDriver.hasClass('hidden')){
				costDriver.removeClass('hidden');
			}
			if(!costDriver.hasClass('shown')){
				costDriver.addClass('shown');
			}
		}
		
	});
	
	var value = slider.val();
	var eaf = getCOCOMOValue(sliderId, value, cocomoData);
	$("#"+costDriverId).find('.slider').val(value);
	$("#"+sliderId).val(value);
	output.text(eaf);
	activeOutput.text(eaf);

	var activeCostDriverFrame = $('#active_cost_driver_frame');
	if( activeCostDriverFrame.css('display') == 'none'){
		activeCostDriverFrame.css('display', 'block');
	}

	cocomoData[sliderId+"_value"] = eaf;
	
}

	
function displayRangeValue(range) {
	var columnWidth = $('body').width()*0.0625;

	var myRange = $('#' + range);


	var output = $("#"+range+"_value");
	var activeOutput = $("#"+range+"_ad_value");

	if(myRange === undefined){
		return;
	}

	 var product_type = cocomoData.product_type;

	// var myValue = $('#' + value);
	myRange.click(clickSlider);

	var activeRange = $('#'+range+"_ad");
	
	activeRange.click(clickSlider);
	
	var activeDriver = activeRange.closest(".active_cost_driver");
	var rankDescriptions = activeDriver.find(".rank_description_column");

	// var labelWidth = 135;
	var labelWidth = columnWidth;

	var labelElement = myRange.parent().siblings(".label");

	var labelElements = labelElement.children();
	var numberOfLabels = labelElements.length;
	var sliderOffset = labelWidth*5;

	var activeLabelElement = activeRange.parent().siblings(".label");
	var activeValueLabelElement = activeRange.parent().siblings(".value_label");
	var activeLabelElements = activeLabelElement.children();
	var activeValueLabelElements = activeValueLabelElement.children();
	var minValue = 21;
	var maxValue = 1;

	var height = -1;
	var tallDescription = numberOfLabels - 1;
	var tallDescriptionLeft = 0;
	
	for(var i = 0; i<numberOfLabels; i++){
		var label = $(labelElements[i]);
		var offset = 0;
		var rankValue = 0;
		if(label.html() == "Very Low"){
			offset = labelWidth*0;
			value = 1;
		}
		else if(label.html() == "Low"){
			offset = labelWidth*1;
			value = 5;
		}
		else if(label.html() == "Nominal"){
			offset = labelWidth*2;
			value = 9;
		}
		else if(label.html() == "High"){
			offset = labelWidth*3;
			value = 13;
		}
		else if(label.html() == "Very High"){
			offset = labelWidth*4;
			value = 17;
		}
		else if(label.html() == "Extra High"){
			offset = labelWidth*5;
			value = 21;
		}
		
		if(offset < sliderOffset){
			sliderOffset = offset;
		}

		if(value > maxValue){
			maxValue = value;
		}

		if(value < minValue){
			minValue = value;
		}
		
		$(labelElements[i]).css('left', offset+"px").css('position', 'absolute');
		$(activeLabelElements[i]).css('left', offset+"px").css('position', 'absolute');
		$(activeValueLabelElements[i]).css('left', offset+"px").css('position', 'absolute');

		var rankDescriptionOffset = -15;

		$(rankDescriptions[i]).css('left',  offset+rankDescriptionOffset+"px").css('position', 'absolute').css('width', labelWidth+"px");

		if($(rankDescriptions[i]).html().length >= $(rankDescriptions[tallDescription]).html().length){
			tallDescription = i;
			tallDescriptionLeft = offset+rankDescriptionOffset-15;
		}
 
		// if(i == numberOfLabels -1){
		// 	$(rankDescriptions[i]).css('left',  offset+rankDescriptionOffset+"px").css('position', 'relative');
		// }
		// else
		// {
		// $(rankDescriptions[i]).css('left',  offset+rankDescriptionOffset+"px").css('position', 'absolute');
		// }

	}
	
	
	$(rankDescriptions[tallDescription]).css('position', 'relative').css('left', tallDescriptionLeft+'px');


	var sliderWidth = (numberOfLabels - 1)*labelWidth;
	var sliderAlignmentLeft = 20;
	myRange.css('width', sliderWidth+"px");
	myRange.css('left', (sliderOffset+sliderAlignmentLeft)+"px").css('position', 'absolute');
	myRange.attr('min', minValue);
	myRange.attr('max', maxValue);
	myRange.attr('step', 1);

	activeRange.css('width', sliderWidth+"px");
	activeRange.css('left', (sliderOffset+sliderAlignmentLeft)+"px").css('position', 'absolute');
	activeRange.attr('min', minValue);
	activeRange.attr('max', maxValue);
	activeRange.attr('step', 1);

	setSliderValue(myRange, myRange.attr('id'), cocomoData);
	// myRange.value(cocomoData[myRange.attr('id')+"_slider_value"]);
	setSliderValue(activeRange, activeRange.attr('id').replace(/_ad/g, ''), cocomoData);
	// myRange.value(cocomoData[myRange.attr('id')+"_slider_value"]);

	var eaf = cocomoData[range+"_value"].toFixed(2);
	output.text(eaf);
	activeOutput.text(eaf);


	// var factorName = property.replace('_slider_value', '');
 //    var rating = Math.floor((cocomoData[property]-1)/4);
	// var ratingOffset = (cocomoData[property]-1)%4;
	// var ratingRank = "none"
	// var ratingRankNext = "none";
	// if(rating < 1){
	// 	ratingRank = "_very_low";
	// 	ratingRankNext = "_low";
	// }

//	myRange.click(clickSlider);
//	alert('hello');
//	
//
//	// Figure out placement percentage between left and right of input
//	var newPoint = (parseInt(myRange.val()) - parseInt(myRange.attr('min'))) / (parseInt(myRange.attr('max')) - parseInt(myRange.attr('min')));
//
//	// Measure width of range input
////	var width = myRange.outerWidth();
//	myRange.width(sliderWidth);
//	myRange.css('left', sliderStartPoint+'px');
//
//	// Janky value to get pointer to line up better
//	var offset = 18;
//
//	// Prevent bubble from going beyond left or right (unsupported browsers)
//	var newPlace = 0;
//	if (newPoint < 0) { newPlace = 0; }
//	else if (newPoint > 1) { newPlace = width; }
//	else { newPlace = width * newPoint + offset * (1 - newPoint); }
//
//	myValue.parent().css('left', newPlace + 'px');
//	myValue.parent().css('top', myRange.outerHeight() + 'px');
//	myValue.html(myRange.val());
//
//	myRange.on('input', function(){
//		var newPoint = (parseInt(myRange.val()) - parseInt(myRange.attr('min'))) / (parseInt(myRange.attr('max')) - parseInt(myRange.attr('min')));
//		myValue.html(myRange.val());
//
//		var newPlace = 0;
//		if (newPoint < 0) { newPlace = 0; }
//		else if (newPoint > 1) { newPlace = width; }
//		else { newPlace = width * newPoint + offset * (1 - newPoint); }
//		myValue.parent().css('left', newPlace + 'px');
//	});
}

//Typical Change Rate for Increment
//Required Software Reliability
//Software Complexity
//Hardware Complexity
//Data Base Size
//Application Experience
//Analyst Capability
//Platform Requirement Volatility
//Supportability
//Reusability

function render() {
	// displayRangeValue('product_type', 'product_type_value');
	// aler("render");
	// displayRangeValue('typical_change_rate', 'typical_change_rate_value');
	// displayRangeValue('required_software_reliability', 'required_software_reliability_value');
	// displayRangeValue('software_complexity', 'software_complexity_value');
	// displayRangeValue('hardware_complexity', 'hardware_complexity_value');
	// displayRangeValue('data_base_size', 'data_base_size_value');
	// displayRangeValue('application_experience', 'application_experience_value');
	// displayRangeValue('analyst_capability', 'analyst_capability_value');
	// displayRangeValue('platform_requirement_volatility', 'platform_requirement_volatility_value');
	// displayRangeValue('supportability', 'supportability_value');
	// displayRangeValue('reusability', 'reusability_value');

	displayRangeValue('chng');
	displayRangeValue('rely');
	displayRangeValue('sw_cplx');
	displayRangeValue('hw_cplx');
	displayRangeValue('data');
	displayRangeValue('apex');
	displayRangeValue('acap');
	displayRangeValue('pvol');
	displayRangeValue('supp');
	displayRangeValue('ruse');
	displayRangeValue('pr');
	displayRangeValue('tsl');
	displayRangeValue('aa');

	 var product_type = cocomoData.product_type;


  // setSizeSliderValue(myRange, product_type, cocomoData);

  // console.log(cocomoData['product_type_'+product_type]);
  $('#product_type').parent().find('.default.text').text(cocomoData['product_type_'+product_type]);
  // $('#product_type').dropdown('set selected', cocomoData['product_type_'+product_type]);
	
}


var redirectToAgileDevelopment = false;
$(function() {


	 // Initialize dropdown box
  $('.ui.dropdown').dropdown();
  $('#product_type').change(function() {
    if ($(this).val() == "Web Server") {
      cocomoData.product_type = "web_server"
      // $('#release_cycle').val(5);
      //   $('#sw_complexity').val(5);
      //   $('#hw_dependency').val(5);
      //   $('#avaliable_skills').val(5);
      //   $('#quality').val(5);
      //   $('#outage_response_time').val(5);
      } else if ($(this).val() == "Mobile/Internet Feature") {
        cocomoData.product_type = "mobile_internet_feature";
        // $('#release_cycle').val(5);
        //     $('#sw_complexity').val(5);
        //     $('#hw_dependency').val(5);
        //     $('#avaliable_skills').val(5);
        //     $('#quality').val(5);
        //     $('#outage_response_time').val(5);
        redirectToAgileDevelopment = true;
      } else if ($(this).val() == "R&D Tools") {
        cocomoData.product_type = "R_D_tools";
        // $('#release_cycle').val(4);
        //     $('#sw_complexity').val(3);
        //     $('#hw_dependency').val(1);
        //     $('#avaliable_skills').val(8);
        //     $('#quality').val(4);
        //     $('#outage_response_time').val(3);
      } else if ($(this).val() == "Security kernel; Safety-critical LSI Chip") {
        cocomoData.product_type = "security_kernel";
        // $('#release_cycle').val(5);
        // $('#sw_complexity').val(5);
        // $('#hw_dependency').val(5);
        // $('#avaliable_skills').val(5);
        // $('#quality').val(5);
        // $('#outage_response_time').val(5);

      } else if ($(this).val() == "Multi-sensor Control Device/Router/Switch") {

        cocomoData.product_type = "multi_sensor_control_device";

      } else if ($(this).val() == "Legacy system") {
        
        cocomoData.product_type = "legacy_system";

      } else if ($(this).val() == "Carrier Class Large Scale SW Intensive; Other Regulated Environments") {

        cocomoData.product_type = "carrier_class_large_scale";

       } else if ($(this).val() == "Digital City; Industry Vertical (Oil & Gas)") {

        cocomoData.product_type = "digital_city";
      
      }
      else if ($(this).val() == "New IOT Product Line") {

        cocomoData.product_type = "new_IOT_product_line";

      } else {
        cocomoData.product_type = "default";
        // $('#release_cycle').val(5);
        // $('#sw_complexity').val(5);
        // $('#hw_dependency').val(5);
        // $('#avaliable_skills').val(5);
        // $('#quality').val(5);
        // $('#outage_response_time').val(5);
      } 
      render();
  });

	// Create choice button
	$('.choice .button').click(function() {
		$(this).addClass('choosed');
		$(this).siblings().removeClass('choosed');
	});

	// Define the value display on the top of slider

	render();

	$( window ).resize(function() {
		render();
	});


    function clickNextToProjectSize(){

    	if(redirectToAgileDevelopment){
    		window.location.href = 'http://ec2-54-67-99-52.us-west-1.compute.amazonaws.com:8686/demo/phase3/basicWorkflow.html';
    		return;
    	}

    	// var product_type = $('#product_type').val();
    	cocomoData.chng_slider_value = Number($('#chng').val());

    	// var software_complexity = $('#software_complexity').val();
    	// var hardware_complexity = $('#hardware_complexity').val();
    	// var data_base_size = $('#data_base_size').val();
    	// var application_experience = $('#application_experience').val();
    	// var analyst_capability = $('#analyst_capability').val();
    	// var platform_requirement_volatility = $('#platform_requirement_volatility').val();
    	// var supportability = $('#supportability').val();
    	// var reusability = $('#reusability').val();

    	//later on translate slider value into cocomo value.
		cocomoData.rely_slider_value = Number($('#rely').val());
		// alert($('#required_software_reliability').html());
		cocomoData.sw_cplx_slider_value = Number($('#sw_cplx').val());
		cocomoData.hw_cplx_slider_value = Number($('#hw_cplx').val());
		cocomoData.data_slider_value = Number($('#data').val());
		cocomoData.apex_slider_value = Number($('#apex').val());
		cocomoData.acap_slider_value = Number($('#acap').val());
		cocomoData.pvol_slider_value = Number($('#pvol').val());
		cocomoData.supp_slider_value = Number($('#supp').val());
		cocomoData.ruse_slider_value = Number($('#ruse').val());
		// cocomoData.product_type = $('#product_type').val();

    	// alert(cocomoData.ruse_slider_value);
    	sessionStorage.cocomoData = JSON.stringify(cocomoData);

    	window.location.href = getParameter("instanceId") ? "./projectSizePage.html?instanceId=" + getParameter("instanceId") : "./projectSizePage.html";
    }

    $('#next_to_project_size').on('click', clickNextToProjectSize);


    function clickResetFactor() {
    	sessionStorage.cocomoData = null;
    	location.reload();
    }
    $('#reset_factor').on('click', clickResetFactor);


    function clickExportFactor() {
    	let factor_value = {
    		RELY : Number($('#rely_value').text()),
    		DATA : Number($('#data_value').text()),
    		CPLX : (Number($('#sw_cplx_value').text()) + Number($('#hw_cplx_value').text())) / 2,
    		RUSE : Number($('#ruse_value').text()),
    		PVOL : Number($('#pvol_value').text()),
    		ACAP : Number($('#acap_value').text()),
    		APEX : Number($('#apex_value').text()),
    		AA : Number($('#aa_value').text()),
    		PR : Number($('#pr_value').text()),
    		TSL : Number($('#tsl_value').text())
    	};

    	let rows = [
    		["RELY", "DATA", "CPLX", "RUSE", "PVOL", "ACAP", "APEX", "AA", "PR", "TSL"],
    		[factor_value["RELY"], factor_value["DATA"], factor_value["CPLX"], factor_value["RUSE"], factor_value["PVOL"], factor_value["ACAP"], factor_value["APEX"], factor_value["AA"], factor_value["PR"], factor_value["TSL"]]
    	];

		let csv_content = "data:text/csv;charset=utf-8,";
		rows.forEach(function(row_array){
		   let row = row_array.join(",");
		   csv_content += row + "\r\n";
		}); 

		let encoded_uri = encodeURI(csv_content);
		let filename = "ExportFactors" + new Date().getTime() + ".csv";
		
		let link = document.createElement('a');
        link.setAttribute('href', encoded_uri);
        link.setAttribute('download', filename);
        link.click();
    }
    $('#export_factor').on('click', clickExportFactor);

});