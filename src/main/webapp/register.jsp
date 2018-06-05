<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf8" />
	<meta http-equiv="Expires" content="0" />
	<meta http-equiv="Cache-Control" content="no-cache" />
	<meta http-equiv="Pragma" content="no-cache" />
	<title>百度无限搜索大赛__注册页面</title>
	<link href="css/base.css" rel="stylesheet" type="text/css" />
	<link href="css/style.css" rel="stylesheet" type="text/css" />
	<script src="js/base/jquery-1.8.3.js"></script>
	<script src="js/base/jquery.serializejson.js"></script>
	<script language="javascript" src="js/register.js"></script>
	<script type="text/javascript" >
		function customRegister() {
			$.ajax(
				{
                    type:'post',
                    // url:'register.action',
                    url:'register.action',
                    contentType:'application/json;charset=utf-8',
                    //数据是json串的商品信息
                    data:'{"username":"手机", "id":999}',
                    success:function(data){//返回json结果
                        alert(data.chinesename);
                    }
				}
			)
		}
	</script>
	<!-- 修改在这里和style.css的school-input -->>
	<link href="css/jquery.bigautocomplete.css" rel="stylesheet" type="text/css"/>
	
	<script type="text/javascript" src="js/jquery.bigautocomplete.js"></script>
	<script type="text/javascript" src="js/autoCompletionDemo.js"></script>
</head>

<body>
	<div id="wrap">
	
		<!--表格的Header区域-->
		<div class="head">
			<div class="logotxt"><label class="fb f30">账号设置</label></div>
			<div class="headlink" >
			<a target="_self" href="login.jsp" >>>已注册会员登陆</a></div>
			<div class="clearit"></div>
		</div>
		
		<!--设置登录信息:账号密码-->
		<div class="main">
			<form method="post" name="vForm" >
				<div class="main_top_com">
					<div style="height:34px;"></div>
					<p class="title" style="margin-top:10px;">填写登陆信息<label class="red"><s:actionerror/></label></p>
					<ul class="maintable">
						<li>
							<div class="mt_l"><span class="red">*</span>用户名：</div>
							<div class="mt_r">
								<div class="inputbox">
									<span class="input"><cite><input  id="account" name="username" type="text" maxlength="80" value="" /></cite></span>
								</div>
								<span class="red tip">请输入6-16位的字母或数字</span>
							</div>
						</li>
						<li>
							<div class="mt_l"><span class="red">*</span>登录密码：</div>
							<div class="mt_r">
								<div class="inputbox">
									<span class="input"><cite><input  name="password" type="password"  value="" /></cite></span>
								</div>
								<span class="red tip">请输入6-16位的字母或数字</span>
							</div>
						</li>
						<li>
							<div class="mt_l"><span class="red">*</span>再次输入密码：</div>
							<div class="mt_r">
								<div class="inputbox">
									<span class="input"><cite><input  name="password_re" type="password"  value="" /></cite></span>
								</div>
							</div>
						</li>
					</ul>
				</div>
				
				<!--填写个人真实信息-->
				<div class="main_cen">
					<p class="title">填写个人真实信息<span style="font-size: 70%; color: #FF0000; ">（请放心填写你们的真实信息，你们的个人信息仅用于搜索大赛相关事宜，绝对不会外泄）</span></p>
					<ul class="maintable">
						<li>
							<div class="mt_l"><span class="red">*</span>真实姓名：</div>
							<div class="mt_r">
								<div class="inputbox">
									<span class="input"><cite><input id="name" name="chinesename" type="text" maxlength="80" /></cite></span>
								</div>
								<span class="red tip">请输入您的真实姓名</span>
							</div>
						</li>
						<li>
							<div class="mt_l"><span class="red">*</span>电话：</div>
							<div class="mt_r">
								<div class="inputbox">
									<span class="input"><cite><input id="tel" name="phone" type="text" maxlength="80"  /></cite></span>
								</div>	
								<span class="red tip">请留下您的有效联系方式</span>
							</div>
						</li>
						<li>
							<div class="mt_l"><span class="red">*</span>邮箱：</div>
							<div class="mt_r">
								<div class="inputbox">
									<span class="input"><cite><input id="mail" name="mail" type="text" maxlength="80"  value="" /> </cite></span>
								</div>
								<span class="red tip">请输入有效邮箱</span>
							</div>
						</li>
						<li>
							<!--学校最好使用一个autocomplteList,以便于快速输入-->
							<div class="mt_l"><span class="red">*</span>学校：</div>
							<div class="mt_r">
								
								
								<input name="school" value="请输入学校名称" id="auto_comp" class="school-input" onclick="adaptCSS(this)" />
								
								<span id="mailtip"></span>
								<span class="red tip" style="vertical-align:baseline;">&nbsp;&nbsp;请选择或输入学校全称（没有可供选择的学校请手动输入）</span>
							</div>
						</li>
						<li>
							<div class="mt_l"><span class="red">*</span>院系：</div>
							<div class="mt_r">
								<div class="inputbox">
									<span class="input"><cite>
										<input id="department" name="institute" type="text" maxlength="80" value="" />
									</cite></span>
								</div>
							</div>
						</li>
						<li>
							<div class="mt_l"><span class="red">*</span>专业：</div>
							<div class="mt_r">
								<div class="inputbox">
									<span class="input"><cite>
										<input name="major" type="text" maxlength="80"  value="" />
									</cite></span>
								</div>
							</div>
						</li>

						<li>
							<div class="mt_l"><span class="red"></span>地址：</div>
							<div class="mt_r">
								<div class="inputbox">
									<span class="input"><cite>
										<input name="address" type="text" maxlength="80"  value="" />
									</cite></span>
								</div>
						</div>
						</li>
						<li>
							<div class="mt_l"><span class="red"></span>QQ号码：</div>
							<div class="mt_r">
								<div class="inputbox">
									<span class="input"><cite>
										<input name="qq" type="text" maxlength="80"  value="" />
									</cite></span>
								</div>
							</div>
						</li>
					</ul>
					<!--动作按钮-->
					<ul class="maintable">
						<li>
							<div class="mt_l"></div>
							<div class="mt_r">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<input class="btn_submit" id="Submit" onclick="submitRegister()" readonly="readonly" value="提交" />&nbsp;&nbsp;&nbsp;&nbsp;
								<%--<input class="btn_submit" id="Submit" onclick="customRegister()" readonly="readonly" value="提交" />&nbsp;&nbsp;&nbsp;&nbsp;--%>
								<input type="reset" class="btn_submit" value="重置" />
							</div>
						</li>
					</ul>
					
				</div>
				
				<div class="main_bottom"></div>
			</form>
		</div>
		<div class="Footer">
			<p>备注：本次第十一届“百度无限”全国高校信息搜索大赛解释权归武汉大学信息素养协会所有</p>
			<p>Copyright &copy; 2017武汉大学信息素养协会技术部 版权所有</p>
		</div>
	</div>
</body>
</html>