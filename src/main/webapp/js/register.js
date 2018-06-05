
//function checkSex(){
//      for(var j=0;j<vForm.sex.length;j++){
//         if(vForm.sex[j].checked == true) return true;
//      }
//      return false;
//}
function check()
{
	if(vForm.account.value==""){
		window.alert("请填写用户名!");
		vForm.account.focus();
		return false;
	}
    /*if(vForm.account.value.match("^[0-9a-zA-Z]*$")==null){
		window.alert("用户名只能有字母、数字!");
		vForm.account.focus();
		return false;
	}
	if( vForm.account.value.length<6 || vForm.account.value.length>16){
       window.alert("请在用户名中输入6-16位的数字或字母!");
	   vForm.account.focus();
       return false;
    }
	if(vForm.password.value=="")
	{
		window.alert("请填写密码!");
		vForm.password.focus();
		return false;
	}
	if( vForm.password.value.length<6 || vForm.password.value.length>16){
       window.alert("请在密码中输入6-16位的数字或字母!");
	   vForm.password.focus();
       return false;
    }
	if(vForm.password.value!=vForm.password_re.value)
	{
		window.alert("两次填写的密码不一致，请重新填写!");
		vForm.password.value="";
		vForm.password_re.value="";
		vForm.password.focus();
		return false;
	}
	if(vForm.name.value=="")
	{
		window.alert("请输入姓名!");
		vForm.name.focus();
		return false;
	}
	if(vForm.name.value.match("[\u4e00-\u9fa5]{2,6}")==null){
		window.alert("请输入中文真实名字!");
		vForm.name.focus();
		return false;
	}
	if(vForm.tel.value==""){
		window.alert("请留下您的有效联系方式!");
		vForm.tel.focus();
		return false;
	}
	 if(vForm.tel.value.match("^[0-9-]*$")==null){
		window.alert("请输入有效的电话!");
		vForm.tel.focus();
		return false;
	}
//	if(checkSex()==false){
//		window.alert("请选择性别!");
//		return false;
//	}
		if(vForm.mail.value==""){
		window.alert("请输入邮箱!");
		vForm.mail.focus();
		return false;
	}
   if(vForm.mail.value.match(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/)== null)
	{
		window.alert("请输入有效邮箱!");
		vForm.mail.focus();
		return false;
	}
	if(vForm.school.value=="")
	{
		window.alert("请输入学校!");
		vForm.school.focus();
		return false;
	}
	
	// 下面这一行莫名其妙的无法匹配
	// if(schoolname.match(/^[a-zA-Z\u4e00-\u9fa5]/) == null || schoolname.match(/^[a-zA-Z\u4e00-\u9fa5]+[（+a-zA-Z\u4e00-\u9fa5+）]+$/) == null  )
	// if(schoolname.match(/^[\x00-\xff]+$/)== null )
	// if(schoolname.match(/^[a-zA-Z\u4e00-\u9fa5]/)==null)
	if($.trim(vForm.school.value).match(/^[a-zA-Z\u4e00-\u9fa5]+[（+a-zA-Z\u4e00-\u9fa5+）]+$/)==null)
	{
		window.alert("请输入学校真实名称!");
		vForm.school.focus();
		return false;
	}

     if(vForm.department.value=="")
	{
		window.alert("请输入院系名!");
		vForm.address.focus();
	 	return false;
	}
	if(vForm.department.value.match("[A-Za-z\u4e00-\u9fa5]{2,30}")==null){
		window.alert("请输入有效院系名!");
		vForm.department.focus();
		return false;
	}
     if(vForm.major.value=="")
	{
		window.alert("请输入专业!");
		vForm.major.focus();
	 	return false;
	}
	if(vForm.major.value.match("[A-Za-z\u4e00-\u9fa5]{2,30}")==null){
		window.alert("请输入有效专业!");
		vForm.major.focus();
		return false;
	}*/
//    if(vForm.grade.value==""){
//		window.alert("请选择年级!");
//		vForm.grade.focus();
//	 	return false;
//	}
	return true;
} 

function submitRegister(){
	if( !check() ){
		return false;
	}
	// 表单数据转化成JSON对象
	var dat = JSON.stringify($("form").serializeJSON());

	//console.log(dat);
	//alert(dat);
	$.ajax({
		url:"register.action",
		// data: dat,
		type:"POST",
		contentType:'application/json;charset=utf-8',
		data:dat,
        // dataType:'json',
        success:function(data){ //返回json结果
			//console.info(data);
			//alert(data.success);
			if(data.toString() == "success"){
                alert(data.toString());
				//用户成功注册,将其导向其他页面(导向登录页面是最low的设计！)
				window.location.href="login.jsp";
			}else{
				alert(data.toString());
			}
		},
		error:function(){
			alert("注册失败，请稍后重试！");
		}
	});
}