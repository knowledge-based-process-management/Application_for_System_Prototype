
var criteriaControl = {
    view : {
        milestone : function(milestone) {
            var header = '<div class="one wide column"></div> \
                          <div class="one wide column"></div>';
            var content = "";
            for (var i = 0; i < milestone.length; i++) {
                var template = '<div class="two wide column"> \
                                  <div class="circle-container"> \
                                    <div class="outer-ring"></div> \
                                    <div class="circle"> \
                                      <div class="front"> \
                                        <p>' + milestone[i] + '</p> \
                                      </div> \
                                    </div> \
                                  </div> \
                                </div>';
                
                if (i != milestone.length-1)
                    template += '<div class="one wide column"></div>';
                content += template;
            }
            return header + content;
        },
        phase : function(evidence, phase) {
            var content = "";
            for (var i = 0; i < phase.length; i++) {
                var template = '<div class="three wide column"> \
                                  <div class="ui card" id="' + phase[i] + '"> \
                                    <div class="content"> \
                                      <h4 class="ui header">' + evidence[phase[i]].phase + '</h4> \
                                    </div> \
                                    <div class="content"> \
                                     {item} \
                                    </div> \
                                  </div> \
                                </div>';
                template = template.split("{item}").join(this.document(evidence[phase[i]].documents));
                content += template;
            }
            return content;
        },
        document : function(document) {
            var header = '<div class="ui small feed"> \
                            <div class="event"> \
                              <div class="content"> \
                                <div class="ui celled list fixed-width-list">';
            var footer = '</div></div></div></div>';
            var content = "";
            for (var i = 0; i < document.length; i++) {
                var document_actual = document[i].actual;
                if (document_actual != "N/A") {
                    document_actual = document_actual + "%";
                }
                var template = '<div class="item fixed-size-item {active}"> \
                                    <div class="ui inverted aligned dimmer"> \
                                      <div class="content"> \
                                        <div class="center"> \
                                          <div class="ui buttons"> \
                                            <a class="ui white icon button uploadEvidence"><i class="mediumn cloud upload icon"></i></a> \
                                            <input hidden value="' + document[i].name + '"/> \
                                            {downloadEvidence} \
                                          </div> \
                                        </div> \
                                      </div> \
                                    </div> \
                                    <i class="{check} icon"></i> \
                                    <div class="content"> \
                                      <div class="title">' + document[i].name + '</div> \
                                    </div> \
                                    <input hidden name="required" value="' + document[i].required + '%"/> \
                                    <input hidden name="actual" value="' + document_actual + '"/> \
                                  </div>';
                if (document[i].actual == "N/A") {
                    template = template.split("{active}").join("");
                    template = template.split("{check}").join("hourglass start");
                } else if (parseFloat(document[i].required) <= parseFloat(document[i].actual)) {
                    template = template.split("{active}").join("completed");
                    template = template.split("{check}").join("check");
                } else {
                    template = template.split("{active}").join("active");
                    template = template.split("{check}").join("hourglass half");
                }

                if (is_defined(document[i].file_id)) {
                    template = template.split("{downloadEvidence}").join(' \
                        <a class="ui white icon button downloadEvidence"><i class="mediumn cloud download icon"></i></a> \
                        <input hidden value="' + document[i].file_id + '"/> \
                    ');
                } else {
                    template = template.split("{downloadEvidence}").join("");
                }
                content += template;
            }
            return header + content + footer;
        }
    }
};

criteriaControl.getParameter = function(parameter) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
         var pair = vars[i].split("=");
         if (pair[0] == parameter) {
            return pair[1];
         }
    }
    return(false);
};


