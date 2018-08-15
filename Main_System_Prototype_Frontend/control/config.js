// Home directory
System_config = {
	home_url : "http://{server_ip}:8686/{path_to_home}/",
	start_page_url : System_config.home_url + "start_page",
	risk_calculator_url : System_config.home_url + "risk_calculator"

};

// used in model
// communicate with Activiti
Activiti_config : {
    method : "http://",
    server : "{server_ip}:8686/",
    user : "kermit",
    pass : "kermit"
};

// used in model_api_server
// communicate with nodeJS
ApiAdapter_config = {
	node_server_url : "{server_ip}:9666/",
};


// used in model_dna_server
// communicate with nodeJS and Activiti
DnaAdapter_config = {
	dna_server_url : "{server_ip}:2486/",
	function_url : DnaAdapter_config.dna_server_url + "function/"
};

// used in model_risk_server
// communicate with risk prediction api
RiskAdapter_config = {
	risk_server_url : "{server_ip}:8081/"
}

// used in model_rule_server
// communicate with KIE-DROOLS
RuleAdapter_config = {
	method : "http://",
    server : "{server_ip}:8686/",
    user : "kieserver",
    pass : "kieserver1!"
}

// model_repo_server
// communicate with code repository analysis result
// currently not used
RepoAdapter_config = {
	repo_server_url : "http://{server_ip}:{port}/"
}