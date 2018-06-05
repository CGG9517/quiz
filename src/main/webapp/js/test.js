//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

var timelimit = 60000;	//	ms
var alerttime = 10000;
var timer;
var pretime=0;
var datatosubmit = {
		"startTime ":new Date().getTime(),
		"endTime":null,
		"round":0,	
		"problemIdList":[],		//id list
		"items":[],		//答案
		"times":[]		//用时
};

var outFlag = false,s_leavetime = 0,e_leavetime = 0;
function mouseOverFun(){
	if(getOs() === "Chrome" || getOs() === "Firefox"){
		if((outFlag === true) && (timelimit>0)){
			e_leavetime = new Date().getTime();
			minus = e_leavetime - s_leavetime;
			timelimit = timelimit - parseInt((minus*7)/8);
			outFlag = false;
		}
		//console.log("over",timelimit);
	}	
}
function mouseOutFun(){
	if(getOs() === "Chrome" || getOs() === "Firefox"){
		if(timelimit > 0){
			outFlag = true;
			s_leavetime = new Date().getTime();
		}
	}
	//console.log("out",timelimit);
} 

function test(page){
	$.ajaxSettings.traditional = true; 
	getRefreshQuality(page,10);
	
	$(".option-p").live("click",function(){
		$(this).siblings("input").attr("checked","checked");
	})
	//next
	$(".next").live("click",function(){
		var timeconsume = pretime - timelimit;
		pretime = timelimit;
		var type,answer="",id;
		type = $(this).parents("fieldset").attr("type");
		id = $(this).parents("fieldset").attr("id");
		if(type == "0" || type == 0){
			answer = $("input[name='"+id+"']:checked").val();
		}else if(type == "1" || type == 1){
			$("input[name='"+id+"']:checked").each(function(){
				answer += $(this).val()+",";
			});
			answer = answer.substr(0,answer.length-1);
			if((answer == undefined) || (answer == null) || (answer.length < 3) ){
				alert("多项选择题，请至少选择两项！");
				return false;
			}
		}else if(type == "2" || type == 2){
			answer = $("textarea[name='"+id+"']").val();
		}
		if( (answer == undefined) || (answer == null) || (answer.length == 0) ){
			alert("请做出选择！");
			return false;
		}
		datatosubmit.problemIdList.push(id);
		datatosubmit.items.push(answer);
		datatosubmit.times.push(timeconsume/1000);
		
		if(document.getElementById("audio"+id)){
			document.getElementById("audio"+id).pause();
		}
		
		if($(this).hasClass("submit")){
			clearInterval(timer);
			datatosubmit.endTime = new Date().getTime();
//			console.log(1111,datatosubmit);
			$.ajax({
					url:'submitAnswer.action',
					data:datatosubmit,
					dataType:"json",
					type:"POST",
					success:function(data){
//						console.info(data);
						var txt="";
						if(parseInt(data.nextRound) > 3){
							txt = "已完成所有比赛";
						}else{
							txt = "第"+data.nextRound+"轮";
						}
						$(".next-round").text(txt);
						$(".subject-score").text(data.subjectScore);
						$(".sum-score").text(handleLongFloat(data.sumScore));
						$(".sum-time").text(data.sumTime);
						$(".time-score").text(handleLongFloat(data.timeScore));
					},
					error:function(){
						alert("提交失败，请稍后重试！");
						return false;
					}
				})
		}
		
		if(animating) return false;
		animating = true;		
		current_fs = $(this).parent();
		next_fs = $(this).parent().next();		
		//activate next step on progressbar using the index of next_fs
		$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");		
		//show the next fieldset
		next_fs.show(); 
		//hide the current fieldset with style
		current_fs.animate({opacity: 0}, {
			step: function(now, mx) {
				//as the opacity of current_fs reduces to 0 - stored in "now"
				//1. scale current_fs down to 80%
				scale = 1 - (1 - now) * 0.2;
				//2. bring next_fs from the right(50%)
				left = (now * 50)+"%";
				//3. increase opacity of next_fs to 1 as it moves in
				opacity = 1 - now;
				current_fs.css({'transform': 'scale('+scale+')'});
				next_fs.css({'left': left, 'opacity': opacity});
			}, 
			duration: 700, 
			complete: function(){
				current_fs.hide();
				animating = false;
			}, 
			//this comes from the custom easing plugin
			easing: 'easeInOutBack'
		});
	});
}