criteriaControl.loadContent = function() {

    var self = this;

    var process = new Process();
    process.instance = self.getParameter("instanceId");

    if (is_defined(process.instance) && process.instance != false) {

        $("#message_info").html("TR4 Extended");
        // function successGetProcessDefinitionId(instance) {

        //     function successReadProcessInfo(info) {
        //         $("#message_info").html(info.processes[0].name);
        //     }

        //     function errorReadProcessInfo(result) {

        //     }

        //     process.readProcessInfo({}, successReadProcessInfo, errorReadProcessInfo);
        // }

        // function errorGetProcessDefinitionId(result) {
        // }

        // process.getProcessDefinitionId(process.instance, successGetProcessDefinitionId, errorGetProcessDefinitionId);

        // Get criteria
        var query = { "instanceId" : process.instance };

        function successReadEvidence(evidence) {

            
            if (evidence == "" || evidence.length) {
                // If there is no data in the result, initialize it.
                var data = {
                    "instanceId" : process.instance,
                    "evidence_list" : Huawei_criteria
                };

                function successCreateEvidence(info) {
                    // Call read function again.
                    Evidence.readEvidence(query, successReadEvidence, errorReadEvidence);
                }

                function errorCreateEvidence(result) {

                }
                Evidence.createEvidence(data, successCreateEvidence, errorCreateEvidence);

            } else {
                // IF the data exist, load it
                var phases = Object.keys(evidence.evidence_list);
                var milestone = [];
                for (var i = 0; i < phases.length; i++) {
                    milestone.push(evidence.evidence_list[phases[i]].milestone);
                }
                $('#milestone').html(self.view.milestone(milestone));

                $('#phase').html(self.view.phase(evidence.evidence_list, phases));

                $('#back_to_dashboard').on('click', clickGoBack);

                $('.item').dimmer({on: 'hover'});

                $('.uploadEvidence').on('click', function() {
                    var current_phase = $(this).closest('.ui.card').attr('id');
                    var evidence_title = $(this).next().val();
                    var original_actual_completeness = $(this).closest('.item').find('input[name=actual]').val().split("%").join("");
                    $('#uploadBox_evidence_title').html('Upload ' + '"' + evidence_title + '"');
                    $('#evidence_actual_completeness').val(original_actual_completeness == "N/A" ? "" : original_actual_completeness);


                    // Upload Feature
                    $('#upload_button').off('click');
                    $('#evidence_file').val("");

                    function uploadEvidence() {
                        $('#upload_loader').addClass("active");

                        var evidence_file = $('#evidence_file')[0].files[0];
                        var evidence_actual_completeness = $('#evidence_actual_completeness').val();

                        if (evidence_actual_completeness == "")
                            evidence_actual_completeness = "0";

                        // Upload File
                        function successUpload(upload) {
                            var file = JSON.parse(upload);

                            // Update Evidence list
                            self.updateEvidenceList(evidence, current_phase, evidence_title, file.id, evidence_actual_completeness);

                            // Update Evidence information
                            var data = {};
                            data.evidence_list = evidence.evidence_list;

                            function successUpdateEvidence(update) {
                                $('#upload_loader').removeClass("active");
                                // Query Rules Engine to justify if the evidence criteria are satisfied in the current phase
                                self.queryRule(evidence.evidence_list[current_phase]);
                            }
                            function errorUpdateEvidence(result) {
                                $('#upload_loader').removeClass("active");
                            }
                            Evidence.updateEvidence(query, data, successUpdateEvidence, errorUpdateEvidence);
                        }

                        function errorUpload(result) {

                        }

                        self.uploadEvidence(evidence_title, evidence_file, evidence_actual_completeness, successUpload, errorUpload);
                    }
                    $('#upload_button').on('click', uploadEvidence);

                    $('.ui.modal').modal('show');

                });

                $('.downloadEvidence').on('click', function() {
                    var file_id = $(this).next().val();
                    window.open(ApiAdapter_config.node_server_url + "/downloadFile/" + file_id, "_blank");
                });

                // Pop up bubble box
                var items = $('.item.fixed-size-item');
                for (var i = 0; i < items.length; i++) {
                    var data_html = "<div class='$1'><span class='lefter'>Required: $2</span><br><span class='righter'>Actual: $3</span></div>";
                    if ($(items[i]).hasClass('completed')) {
                        data_html = data_html.split('$1').join('complete');
                    } else {
                        data_html = data_html.split('$1').join('incomplete');
                    }

                    var required = $(items[i]).find('input[name=required]').val();
                    var actual = $(items[i]).find('input[name=actual]').val();
                    data_html = data_html.split('$2').join(required);
                    data_html = data_html.split('$3').join(actual);

                    $(items[i]).attr('data-html', data_html);
                }

                $('.fixed-size-item').popup({
                    hoverable  : true,
                    position   : 'right center'
                });

                // Create button for go back to dashboard
                function clickGoBack() {
                    var instanceId = self.getParameter("instanceId");
                    var view = self.getParameter("view");
                    var url = System_config.home_url + "/dashboard.html?";
                    if (view != false) {
                        url += "instanceId=" + instanceId + "&view=" + view;
                    } else {
                         url += "instanceId=" + instanceId;
                    }
                    window.open(url, "_self");
                }

                self.loadTR4();
            }
        }

        function errorReadEvidence(result) {

        }

        Evidence.readEvidence(query, successReadEvidence, errorReadEvidence);
    }
};

