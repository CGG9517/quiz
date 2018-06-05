<%@ page language="java" import="java.util.*" pageEncoding="utf8"%>
<!DOCTYPE html>
<html>
<!--该页面需要改进-->
<!--如果用户已经登录，那么不显示该页面。而是直接将用户引导至真正的业务之中-->
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>百度无限搜索大赛</title>
	<link href="css/base.css" rel="stylesheet" type="text/css" />
	<link href="css/login.css" rel="stylesheet" type="text/css" />
	<script src="js/base/jquery-1.8.3.js"></script>
	<script src="js/login.js"></script>
</head>
<body topmargin="0" oncontextmenu="return false" onselectstart="return false" ondragstart="return false">
	<div align="center">
		<div class="back">
			<div class="title">用户登录</div>
			<form name="FrontPage_Form1" method="POST">
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td valign="top" style="height:400px;">
						<table width="70%" border="0" cellspacing="0" cellpadding="0" style="margin:0 auto;">
							<tr>
								<td width="42%" height="60"></td>
								<td width="50%">&nbsp;</td>
								<td width="8%">&nbsp;</td>
							</tr>
							<tr>
								<td height="30" colspan=3 align="center"><label class="f16 red error-msg">请输入用户名和密码</label></td>
							</tr>
							<tr>
								<td width="42%">&nbsp;</td>
								<td width="50%">
									<label class="red"><s:actionerror/></label>
								</td>
								<td width="8%">&nbsp;</td>
							</tr>
							<tr>
								<td height="20" align="right"><strong>用户名：</strong></td>
								<td height="20" align="left"><input type="text" name="username" size="20" maxlength="20" style="font-size: 12pt; font-family: 宋体,MingLiU, Arial; color: #000000" /></td>
								<td id="stra" height="25" align="left" >&nbsp;</td>
							</tr>
							<tr>
								<td height="20" align="right"><strong>密码：</strong></td>
								<td height="20" align="left"><input type="password" name="password" size="20" maxlength="20" style="font-size: 12pt; font-family: 宋体,MingLiU, Arial; color: #000000" /></td>
								<td id="cpw" height="25" align="left">&nbsp;</td>
							</tr>
							<tr>
								<td height="40" colspan=3 align="center"> 
									<input name="Submit" type="button" class="btn_submit" onclick="submitLoginForm()" readonly="readonly" id="Submit" value="登陆" style="margin-left: 60px;">&nbsp;&nbsp;
									<input name="注册" type="button" onclick="javascript:window.location='register.jsp';" class="btn_submit" value="注册"  />
								<a href="passwordrecovery.jsp">忘记密码？</a></td> 
								
							</tr>
 
							<tr>
								<td colspan=3 ><table>
							<TR>
							<td width="10%">&nbsp;</td><TD align=left  class="STYLE8"><label class="f16">题目设置:</label></TD>
							</TR>
							<TR>
							<td width="10%">&nbsp;</td><TD ><TABLE cellSpacing=0 cellPadding=0 width="100%" align=left border=0>
							<TBODY>
							<TD align=left>&nbsp;&nbsp;&nbsp;<label class="f12">（1）初赛规则：通过网上在线答题（每套试题共20道，采取随机抽取题目测评的方式），从准确度和时间两方面进行成绩考核，取前300名进入复赛。初赛试题综合考察参赛选手的信息需求定位、信息检索以及信息处理等能力。每人两次答题机会，成绩取最高计。</label></TD>
							</TR>
							<TR>
							<TD align=left>&nbsp;&nbsp;&nbsp;<label class="f12">（2）复赛规则：复赛采取在线答题的形式，300名选手被要求在规定时间登陆在线答题平台完成同一套复赛试题，根据答题的准确度和耗时综合评分，前30名进入决赛。</label></TD>
							</TR>
							</TBODY>
							</TABLE>
							</TD>
							</TR>
							<TR>
							<td width="10%">&nbsp;</td><TD align=left class="STYLE8"><br/><font size="3">答题过程:</font></TD>
							</TR>
							<TR>
							<td width="10%">&nbsp;</td><TD >
								<TABLE cellSpacing=0 cellPadding=0 width="100%" align=left border=0>
									<TBODY>
										<TR>
											<TD align=left>&nbsp;&nbsp;&nbsp;&nbsp;<label class="f12">1.登录后，点击“开始答题”后开始计时。你将依次完成20道题，每完成一道题点击“提交答案”后，将进入下一题。</label></TD>
										</TR>
										<TR>
											<TD align=left>&nbsp;&nbsp;&nbsp;&nbsp;<label class="f12">2.当完成所有题目后，会进入答题完成页面，系统会统计出你本次比赛的答题时间，片刻后将揭晓本次大赛最后成绩。</label></TD>
										</TR>
									</TBODY>
								</TABLE>
								</TD>
								</TR>
								</table>
							</td>

							</tr>

</table>
    </td>
  </tr>
</table>
</form>

 <div class="Footer">
        <p><font size="2">备注：本次第十一届“百度无限”全国高校信息搜索大赛解释权归武汉大学信息素养协会所有</font></p>
		<p><font size="2">Copyright &copy; 2017武汉大学信息素养协会技术部 版权所有</font></p>
	</div>
  </div>
</div>
</body>
</html>
