//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches
var failTimes = 0;


var timelimit = 60000;	//	ms
var alerttime = 10000;
var timer;
var pretime=0;
var answercnt=0;
var confirmflag=true; // 是否提交答案的标志
var datatosubmit = {
		"startTime":new Date().getTime(),
		"endTime":null,   
		"round":0,	
		"problemIdList":[],		//id list
		"items":[],		//答案
		"times":[]		//用时
};
// 意义合在？点击时计算消耗时间？
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
$(document).ready(function(){
	// alert("成功转向答题网页！");
	$.ajaxSettings.traditional = true;	
	getRefreshQuality();
	
	// 选项
	$(".option-p").live("click",function(){
		$(this).siblings("input").attr("checked","checked");
	})
	// next 下一题
	$(".next").live("click",function(){
		//上一题答题耗时
		var timeconsume = pretime - timelimit;
		pretime = timelimit;
		var type,answer="",id;
		type = $(this).parents("fieldset").attr("type");
		id = $(this).parents("fieldset").attr("id");
		if(type == "0" || type == 0){
			//alert("单项选择题!");
			answer = $("input[name='"+id+"']:checked").val();
		}else if(type == "1" || type == 1){
			//alert("多项选择题，请至少选择两项！");
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
			// startTime取值没问题
		//	alert("答题开始时间："+datatosubmit.startTime);
		// alert("答题消耗时间："+(datatosubmit.endTime-datatosubmit.startTime));
			console.log(1111,datatosubmit);
			
			submit(datatosubmit);
			confirmflag=false;
					
		}
		/*
		 * //刷新导致，并不起作用，页面离开其他代码执行不了。
		if(confirmflag){
			window.onunload=function(){
				 {		
					clearInterval(timer);
					datatosubmit.endTime = new Date().getTime();
					submit(datatosubmit); 
					 }
				 }
			}*/
		
			
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
			// this comes from the custom easing plugin
			easing: 'easeInOutBack'
		});
	});
	
	/* $(".submit").live("click",function(){
		clearInterval(timer);
		datatosubmit.endTime = new Date().getTime();
		var timeconsume = pretime - timelimit;
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
		}else if(type == "2" || type == 2){
			answer = $("textarea[name='"+id+"']").val();
		}
		datatosubmit.problemIdList.push(id);
		datatosubmit.items.push(answer);
		datatosubmit.times.push(timeconsume/1000);
		console.log(datatosubmit);
		
		$.ajax({
			url:'submitAnswer.action',
			data:datatosubmit,
			dataType:"json",
			type:"POST",
			success:function(data){
				console.info(data);
			},
			error:function(){
				alert("submit error");
			}
		})
	});
	*/
	
});

//刷新事件监听

window.onbeforeunload=function(){
			if(confirmflag){
				event.returnValue="您还未提交答案，是否退出当期页面？";
			}
	
	
}; 

// 倒计时展示与提醒,timelimit为毫秒数
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
		submit(datatosubmit);
	}  
} 

/*
//监听刷新事件
	var DispClose = true; 
function CloseEvent() { 
	if (DispClose) { 
		return "您正在离开答题界面，继续将提交本次答题"; 
	} 
}
function UnLoadEvent() { 
	DispClose = false;
	datatosubmit.round +=1;
	submit(datatosubmit);
	//在这里处理关闭页面前的动作 
} 
function isSubmitByUncompleted(){
	var conf=confirm("您正在刷新答题界面，将提交本次答题");
	if(conf==true){
		//提交答题结果
		submit(datatosubmit);
		
	}
	
	else{
		//留在原地
		return false;
	
	}
}*/
//获取题目
function getTasks(){
	// alert("获得题目");
	$.ajax({
		url:'getQuiz.action',
		data:{},
		dataType:"json",
		type:"POST",
		cache:false,
		success:function(data){
			// alert("成功获得题目");		
			
			pretime = data.timeLimit * 1000;
			timelimit = data.timeLimit * 1000;
			// pretime = 10000;
			// timelimit = 10000; 
			// alert("当前所处轮次：\t"+data.round);
			 // 为何又在这里加权限？？
			/* if(data.round > 3){
				window.location.href="home.jsp";
			}else{ */
				createTaskBox(data.problems);
		//	}
		},
		error:function(){
//			console.log("fail");
			clearInterval(timer);   
			alert('获取题目失败,请重试！');
		}
	});	
}