//倒计时展示与提醒,timelimit为毫秒数
function CountDown(){  
	var minutes,seconds,millionsec,msg;
	if(timelimit > 0){   
		minutes = Math.floor(timelimit/60000);   
		if(minutes<10){
			minutes = "0" + minutes;
		}
		seconds = Math.floor((timelimit%60000)/1000);   
		if(seconds<10){
			seconds = "0" + seconds;
		}
		millionsec = Math.floor(((timelimit%6000)%1000)/100);
		
		msg = minutes+":"+seconds+":"+millionsec; 		
		$("#clock").text(msg);
		
		if(timelimit/1000 == alerttime){
			alert('请注意，距离结束还有'+alerttime+'秒！');  
		} 
		timelimit = timelimit - 100;   
	}   
	else{
		alert("时间到，自动提交答案!");   
		clearInterval(timer); 
		
		var timeconsume = pretime - timelimit;
		pretime = timelimit;
		var type,answer="",id;
		var index = $("#progressbar li.active").length;
		var $curObj = $("fieldset:eq("+(index-1)+")");
		type = $curObj.attr("type");
		id = $curObj.attr("id");
		if(type == "0" || type == 0){
			answer = $("input[name='"+id+"']:checked").val();
		}else if(type == "1" || type == 1){
			$("input[name='"+id+"']:checked").each(function(){
				answer += $(this).val()+",";
			});
			answer = answer.substr(0,answer.length-1);
		}else if(type == "2" || type == 2){
			answer = $("textarea[name='"+id+"']").val();
		}
		if( (answer == undefined) || (answer == null) || (answer.length == 0) ){
			
		}else{
			datatosubmit.problemIdList.push(id);
			datatosubmit.items.push(answer);
			datatosubmit.times.push(timeconsume/1000);
		}
		if(document.getElementById("audio"+id)){
			document.getElementById("audio"+id).pause();
		}
		datatosubmit.endTime = new Date().getTime();
		$.ajax({
				url:'submitAnswer.action',
				data:datatosubmit,
				dataType:"json",
				type:"POST",
				success:function(data){
					var txt="";
					if(parseInt(data.nextRound) > 3){
						txt = "已完成所有比赛";
					}else if(parseInt(data.nextRound) === 3){
						txt = "第"+data.nextRound+"轮,初赛已结束";
					}else{
						txt = "第"+data.nextRound+"轮";
					}
					$(".next-round").text(txt);
					$(".subject-score").text(data.subjectScore);
					$(".sum-score").text(handleLongFloat(data.sumScore));
					$(".sum-time").text(data.sumTime);
					$(".time-score").text(handleLongFloat(data.timeScore));
					
					$("fieldset").hide();
					$(".after-submit").show();
				},
				error:function(){
					alert("提交失败，请稍后重试！");
					return false;
				}
			});
	}  
}   
	  
//获取题目
function getTasks(start,count){
	alert('getQuizAllProblems.action?start='+ start +'&count=' +count);
	$.ajax({
		url:'getQuizWithProblems.action?start='+ start +'&count=' +count ,
		data:{},
		dataType:"json",
		type:"POST",
		cache:false,
		success:function(data){
			
			datatosubmit.round = data.round;
			pretime = data.timeLimit * 1000;
			timelimit = data.timeLimit * 1000;
//			pretime = 10000;
//			timelimit = 10000; 
	//		if(data.round === 3){
		//		window.location.href="home.jsp";
			//}else{
				alert("成功！,将创建答题标签");
				createTaskBox(data.problems);
		//	}
		},
		error:function(){
//			console.log("fail");
			clearInterval(-1);   
			alert('获取题目失败,请重试！');
		}
	});	
}

