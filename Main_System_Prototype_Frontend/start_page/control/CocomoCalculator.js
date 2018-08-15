function estimateEffortandScheduleWithCocomo(cocomoData){
	// populateCocomoValues(cocomoData);
	// setDefaultValues(cocomoData);
	calEquivalentSize(cocomoData);
	var A = 2.94;
	var C = 3.67;
	var B = 0.91;
	var D = 0.28;
	var E = B + 0.01*(
		cocomoData.prec_value+cocomoData.flex_value+cocomoData.resl_value+cocomoData.team_value+cocomoData.pmat_value
	);

	cocomoData.SIZE = cocomoData.sloc*0.001;
	cocomoData.PMNS = A*Math.pow(cocomoData.SIZE, E)*cocomoData.docu_value*cocomoData.time_value*cocomoData.stor_value*cocomoData.tool_value*cocomoData.site_value*cocomoData.sced_value*cocomoData.rely_value*cocomoData.sw_cplx_value*cocomoData.hw_cplx_value*cocomoData.data_value*cocomoData.apex_value*cocomoData.acap_value*cocomoData.pvol_value*cocomoData.supp_value*cocomoData.ruse_value;

	var F = D+ 0.2*(E - B);
	cocomoData.TDEV = C * Math.pow(cocomoData.PMNS/cocomoData.sced_value, F)*100/100;

	if(cocomoData.TDEV != 0){
	cocomoData.STAFF = cocomoData.PMNS/cocomoData.TDEV;
	}

	if(cocomoData.TDEV != 0){
	cocomoData.PROD = cocomoData.SIZE/cocomoData.TDEV;
	}

	cocomoData.E_most_likely = cocomoData.PMNS;
	cocomoData.E_pessimistic = 1.25*cocomoData.PMNS;
	cocomoData.E_optimistic = 0.80*cocomoData.PMNS;
	cocomoData.TDEV_most_likely = cocomoData.TDEV;
	cocomoData.TDEV_pessimistic = C * Math.pow(cocomoData.E_pessimistic/cocomoData.sced_value, F)*100/100;
	cocomoData.TDEV_optimistic = C * Math.pow(cocomoData.E_optimistic/cocomoData.sced_value, F)*100/100;
	cocomoData.STAFF_most_likely = cocomoData.STAFF;
	if(cocomoData.TDEV_pessimistic != 0){
	cocomoData.STAFF_pessimistic = cocomoData.E_pessimistic/cocomoData.TDEV_pessimistic;
	cocomoData.STAFF_optimistic = cocomoData.E_optimistic/cocomoData.TDEV_optimistic;
	}
	cocomoData.PROD_most_likely = cocomoData.PROD;
	if(cocomoData.TDEV_pessimistic != 0){
	cocomoData.PROD_pessimistic = cocomoData.SIZE/cocomoData.TDEV_pessimistic;
	cocomoData.PROD_optimistic = cocomoData.SIZE/cocomoData.TDEV_optimistic;
	}
}