function createTaskBox(data){
	
	

	//创建答题框
	//alert("创建答题框"+data.length);
	var fieldsetq="",fieldseth="",z,options,listr="",classname="next",value="Next",aftersubmit="";
	var taskRequirement="",taskBackground="",posBack=-1,posReq=-1,mediaBack="",mediaReq="",mediatagBack="",mediatagReq="";
	
	for(var i = 0,len = data.length; i<len; i++){
		fieldsetq="";
		fieldseth="";
		listr="";
		if(data[i].items.indexOf(";") != -1){
			options = data[i].items.split(";");
		}else if(data[i].items.indexOf("；") != -1){
			options = data[i].items.split("；");
		}else if(data[i].items.indexOf("，") != -1){
			options = data[i].items.split("，");
		}else if(data[i].items.indexOf(",") != -1){
			options = data[i].items.split(",");
		}
		
		if(i == data.length -1){
			classname = "next submit";
			value = "Submit";
		}
		
		/*taskBackground = data[i].taskBackground;
		pos1 = taskBackground.lastIndexof("{");
		if(pos1 != -1){
			media1 = taskBackground.substring(pos1+1,taskBackground.length-1);	//抽取文件名
			//	console.info(media);
				if(data[i].resourceType == 1 || data[i].resourceType == "1"){	//jpg
					//mediatag =	'<img class="pic-file" src="media/'+media+'.jpg"/>';
					mediatag1 =	'<img src="media/'+media1+'.jpg"/>';
				}else if(data[i].resourceType == 2 || data[i].resourceType == "2"){	//mp3
					mediatag1 = '<audio id="audio'+data[i].id+'" controls="controls" height="100" width="100">'+
						  			'<source src="media/'+media1+'.mp3" type="audio/mp3" />'+
						  			'<source src="media/'+media1+'.mp3" type="audio/ogg" />'+
						  			'<embed height="100" width="100" src="media/'+media+'.mp3" />'+
						  		'</audio>';
					//video
				}else if(data[i].resourceType == 3 || data[i].resourceType == "3"){
					mediatag1 = '<a href="'+media1+'">'+media1+'</a>';
				}
				taskBackground = taskBackground.substring(0,pos1);			
			}else {				
			mediatag1 = "";
		}*/
		//要求，背景
		taskRequirement = data[i].taskRequirement;
		taskBackground = data[i].taskBackground;
		posBack = taskBackground.lastIndexOf("{");
		if(posBack != -1){	
			mediaBack = taskBackground.substring(posBack+1,taskBackground.length-1);	//抽取文件名
		//	console.info(media);
			if(data[i].resourceType == 1 || data[i].resourceType == "1"){	//jpg
				//mediatag =	'<img class="pic-file" src="media/'+media+'.jpg"/>';
				mediatagBack =	'<img src="media/'+mediaBack+'.jpg"/>';
			}else if(data[i].resourceType == 2 || data[i].resourceType == "2"){	//mp3
				mediatag2 = '<audio id="audio'+data[i].id+'" controls="controls" height="100" width="100">'+
					  			'<source src="media/'+mediaBack+'.mp3" type="audio/mp3" />'+
					  			'<source src="media/'+mediaBack+'.mp3" type="audio/ogg" />'+
					  			'<embed height="100" width="100" src="media/'+mediaBack+'.mp3" />'+
					  		'</audio>';
				//video
			}else if(data[i].resourceType == 3 || data[i].resourceType == "3"){
				mediatagBack = '<a href="'+mediaBack+'" target="_blank">'+mediaBack+'</a>';
			}
			taskBackground = taskBackground.substring(0,posBack);
		}else {				
			mediatagBack = "";
		}
		
		posReq = taskRequirement.lastIndexOf("{");
			if(posReq != -1){	
				mediaReq = taskRequirement.substring(posReq+1,taskRequirement.length-1);	//抽取文件名
			//	console.info(media);
				if(data[i].resourceType == 1 || data[i].resourceType == "1"){	//jpg
					//mediatag =	'<img class="pic-file" src="media/'+media+'.jpg"/>';
					mediatagReq =	'<img src="media/'+mediaReq+'.jpg"/>';
				}else if(data[i].resourceType == 2 || data[i].resourceType == "2"){	//mp3
					mediatagReq = '<audio id="audio'+data[i].id+'" controls="controls" height="100" width="100">'+
						  			'<source src="media/'+mediaReq+'.mp3" type="audio/mp3" />'+
						  			'<source src="media/'+mediaReq+'.mp3" type="audio/ogg" />'+
						  			'<embed height="100" width="100" src="media/'+mediaReq+'.mp3" />'+
						  		'</audio>';
					//video
				}else if(data[i].resourceType == 3 || data[i].resourceType == "3"){
					mediatagReq = '<a href="'+mediaReq+'" target="_blank">'+mediaReq+'</a>';
				}
				taskRequirement = taskRequirement.substring(0,posReq);
			}else {				
				mediatagReq = "";
			}
		
		
	switch(data[i].subjectType){	
		case 0:		//单选
			fieldsetq = '<fieldset type="0" id="'+data[i].id+'">'+
							'<h2 class="fs-title task-bg">任务背景：'+taskBackground+'</h2>'+
							mediatagBack+
							'<h3 class="fs-subtitle task-rule">任务要求：'+taskRequirement+'</h3>'+
							mediatagReq+
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
							'<h2 class="fs-title task-bg">任务背景：'+taskBackground+'</h2>'+
							mediatagBack+
							'<h3 class="fs-subtitle task-rule">任务要求：'+taskRequirement+'</h3>'+
							mediatagReq+
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
							'<h2 class="fs-title task-bg">任务背景：'+taskBackground+'</h2>'+
							mediatagBack+
							'<h3 class="fs-subtitle task-rule">任务要求：'+taskRequirement+'</h3>'+
							mediatagReq+
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

function getRefreshQuality(){
	var refreshCnt = 0,round = 0,userId=0,Allowedsecondary=-1;	
	
	$.ajax({
		url:'getCurrentUser.action',
		data:{},
		dataType:"json",
		type:"POST",
		success:function(data){
			userId = data.id;
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
			//复赛时round一律为2
			round = data.round;	
			
			Allowedsecondary=data.allowedSecondary; 
			var nowDate = new Date().getTime();
		 	// SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			var date1 = new Date("2017/9/18 00:00:00").getTime();
		 	var date2 = new Date("2017/9/21 00:00:00").getTime();
		 	var date3 = new Date("2017/9/25 00:00:00").getTime();
		 	var date4 = new Date("2017/9/25 21:00:00").getTime();
		 	var day1 = date1 - nowDate;
			var day2 = date2 - nowDate;	
			var day3 = date3 - nowDate;	
			var day4 = date4 - nowDate;	
			/*
			 * if( (parseInt(round) ===  -1) && (parseInt(refreshCnt) === 3) ){
				// 
				alert("请不要频繁刷题，否则您将失去答题资格！");
			}
			*/
			// 给管理员炒鸡权限
			if(parseInt(userId) == 1){
				// 设置复赛轮次
				round = 3; 
			}			
			else{
				//设置一个round限制				
				if(day1>0){
					alert("初赛还未开放！");
					window.location.href="home.jsp";
					return ;
				}
				else if(day2>=0){
					// round++
					if(parseInt(round) ===  -1){
						//未参加比赛， 轮次设为初赛第一轮
						if(parseInt(refreshCnt) >= 4){
							alert("您刷题次数过多，已失去答题资格！");
							window.location.href="home.jsp";
							return ;
						}
						round = 1;
						alert("请不要频繁刷题，否则您将失去答题资格！");
					}
					else if(parseInt(round) ===  1){
						// 已参加第一次比赛，刷新次数审查，审查通过轮次设为2
						if(parseInt(refreshCnt) === 5){
							alert("请不要频繁刷题，否则您将失去答题资格！");				
							
							}
							else if (parseInt(refreshCnt) >= 6){
								alert("您刷题次数过多，已失去答题资格！");
								window.location.href="home.jsp";
								return ;
							}						
						round ++;
						alert("请不要频繁刷题，否则您将失去答题资格！");
						
					}
					/* else if( parseInt(round) ===  2 ){
						// 已完成第二次初赛，审查刷新次数，此处
						if(parseInt(refreshCnt) === 5){
						alert("请不要频繁刷题，否则您将失去答题资格！");				
						
						}
						else if (parseInt(refreshCnt) >= 6){
							alert("您刷题次数过多，已失去答题资格！");
							window.location.href="home.jsp";
							return ;
						}
						round++;
					}*/
					
					else if((parseInt(round) >= 2)){
						alert("复赛还未开放！");
						window.location.href="home.jsp";
						return ;
					}
				}
				else if(day3>0){
					alert("复赛还未开放！");
					window.location.href="home.jsp";
					return ;
				}
				else if(day3<=0&&day4>=0){
					//复赛开放,禁止未完成初赛1轮的人参加复赛，
					if(parseInt(round) === -1){
						alert("无复赛资格！");
						window.location.href="home.jsp";
						return;
					}
					//
					else if(parseInt(round) === 1 || parseInt(round) === 2){
						//检查复赛权限，是否允许复赛
						if(Allowedsecondary === 1){
							//可以进入复赛，设置轮次为3
							// 刷新次数审查，不允许刷新，复赛前可以手动设置数据库所有人员刷新次数为0							
							if(parseInt(refreshCnt) >= 1){
								alert("您刷题次数过多，已失去答题资格！");
								window.location.href="home.jsp";
								return ;
							}
							alert("复赛不允许刷新，未完成答题请勿离开！");
							round = 3;
						}else{
							// 不能进入复赛
							alert("无复赛资格！");
							window.location.href="home.jsp";
							return;
						}
						
					}else if((parseInt(round) === 3)){
					alert("已完成复赛！");
					window.location.href="home.jsp";
					return ;
				}
				}
				else {
					alert("复赛已经结束！");
					window.location.href="home.jsp";
					return ;
				}
			}
			
			
			
			getTasks();
			datatosubmit.round = round;	
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

function submit(datatosubmit){
	$.ajax({
		url:'submitAnswer.action',
		data:datatosubmit,
		dataType:"json",
		type:"POST",
		async:false,
		success:function(data){
//			console.info(data);
			var txt="";
			if(parseInt(data.nextRound) > 3){
				txt = "已完成所有比赛";
			}else if(parseInt(data.nextRound)==3){
				txt = "复赛";
			}
			else{
				txt = "初赛第"+data.nextRound+"轮";
			}
			$(".next-round").text(txt);
			$(".subject-score").text(data.subjectScore);
			$(".sum-score").text(handleLongFloat(data.sumScore));
			$(".sum-time").text(data.sumTime);
			$(".time-score").text(handleLongFloat(data.timeScore));
			return true;
		},
		error:function(){
			alert("提交失败，请不要退出本页，联系工作人员提交成绩");
			/*//等待十秒之后自动提交
			if(failTimes<6){
				failTimes++;
				sleep(10000);
				submit(datatosubmit);
			}*/
			
			return false;
		}
	});
}

function sleep(n){
	var start = new Date().getTime();
	while(true){
		if(new Date().getTime()-start>n){
			break;
		}
	}
}