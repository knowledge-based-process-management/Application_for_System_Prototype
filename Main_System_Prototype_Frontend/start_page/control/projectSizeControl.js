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

var cocomoData
if(sessionStorage.getItem('cocomoData') != undefined || sessionStorage.getItem('cocomoData') != null){
	cocomoData = JSON.parse(sessionStorage.getItem('cocomoData'));
}

if(cocomoData == null)
{
	cocomoData = {};
	// setDefaultValues(cocomoData);
	setDefaultValues(cocomoData);
}

function render() {
  displayRangeValue('project_size');


  var product_type = cocomoData.product_type;


  // setSizeSliderValue(myRange, product_type, cocomoData);

  // console.log(cocomoData['product_type_'+product_type]);
  $('#product_type').parent().find('.default.text').text(cocomoData['product_type_'+product_type]);
  $('#product_type_label').text(cocomoData['product_type_'+product_type] == 'Select product type' ? 'Not selected' : cocomoData['product_type_'+product_type]);
  // $('#product_type').dropdown('set selected', cocomoData['product_type_'+product_type]);
}


function displayRangeValue(range) {
  var columnWidth = $('body').width()*0.0625;

  var myRange = $('#' + range);


  var output = $("#"+range+"_value");
  // var activeOutput = $("#"+range+"_ad_value");

  if(myRange === undefined){
    return;
  }

  var product_type = cocomoData.product_type;

  // var myValue = $('#' + value);
  myRange.click(clickSlider);

  var labelWidth = columnWidth;

  var labelElement = myRange.parent().siblings(".label");

  var labelElements = labelElement.children();
  var numberOfLabels = labelElements.length;
  var sliderOffset = labelWidth*5;

  // var activeLabelElement = activeRange.parent().siblings(".label");
  var valueLabelElement = myRange.parent().siblings(".value_label");
  // var activeLabelElements = activeLabelElement.children();
  var valueLabelElements = valueLabelElement.children();
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
    // $(activeLabelElements[i]).css('left', offset+"px").css('position', 'absolute');
    $(valueLabelElements[i]).css('left', offset+"px").css('position', 'absolute');
    var valueLabelText = "";
    if(i == 0){
      valueLabelText += "<=";
    }
    else if(i == numberOfLabels - 1){
      valueLabelText += ">=";
    }
    // console.log(product_type+"_size_"+ $(valueLabelElements[i]).attr('class').replace(/_value/g, ""));
    if(cocomoData.hasOwnProperty(product_type+"_size_"+ $(valueLabelElements[i]).attr('class').replace(/_value/g, "")))
    {
    valueLabelText += cocomoData[product_type+"_size_"+ $(valueLabelElements[i]).attr('class').replace(/_value/g, "")];
    }
    else {
      valueLabelText += cocomoData["default_size_"+ $(valueLabelElements[i]).attr('class').replace(/_value/g, "")];
    }
    valueLabelText += "k";

    $(valueLabelElements[i]).text(valueLabelText);
   
  }


  var sliderWidth = (numberOfLabels - 1)*labelWidth;
  var sliderAlignmentLeft = 20;
  myRange.css('width', sliderWidth+"px");
  myRange.css('left', (sliderOffset+sliderAlignmentLeft)+"px").css('position', 'absolute');
  myRange.attr('min', minValue);
  myRange.attr('max', maxValue);
  myRange.attr('step', 1);


  // setSliderValue(myRange, myRange.attr('id'), cocomoData);
  
  myRange.val(cocomoData.project_size_rank);
}

function clickSlider(){
  var slider = $(this);
  // var sliderId = slider.attr('id');
  // var costDriverId = sliderId+"_active_cost_driver";
  // var output = $("#"+sliderId+"_value");
  // var activeOutput = $("#"+sliderId+"_ad_value");
  
  // $('.active_cost_driver').each(function(index, element){
  //   var costDriver = $(element);
  //   if(costDriver.hasClass('shown')){
  //   costDriver.removeClass('shown');
  //   costDriver.addClass('hidden');
  //   }
    
  //   if(costDriver.attr('id') == costDriverId){
  //     if(costDriver.hasClass('hidden')){
  //       costDriver.removeClass('hidden');
  //     }
  //     if(!costDriver.hasClass('shown')){
  //       costDriver.addClass('shown');
  //     }
  //   }
    
  // });
  
  var value = slider.val();
  // var new_sloc = getCOCOMOValue(cocomoData.product_type+"_size", value, cocomoData);
  // console.log(new_sloc+"k");
  
      // var value = $("#project_size").val();

      cocomoData.project_size_rank = value;
}