criteriaControl.updateEvidenceList = function(evidence, current_phase, evidence_title, file_id, evidence_actual_completeness) {

    var phase_list = Object.keys(evidence.evidence_list);
    for (var i = 0; i < phase_list.length; i++) {
        for (var j = 0; j < evidence.evidence_list[phase_list[i]].documents.length; j++) {
            if (evidence.evidence_list[phase_list[i]].documents[j].name == evidence_title) {
                evidence.evidence_list[phase_list[i]].documents[j].actual = evidence_actual_completeness;
                evidence.evidence_list[phase_list[i]].documents[j].file_id = file_id;
            }
        }
    }
};

criteriaControl.queryRule = function(phase) {
    var self = this;
    // Assue the evidence is not satisfied
    phase.approved = false;

    // Transform the data to satisfy rules format
    for (let i = 0; i < phase.documents.length; i++) {
        if (phase.documents[i].actual == "N/A") {
            phase.documents[i].actual = "0";
        }

    }

    // Then query the rule Engine to justify it
    function queryRuleSuccess(msg) {

        var data = {
            instanceId : self.getParameter("instanceId"),
            approved : msg.approved
        };

        function successSetInstanceAcceptability(variables) {
            location.reload();
        }

        function errorSetInstanceAcceptability(result) {

        }
        ProcessInstance.setInstanceAcceptability(data, successSetInstanceAcceptability, errorSetInstanceAcceptability);
        
    }

    function queryRuleError(result) {

    }

    Rule.queryRule(phase, queryRuleSuccess, queryRuleError);

}

criteriaControl.uploadEvidence = function(title, evidence_file, evidence_actual_completeness, successUpload, errorUpload) {
    var self = this;
    var instanceId = self.getParameter("instanceId");

    if (!is_defined(instanceId) || instanceId == false) {
        // TODO: Error handling
        return;
    }

    var data = {
        "title" : title,
        "file" : evidence_file,
        "instanceId" : instanceId,
        "integrity" : evidence_actual_completeness
    };

    Evidence.uploadEvidence(data, successUpload, errorUpload);
}


