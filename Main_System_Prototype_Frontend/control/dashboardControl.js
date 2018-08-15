var sys = {
	content : {
    	activeTask : {},
		completedTask : {},
		user : null,
		nextTasks : {},
		tasks : []
	},
	workflow : {
		id : null,
		definition : null
	},
	view : null
};

// Hard code for TR4, for demo purpose
// Can be replaced by figuring out the the dominant node in the control flow
// let sub_task_pool = {
// 	"ut_ci_tc" : ["ut_rca", "ut_sp_aps", "ut_sp_dpp", "ut_sp_dtpcp", "ut_sp_pt", "ut_sp_rtr", "ut_sp_pccd", "ut_trr"],
// 	"ut_ci_dcc" : ["ut_rca", "ut_sp_aps", "ut_sp_dpp", "ut_sp_dtpcp", "ut_sp_pt", "ut_sp_rtr", "ut_sp_pccd", "ut_trr"],
// 	"ut_ci_dgc" : ["ut_rca", "ut_sp_aps", "ut_sp_dpp", "ut_sp_dtpcp", "ut_sp_pt", "ut_sp_rtr", "ut_sp_pccd", "ut_trr"],
// 	"ut_rca" : ["ut_sp_aps", "ut_sp_dpp", "ut_sp_dtpcp", "ut_sp_pt", "ut_sp_rtr", "ut_sp_pccd", "ut_trr"],
// 	"ut_sp_aps" : ["ut_sp_dpp", "ut_trr"],
// 	"ut_sp_dpp" : ["ut_trr"],
// 	"ut_sp_dtpcp" : ["ut_sp_pt", "ut_sp_rtr", "ut_trr"],
// 	"ut_sp_pt" : ["ut_sp_rtr", "ut_trr"],
// 	"ut_sp_rtr" : ["ut_trr"],
// 	"ut_sp_pccd" : ["ut_trr"],

// 	// Below is for extended part
// 	"ut_fd_taui" : ["ut_fd_r", "ut_fd_gdd", "ut_ci_tc", "ut_ci_dcc", "ut_ci_dgc", "ut_rca", "ut_sp_aps", "ut_sp_dpp", "ut_sp_dtpcp", "ut_sp_pt", "ut_sp_rtr", "ut_sp_pccd", "ut_trr"],
// 	"ut_fd_r" : ["ut_fd_gdd", "ut_ci_tc", "ut_ci_dcc", "ut_ci_dgc", "ut_rca", "ut_sp_aps", "ut_sp_dpp", "ut_sp_dtpcp", "ut_sp_pt", "ut_sp_rtr", "ut_sp_pccd", "ut_trr"],
// 	"ut_fd_gdd" : ["ut_ci_tc", "ut_ci_dcc", "ut_ci_dgc", "ut_rca", "ut_sp_aps", "ut_sp_dpp", "ut_sp_dtpcp", "ut_sp_pt", "ut_sp_rtr", "ut_sp_pccd", "ut_trr"],
// 	"ut_fs_dlca" : ["ut_fs_aps", "ut_trr"],
// 	"ut_fs_upp" : ["ut_fs_aps", "ut_trr"],
// 	"ut_fs_aps" : ["ut_trr"]
// }; 

