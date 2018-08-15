// This file is created to demo the risk strategy prioritization

var riskPrioritize = {
	description : `<div class="ui grid">
        <div class="row">
          <div class="one wide column"></div>
          <div class="fourteen wide column">
            <p>Based on the analysis result, following actions are suggested:<p>
          </div>
          <div class="one wide column"></div>
        </div>`,

    strategy : {
    	one : {title : "Resolve Technical Debts", style_class : "resolve_technical_debts"},
    	two : {title : "Perform Additional Testing", style_class : "perform_testing"},
    	three : {title : "Update Project Plan and Milestones", style_class : "re_schedule"},
    	four : {title : "Rescope and redesign", style_class : "re_design"}
    },

    strategy_to_id : {
    	"Resolve Technical Debts" : "resolve_technical_debts",
    	"Perform Additional Testing" : "perform_testing",
    	"Update Project Plan and Milestones" : "re_schedule",
    	"Rescope and redesign" : "re_design"
    },

    id_to_activity : {
    	"resolve_technical_debts" : "sp_ci",
    	"perform_testing" : "sp_sp",
    	"re_schedule" : "sp_fs",
    	"re_design" : "sp_fd",
    	"default" : "sp_ti"
    },

    priority : {
    	very_high : {title : "Very High", priority : 10000},
    	high : {title : "High", priority : 1000},
    	medium : {title : "Medium", priority : 100},
    	low : {title : "Low", priority : 10},
    	very_low : {title : "Very Low", priority : 1}
    }
};

// The riskPrioritize.prioritize function should be replaced by querying risk prediction model with all potential strategies
// Due to the accuracy of current risk prediciton model, the following substitude is temporarily created for demo
// riskPrioritize.prioritize = function(risk_level) {
// 	let strategy_size = { 5 : 4, 4 : 4, 3 : 3, 2 : Math.floor(Math.random() * 2) + 2, 1 : 2};
// 	let strategy_pool = {
// 		5 : ["one" , "two", "three", "four"],
// 		4 : ["one" , "two", "three", "four"],
// 		3 : ["one" , "two", "three"],
// 		2 : ["one" , "two", "three"],
// 		1 : ["one" , "two"]
// 	};

// 	let priority_pool = {
// 		5 : ["low", "medium"],
// 		4 : ["low", "medium"],
// 		3 : ["very_low" , "low", "medium"],
// 		2 : ["very_low" , "low"],
// 		1 : ["very_low"]
// 	};

// 	let content = this.description;
// 	let strategies = _.sample(strategy_pool[risk_level], strategy_size[risk_level]);

// 	for(let i = 0; i < strategies.length; i++) {
// 		let row = `<div class="row">
//           <div class="two wide column"></div>
//           <div class="five wide column">{strategy}</div>   
//           <div class="three wide column">Priority: {priority}</div>
//           <div class="four wide column">
//             <div class="ui green ok inverted {style_class} button">
//               <i class="checkmark icon"></i>
//               Accept
//             </div>
//           </div>
//           <div class="two wide column"></div>
//         </div>`;
// 		row = row.split("{strategy}").join(this.strategy[strategies[i]].title);
// 		row = row.split("{style_class}").join(this.strategy[strategies[i]].style_class);
// 		if ((risk_level == "5" || risk_level == "4") && strategies[i] == "three" )
// 			row = row.split("{priority}").join(this.priority.very_high.title);
// 		else if (strategies[i] == "three" ) {
// 			let current_priority = _.sample(priority_pool[risk_level], 1)[0];
// 			row = row.split("{priority}").join(this.priority[current_priority].title);
// 		} else {
// 			let current_priority = _.sample(priority_pool[risk_level], 1)[0];
// 			row = row.split("{priority}").join(this.priority[current_priority].title);
// 		}
// 		content += row;
// 	}

// 	$('#tr4 .content .ui.grid').html(content);
// };

riskPrioritize.unit = {
	"scaling_driver" : 1,
	"cost_driver" : 0.1
};

riskPrioritize.strategies = [
	{
		"strategy" : "Resolve Technical Debts",
		"effects" : {
			"RELY" : -1 * riskPrioritize.unit.cost_driver * 4

		}
	},
	{
		"strategy" : "Perform Additional Testing",
		"effects" : {
			"RELY" : -1 * riskPrioritize.unit.cost_driver * 2
		}
	},
	{
		"strategy" : "Update Project Plan and Milestones",
		"effects" : {
			"CPLX" : -1 * riskPrioritize.unit.cost_driver * 2,
			"APEX" : -1 * riskPrioritize.unit.cost_driver * 2,
			"ACAP" : -1 * riskPrioritize.unit.cost_driver * 1
		}
	},
	{
		"strategy" : "Rescope and redesign",
		"effects" : {
			"DATA" : -1 * riskPrioritize.unit.cost_driver * 1,
			"RUSE" : -1 * riskPrioritize.unit.cost_driver * 1,
			"APEX" : 1 * riskPrioritize.unit.cost_driver * 2
		}
	}
];


riskPrioritize.predictTasksByJSON = function(data, success, error) {

	let body = {
		"current_status" : data,
		"strategies" : riskPrioritize.strategies
	};

	console.log(body);

	RiskAdapter.predictTasksByJSON(body, success, error);
};


riskPrioritize.displayRecommendedTasks = function(recommendedTasks) {
	let content = this.description;

	for(let i = 0; i < recommendedTasks.length; i++) {
		let strategy_name = Object.keys(recommendedTasks[i])[0];
		let row = `<div class="row">
          <div class="one wide column"></div>
          <div class="two wide column">
              <input type="checkbox" name="{strategy}" id="{id_class}">
              <label for="{id_class}"></label> 
          </div>
          <div class="eight wide column">{strategy}</div>   
          <div class="three wide column">Priority: {priority}</div>
          <div class="two wide column"></div>
        </div>`;
		row = row.split("{strategy}").join(strategy_name);
		row = row.split("{id_class}").join(this.strategy_to_id[strategy_name]);
		row = row.split("{priority}").join(recommendedTasks[i][strategy_name].priority)
		
		content += row;
	}

	$('#tr4 .content .ui.grid').html(content);
};