function createTaskBox(data){
	//alert("创建答题标签");
	var fieldsetq="",fieldseth="",z,options,listr="",classname="next",value="Next",aftersubmit="";
	var taskRequirement="",pos=-1,media="",mediatag="";
	alert("答题列表长度:\t"+data.length);
	for(var i = 0,len = data.length; i<len; i++){
		fieldsetq="";
		fieldseth="";
		listr="";
		if(data[i].items.indexOf(";") != -1){
			options = data[i].items.split(";");
		}else if(data[i].items.indexOf("；") != -1){
			options = data[i].items.split("；");
		}else{
			options = data[i].items.split(",");
		}
		if(i == data.length -1){
			classname = "next submit";
			value = "Submit";
		}
		taskRequirement = data[i].taskRequirement;
		pos = taskRequirement.lastIndexOf("[");
		if(pos != -1){	
			media = taskRequirement.substring(pos+1,taskRequirement.length-1);	//抽取文件名
		//	console.info(media);
			if(data[i].resourceType == 1 || data[i].resourceType == "1"){	//jpg
				mediatag =	'<img class="pic-file" src="media/'+media+'.jpg"/>';
			}else if(data[i].resourceType == 2 || data[i].resourceType == "2"){	//mp3
				mediatag = '<audio id="audio'+data[i].id+'" controls="controls" height="100" width="100">'+
					  			'<source src="media/'+media+'.mp3" type="audio/mp3" />'+
					  			'<source src="media/'+media+'.mp3" type="audio/ogg" />'+
					  			'<embed height="100" width="100" src="media/'+media+'.mp3" />'+
					  		'</audio>';
			}else{	// video not processed
				mediatag = "";
			}
			taskRequirement = taskRequirement.substring(0,pos);
		}else{
			mediatag = "";
		}
		switch(data[i].subjectType){	
		case 0:		//单选
			fieldsetq = '<fieldset type="0" id="'+data[i].id+'">'+
							'<h2 class="fs-title task-bg">任务背景：'+data[i].taskBackground+'</h2>'+
							'<h3 class="fs-subtitle task-rule">任务要求：'+taskRequirement+'</h3>'+
							mediatag+
						    '<div class="slide-container">'+
//						        '<div class="question">What is jQuery?</div>'+
						        '<ul class="answers">';
			fieldseth = '</ul></div><input type="button" name="next" class="'+classname+' action-button" value="'+value+'" /></fieldset>';
			for(z = 0; z < options.length; z++){
				listr += '<li class="option-li">'+
			            	'<input type="radio" name="'+data[i].id+'" value="'+(z+1)+'"/>'+
			            	'<p class="option-p">'+options[z]+'</p>'+
			            '</li>';
			}
			$(".fieldsets").append(fieldsetq + listr + fieldseth);
			break;
		case 1:		//多选
			fieldsetq = '<fieldset type="1" id="'+data[i].id+'">'+
							'<h2 class="fs-title task-bg">任务背景：'+data[i].taskBackground+'</h2>'+
							'<h3 class="fs-subtitle task-rule">任务要求：'+taskRequirement+'</h3>'+
							mediatag+
						    '<div class="slide-container">'+
//							    '<div class="question">What is jQuery?</div>'+
						        '<ul class="answers">';
			fieldseth = '</ul></div><input type="button" name="next" class="'+classname+' action-button" value="'+value+'" /></fieldset>';
			for(z = 0; z < options.length; z++){
				listr += '<li class="option-li">'+
			            	'<input type="checkbox" name="'+data[i].id+'" value="'+(z+1)+'"/>'+
			            	'<p class="option-p">'+options[z]+'</p>'+
			            '</li>';
			}
			$(".fieldsets").append(fieldsetq + listr + fieldseth);
			break;
		case 2:		//问答
			fieldseth = '<fieldset type="2" id="'+data[i].id+'">'+
							'<h2 class="fs-title task-bg">任务背景：'+data[i].taskBackground+'</h2>'+
							'<h3 class="fs-subtitle task-rule">任务要求：'+taskRequirement+'</h3>'+
							mediatag+
						    '<div class="slide-container">'+
//						        <div class="question">What is jQuery?</div>
						        '<textarea class="answer-area"></textarea>'+
						    '</div>'+
							'<input type="button" name="next" class="'+classname+' action-button" value="'+value+'" />'+
						'</fieldset>';
			$(".fieldsets").append(fieldsetq);
			break;
		case 3:
			break;
		}
	}
	aftersubmit = '<fieldset class="after-submit">'+
						'<p><span class="left-wid">下一轮：</span><span class="rcss next-round"></span></p>'+
						'<p><span class="left-wid">答题用时（秒）：</span><span class="rcss sum-time"></span></p>'+
						'<p><span class="left-wid">用时得分：</span><span class="rcss time-score"></span></p>'+
						'<p><span class="left-wid">答题得分：</span><span class="rcss subject-score"></span></p>'+
						'<p><span class="left-wid">总分：</span><span class="rcss sum-score"></span></p>'+
						'<a class="action-button" href="home.jsp">回主页</a></fieldset>';
	$(".fieldsets").append(aftersubmit);
}