// A temporary funciton as utility
function removeFromArray(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

var dashboardControl = {

	view : {

		// define the cotent elements;
		header : '<div class="ui grid">',
		footer : '</div>',
		column : function(user, tasks) {
			if (user == "null") {
				user = "Not Assgined";
			}
			return `<div class="fixed-width-column column">
			          <div class="ui card">
			            <div class="content">
			              <h4 class="ui header"><img class="ui avatar image" src="img/avatar/large/elliot.jpg">${user}</h4>
			            </div>
			            <div class="content">
			              <h4 class="ui sub header">Tasks</h4>
			              <div class="ui small feed">
			                <div class="event">
			                  <div class="content">
			                      <div class="ui huge celled devided list fixed-width-list">                        
			      					${tasks}
			                      </div>
			                  </div>
			                </div>
			              </div>
			            </div>
			          </div>
			        </div>`; },
		step : function(tasks, active, completed) {
            var content = "";
            // Hard code for TR4, for demo purpose
            // let completed_but_reset = [];
            // let sub_task_pool_key = Object.keys(sub_task_pool);
            // for (let v = 0; v < sub_task_pool_key.length; v++) {
            // 	if (sub_task_pool_key[v] in active) {
            // 		completed_but_reset = completed_but_reset.concat(sub_task_pool[sub_task_pool_key[v]]);
            // 	}
            // }


            for (var i = 0; i < tasks.length; i++) {
            	var documents = {};
            	if (tasks[i].documentation == null) {
            		documents.epg = "http://greenbay.usc.edu/IICSMSw/index.htm#publish.icm.base-usc/customcategories/icsm_welcome_page_D99DA7B2.html";
            		documents.risk = System_config.risk_calculator_url + "/assessment_page.html";
            	} else {
            		var array = tasks[i].documentation.split(", ");
	            	if (array.length == 1) {
	            		documents.epg = array[0];
	            		documents.risk = System_config.risk_calculator_url + "/assessment_page.html";
	            	} else {
	            		documents.epg = array[0];
	            		documents.risk = array[1];
	            	}
	            }
            	var template = `<div class="{active} item fixed-size-item" id="${tasks[i].id}" activity="${tasks[i].activity}">
            					  <div class="ui inverted aligned dimmer">
		                            <div class="content">
		                              <div class="center">
		                              	<div class="ui buttons">
		                              	  <a class="ui white button viewEPG" data-tooltip="View EPG" href="${documents.epg}" target="_blank"><i class="big help icon"></i></a>
			                              {complete}
			                            </div>
		                              </div>
		                            </div>
		                          </div>
		                          <i class="{check} icon"></i>
		                          <div class="content">
			                          <!--<div class="title">Task ${i+1}</div>-->
			                          <div class="description">${tasks[i].name}</div>
		                          </div>
		                        </div>`;
		        if (is_defined(active[tasks[i].id])) {
                	template = template.split("{active}").join("active");
                	template = template.split("{check}").join("crosshairs big");
                	template = template.split("{complete}").join(`<a class="ui white button calculateRisk" data-tooltip="Calculate Risk" target="_blank" href="${documents.risk}">
                													<i class="big calculator icon"></i>
                												  </a>
                												  <div class="ui white button completeTask" data-tooltip="Complete Task" id="${active[tasks[i].id]}">
                													<i class="big checkmark icon"></i>
                												  </div>`);
                } else if (is_defined(completed[tasks[i].id])) {
                	template = template.split("{active}").join("completed");
                	template = template.split("{complete}").join("");
                	template = template.split("{check}").join("checkmark big");
                } else {
                	template = template.split("{active}").join("");
                	template = template.split("{complete}").join("");
                	template = template.split("{check}").join("hourglass start large");
                }
                content += template;
            }
            return content;
		},
		error : function(message) {
			return `<div class="ui icon message fixed-width-message">
							  <i class="notched circle loading icon"></i>
						      <div class="content">
						        <div class="header">
						          Error
						        </div>
						        <p>${message}</p>
						      </div>
						    </div>`;
		}
	}
};


dashboardControl.getParameter = function(parameter) {
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

dashboardControl.addOrReplaceParam = function(url, param, value) {
   param = encodeURIComponent(param);
   var r = "([&?]|&amp;)" + param + "\\b(?:=(?:[^&#]*))*";
   var a = document.createElement('a');
   var regex = new RegExp(r);
   var str = param + (value ? "=" + encodeURIComponent(value) : ""); 
   a.href = url;
   var q = a.search.replace(regex, "$1"+str);
   if (q === a.search) {
      a.search += (a.search ? "&" : "") + str;
   } else {
      a.search = q;
   }
   return a.href;
}

dashboardControl.loadButtons = function() {
	// Create Go Back (Start New) Button
    function clickStartNew() {
    	window.open(System_config.start_page_url + "/factorsInputPage.html", "_self");
    }
    $('#start_new').on('click', clickStartNew);

    // Create button for showing Tollgate Criteria
    function clickTollgateCriteria() {
    	var instanceId = dashboardControl.getParameter("instanceId");
		var view = dashboardControl.getParameter("view");
		var url = System_config.home_url + "/criteria.html?";
        if (view != false) {
            url += "instanceId=" + instanceId + "&view=" + view;
        } else {
             url += "instanceId=" + instanceId;
        }
    	window.open(url, "_slef");
    }
    $('#tollgate_criteria').on('click', clickTollgateCriteria);

    // Create button for updating cocomo factors
    function clickUpdateCocomo() {
    	var instanceId = dashboardControl.getParameter("instanceId");
		var view = dashboardControl.getParameter("view");
		var url = System_config.start_page_url + "/factorsInputPage.html?";
        if (view != false) {
            url += "instanceId=" + instanceId + "&view=" + view;
        } else {
             url += "instanceId=" + instanceId;
        }
    	window.open(url, "_slef");
    }
    $('#update_cocomo').on('click', clickUpdateCocomo);
}

dashboardControl.displayContent = function() {

	var self = this;

	let content = "";

	for (key in sys.content.user) {
    	var tasks = self.view.step(sys.content.user[key].task, sys.content.activeTask, sys.content.completedTask);
    	content += self.view.column(key, tasks);
    }

    // Chage the message title to the name of process (e.g. Architected Agile)
    $("#message_info").html("TR4 Extended");

    // Load page content
    $("#content").html(self.view.header + content + self.view.footer);

    // Create button for Complete tasks and View EPG
    $('.item').dimmer({on: 'hover'});

    // Create Complete Task buttons
    function clickComplete() {

    	let instance_id = $(this)[0].id.split("_")[0];
    	let task_id = $(this)[0].id.split("_")[1];
    	let task_item = $(this)[0].closest(".item");
    	let task_activity = $(task_item).attr("activity");

    	// check if all tasks are completed
    	let all_task_in_this_activity_completed = true;
    	for(let i = 0; i < task_end_event[task_activity].length; i++) {
    		let end_task = task_end_event[task_activity][i];
    		if (end_task == task_item.id)
    			continue;
    		if (!(end_task in sys.content.completedTask)) {
    			all_task_in_this_activity_completed = false;
    			break;
    		}
    	}

    	function successCompleteTask(complete) {

    		if (all_task_in_this_activity_completed ) {

    			removeFromArray(sys.workflow.definition.active_instances, instance_id);

    			let callbacksToComplete = next_start_activity[task_activity].length;
				let	callbacksCompleted = 0;

				// if it's the last activity
				if (next_start_activity[task_activity].length == 0) {
    				callbacksCompleted = -1;
    				addCallbackInstance();
    			}

				function addCallbackInstance(){
					callbacksCompleted++;
					if(callbacksCompleted == callbacksToComplete) {
						let newData = {};
	                    newData.active_instances = sys.workflow.definition.active_instances;

		                // Save information to MongoDB
		                function successUpdateWorkflow(workflow_info) {
		                	location.reload();
		                }

		                function errorUpdateWorkflow(msg) {
		                    console.log(msg);
		                }

		                Workflow.set(sys.workflow.id, newData, successUpdateWorkflow, errorUpdateWorkflow);
					}
				}

				next_start_activity[task_activity].forEach(function(activity, idx, arr){
					let process = new Process();
    				process.processDefinitionId = process_definition_id[activity];

    				function successCreateProcessInstance(instance) {
		        		sys.workflow.definition.active_instances.push(instance.id);
		        		addCallbackInstance();
		            }

		        	function errorCreateProcessInstance(instance) {
		        		
		        	}

		        	process.createProcessInstance([], successCreateProcessInstance, errorCreateProcessInstance);

				});
	        	
    		} else {
    			location.reload();
    		}
    	}

    	function errorCompleteTask(result) {
    		
    	}

    	// if the task is a tollgate. e.g. transition readiness review (trr)
		if(task_item.id in tollgate_list) {
			$(task_item).find('.completeTask').off('click');

			//##################################################################################

			$('#wait_loader').addClass("active");

    	
    		var risk_factor_query_result = {};


			function predictRiskLevel() {
    			console.log(risk_factor_query_result);

	    		function change_the_task(risk_level) {
    				let predicted_result = JSON.parse(risk_level);
    				console.log(predicted_result);
    				$('#predicted_level').html(predicted_result.results.predicted);

    				$('#wait_loader').removeClass("active");

    				// Change the style of TRR
    				$(task_item).dimmer('hide');
        			$(task_item).removeClass('active', 500).addClass("completed")
	        		$('#'+task_item.id+'>i').removeClass("hourglass start large").removeClass("crosshairs big").addClass("big checkmark");
	        		$(task_item).find('.buttons').html(`<a class="ui white button viewEPG" data-tooltip="View EPG"><i class="big help icon"></i></a>
	        											<input type="hidden" value="${sys.content.activeTask['task_item']}"></input>`);
    		

        			// riskPrioritize.prioritize(predicted_result.results.predicted);
        			riskPrioritize.displayRecommendedTasks(predicted_result.recommendedTasks);


        			if (typeof next_start_activity[task_activity] === 'undefined')
        				next_start_activity[task_activity] = [];

        			function checkNextActivityExists() {
        				if (next_start_activity[task_activity].length == 0)
        					$('.accept.button').addClass('disabled');
        				else
        					$('.accept.button').removeClass('disabled');
        			}

        			$('input[type="checkbox"]').on('click', function(){
        				if ($(this).is(':checked'))
        					next_start_activity[task_activity].push(riskPrioritize.id_to_activity[$(this).attr('id')]);
        				else
        					removeFromArray(next_start_activity[task_activity], riskPrioritize.id_to_activity[$(this).attr('id')]);
        				checkNextActivityExists();
        			});

					$('.override.button').on('click', function(){
						next_start_activity[task_activity] = [];
						next_start_activity[task_activity].push(riskPrioritize.id_to_activity["default"]);
						sys.content.tasks[0].completeTask(task_id, successCompleteTask, errorCompleteTask);
					});

					$('.accept.button').on('click', function(){
						sys.content.tasks[0].completeTask(task_id, successCompleteTask, errorCompleteTask);
					});

					$('#tr4').modal('setting', 'closable', false).modal('show');

	        	}

	        	// Query the risk prediction model and figure out the predicted risk level
        		// Cocomo data comes from querying result from db
        		// Quality metrics coms from dna
	        	// Huawei_risk_factor_sample specifies the remaining factors currently not available from any data sources
	        	let risk_factors = {
					"RELY": risk_factor_query_result.project_criteria.cocomoData.rely_value,
					"DATA": risk_factor_query_result.project_criteria.cocomoData.data_value,
					"CPLX": (risk_factor_query_result.project_criteria.cocomoData.hw_cplx_value + risk_factor_query_result.project_criteria.cocomoData.sw_cplx_value) / 2.0,
					"RUSE": risk_factor_query_result.project_criteria.cocomoData.ruse_value,
					// "DOCU": risk_factor_query_result.project_criteria.cocomoData.docu_value,
					// "TIME": risk_factor_query_result.project_criteria.cocomoData.time_value,
					// "STOR": risk_factor_query_result.project_criteria.cocomoData.stor_value,
					"PVOL": risk_factor_query_result.project_criteria.cocomoData.pvol_value,
					"ACAP": risk_factor_query_result.project_criteria.cocomoData.acap_value,
					// "PCAP": Huawei_risk_factor_sample.PCAP,//cocoma_data.cocomoData.pcap_value,//
					// "PCON": Huawei_risk_factor_sample.PCON,//cocoma_data.cocomoData.pcon_value,//
					"APEX": risk_factor_query_result.project_criteria.cocomoData.apex_value,
					// "PLEX": Huawei_risk_factor_sample.PLEX, //cocoma_data.cocomoData.plex_value,//
					// "LTEX": Huawei_risk_factor_sample.LTEX, //cocoma_data.cocomoData.ltex_value,//
					// "TOOL": risk_factor_query_result.project_criteria.cocomoData.tool_value,
					// "SITE": risk_factor_query_result.project_criteria.cocomoData.site_value,
					// "SCED": risk_factor_query_result.project_criteria.cocomoData.sced_value,
					"AA": risk_factor_query_result.project_criteria.cocomoData.aa_value,
					"PR": risk_factor_query_result.project_criteria.cocomoData.pr_value,
					"TSL": risk_factor_query_result.project_criteria.cocomoData.tsl_value,
					// "FCR": risk_factor_query_result.quality_metrics.result[0].FCR,
					// "CD": risk_factor_query_result.quality_metrics.result[0].CD,
					// "ISS": risk_factor_query_result.quality_metrics.result[0].ISS,
					// "ISRR": risk_factor_query_result.quality_metrics.result[0].ISRR,
					// "DRR": risk_factor_query_result.quality_metrics.result[0].DRR,
                    "Phase": 2,
                   "ISS_Num_Resolved": Huawei_risk_factor_sample.ISS_Num_Resolved,
                   "ISS_Num_Unresolved": Huawei_risk_factor_sample.ISS_Num_Unresolved,
                   "Personnel": Huawei_risk_factor_sample.Personnel,
                   "Estimated Effort": Huawei_risk_factor_sample["Estimated Effort"],
                   "Accu_Trivial": Huawei_risk_factor_sample.Accu_Trivial, 
                   "Accu_Minor": Huawei_risk_factor_sample.Accu_Minor,
                   "Accu_Major": Huawei_risk_factor_sample.Accu_Major,
                   "Accu_Critical": Huawei_risk_factor_sample.Accu_Critical,
                   "Accu_Block": Huawei_risk_factor_sample.Accu_Block,
                   "Csmell": Huawei_risk_factor_sample.Csmell,
                   "Svul": Huawei_risk_factor_sample.Svul
	        	};

	        	// RiskAdapter.predictRiskLevelByJSON(risk_factors, change_the_task);

	        	riskPrioritize.predictTasksByJSON(risk_factors, change_the_task);

    		};

    		// Get cocomoData from DB, 
    		let projectCriteria_query_body = {
    			"instanceId" : sys.workflow.id
    			//"projectId" : "71e1820c-5db9-4429-965c-b7164a00e265"  // Currently set to this id for demo purpose
    		};

    		// Get quality factors from Quality Mangement DB
    		let qualityMetrics_query_body = "71e1820c-5db9-4429-965c-b7164a00e265";  // Currently set to this id for demo purpose

    		// TODO
    		// Get code repository analysis result from somewhere


    		let callbacksToComplete = 2;
			let	callbacksCompleted = 0;
			function addCallbackInstance(){
				callbacksCompleted++;
				if(callbacksCompleted == callbacksToComplete) {
					predictRiskLevel();
				}
			}
		
			ProjectCriteria.readProjectCriteria(projectCriteria_query_body, function(project_criteria){
				risk_factor_query_result.project_criteria = project_criteria;
				addCallbackInstance();
			});

			QualityMetrics.readQualityMetrics(qualityMetrics_query_body, function(quality_metrics){
				risk_factor_query_result.quality_metrics = quality_metrics;
				addCallbackInstance();
			});
        		

			//##################################################################################
			
		} else
    		sys.content.tasks[0].completeTask(task_id, successCompleteTask, errorCompleteTask);
    }
    $('.completeTask').on('click', clickComplete);

    // Create blue background task as NEXT tasks
	var at = Object.keys(sys.content.activeTask);
	var nextTasks = sys.content.nextTasks;
	for (var i = 0; i < at.length; i++) {
		var next = nextTasks[at[i]];
		if (!is_defined(next)) continue;
		next.forEach(function(n){
			$('#' + at[i] + " .completeTask").hover(
				function () {
				    $('#' + n).addClass("next");
				},
				function () {
				    $('#' + n).removeClass("next");
				}
			);
		});
	}


	// Create button for switch to BPMN diagram
    function clickSwitchView() {
    	$('.page').dimmer('show');

    	$('#diagram').html("");

    	sys.workflow.definition.active_instances.forEach(function(active_instance){
	    	function successGetInstanceDiagramSrc(diagram) {
	    		// Because the Embedded Credential is disabled in June, 2017
	    		// The task of this function is done in Adapter.js -> getInstanceDiagram
	    		// The structure of this project is broken due to this special case
	    		// It shuold be fixed some day
	    		// $("#diagram").html("<img src=" + diagram + "'>");
	    		
	            let img = $(document.createElement('img'));
	            img.attr("src", diagram);
	            img.attr("id", active_instance);
	            let div = $(document.createElement('div'));
	            div.append(img);
	            div.appendTo('#diagram');
	    		
	    	}
	    	function errorGetInstanceDiagramSrc(result) {
	    		$("#diagram").html("[ERROR] Diagram Not Found");
	    	}
	    	Process.getInstanceDiagramSrc(active_instance, successGetInstanceDiagramSrc, errorGetInstanceDiagramSrc);
	    });
    	
    }
    $('#show_bpmn').on('click', clickSwitchView);
    $('#close_bpmn').on('click', function(){
    	$('.page').dimmer('hide');
    });
}

dashboardControl.loadWorkflow = function() {

	var self = this;

	if (is_defined(sys.workflow) && sys.workflow != false) {

		function successReadWorkflow(workflow) {

			sys.workflow.definition = workflow;

			var instance_length = workflow.active_instances.length;
			var current_instance_number = 0;

			//if there is no instances, display something
			if (workflow.active_instances.length == 0) {
				$("#content").html(self.view.error("[Warming] There is no activity running on this instance."));
			}

			workflow.active_instances.forEach(function(active_instance){

				let process = new Process();
				process.instance = active_instance;

				function successGetProcessDefinitionId(instance) {
			
					function successReadProcessInfo(info) {

						let user = new User(process.info);
					    process.user = user.readUser(sys.view);
					    process.task = new Task(process.info);
					    process.activeTask = new ActiveTask(process.processDefinitionId, process.instance);
					    process.completedTask = new CompletedTask(process.processDefinitionId, process.instance);
					    
						function successReadActiveTask(active) {

							function successReadCompletedTask(completed) {

						    	// Finish processing data
						    	$.extend(sys.content.activeTask, process.activeTask.list);
						    	sys.content.tasks.push(process.task);
						    	$.extend(sys.content.completedTask, process.completedTask.list);

						    	
						    	if (sys.content.user == null) {
						    		sys.content.user = process.user;
						    	} else {
							    	for(let key in process.user) {
							    		if (!(key in sys.content.user)) {
							    			sys.content.user[key] = process.user[key];
							    		} else {
							    			sys.content.user[key].task = sys.content.user[key].task.concat(process.user[key].task);
							    		}
							    	}
							    }

								$.extend(sys.content.nextTasks, process.task.readNextTask());

						    	if (++current_instance_number == instance_length) {
						    		self.displayContent();
						    	}
							}

							function errorReadCompletedTask(result) {
								$("#content").html(self.view.error("[ERROR] Completed Tasks Not Found"));
							}

							process.completedTask.readCompletedTask({}, successReadCompletedTask, errorReadCompletedTask);
					    }

					    function errorReadActiveTask(result) {
					    	$("#content").html(self.view.error("[ERROR] Active Tasks Not Found"));
					    }

					    process.activeTask.readActiveTask({}, successReadActiveTask, errorReadActiveTask);
				  	}

				  	function errorReadProcessInfo(result) {
				  		$("#content").html(self.view.error("[ERROR] Defined Process Not Found"));
				  	}

				  	process.readProcessInfo({}, successReadProcessInfo, errorReadProcessInfo);
				}

				function errorGetProcessDefinitionId(result) {
					$("#content").html(self.view.error("[ERROR] Running Instance Not Found: The requested project may be closed."));
				}

				process.getProcessDefinitionId(process.instance, successGetProcessDefinitionId, errorGetProcessDefinitionId);


			}); //#
			
		}

		function errorReadWorkflow(result) {
			$("#content").html(self.view.error("[ERROR] Running Instance Not Found: The requested project may be closed."));
		}

		// sys.process.getProcessDefinitionId(sys.process.instance, successGetProcessDefinitionId, errorGetProcessDefinitionId);
		Workflow.readWorkflow(sys.workflow.id, successReadWorkflow, errorReadWorkflow);

	} else {
		$("#content").html(self.view.error("[ERROR] Running Instance Not Found"));
	}
}

dashboardControl.loadContent = function() {
	sys.workflow.id = this.getParameter("instanceId");
	sys.view = this.getParameter("view");

	// Currently we only have to views, the default view would be ICSM
	if (sys.view != "ICSM") {
		sys.view = "Huawei";
	}

	$("input[name='view']").each(function() {
		$(this).on('click', function() {
			var view = $(this).val();
			var url = dashboardControl.addOrReplaceParam(window.location.href, "view", view);
			window.open(url, "_self");
		});

		if ($(this).val() == sys.view) {
			$(this).attr('checked', 'checked');
		}
	});

	this.loadButtons();

	this.loadWorkflow();

	// Stop loading icon
    var loading_icon = $('.loading.icon');
    loading_icon.removeClass('notched circle loading icon');
    loading_icon.addClass('browser icon');
}