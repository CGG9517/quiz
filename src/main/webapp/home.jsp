<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ page import="java.text.*"%>
<!DOCTYPE HTML>
<html>
  <head>    
    <title>个人主页</title>    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel='stylesheet' href='css/base.css' />
	<link rel='stylesheet' href='css/home.css' />

	<script type="text/javascript" src="js/base/jquery-1.8.3.js"></script>
  </head>
  <body>
  	
    <div id="base" class="base">
    	<div class="header">
    		<p><span class="left-descrip">欢迎你，</span><span class="right-span user-name"></span>&nbsp;<a href="/logout.action">退出</a></p>
    	</div>
    
		<!--个人资料显示-->
		<div class="title">个人主页</div>
		<div class="msg-show">
			<img id="u0_img" class="img " src="images/login/u8.png">
			<div class="data-box">
				<div class="data-cell">
					<span class="left-wid">姓名：</span>
					<span class="right-span chinese-name"></span>
				</div>
				<div class="data-cell">
					<span class="left-wid">学校：</span>
					<span class="right-span school-name"></span>
				</div>
				<div class="data-cell">
					<span class="left-wid">学院：</span>
					<span class="right-span institute-name"></span>
				</div>
				<div class="data-cell">
					<span class="left-wid">专业：</span>
					<span class="right-span major-name"></span>
				</div>
				<div class="data-cell">
					<span class="left-wid">联系方式：</span>
					<span class="right-span phone-name"></span>
				</div>
				<div class="data-cell">
					<span class="left-wid">电子邮箱：</span>
					<span class="right-span mail-name"></span>
				</div>
				<div class="data-cell">
					<span class="left-wid">当前状态：</span>
					<span class="right-span curstatus-name"></span>
				</div>
				
				<div class="data-cell round11">
					<span class="left-wid">初赛首轮得分：</span>
					<span class="right-span round11-score"></span>
				</div>
				<div class="data-cell round12">
					<span class="left-wid">初赛次轮得分：</span>
					<span class="right-span round12-score"></span>
				</div>
				<div class="data-cell round1">
					<span class="left-wid">初赛得分：</span>
					<span class="right-span round1-score"></span>
				</div>
				<div class="data-cell round2">
					<span class="left-wid">复赛得分：</span>
					<span class="right-span round2-score"></span>
				</div>
				<div class="data-cell rank-div">
					<span class="left-wid">当前复赛排名：</span>
					<span class="right-span rank-no"></span>
				</div>
				
				<div class="button-area">
					<input id="back-to-index" class="btn_submit" type="button" value="回首页" onclick="window.location.href='index.jsp'"/>
				</div>
			</div>
		</div>