// This function is used for the demo purpose
criteriaControl.loadTR4 = function() {

    // Hardcode
    // Deal with the special KPI "Meantime to repair", replace '%'' with ' weeks'
    var meantime_to_repair_required = $('div:contains("Meantime to Repair")').parent().siblings("input[name='required']");
    meantime_to_repair_required.val(meantime_to_repair_required.val().split("%").join(" weeks"));
    var popup_meantime_to_repair_required = meantime_to_repair_required.closest('.item.fixed-size-item');
    popup_meantime_to_repair_required.attr('data-html', popup_meantime_to_repair_required.attr('data-html').split("%").join(" weeks"));
    // Hardcode end

    var calculateActual = '<a class="ui white icon button calculateActual"><i class="mediumn calculator icon"></i></a>';
    $('#Verification').find(".buttons").find("input").before(calculateActual);
    //console.log($('#Verification').find(".buttons").find("input"));
      var apis = {
        "Executed Nodal Testcases": "QualityManagement/testCaseExecutedRate/71e1820c-5db9-4429-965c-b7164a00e265",
        "Nodal Testcases Pass Rate": "QualityManagement/testCasePassRate/71e1820c-5db9-4429-965c-b7164a00e265",
        "Feature Documentation": "Test/featureDocumentationComplete/97616dab-48c8-4b1b-a129-56e0fa9a589c",
        "Requirements-Testcases Mapping":"QualityManagement/requirementsMappingToTestCasesRate/9fe0d9e7-92dc-4b4c-9906-314c49c0bd64",
        "Carry-over Trouble Ticket Resolution": "QualityManagement/troubleTicketsFromOlderReleases/a0da7296-042b-4a50-aa81-2a1271f5020b",
        "Preliminary Capacity and Memory Analysis":"Test/preliminaryCapacityAndMemoryAnalysis/97616dab-48c8-4b1b-a129-56e0fa9a589c",
        "Completed Regression": "Test/regressionCompleted/97616dab-48c8-4b1b-a129-56e0fa9a589c",
        "Regression Pass Rate": "Test/regressionPassRate/97616dab-48c8-4b1b-a129-56e0fa9a589c",
        "Validated Upgrade Paths": "Test/upgradePathsValidated/97616dab-48c8-4b1b-a129-56e0fa9a589c",
        "Meantime to Repair": "Test/meanTimeToRepair/97616dab-48c8-4b1b-a129-56e0fa9a589c"
    }
    $('.calculateActual').on('click', function(){
        var kpiValue= $(this).siblings("input").val();
        var item = $(this).closest(".item.fixed-size-item");
        var api = DnaAdapter_config.dna_server_url + "/function/" +apis[kpiValue];
        // console.log(api);
        $.ajax({
            "url": encodeURI(api),
            "method": "GET",
            "beforeSend" : function (xhr) {
                xhr.setRequestHeader("Authorization", "BASIC cmVhZGVyOnFtUmVhZGVy");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            "success": function(result){
                // console.log(result);
                //For MTTR

                var itemClass = "incomplete";
                var actualValue = parseFloat(result["result"][0]["value"]).toFixed(4);
                var dataHtml = item.attr('data-html');
                //console.log(dataHtml);
                var dataItem = $(dataHtml);

                if(kpiValue == "Meantime to Repair") {
                    var requiredValue = parseFloat(dataItem.find(".lefter").text().split(":")[1].replace(/weeks/, ""));
                    // console.log("required: "+requiredValue+" actual: "+actualValue);
                    if(requiredValue >= actualValue){
                        var itemClass = "complete";

                        // Color the background
                        item.addClass("completed");
                        // and change the icon
                        item.children("i").removeClass("hourglass start icon").addClass("check icon");
                    } else {
                        // Color the background
                        item.addClass("active");
                        // and change the icon
                        item.children("i").removeClass("hourglass start icon").addClass("hourglass half icon");
                    }
                    actualValue = parseFloat(actualValue).toFixed(2)+" weeks";
                }
                else{
                //For other KPIs
                var requiredValue = parseFloat(dataItem.find(".lefter").text().split(":")[1].replace(/[%]/, ""))*0.01;
                requiredValue = requiredValue.toFixed(4);
                // console.log("required: "+requiredValue+" actual: "+actualValue);
                if(requiredValue <= actualValue){
                    var itemClass = "complete";

                    // Color the background
                    item.addClass("completed");
                    // and change the icon
                    item.children("i").removeClass("hourglass start icon").addClass("check icon");
                } else {
                    // Color the background
                    item.addClass("active");
                    // and change the icon
                    item.children("i").removeClass("hourglass start icon").addClass("hourglass half icon");
                }
                actualValue = actualValue*100+"%";
                }
                dataItem.removeClass("incomplete complete").addClass(itemClass);
                dataItem.find(".righter").text("Actual: "+actualValue);
                dataHtml = dataItem[0].outerHTML;
                item.attr('data-html', dataHtml);
                //item.popup({
                    //hoverable  : true,
                    //position   : 'right center'
                //});
                $(".popup").html(dataHtml);

            },
            "error":  function(xhr, ajaxOptions, thrownError) {
                console.log("[Error] " + xhr.responseText);
            }
        });   
        //$.get(api, function( data ) {
            //console.log(data);
            //var actualValue = data["result"][0]["value"];
            //var dataHtml = item.attr('data-html');
            //var dataItem = $(dataHtml);
            //dataItem.find(".righter").text(actualValue);
            //item.attr('data-html', dataItem.html());
        //});

    });

  
}