function calEquivalentSize(cocomoData){
	
	//AAM - adaptation adjustment modifier
	//SU - software understanding
	//AA - assessment and assimilation
	//AAF - adaptation adjustment factor
	//DM - design modified.
	//CM - code modified.
	//IM - integration modified.

	cocomoData.reused_sloc_aaf = cocomoData.reused_sloc_design_modified + cocomoData.reused_sloc_code_modified + cocomoData.reused_sloc_integration_modified;
	cocomoData.modified_sloc_aaf = cocomoData.modified_sloc_design_modified + cocomoData.modified_sloc_code_modified + cocomoData.modified_sloc_integration_modified;

	if(cocomoData.reused_sloc_aaf > 50){
	cocomoData.reused_sloc_aam = (cocomoData.aa_3+cocomoData.reused_sloc_aaf+cocomoData.aa_3*cocomoData.unfm_4)/100;
	}else{
	cocomoData.reused_sloc_aam = (cocomoData.aa_3+cocomoData.reused_sloc_aaf*(1+0.02*(cocomoData.aa_3*cocomoData.unfm_4)))/100;
	}

	cocomoData.reused_esloc = cocomoData.reused_sloc * cocomoData.reused_sloc_aam;

	if(cocomoData.modified_sloc_aaf > 50){
	cocomoData.modified_sloc_aam = (cocomoData.aa_3+cocomoData.modified_sloc_aaf+cocomoData.aa_3*cocomoData.unfm_4)/100;
	}else{
	cocomoData.modified_sloc_aam = (cocomoData.aa_3+cocomoData.modified_sloc_aaf*(1+0.02*(cocomoData.aa_3*cocomoData.unfm_4)))/100;
	}

	cocomoData.modified_esloc = cocomoData.modified_sloc * cocomoData.modified_sloc_aam;

	cocomoData.sloc = cocomoData.new_sloc + cocomoData.reused_esloc + cocomoData.modified_esloc;

}

function setSizeSliderValue(slider, product_type, cocomoData){
	// alert($(slider).parent().html());
	// var id = slider.attr('id');
	var cocomoValue = (cocomoData.new_sloc/1000).toFixed(0);
	// var cocomoValue = 1.0;
	var re = new RegExp(product_type+"_size", "g");
	var ratingRankHigh = 1;
	var rankValueHigh = 100;
	var ratingRankLow = 1;
	var rankValueLow = -1;

	for (var property in cocomoData) {
	if (property.match(re)) {
        // do stuff
    // if(property == id+"_value"){
    // 	continue;
    // }
   
    var ratingRank = 1;

    if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(searchString, position) {
      var subjectString = this.toString();
      if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
        position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
  };
}


    if(property.endsWith("_very_low")){
    	ratingRank = 1;
    }
    else  if(property.endsWith("_low")){
    	ratingRank = 2;
    }
    else  if(property.endsWith("_nominal")){
    	ratingRank = 3;
    }
    else  if(property.endsWith("_high")){
    	ratingRank = 4;
    }
    else  if(property.endsWith("_very_high")){
    	ratingRank = 5;
    }
    else  if(property.endsWith("_extra_high")){
    	ratingRank = 6;
    }
    else {
    	continue;
    }

     var rankValue = cocomoData[property];

   	if(rankValue >= cocomoValue && rankValue < rankValueHigh){
   		rankValueHigh = rankValue;
   		ratingRankHigh = ratingRank;
   	}

   	if(rankValue <= cocomoValue && rankValue > rankValueLow){
   		rankValueLow = rankValue;
   		ratingRankLow = ratingRank;
   	}

	}
	}

	var rankPercentage = 0;
	var ratingRankMin = 1;
	if(ratingRankHigh == ratingRankLow){
		rankingPercentage = 0;
		ratingRankMin = ratingRankLow;
	}
	else if(ratingRankHigh > ratingRankLow) {
		rankPercentage = (cocomoValue - rankValueLow)/(rankValueHigh - rankValueLow);
		ratingRankMin = ratingRankLow;
	}
	else {
		rankPercentage = (cocomoValue - rankValueHigh)/(rankValueLow - rankValueHigh);
		ratingRankMin = ratingRankHigh;
	}
	var sliderValue = 1+(ratingRankMin-1)*4 + parseInt(rankPercentage*4);
	slider.attr('value', sliderValue);

}


