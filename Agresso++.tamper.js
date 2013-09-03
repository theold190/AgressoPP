// ==UserScript==
// @name       Agresso++
// @version    0.2
// @description  Tries to improve user experience while working with time reporting of Agresso system
// @match      htt*://agresso-prod/*
// ==/UserScript==

for (var i=1;i<9;i++)
{
	var id = "b_s95_g95s96__sumRow_normal_hrs" + i;
	if (i == 8) {
		id = "b_s95_g95s96__sumRow_sum";
	}
    try {
        var element = content.frames[1].document.getElementById(id).childNodes[0];
        //	var element = window.frames[1].document.getElementById(id).childNodes[0];
        var value = parseFloat(element.innerHTML);
        var newValue = convertHoursToHHMM(value<0?-value:value);
        element.innerHTML=newValue;
        if (value < 0) {
            element.style.color="green";
        } else if (value > 0) {
            element.style.color="red";
        }
    }catch (e){
        //alert(id);
    }
}

function convertHoursToHHMM(time){
    var x = (parseFloat(time).toFixed(2) + '').split(/[,.]/);

    var minutes = parseInt(+x[1] * 60/100);

    if (minutes < 10) {
    	return x[0] + ':0' + minutes;
    } else {
	    return x[0] + ':' + minutes;
    }
}

function convertHoursFromHHMM(time){
    var x = (time + '').split(/[:+]/);
    if (x.length !== 2){
        return time;
    }

    var minutes = (+x[1] / 60).toFixed(2);
    if (minutes == 0){
        return parseInt(x[0]).toFixed(2);
    } else {
        return  (+x[0] + +(+x[1] / 60).toFixed(2));
    }
}

function tabHandler(element){
    element.value = convertHoursFromHHMM(element.value);
}

function addE(){
    try{
        for (var i = 0; i < 10; ++i){
            for (var j = 1; j < 8; ++j){
               	var id = "b_s89_g89s90_row"+i+"_reg_value" + j +"_i";
                var element = content.frames[1].document.getElementById(id);
                // Where is $i at the end?
                element.onblur = function(event){ResetTextBox(this, 'b$s89$g89s90$row'+i+'$reg_value' + j, false, false, 'white');
                                            tabHandler(this)};
                //Works without +i+, wtf?
                element.onkeypress = function(event){DoubleMask(event,'b$s89$g89s90$row0$reg_value'+j+'$i','(^-?\\d{0,4}$)|(^-?\\d{0,4}\\.{1}\\d{0,2}$)|(^-?((\\d{0,3}\\,{1}\\d{0,3})+)$)|(^-?((\\d{0,3}\\,{1}\\d{0,3})+)\\.{1}\\d*$)',false);};
//                element.onkeypress = function(event){DoubleMask(event,'b$s89$g89s90$row'+i+'$reg_value'+j,'(^-?\\d{0,4}$)|(^-?\\d{0,4}\\.{1}\\d{0,2}$)|(^-?((\\d{0,3}\\,{1}\\d{0,3})+)$)|(^-?((\\d{0,3}\\,{1}\\d{0,3})+)\\.{1}\\d*$)',false);};
            }
        }
    } catch(e) {
	    alert(e);
    }
}

//content.frames[1].document.onkeydown = function(e){tabHandler(e)};
content.frames[1].document.onclick = addE;