//num float
function handleLongFloat(num){
	var s = num + "";	//to str
	var p = s.indexOf(".");
	var xiaoshu;
	if( p == -1){	//integer
		return num;
	}else{
		xiaoshu = s.split(".")[1];
//		console.log(xiaoshu,xiaoshu.length,p);
		if(xiaoshu.length > 3){
			s = s.substring(0,p+4);
		}
		return parseFloat(s);
	}
}

function getRefreshQuality(start,count){
	var refreshCnt = 0,round = 0;
	$.ajax({
		url:'getCurrentUser.action',
		data:{},
		dataType:"json",
		type:"POST",
		success:function(data){
			if( data.refreshCnt === null){
				refreshCnt = 0;
			}else{
				refreshCnt = data.refreshCnt;
			}
		}
	});	
	
	$.ajax({
		url:'getCurrentUserStatus.action',
		data:{},
		dataType:"json",
		type:"POST",
		success:function(data){
			round = data.round;
//			if( (parseInt(round) ===  -1) && (parseInt(refreshCnt) === 3) ){
//				alert("请不要频繁刷题，否则您将失去答题资格！");
//			}
//			if( (parseInt(round) ===  -1) && (parseInt(refreshCnt) >= 4) ){
//				alert("您刷题次数过多，已失去答题资格！");
//				window.location.href="home.jsp";
//				return ;
//			}
//			if( (parseInt(round) ===  1 )&& (parseInt(refreshCnt) === 5) ){
//				alert("请不要频繁刷题，否则您将失去答题资格！");
//				
//			}
//			if( (parseInt(round) ===  1) && (parseInt(refreshCnt) >= 6) ){
//				alert("您刷题次数过多，已失去答题资格！");
//				window.location.href="home.jsp";
//				return ;
//			}
			getTasks(start,count);
			timer = setInterval(CountDown,100);
		}
	});	
}

function getOs(){
	   if(navigator.userAgent.indexOf("MSIE")>0) {
	        return "MSIE";
	   }
	   if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){
	        return "Firefox";
	   }
	   if(navigator.userAgent.indexOf("Chrome")>0){
	       return "Chrome";
	   }
	   if(isSafari=navigator.userAgent.indexOf("Safari")>0) {
	        return "Safari";
	   } 
	   if(isCamino=navigator.userAgent.indexOf("Camino")>0){
	        return "Camino";
	   }
	   if(isMozilla=navigator.userAgent.indexOf("Gecko/")>0){
	        return "Gecko";
	   }
	   if(isMozilla=navigator.userAgent.indexOf("Opera/")>0){
	       return "Opera";
	   }
	}