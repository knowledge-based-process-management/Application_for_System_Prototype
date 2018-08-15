var process_definition = {
	"Architected_Agile" : "Architected_Agile:1:3678",
    "Architected_Agile_Low_Risk" : "Architected_Agile_Low_Risk:1:3756",
    "Architected_Agile_TR4" : "Architected_Agile_TR4_extended:1:4126",
	"Agile" : "Agile:1:8788",
	"COTS_Services" : "COTS_Services:1:8796",
	"Formal_Methods" : "Formal_Methods:1:8800",
	"Plan_driven" : "Plan_driven:1:8804"
};

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

$(function() {

    function clickSubmit() {
        var product_type = cocomoData.product_type;
        // var product_type = $('#product_type').val();
    	// var release_cycle = $('#release_cycle').val();
    	// var sw_complexity = $('#sw_complexity').val();
    	// var hw_dependency = $('#hw_dependency').val();
    	// var avaliable_skills = $('#avaliable_skills').val();
    	// var quality = $('#quality').val();
    	// var outage_response_time = $('#outage_response_time').val();

    	// 	var release_cycle = $('#release_cycle').val();
    	// var sw_complexity = $('#sw_complexity').val();
    	// var hw_dependency = $('#hw_dependency').val();
    	// var avaliable_skills = $('#avaliable_skills').val();
    	// var quality = $('#quality').val();
    	// var outage_response_time = $('#outage_response_time').val();

    	// For Demo purpose the complex algorithm will not be implemented here,
    	// But showed in the theory support part

    	var process = new Process();

    	var data = [];
    	// to select Architected Agile, the inputs would be 5,4,3,1,8,4,3
    	// if (product_type == 5 && release_cycle == 4 && sw_complexity == 3 && hw_dependency == 1 && avaliable_skills == 8 && quality == 4 && outage_response_time == 3) {
    	// 	// process.processDefinitionId = 
    	// 	process.processDefinitionId = process_definition.Architected_Agile;
    	// } else {
    	// 	process.processDefinitionId = process_definition.Agile;
    	// }

    	// Simple Algorithm for demo purpose
    	// If project = Accounting Application then Process Strategy = COTS Software Package
		// If project = Simple custom business application then Process Strategy = Architected Agile
		// If project = Cellphone feature then Process Strategy = Agile
		// If project = Security Kernel then Process Strategy = Formal Methods
		// Else Strategy = Plan driven
    	// if (product_type == "web_server") {
    	// 	process.processDefinitionId = process_definition.COTS_Services;
    	// } else if (product_type == "R_D_tools") {
    	// 	process.processDefinitionId = process_definition.Architected_Agile;
     //         if (cocomoData.sw_cplx_value <= 0.94 && cocomoData.acap_value >= 1.22) {
     //            process.processDefinitionId = process_definition.Architected_Agile_Low_Risk;
     //        }
    	// } else if (product_type == "mobile_internet_feature") {
    	// 	process.processDefinitionId = process_definition.Agile;
    	// } else if (product_type == "security_kernel") {
    	// 	process.processDefinitionId = Workflow.start_point;
    	// } else if (product_type == "multi_sensor_control_device") {
     //        process.processDefinitionId = process_definition.Formal_Methods;
     //    } else {
    	// 	process.processDefinitionId = process_definition.Plan_driven;
    	// }

        process.processDefinitionId = Workflow.start_point;

        var instanceId = getParameter("instanceId");

        if (!instanceId) {

            // If there is no project_instanceId, it means this is a new project
        	function successCreateProcessInstance(instance) {
        		var instanceId = instance.id;

                // Save information to MongoDB

                function successCreateWorkflow(workflow_info) {

                    //Save cocomoData into the database
                    let search = {};
                    search.instanceId = workflow_info.insertedId;

                    let newData = {};
                    newData.instanceId = workflow_info.insertedId;
                    newData.cocomoData = cocomoData;

                    function successUpdateProjectCriteria(msg) {
                        var url = site-base-url+"/criteriaV6.0.html?instanceId=" + workflow_info.insertedId;
                        window.open(url, "_self");
                    }

                    function errorUpdateProjectCriteria(msg) {
                        console.log(msg);
                    }

                    ProjectCriteria.updateProjectCriteria(search, newData, successUpdateProjectCriteria, errorUpdateProjectCriteria);
                }

                function errorCreateWorkflow(msg) {
                    console.log(msg);
                }

                Workflow.createWorkflow(instanceId, successCreateWorkflow, errorCreateWorkflow);
            }

        	function errorCreateProcessInstance(instance) {
        		
        	}

        	process.createProcessInstance(data, successCreateProcessInstance, errorCreateProcessInstance);
        } else {

            // If the project_instanceId exists, update factors
            let search = {};
            search.instanceId = instanceId;

            let newData = {};
            newData.instanceId = instanceId;
            newData.cocomoData = cocomoData;

            function successUpdateProjectCriteria(msg) {

                var url = site-base-url+"/dashboard.html?";
                url += "instanceId=" + instanceId;
                window.open(url, "_slef");
            }

            function errorUpdateProjectCriteria(msg) {
                console.log(msg);
            }

            ProjectCriteria.updateProjectCriteria(search, newData, successUpdateProjectCriteria, errorUpdateProjectCriteria);
        }
        
    }

	if(cocomoData != null && $('#detailed_estimation_results').length != 0){
		$('#most_likely_effort').html(cocomoData.E_most_likely.toFixed(2));
		$('#most_likely_schedule_duration').html(cocomoData.TDEV_most_likely.toFixed(2));
		$('#most_likely_productivity').html(cocomoData.PROD_most_likely.toFixed(2));
		$('#most_likely_staff').html(cocomoData.STAFF_most_likely.toFixed(2));

		$('#pessimistic_effort').html(cocomoData.E_pessimistic.toFixed(2));
		$('#pessimistic_schedule_duration').html(cocomoData.TDEV_pessimistic.toFixed(2));
		$('#pessimistic_productivity').html(cocomoData.PROD_pessimistic.toFixed(2));
		$('#pessimistic_staff').html(cocomoData.STAFF_pessimistic.toFixed(2));

		$('#optimistic_effort').html(cocomoData.E_optimistic.toFixed(2));
		$('#optimistic_schedule_duration').html(cocomoData.TDEV_optimistic.toFixed(2));
		$('#optimistic_productivity').html(cocomoData.PROD_optimistic.toFixed(2));
		$('#optimistic_staff').html(cocomoData.STAFF_optimistic.toFixed(2));
		
		$('#most_likely_estimated_effort').html(cocomoData.E_most_likely.toFixed(2));
	}

    function clickBackToProjectSize(){
    	window.location.href = getParameter("instanceId") ? "./projectSizePage.html?instanceId=" + getParameter("instanceId") : "./projectSizePage.html";
    }
    $('#prev_back_to_project_size').on('click', clickBackToProjectSize);

    function clickStartNew(){
    	window.location.href = getParameter("instanceId") ? "./factorsInputPage.html?instanceId=" + getParameter("instanceId") : "./factorsInputPage.html";
    }
    $('#start_new').on('click', clickSubmit);
    
    // $('.ui.accordion')
    // .accordion()
  ;

});
