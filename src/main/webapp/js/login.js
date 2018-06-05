$(document).ready(function(){
	//alert("hello");
	//判读是否已有用户名和密码
});
function FrontPage_Form1_Validator()
{
  if (FrontPage_Form1.username.value == "")
  {
    alert("请输入 用户名！");
    FrontPage_Form1.username.focus();
    return false;
  }

  if (FrontPage_Form1.username.value.length < 4 || FrontPage_Form1.username.value.length > 16)
  {
    alert("请输入4-16位的用户名！");
    FrontPage_Form1.username.focus();
    return false;
  }

  if (FrontPage_Form1.password.value == "")
  {
    alert("请输入 密码！");
    FrontPage_Form1.password.focus();
    return false;
  }

  if (FrontPage_Form1.password.value.length < 4||FrontPage_Form1.password.value.length > 16)
  {
    alert("请输入4-16位的密码！");
    FrontPage_Form1.password.focus();
    return false;
  }
  return true;
}

function submitLoginForm(){
	if( !FrontPage_Form1_Validator() ){
		return false;
	}
	$.ajax({
		url : "login.action",
	//	data: 'username='+FrontPage_Form1.username.value+'&password='+FrontPage_Form1.password.value,
	// 上面那一行遇见密码特殊字符会产生错误
		data: JSON.stringify({"username":FrontPage_Form1.username.value,"password":FrontPage_Form1.password.value}),
		type:"POST",
        contentType:'application/json;charset=utf-8',
		success:function(data){
			if (data == null){
				alert("用户名或密码错误");
			} else if (data.id > 0){
				alert("登陆成功");
                if(data.isAdmin === true ){
                    window.location.href="admin.jsp";
                }else{
                    window.location.href="home.jsp";
                }
			}
			else {
				alert("后台错误");
			}
		},error:function(){
			alert("bad code");
		}
	});
	
	
	
}

function getTextMsg(){
	//alert(12);
	$.ajax({
		
		url : "generateTextMsg.action",
		data: '&phone='+FrontPage_Form1.phone.value,
		type:"POST",
		dataType:"json",
		success:function(data){
			//alert(data.textMsg);
		},
		error:function(data){
			//alert("失败");
		}
	});
}

function loginByTextMsg(){
	alert('phone='+FrontPage_Form1.phone.value+'&yanzhengma='+FrontPage_Form1.yanzhengma.value);
	$.ajax({
		
		url : "loginByTextMsg.action",
		data: 'phone='+FrontPage_Form1.phone.value+'&yanzhengma='+FrontPage_Form1.yanzhengma.value,
		type:"POST",
		dataType:"json",
		success:function(data){
			if(data.success === true ){
				if(data.isAdmin === true ){
					window.location.href="admin.jsp";
				}else{
					window.location.href="home.jsp";
				}
			}
		},
		error:function(data){
			alert("失败");
		}
	});
}