function setSliderValue(slider, factor, cocomoData){
	// alert($(slider).parent().html());
	// var id = slider.attr('id');
	var cocomoValue = cocomoData[factor+"_value"];
	// var cocomoValue = 1.0;
	var re = new RegExp(factor, "g");
	var ratingRankHigh = 1;
	var rankValueHigh = 100;
	var ratingRankLow = 1;
	var rankValueLow = -1;

	for (var property in cocomoData) {
	if (property.match(re)) {
        // do stuff
    // if(property == id+"_value"){
    // 	continue;
    // }
   
    var ratingRank = 1;

    if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(searchString, position) {
      var subjectString = this.toString();
      if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
        position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
  };
}


    if(property.endsWith("_very_low")){
    	ratingRank = 1;
    }
    else  if(property.endsWith("_low")){
    	ratingRank = 2;
    }
    else  if(property.endsWith("_nominal")){
    	ratingRank = 3;
    }
    else  if(property.endsWith("_high")){
    	ratingRank = 4;
    }
    else  if(property.endsWith("_very_high")){
    	ratingRank = 5;
    }
    else  if(property.endsWith("_extra_high")){
    	ratingRank = 6;
    }
    else {
    	continue;
    }

     var rankValue = cocomoData[property];

   	if(rankValue >= cocomoValue && rankValue < rankValueHigh){
   		rankValueHigh = rankValue;
   		ratingRankHigh = ratingRank;
   	}

   	if(rankValue <= cocomoValue && rankValue > rankValueLow){
   		rankValueLow = rankValue;
   		ratingRankLow = ratingRank;
   	}

	}
	}

	var rankPercentage = 0;
	var ratingRankMin = 1;
	if(ratingRankHigh == ratingRankLow){
		rankingPercentage = 0;
		ratingRankMin = ratingRankLow;
	}
	else if(ratingRankHigh > ratingRankLow) {
		rankPercentage = (cocomoValue - rankValueLow)/(rankValueHigh - rankValueLow);
		ratingRankMin = ratingRankLow;
	}
	else {
		rankPercentage = (cocomoValue - rankValueHigh)/(rankValueLow - rankValueHigh);
		ratingRankMin = ratingRankHigh;
	}
	var sliderValue = 1+(ratingRankMin-1)*4 + parseInt(rankPercentage*4);
	slider.attr('value', sliderValue);

}

function getCOCOMOValue(factorName, degree, cocomoData){
	 var rating = Math.floor((degree-1)/4);
		var ratingOffset = (degree-1)%4;
		var ratingRank = "none"
		var ratingRankNext = "none";
		if(rating < 1){
			ratingRank = "_very_low";
			ratingRankNext = "_low";
		}
		else if(rating < 2){
			ratingRank = "_low";
			ratingRankNext = "_nominal";
		}
		else if(rating < 3){
			ratingRank = "_nominal";
			ratingRankNext = "_high";
		}
		else if(rating < 4){
			ratingRank = "_high"
			ratingRankNext = "_very_high";
		}
		else if(rating < 5){
			ratingRank = "_very_high";
			ratingRankNext = "_extra_high";
		}
		else if(rating >= 5){
			ratingRank = "_extra_high";
			ratingRankNext = "_extra_high";
		}

		if(ratingRank != "none"){
			if(ratingOffset == 0){
				return Number(cocomoData[factorName+ratingRank].toFixed(2));
				// cocomoData.data_value = cocomoData["data"+ratingRank];
				// cocomoData.hw_cplx_value = cocomoData["hw_cplx"+ratingRank];
				// cocomoData.sw_cplx_value = cocomoData["sw_cplx"+ratingRank];
				// cocomoData.apex_value = cocomoData["apex"+ratingRank];
				// cocomoData.acap_value = cocomoData["acap"+ratingRank];
				// cocomoData.pvol_value = cocomoData["pvol"+ratingRank];
				// cocomoData.supp_value = cocomoData["supp"+ratingRank];
				// cocomoData.ruse_value = cocomoData["ruse"+ratingRank];
			}
			else if(ratingRankNext != "none"){
				return Number(((cocomoData[factorName+ratingRankNext] - cocomoData[factorName+ratingRank])/4*ratingOffset + cocomoData[factorName+ratingRank]).toFixed(2));
				// cocomoData.data_value = ((cocomoData["data"+ratingRankNext] - cocomoData["data"+ratingRank])/4*ratingOffset + cocomoData["data"+ratingRank]);
				// cocomoData.hw_cplx_value = ((cocomoData["hw_cplx"+ratingRankNext] - cocomoData["hw_cplx"+ratingRank])/4*ratingOffset + cocomoData["hw_cplx"+ratingRank]);
				// cocomoData.sw_cplx_value = ((cocomoData["sw_cplx"+ratingRankNext] - cocomoData["sw_cplx"+ratingRank])/4*ratingOffset + cocomoData["sw_cplx"+ratingRank]);
				// cocomoData.apex_value = ((cocomoData["apex"+ratingRankNext] - cocomoData["apex"+ratingRank])/4*ratingOffset + cocomoData["apex"+ratingRank]);
				// cocomoData.acap_value = ((cocomoData["acap"+ratingRankNext] - cocomoData["acap"+ratingRank])/4*ratingOffset + cocomoData["acap"+ratingRank]);
				// cocomoData.pvol_value = ((cocomoData["pvol"+ratingRankNext] - cocomoData["pvol"+ratingRank])/4*ratingOffset + cocomoData["pvol"+ratingRank]);
				// cocomoData.supp_value = ((cocomoData["supp"+ratingRankNext] - cocomoData["supp"+ratingRank])/4*ratingOffset + cocomoData["supp"+ratingRank]);
				// cocomoData.ruse_value = ((cocomoData["ruse"+ratingRankNext] - cocomoData["ruse"+ratingRank])/4*ratingOffset + cocomoData["ruse"+ratingRank]);
			}
		}
}