function validate(evt) {
	  var theEvent = evt || window.event;
	  var key = theEvent.keyCode || theEvent.which;
	  key = String.fromCharCode( key );
	  var regex = /[0-9]|\./;
	  if( !regex.test(key) ) {
	    theEvent.returnValue = false;
	    if(theEvent.preventDefault) theEvent.preventDefault();
	  }
	}

$(function() {
      // $('#new_sloc').val(cocomoData.new_sloc == 0? "":cocomoData.new_sloc);
      // $('#reused_sloc').val(cocomoData.reused_sloc == 0? "":cocomoData.reused_sloc);
      // $('#reused_sloc_design_modified').val(cocomoData.reused_sloc_design_modified == 0? "":cocomoData.reused_sloc_design_modified);
      // $('#reused_sloc_code_modified').val(cocomoData.reused_sloc_code_modified == 0? "":cocomoData.reused_sloc_code_modified);
      // $('#reused_sloc_integration_modified').val(cocomoData.reused_sloc_integration_modified == 0? "":cocomoData.reused_sloc_integration_modified);
      // $('#modified_sloc').val(cocomoData.modified_sloc == 0? "":cocomoData.modified_sloc);
      // $('#modified_sloc_design_modified').val(cocomoData.modified_sloc_design_modified == 0? "":cocomoData.modified_sloc_design_modified);
      // $('#modified_sloc_code_modified').val(cocomoData.modified_sloc_code_modified == 0? "":cocomoData.modified_sloc_code_modified);
      // $('#modified_sloc_integration_modified').val(cocomoData.modified_sloc_integration_modified == 0? "":cocomoData.modified_sloc_integration_modified);




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

      cocomoData.project_size_rank = 1;
      render();
  });

  render();

  $( window ).resize(function() {
    render();
  });



    function clickBackToFactor(){
      sessionStorage.cocomoData = JSON.stringify(cocomoData);
    	window.location.href = getParameter("instanceId") ? "./factorsInputPage.html?instanceId=" + getParameter("instanceId") : "./factorsInputPage.html";
    }
    $('#prev_back_to_factor').on('click', clickBackToFactor);
    
    function clickEstimateEffort(){
    	// var new_sloc = $('#new_sloc').val();
    	// var reused_sloc = $('#reused_sloc').val();
    	// var reused_designed_modified = $('#reused_designed_modified').val();
    	// var reused_code_modified = $('#reused_code_modified').val();
    	// var reused_integration_modified = $('#reused_integration_modified').val();
    	// var modified_sloc = $('#modified_sloc').val();
    	// var modified_design_modified = $('#modified_design_modified').val();
    	// var modified_code_modified = $('#modified_code_modified').val();
    	// var modified_integration_modified = $('#modified_integration_modified').val();

  //   	cocomoData.new_sloc = Number($('#new_sloc').val());
		// cocomoData.reused_sloc = Number($('#reused_sloc').val());
		// cocomoData.reused_sloc_design_modified = Number($('#reused_sloc_design_modified').val());
		// cocomoData.reused_sloc_code_modified = Number($('#reused_sloc_code_modified').val());
		// cocomoData.reused_sloc_integration_modified =  Number($('#reused_sloc_integration_modified').val());
		// cocomoData.modified_sloc = Number($('#modified_sloc').val());
		// cocomoData.modified_sloc_design_modified = Number($('#modified_sloc_design_modified').val());
		// cocomoData.modified_sloc_code_modified = Number($('#modified_sloc_code_modified').val());
		// cocomoData.modified_sloc_integration_modified = Number($('#modified_sloc_integration_modified').val());

    	// alert(modified_integration_modified);

      var new_sloc;
       if(cocomoData.hasOwnProperty(product_type+"_size_nominal")){
    
      new_sloc = getCOCOMOValue(cocomoData.product_type+"_size", value, cocomoData);
    }
    else {
       new_sloc = getCOCOMOValue("default_size", value, cocomoData);
    }

      cocomoData.new_sloc = new_sloc*1000;

    	cocomoData.estiamtedEffort = estimateEffortandScheduleWithCocomo(cocomoData);
    	sessionStorage.cocomoData = JSON.stringify(cocomoData);
    	// alert(estiamtedEffort);

    	window.location.href = getParameter("instanceId") ? "./estimatedResultPage.html?instanceId=" + getParameter("instanceId") : "./estimatedResultPage.html";
    }
    $('#estimate_effort').on('click', clickEstimateEffort);
    
    $('.sloc_input_field').on('keypress', validate);

});