</div>

 <script language="JavaScript" type="text/javascript">
	var rank = -1;
  			$.ajax({
					url:'getCurrentUser.action',
					data:{},
					dataType:"json",
					type:"POST",
					success:function(data){ //在回调函数里面填充个人资料的各个属性值
						$(".chinese-name").text(data.chinesename);
						$(".school-name").text(data.school);
						$(".institute-name").text(data.institute);
						$(".major-name").text(data.major);
						$(".phone-name").text(data.phone);
						$(".mail-name").text(data.mail);
						$(".user-name").text(data.username);
					},
					error:function(){
						alert("获取信息失败，请稍后重试！");
					}
				});
		$.ajax({
				url:'getCurrentUserStatus.action',
				data:{},
				dataType:"json",
				type:"POST",
				success:function(data){//在回调函数中填充当前用户的状态信息和相应动作
					var txt="",max=0,isBtnShow=false;

					// var btn = '<input id="u24_input" class="btn_submit" type="button" value="开始答题" onclick="window.location.href=&quot;myquiz.jsp&quot;"/>';
					var btn = '<input id="u24_input" class="btn_submit" type="button" value="开始答题" onclick="startQuiz()"/>';
					var nowDate = new Date().getTime();
				 	// SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
				 	var date1 = new Date("2017/9/18 00:00:00").getTime();
				 	var date2 = new Date("2017/9/20 23:59:59").getTime();
				 	var date3 = new Date("2017/9/25 00:00:00").getTime();
				 	var date4 = new Date("2017/9/25 21:00:00").getTime();
				 	var day1 = (date1 - nowDate);
					var day2 = (date2 - nowDate);	
					var day3 = (date3 - nowDate);	
					var day4 = (date4 - nowDate);	

					// 重写
					var round = data.round;
					var scores = data.scores; // Map<Integer, List<Double>>
					for (var i=1; i<=round; i++)
					{
                        var roundScores = scores.get(i);
					}



				 	if(day1>0){
						txt = "等待初赛开放";
						isBtnShow = true;
						
					}else if(day2>=0){
						switch(parseInt(data.round)){		
						
						case -1:				
														
								txt = "未答题";
								isBtnShow = true;
								break;							
													
						case 1:							
							switch(parseInt(data.allowedSecondary)){
								case 0:
									txt = "待完成初赛次轮";
									isBtnShow = true;
									break;
								case 1:
									txt = "待完成复赛";
									isBtnShow = true;
									break;
							}							
							score[0] = handleLongFloat(score[0]);
							$(".round11").show();
							$(".round11-score").text(score[0]);
							$(".round1").show();
							$(".round1-score").text(score[0]);
							break;
						case 2:
							switch(parseInt(data.allowedSecondary)){
								case 0:
									txt = "初赛未通过";
									isBtnShow = false;
									break;
								case 1:
									txt = "待完成复赛";
									isBtnShow = true;
									break;
								//
								default:
									txt = "已完成初赛，等待复赛开放";
									isBtnShow = true;
							}
						//	txt = "待完成决赛";
						if(score.length == 1){
							score[0] = handleLongFloat(score[0]);	
							$(".round11").show();
							$(".round11-score").text(score[0]);
							$(".round12").show();
							$(".round12-score").text(0);
							$(".round1").show();
							max = score[0];
							
						}else{
							score[0] = handleLongFloat(score[0]);	
							$(".round11").show();
							$(".round11-score").text(score[0]);
							$(".round12").show();
							
							$(".round12-score").text(score[1]);
							$(".round1").show();
							max = score[0] > score[1] ? score[0] : score[1];						
								
						}
						$(".round1-score").text(max);
						//		isBtnShow = compare();
								break;
						
							/* score[0] = handleLongFloat(score[0]);	
							$(".round11").show();
							$(".round11-score").text(score[0]);
							$(".round12").show();
							if(score[1]!=null){
								$(".round12-score").text(score[1]);
								$(".round1").show();
								max = score[0] > score[1] ? score[0] : score[1];	
							}else{
								$(".round12-score").text(0);
								$(".round1").show();
								max = score[0];
							}
							
							$(".round1-score").text(max);
					//		isBtnShow = compare();
							break; */
						case 3:
							txt = "已完成复赛";
							score[0] = handleLongFloat(score[0]);
							score[1] = handleLongFloat(score[1]);
							score[2] = handleLongFloat(score[2]);
							$(".round11").show();
							$(".round11-score").text(score[0]);
							$(".round12").show();
							$(".round12-score").text(score[1]);
							$(".round1").show();
							max = score[0] > score[1] ? score[0] : score[1];
							$(".round1-score").text(max);
							$(".round2").show();
							$(".round2-score").text(score[2]);
							isBtnShow = true;
							break;
						}
					}else if(day3>0){
						txt = "等待复赛开放";
						isBtnShow = true;
						console.log(score.length==1);
						if(score.length==0){
							$(".round11").show();
							$(".round11-score").text("0");
							$(".round12").show();
							$(".round12-score").text("0");
							$(".round1").show();
							max = "0";
							$(".round1-score").text(max); 
						}
						else if(score.length==1){
							score[0] = handleLongFloat(score[0]);
							$(".round11").show();
							$(".round11-score").text(score[0]);
							$(".round12").show();
							$(".round12-score").text("0");
							$(".round1").show();
							max = score[0];
							$(".round1-score").text(max); 
						}
						else {
							$(".round11").show();
							$(".round11-score").text(score[0]);
							$(".round12").show();
							$(".round12-score").text(score[1]);
							$(".round1").show();
							max = score[0] > score[1] ? score[0] : score[1];
							$(".round1-score").text(max);
						}
						/* score[0] = handleLongFloat(score[0]);
						score[1] = handleLongFloat(score[1]);
						$(".round11").show();
						$(".round11-score").text(score[0]);
						$(".round12").show();
						$(".round12-score").text(score[1]);
						$(".round1").show();
						max = score[0] > score[1] ? score[0] : score[1];
						$(".round1-score").text(max); */
						
						
						
					} else if(day4 > 0){
						switch(parseInt(data.round)){		
						
						case -1:				
														
								txt = "无复赛资格";
								isBtnShow = true;
								if(score.length==0){
									$(".round11").show();
									$(".round11-score").text("0");
									$(".round12").show();
									$(".round12-score").text("0");
									$(".round1").show();
									max = "0";
									$(".round1-score").text(max); 
								}
								else if(score.length==1){
									score[0] = handleLongFloat(score[0]);
									$(".round11").show();
									$(".round11-score").text(score[0]);
									$(".round12").show();
									$(".round12-score").text("0");
									$(".round1").show();
									max = score[0];
									$(".round1-score").text(max); 
								}
								else {
									$(".round11").show();
									$(".round11-score").text(score[0]);
									$(".round12").show();
									$(".round12-score").text(score[1]);
									$(".round1").show();
									max = score[0] > score[1] ? score[0] : score[1];
									$(".round1-score").text(max);
								}			
								
								
								break;							
													
						case 1:	
							switch(parseInt(data.allowedSecondary)){
							case 0:
								txt = "无复赛资格";
								isBtnShow = true;
								break;
							case 1:
								txt = "待完成复赛";
								isBtnShow = true;
								break;
							//
							default:
								txt = "无复赛资格";
								isBtnShow = true;
						}
							/* score[0] = handleLongFloat(score[0]);
							score[1] = handleLongFloat(score[1]);
							$(".round11").show();
							$(".round11-score").text(score[0]); */
							/* $(".round12").show();
							$(".round12-score").text(score[1]);
							$(".round1").show();
							max = score[0] > score[1] ? score[0] : score[1];
							$(".round1-score").text(max); */
					//		isBtnShow = compare();
							if(score.length==0){
								$(".round11").show();
								$(".round11-score").text("0");
								$(".round12").show();
								$(".round12-score").text("0");
								$(".round1").show();
								max = "0";
								$(".round1-score").text(max); 
							}
							else if(score.length==1){
								score[0] = handleLongFloat(score[0]);
								$(".round11").show();
								$(".round11-score").text(score[0]);
								$(".round12").show();
								$(".round12-score").text("0");
								$(".round1").show();
								max = score[0];
								$(".round1-score").text(max); 
							}
							else {
								$(".round11").show();
								$(".round11-score").text(score[0]);
								$(".round12").show();
								$(".round12-score").text(score[1]);
								$(".round1").show();
								max = score[0] > score[1] ? score[0] : score[1];
								$(".round1-score").text(max);
							}							
							break;
							
						case 2:
							switch(parseInt(data.allowedSecondary)){
								case 0:
									txt = "无复赛资格";
									isBtnShow = false;
									break;
								case 1:
									txt = "待完成复赛";
									isBtnShow = true;
									break;
								//
								default:
									txt = "无复赛资格";
									isBtnShow = true;
							}
						//	txt = "待完成决赛";
							/* score[0] = handleLongFloat(score[0]);
							score[1] = handleLongFloat(score[1]);
							$(".round11").show();
							$(".round11-score").text(score[0]);
							$(".round12").show();
							$(".round12-score").text(score[1]);
							$(".round1").show();
							max = score[0] > score[1] ? score[0] : score[1];
							$(".round1-score").text(max); */
					//		isBtnShow = compare();
							if(score.length==0){
								$(".round11").show();
								$(".round11-score").text("0");
								$(".round12").show();
								$(".round12-score").text("0");
								$(".round1").show();
								max = "0";
								$(".round1-score").text(max); 
							}
							else if(score.length==1){
								score[0] = handleLongFloat(score[0]);
								$(".round11").show();
								$(".round11-score").text(score[0]);
								$(".round12").show();
								$(".round12-score").text("0");
								$(".round1").show();
								max = score[0];
								$(".round1-score").text(max); 
							}
							else {
								$(".round11").show();
								$(".round11-score").text(score[0]);
								$(".round12").show();
								$(".round12-score").text(score[1]);
								$(".round1").show();
								max = score[0] > score[1] ? score[0] : score[1];
								$(".round1-score").text(max);
							}
					
					
							break;
						case 3:
							txt = "已完成复赛";
							score[0] = handleLongFloat(score[0]);
							score[1] = handleLongFloat(score[1]);
							score[2] = handleLongFloat(score[2]);
							$(".round11").show();
							$(".round11-score").text(score[0]);
							$(".round12").show();
							$(".round12-score").text(score[1]);
							$(".round1").show();
							max = score[0] > score[1] ? score[0] : score[1];
							$(".round1-score").text(max);
							$(".round2").show();
							$(".round2-score").text(score[2]);
							isBtnShow = true;
							break;
						}
						
					}
					else {		
					
						txt = "敬请期待决赛";
						isBtnShow = true;
						/* score[0] = handleLongFloat(score[0]);
						score[1] = handleLongFloat(score[1]);
						$(".round11").show();
						$(".round11-score").text(score[0]);
						$(".round12").show();
						$(".round12-score").text(score[1]);
						$(".round1").show();
						max = score[0] > score[1] ? score[0] : score[1];
						$(".round1-score").text(max); */
						score[0] = handleLongFloat(score[0]);
						score[1] = handleLongFloat(score[1]);
						score[2] = handleLongFloat(score[2]);
						$(".round11").show();
						$(".round11-score").text(score[0]);
						$(".round12").show();
						$(".round12-score").text(score[1]);
						$(".round1").show();
						max = score[0] > score[1] ? score[0] : score[1];
						$(".round1-score").text(max);
						$(".round2").show();
						$(".round2-score").text(score[2]);
						isBtnShow = true;
					}
					
					
					
					$(".curstatus-name").text(txt);
					if(isBtnShow === true){
						$(".button-area").append(btn);
					}
					
					
				},
				error:function(){
					alert("获取信息失败，请稍后重试！");
				}	
		});
	//	alert("获得排名");
		

		
		$.ajax(
			{
			
			url:'getCurrentUserRank.action',
			data:{},
			dataType:"json",
			type:"POST",
			success:function(data){
				//alert(data.rank);获取所处排名
				rank = data.rank;
				if(data.rank != -1){
					$(".rank-div").show();
					$(".rank-no").text(data.rank+3);
					//$(".rank-div").hide();
				}else{
					$(".rank-div").hide();
				}
			},
			error:function(data){
				alert("获得排名失败");
			}
		});
		function startQuiz(){
			var flag = confirm("是否开始答题，开始答题以后不能中止答题，否则您有可能失去答题资格");
			if(flag==true)
			{
				window.location.href="myquiz.jsp";	
			}
			
			
		}
		
		//日期是在 2017-5-18 之前，还是之后，前为false
		function compare(){
				var t1 = new Date("2017-5-18").getTime();
				var t2 = new Date().getTime();
				return t1<t2;				
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

  </script>
</body>
</html>