function calculateSliderCocomoValues(cocomoData){

for (var property in cocomoData) {
    if (property.match(/_slider_value/gi)) {
        // do stuff
    var factorName = property.replace('_slider_value', '');
    var degree = cocomoData[property]
    cocomoData[factorName+'_value'] = getCOCOMOValue(factorName, degree, cocomoData);
    	}
	}
}




function setDefaultValues(cocomoData){
	if(cocomoData === null){
		return;
	}

	cocomoData.chng_very_low = 0.87;
	cocomoData.chng_low = 0.94;
	cocomoData.chng_nominal = 1.00;
	cocomoData.chng_high = 1.07;
	cocomoData.chng_very_high = 1.14;
	cocomoData.chng_extra_high = 1.20;
	cocomoData.chng_value = 1.00;

	cocomoData.rely_very_low = 0.82;
	cocomoData.rely_low = 0.92;
	cocomoData.rely_nominal = 1.00;
	cocomoData.rely_high = 1.10;
	cocomoData.rely_very_high = 1.26;
	cocomoData.rely_extra_high = 1.45;
	cocomoData.rely_value = 1.00;

	cocomoData.data_low = 0.93;
	cocomoData.data_nominal  = 1.00;
	cocomoData.data_high = 1.09;
	cocomoData.data_very_high = 1.19;
	cocomoData.data_value = 1.00;

	cocomoData.hw_cplx_very_low = 0.87;
	cocomoData.hw_cplx_low = 0.94;
	cocomoData.hw_cplx_nominal = 1.00;
	cocomoData.hw_cplx_high = 1.07;
	cocomoData.hw_cplx_very_high = 1.14;
	cocomoData.hw_cplx_extra_high = 1.29;
	cocomoData.hw_cplx_value = 1.00;


	cocomoData.sw_cplx_very_low = 0.87;
	cocomoData.sw_cplx_low = 0.94;
	cocomoData.sw_cplx_nominal = 1.00;
	cocomoData.sw_cplx_high = 1.07;
	cocomoData.sw_cplx_very_high = 1.14;
	cocomoData.sw_cplx_extra_high = 1.29;
	cocomoData.sw_cplx_value = 1.00;

	cocomoData.apex_very_low = 1.22;
	cocomoData.apex_low == 1.10;
	cocomoData.apex_nominal = 1.00;
	cocomoData.apex_high = 0.89;
	cocomoData.apex_very_high = 0.81;
	cocomoData.apex_value = 1.00;

	cocomoData.acap_very_low = 1.50;
	cocomoData.acap_low = 1.22;
	cocomoData.acap_nominal = 1.00;
	cocomoData.acap_high = 0.83;
	cocomoData.acap_very_high = 0.67;
	cocomoData.acap_value = 1.00;

	cocomoData.pvol_low = 0.87;
	cocomoData.pvol_nominal = 1.00;
	cocomoData.pvol_high = 1.15;
	cocomoData.pvol_very_high = 1.30;
	cocomoData.pvol_value = 1.00;

	cocomoData.supp_low = 0.90;
	cocomoData.supp_nominal = 1.00;
	cocomoData.supp_high = 1.10;
	cocomoData.supp_value = 1.00;

	cocomoData.ruse_low = 0.95;
	cocomoData.ruse_nominal = 1.00;
	cocomoData.ruse_high = 1.07;
	cocomoData.ruse_very_high = 1.15;
	cocomoData.ruse_value = 1.00;

	cocomoData.pr_very_low = 0;
	cocomoData.pr_low = 0.25;
	cocomoData.pr_nominal = 0.4;
	cocomoData.pr_high = 0.5;
	cocomoData.pr_very_high = 0.58;
	cocomoData.pr_extra_high = 0.7;
	cocomoData.pr_value = 0.4;

	cocomoData.tsl_very_low = 0;
	cocomoData.tsl_low = 0.23;
	cocomoData.tsl_nominal = 0.4;
	cocomoData.tsl_high = 0.5;
	cocomoData.tsl_very_high = 0.57;
	cocomoData.tsl_extra_high = 0.6;
	cocomoData.tsl_value = 0.4;;

	cocomoData.aa_very_low = 0;
	cocomoData.aa_low = 0.01;
	cocomoData.aa_nominal = 0.1;
	cocomoData.aa_high = 0.27;
	cocomoData.aa_very_high = 0.34;
	cocomoData.aa_extra_high = 0.4;
	cocomoData.aa_value = 0.1;

	// scale factors
	cocomoData.prec_rating = 'HI';
	cocomoData.prec_value = 2.48; //nominal:3.72
	cocomoData.flex_rating = 'NOM';
	cocomoData.flex_value = 2.03;
	cocomoData.resl_rating = 'HI';
	cocomoData.resl_value = 2.83; //nominal:4.24
	cocomoData.team_rating = 'HI';
	cocomoData.team_value = 2.19; //nominal:3.29
	cocomoData.pmat_rating = 'HI';
	cocomoData.pmat_value = 3.12; //nominal:4.68
	cocomoData.docu_rating = 'HI';
	// effort multipliers
	cocomoData.docu_value = 1.11;
	cocomoData.time_rating = 'NOM';
	cocomoData.time_value = 1;
	cocomoData.stor_rating = 'NOM';
	cocomoData.stor_value = 1;
	cocomoData.tool_rating = 'NOM';
	cocomoData.tool_value = 1;
	cocomoData.site_rating = 'NOM';
	cocomoData.site_value = 1;
	cocomoData.sced_rating = 'NOM';
	cocomoData.sced_value = 1;


	cocomoData.pcap_value=1.00;
	cocomoData.pcon_value=1.00;
	cocomoData.plex_value=1.00;
	cocomoData.ltex_value=1.00;

	cocomoData.su_very_low = 0.5;
	cocomoData.su_low = 0.4;
	cocomoData.su_nominal = 0.3;
	cocomoData.su_high = 0.2;
	cocomoData.su_very_high = 0.1;

	cocomoData.aa_1 = 0;
	cocomoData.aa_2 = 2,
	cocomoData.aa_3 = 4;
	cocomoData.aa_4 = 6;
	cocomoData.aa_5 = 8;

	cocomoData.unfm_1 = 0.0;
	cocomoData.unfm_2 = 0.2;
	cocomoData.unfm_3 = 0.4;
	cocomoData.unfm_4 = 0.6;
	cocomoData.unfm_5 = 0.8;
	cocomoData.unfm_6 = 1;

	cocomoData.new_sloc = 0.0;
	cocomoData.reused_esloc = 0.0;
	cocomoData.modified_esloc = 0.0;
	
	cocomoData.E_most_likely = 0.0;
	cocomoData.E_pessimistic = 0.0;
	cocomoData.E_optimistic = 0.0;

	cocomoData.TDEV_most_likely = 0.0;
	cocomoData.TDEV_pessimistic = 0.0;
	cocomoData.TDEV_optimistic = 0.0;

	cocomoData.STAFF_most_likely = 0.0;
	cocomoData.STAFF_pessimistic = 0.0;
	cocomoData.STAFF_optimistic = 0.0;

	cocomoData.PROD_most_likely = 0.0;
	cocomoData.PROD_pessimistic = 0.0;
	cocomoData.PROD_optimistic = 0.0;

	cocomoData.SIZE = 0;
	cocomoData.PMNS = 0;
	cocomoData.TDEV = 0;
	cocomoData.STAFF = 0;
	cocomoData.PROD = 0;

	// "Architected_Agile" : "Architected_Agile:1:9136",
 //    "Architected_Agile_Low_Risk" : "Architected_Agile_Low_Risk:1:9149",
	// "Agile" : "Agile:1:8788",
	// "COTS_Services" : "COTS_Services:1:8796",
	// "Formal_Methods" : "Formal_Methods:1:8800",
	// "Plan_driven" : "Plan_driven:1:8804"
	// cocomoData.product_type = "Accounting application";
	 // cocomoData.product_type = "";


	 cocomoData.web_server = "";
	 _size_very_low = 1;
	 cocomoData.web_server_size_low = 10;
	 cocomoData.web_server_size_nominal = 50;
	 cocomoData.web_server_size_high = 100;
	 cocomoData.web_server_size_very_high = 125;
	 cocomoData.web_server_size_extra_high = 150;

	 cocomoData.mobile_internet_feature_size_very_low = 1;
	 cocomoData.mobile_internet_feature_size_low = 10;
	 cocomoData.mobile_internet_feature_size_nominal = 50;
	 cocomoData.mobile_internet_feature_size_high = 70;
	 cocomoData.mobile_internet_feature_size_very_high = 90;
	 cocomoData.mobile_internet_feature_size_extra_high = 110;

	 cocomoData.R_D_tools_size_very_low = 1;
	 cocomoData.R_D_tools_size_low = 10;
	 cocomoData.R_D_tools_size_nominal = 30;
	 cocomoData.R_D_tools_size_high = 50;
	 cocomoData.R_D_tools_size_very_high = 70;
	 cocomoData.R_D_tools_size_extra_high = 100;

	 cocomoData.security_kernel_size_very_low = 1;
	 cocomoData.security_kernel_size_low = 10;
	 cocomoData.security_kernel_size_nominal = 15;
	 cocomoData.security_kernel_size_high = 30;
	 cocomoData.security_kernel_size_very_high = 50;
	 cocomoData.security_kernel_size_extra_high = 80;

	 cocomoData.default_size_very_low = 1;
	 cocomoData.default_size_low = 10;
	 cocomoData.default_size_nominal = 50;
	 cocomoData.default_size_high = 70;
	 cocomoData.default_size_very_high = 90;
	 cocomoData.default_size_extra_high = 110;


	 // cocomoData.web_server_size_very_low = "1";
	 // cocomoData.web_server_size_low = "10";
	 // cocomoData.web_server_size_nominal = "50";
	 // cocomoData.web_server_size_high = "100";
	 // cocomoData.web_server_size_very_high = "125";
	 // cocomoData.web_server_size_extra_high = "150";

	 // cocomoData.mobile_internet_feature_size_very_low = "1";
	 // cocomoData.mobile_internet_feature_size_low = "10";
	 // cocomoData.mobile_internet_feature_size_nominal = "50";
	 // cocomoData.mobile_internet_feature_size_high = "70";
	 // cocomoData.mobile_internet_feature_size_very_high = "90";
	 // cocomoData.mobile_internet_feature_size_extra_high = "110";

	 // cocomoData.R_D_tools_size_very_low = "1";
	 // cocomoData.R_D_tools_size_low = "10";
	 // cocomoData.R_D_tools_size_nominal = "30";
	 // cocomoData.R_D_tools_size_high = "50";
	 // cocomoData.R_D_tools_size_very_high = "70";
	 // cocomoData.R_D_tools_size_extra_high = "100";

	 // cocomoData.security_kernel_size_very_low = "1";
	 // cocomoData.security_kernel_size_low = "10";
	 // cocomoData.security_kernel_size_nominal = "15";
	 // cocomoData.security_kernel_size_high = "30";
	 // cocomoData.security_kernel_size_very_high = "50";
	 // cocomoData.security_kernel_size_extra_high = "80";

	 // cocomoData.default_size_very_low = "1";
	 // cocomoData.default_size_low = "10";
	 // cocomoData.default_size_nominal = "50";
	 // cocomoData.default_size_high = "70";
	 // cocomoData.default_size_very_high = "90";
	 // cocomoData.default_size_extra_high = "110";

	 // <div class="menu" tabindex="-1">
  //               <div class="item" data-value="Web Server">Web Server</div>
  //               <div class="item" data-value="Mobile/Internet Feature">Mobile/Internet Feature</div>
  //               <div class="item" data-value="R&amp;D Tools">R&amp;D Tools</div>
  //               <div class="item" data-value="Security kernel; Safety-critical LSI Chip">Security kernel; Safety-critical LSI Chip</div>
  //               <div class="item" data-value="Multi-sensor Control Device/Router/Switch">Multi-sensor Control Device/Router/Switch</div>
  //               <div class="item" data-value="Legacy system">Legacy system</div>
  //               <div class="item" data-value="Carrier Class Large Scale SW Intensive; Other Regulated Environments">Carrier Class Large Scale SW Intensive; Other Regulated Environments</div>
  //               <div class="item" data-value="Digital City; Industry Vertical (Oil &amp; Gas)">Digital City; Industry Vertical (Oil &amp; Gas)</div>
  //               <div class="item" data-value="New IOT Product Line">New IOT Product Line</div>
  //             </div>

	 cocomoData.product_type = "default";
	 cocomoData.product_type_web_server = "Web Server";
	 cocomoData.product_type_R_D_tools = "R&D Tools";
	 cocomoData.product_type_mobile_internet_feature = "Mobile/Internet Feature";
	 cocomoData.product_type_security_kernel = "Security kernel; Safety-critical LSI Chip";
	 cocomoData.product_type_multi_sensor_control_device = "Multi-sensor Control Device/Router/Switch";
	 cocomoData.product_type_legacy_system = "Legacy system";
	 cocomoData.product_type_carrier_class_large_scale = "Carrier Class Large Scale SW Intensive; Other Regulated Environments";
	 cocomoData.product_type_digital_city = "Digital City; Industry Vertical (Oil &amp; Gas)";
	 cocomoData.product_type_new_IOT_product_line = "New IOT Product Line";

	 cocomoData.product_type_default = "Select product type";

	 cocomoData.project_size_rank = 1;


	cocomoData.new_sloc = 0;
	cocomoData.reused_sloc_design_modified = 0;
	cocomoData.reused_sloc_code_modified = 0;
	cocomoData.reused_sloc_integration_modified = 0;
	cocomoData.modified_sloc_design_modified = 0;
	cocomoData.modified_sloc_code_modified = 0;
	cocomoData.modified_sloc_integration_modified = 0;
	cocomoData.reused_sloc = 0;
	cocomoData.modified_sloc = 0;

}