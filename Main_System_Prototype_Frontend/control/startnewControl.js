var process_definition = {
	// "Architected_Agile" : "Architected_Agile:1:3678",
    // "Architected_Agile_Low_Risk" : "Architected_Agile_Low_Risk:1:3756",
	// "Agile" : "Agile:1:8788",
	// "COTS_Services" : "COTS_Services:1:8796",
	// "Formal_Methods" : "Formal_Methods:1:8800",
	// "Plan_driven" : "Plan_driven:1:8804"
};

var startnewControl = {
	
};

function displayRangeValue(range, value) {
	var myRange = $('#' + range);
	var myValue = $('#' + value);

	// Figure out placement percentage between left and right of input
	var newPoint = (parseInt(myRange.val()) - parseInt(myRange.attr('min'))) / (parseInt(myRange.attr('max')) - parseInt(myRange.attr('min')));

	// Measure width of range input
	var width = myRange.outerWidth() ;

	// Janky value to get pointer to line up better
	var offset = 18;

	// Prevent bubble from going beyond left or right (unsupported browsers)
	var newPlace = 0;
	if (newPoint < 0) { newPlace = 0; }
	else if (newPoint > 1) { newPlace = width; }
	else { newPlace = width * newPoint + offset * (1 - newPoint); }

	myValue.parent().css('left', newPlace + 'px');
	myValue.parent().css('top', myRange.outerHeight() + 'px');
	myValue.html(myRange.val());

	myRange.on('input', function(){
		var newPoint = (parseInt(myRange.val()) - parseInt(myRange.attr('min'))) / (parseInt(myRange.attr('max')) - parseInt(myRange.attr('min')));
		myValue.html(myRange.val());

		var newPlace = 0;
		if (newPoint < 0) { newPlace = 0; }
		else if (newPoint > 1) { newPlace = width; }
		else { newPlace = width * newPoint + offset * (1 - newPoint); }
		myValue.parent().css('left', newPlace + 'px');
	});
}

function render() {
	// displayRangeValue('product_type', 'product_type_value');
	displayRangeValue('release_cycle', 'release_cycle_value');
	displayRangeValue('sw_complexity', 'sw_complexity_value');
	displayRangeValue('hw_dependency', 'hw_dependency_value');
	displayRangeValue('avaliable_skills', 'avaliable_skills_value');
	displayRangeValue('quality', 'quality_value');
	displayRangeValue('outage_response_time', 'outage_response_time_value');
}

$(function() {


	// Initialize dropdown box
	$('.ui.dropdown').dropdown();
	$('#product_type').change(function() {
		if ($(this).val() == "Web Server") {
			$('#release_cycle').val(5);
    		$('#sw_complexity').val(5);
    		$('#hw_dependency').val(5);
    		$('#avaliable_skills').val(5);
    		$('#quality').val(5);
    		$('#outage_response_time').val(5);
    	} else if ($(this).val() == "Mobile/Internet Feature") {
    		$('#release_cycle').val(5);
            $('#sw_complexity').val(5);
            $('#hw_dependency').val(5);
            $('#avaliable_skills').val(5);
            $('#quality').val(5);
            $('#outage_response_time').val(5);
    	} else if ($(this).val() == "R&D Tools") {
    		$('#release_cycle').val(4);
            $('#sw_complexity').val(3);
            $('#hw_dependency').val(1);
            $('#avaliable_skills').val(8);
            $('#quality').val(4);
            $('#outage_response_time').val(3);
    	} else if ($(this).val() == "Security kernel; Safety-critical LSI Chip") {
    		$('#release_cycle').val(5);
    		$('#sw_complexity').val(5);
    		$('#hw_dependency').val(5);
    		$('#avaliable_skills').val(5);
    		$('#quality').val(5);
    		$('#outage_response_time').val(5);
    	} else {
    		$('#release_cycle').val(5);
    		$('#sw_complexity').val(5);
    		$('#hw_dependency').val(5);
    		$('#avaliable_skills').val(5);
    		$('#quality').val(5);
    		$('#outage_response_time').val(5);
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

	// Create button for submit
    function clickSubmit() {
    	var product_type = $('#product_type').val();
    	var release_cycle = $('#release_cycle').val();
    	var sw_complexity = $('#sw_complexity').val();
    	var hw_dependency = $('#hw_dependency').val();
    	var avaliable_skills = $('#avaliable_skills').val();
    	var quality = $('#quality').val();
    	var outage_response_time = $('#outage_response_time').val();

    	// For Demo purpose the complex algorithm will not be implemented here,
    	// But showed in the theory support part

    	var process = new Process();
    	// to select Architected Agile, the inputs would be 5,4,3,1,8,4,3
    	// if (product_type == 5 && release_cycle == 4 && sw_complexity == 3 && hw_dependency == 1 && avaliable_skills == 8 && quality == 4 && outage_response_time == 3) {
    	// 	// process.processDefinitionId = 
    	// 	process.processDefinitionId = process_definition.Architected_Agile;
    	// } else {
    	// 	process.processDefinitionId = process_definition.Agile;
    	// }

        var data = [];

    	// Simple Algorithm for demo purpose
    	// If project = Accounting Application then Process Strategy = COTS Software Package
		// If project = Simple custom business application then Process Strategy = Architected Agile
		// If project = Cellphone feature then Process Strategy = Agile
		// If project = Security Kernel then Process Strategy = Formal Methods
		// Else Strategy = Plan driven
    	if (product_type == "Web Server") {
    		process.processDefinitionId = process_definition.COTS_Services;
    	} else if (product_type == "Mobile/Internet Feature") {
    		process.processDefinitionId = process_definition.Agile;
    	} else if (product_type == "R&D Tools") {
            process.processDefinitionId = process_definition.Architected_Agile;
            if (sw_complexity < 3 && avaliable_skills < 3) {
                process.processDefinitionId = process_definition.Architected_Agile_Low_Risk;
            }
        } else if (product_type == "Security kernel; Safety-critical LSI Chip") {
    		process.processDefinitionId = process_definition.Formal_Methods;
    	} else {
    		process.processDefinitionId = process_definition.Plan_driven;
    	}


    	function successCreateProcessInstance(instance) {
    		var instanceId = instance.id;
    		var url = System_config.home_url + "criteria.html?instanceId=" + instanceId;
    		window.open(url, "_self");
    	}

    	function errorCreateProcessInstance(instance) {
    		
    	}

    	process.createProcessInstance(data, successCreateProcessInstance, errorCreateProcessInstance);
    	
    }
    $('#submit_factor').on('click', clickSubmit);


    function clickReset() {
    	location.reload();
    }
    $('#reset_factor').on('click', clickReset);
});