<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>  
<html>
<head>
    <title>管理页面</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <link href="css/base.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="easyui/themes/default/easyui.css"/>
    <link rel="stylesheet" type="text/css" href="easyui/themes/icon.css"/>
    <link rel="stylesheet" type="text/css" href="easyui/themes/color.css"/>
    <%--<link rel="stylesheet" type="text/css" href="easyui/demo.css">--%>
    <link rel="stylesheet" type="text/css" href="css/admin.css" />
   
    <script type="text/javascript" src="js/base/jquery-1.11.2.min.js"></script>
    <script type="text/javascript" src="js/base/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="js/admin-user.js"></script>
    <script type="text/javascript" src="js/admin-record.js"></script>
    <script type="text/javascript" src="js/admin-problem.js"></script>
</head>

<body>
	<div class="title">
		<label class="fb f16">百度无限搜索大赛-管理</label>
	</div>
	<div class="easyui-tabs">
		
		<div title="用户管理" style="padding:10px;">
			
			<table id="dg" title="用户" class="easyui-datagrid" 
				url="getUsers.action"
            	toolbar="#toolbar" pagination="true"
            	rownumbers="true" fitColumns="true" singleSelect="true">
		        <thead>
		            <tr>
		                <th field="username" width="30" sortable="true">用户名</th>
		                <th field="chineseName" width="50" sortable="true">姓名</th>
		                <th field="school" width="50" sortable="true">学校</th>
		                <th field="institute" width="50" sortable="true">学院</th>
		                <th field="major" width="50" sortable="true">专业</th>
		                <th field="qq" width="30" sortable="true">QQ</th>
		                <th field="phone" width="30" sortable="true">电话</th>
		                <th field="mail" width="50" sortable="true">邮箱</th>
		                <th field="address" width="50" sortable="true">地址</th>
		                <th field="password" width="50" sortable="true">密码</th>
		                <th field="isAdmin" width="20" sortable="true">是否管理员</th>
		                 <th field="registerTime" width="20" sortable="true">注册时间</th>
		            </tr>
		        </thead>
    		</table>
    		<div id="toolbar">
        		<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="newUser()">新增管理员</a>
        		<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-edit" plain="true" onclick="editUser()">编辑</a>
        		<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-remove" plain="true" onclick="destroyUser()">移除</a>
        		<br/>
    			<span>关键字:</span>
				<input id="keyword" style="line-height:20px;border:1px solid #ccc">
				<a href="#" class="easyui-linkbutton" iconCls="icon-search" plain="true" onclick="userSearch()">搜索</a>				
    		</div>
    
    		<div id="dlg" class="easyui-dialog" style="width:400px;height:280px;padding:10px 20px"
            	closed="true" buttons="#dlg-buttons">
	        	<div class="ftitle">新建管理员</div>
	        	<form id="fm" method="post" novalidate>
	            	<div class="fitem">
	                	<label>用户名:</label>
	                	<input name="username" class="easyui-textbox" required="true"/>
	            	</div>
	            	<div class="fitem">
	                	<label>密码:</label>
	                	<input name="password" class="easyui-textbox" required="true"/>
	            	</div>
	        	</form>
    		</div>
    		
    		<div id="edit-dlg" class="easyui-dialog" style="width:400px;height:280px;padding:10px 20px"
            	closed="true" buttons="#edit-dlg-buttons">
	        	<div class="ftitle">编辑用户</div>
	        	<form id="edit-fm" method="post" novalidate>
	            	<div class="fitem">
	                	<label>用户名:</label>
	                	<input name="username" class="easyui-textbox" required="true"/>
	            	</div>
	            	<div class="fitem">
	                	<label>姓名:</label>
	                	<input name="chineseName" class="easyui-textbox"/>
	            	</div>
	            	<div class="fitem">
	                	<label>学校:</label>
	                	<input name="school" class="easyui-textbox"/>
	            	</div>
	            	<div class="fitem">
	                	<label>学院:</label>
	                	<input name="institute" class="easyui-textbox"/>
	            	</div>
	            	<div class="fitem">
	                	<label>专业:</label>
	                	<input name="major" class="easyui-textbox"/>
	            	</div>
	            	<div class="fitem">
	                	<label>QQ:</label>
	                	<input name="qq" class="easyui-textbox"/>
	            	</div>
	            	<div class="fitem">
	                	<label>电话:</label>
	                	<input name="phone" class="easyui-textbox"/>
	            	</div>
	            	<div class="fitem">
	                	<label>邮箱:</label>
	                	<input name="mail" class="easyui-textbox"/>
	            	</div>
	            	<div class="fitem">
	                	<label>地址:</label>
	                	<input name="address" class="easyui-textbox"/>
	            	</div>
	            	<div class="fitem">
	                	<label>密码:</label>
	                	<input name="password" class="easyui-textbox" disabled/>
	            	</div>
	            	<div class="fitem">
	                	<input type="hidden" name="isAdmin" value="true"/>
	            	</div>
	            	<input type="hidden" name="isAdmin" value="true"/>
	        	</form>
    		</div>
    		
		    <div id="dlg-buttons">
		        <a href="javascript:void(0)" class="easyui-linkbutton c6" iconCls="icon-ok" onclick="saveAdmin()" style="width:90px">保存</a>
		        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel" onclick="javascript:$('#dlg').dialog('close')" style="width:90px">取消</a>
		    </div>
		    
		    <div id="edit-dlg-buttons">
		        <a href="javascript:void(0)" class="easyui-linkbutton c6" iconCls="icon-ok" onclick="saveUser()" style="width:90px">保存</a>
		        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel" onclick="javascript:$('#edit-dlg').dialog('close')" style="width:90px">取消</a>
		    </div>
		    
		</div>
		
		<div title="题库管理" style="padding:10px;">
			<table id="problem-dg" title="题库" class="easyui-datagrid"
	            url="getProblems.action"
	            toolbar="#problem-toolbar" pagination="true"
	            rownumbers="true" fitColumns="true" singleSelect="true">
		        <thead>
		            <tr>
		            	<th field="id" width="30" sortable="true">任务ID</th>
		            	<th field="taskBackground" width="70" sortable="true">任务背景</th>
		                <th field="taskRequirement" width="70" sortable="true">任务要求</th>
		                <th field="complexity" width="20" sortable="true">题目复杂度</th>
		                <th field="resourceType" width="30" sortable="true">题目背景或答题资料类型</th>
		                <th field="items" width="50" sortable="true">选项</th>
		                <th field="answer" width="10" sortable="true">答案</th>
		                <th field="subjectType" width="10" sortable="true">题目类型</th> 
		                <th field="operateTime" width="50" sortable="true">添加时间</th>               
		            </tr>
		        </thead>
	    	</table>
	    	
		    <div id="problem-toolbar">
		    	<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="newProblem()">新增题目</a>
        		<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-edit" plain="true" onclick="editProblem()">编辑题目</a>
		        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-remove" plain="true" onclick="destroyProblem()">删除题目</a>
		        <br />
    			<span>关键字:</span>
				<input id="problem-keyword" style="line-height:20px;border:1px solid #ccc">
				<a href="#" class="easyui-linkbutton" iconCls="icon-search" plain="true" onclick="problemSearch()">搜索</a>	
				<br />
				<form action="uploadProblems.action" method="post" enctype="multipart/form-data">
				    <input type="file" name="excelFile">
				    <input type="submit" value="上传题目">
				</form>
				<br/>
				<a href="excel/template.xlsx">模板下载</a>
				<a href="excel/question_bank.zip">历年题库</a>
		    </div>
	    
		    <div id="problem-dlg" class="easyui-dialog" style="width:400px;height:280px;padding:10px 20px"
		            closed="true" buttons="#problem-dlg-buttons">
		        <div class="ftitle">编辑题目</div>
		        <form id="problem-fm" method="post" novalidate>
		            <div class="fitem">
		                <label>题目ID:</label>
		                <input name="id" class="easyui-textbox" required="true">
		            </div>
		            <div class="fitem">
		                <label>任务背景:</label>
		                <input name="taskBackground" class="easyui-textbox" required="true">
		            </div>
		            <div class="fitem">
		                <label>任务要求:</label>
		                <input name="taskRequirement" class="easyui-textbox" required="true">
		            </div>
		            <div class="fitem">
		                <label>题目复杂度:</label>
		                <input name="complexity" class="easyui-textbox" required="true">
		            </div>
		            <div class="fitem">
		                <label>题目背景或答题资料类型:</label>
		                <input name="resourceType" class="easyui-textbox">
		            </div>
		            <div class="fitem">
		                <label>选项:</label>
		                <input name="items" class="easyui-textbox" required="true">
		            </div>
		            <div class="fitem">
		                <label>答案:</label>
		                <input name="answer" class="easyui-textbox" required="true">
		            </div>
		            <div class="fitem">
		                <label>题目类型:</label>
		                <input name="subjectType" class="easyui-textbox" required="true">
		            </div>
		        </form>
		    </div>
		    
		    <div id="problem-dlg-buttons">
		        <a href="javascript:void(0)" class="easyui-linkbutton c6" iconCls="icon-ok" onclick="saveProblem()" style="width:90px">保存</a>
		        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel" onclick="javascript:$('#problem-dlg').dialog('close')" style="width:90px">取消</a>
		    </div>			    
		</div>
	
		<div title="答题记录管理" style="padding:10px;">
			<table id="record-dg" title="答题记录" class="easyui-datagrid" 
	            url="getRecords.action"
	            toolbar="#record-toolbar" pagination="true"
	            rownumbers="true" fitColumns="true" singleSelect="true">
		        <thead>
		            <tr>
		                <th field="username" width="50" sortable="true">用户名</th>
		                <th field="problemIdList" width="50" sortable="true">答题列表</th>
		                <th field="sumTime" width="50" sortable="true">答题用时</th>
		                <th field="round" width="50" sortable="true">轮次</th>
		                <th field="item1" width="50" sortable="true">题目1</th>
		                <th field="item2" width="50" sortable="true">题目2</th>
		                <th field="item3" width="50" sortable="true">题目3</th>
		                <th field="item4" width="50" sortable="true">题目4</th>
		                <th field="item5" width="50" sortable="true">题目5</th>
		                <th field="item6" width="50" sortable="true">题目6</th>
		                <th field="item7" width="50" sortable="true">题目7</th>
		                <th field="item8" width="50" sortable="true">题目8</th>
		                <th field="item9" width="50" sortable="true">题目9</th>
		                <th field="item10" width="50" sortable="true">题目10</th>
		                <th field="timeScore" width="50" sortable="true">时间得分</th>
		                <th field="subjectScore" width="50" sortable="true">答题得分</th>
		                <th field="sumScore" width="50" sortable="true">总得分</th>	                
		            </tr>
		        </thead>
	    	</table>
	    	
		    <div id="record-toolbar">
		        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-edit" plain="true" onclick="editRecord()">编辑答题记录</a>
		        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-remove" plain="true" onclick="destroyRecord()">删除答题记录</a>
		        <br />
    			<span>关键字:</span>
				<input id="record-keyword" style="line-height:20px;border:1px solid #ccc">
				<a href="#" class="easyui-linkbutton" iconCls="icon-search" plain="true" onclick="recordSearch()">搜索</a>
		    </div>
	    
		    <div id="record-dlg" class="easyui-dialog" style="width:400px;height:280px;padding:10px 20px"
		            closed="true" buttons="#record-dlg-buttons">
		        <div class="ftitle">编辑答题记录</div>
		        <form id="record-fm" method="post" novalidate>
		            <div class="fitem">
		                <label>用户名:</label>
		                <input name="username" class="easyui-textbox" disabled>
		            </div>
		            <div class="fitem">
		                <label>时间得分:</label>
		                <input name="timeScore" class="easyui-textbox">
		            </div>
		            <div class="fitem">
		                <label>答题得分:</label>
		                <input name="subjectScore" class="easyui-textbox">
		            </div>
		            <div class="fitem">
		                <label>总得分:</label>
		                <input name="sumScore" class="easyui-textbox">
		            </div>
		        </form>
		    </div>
		    
		    <div id="record-dlg-buttons">
		        <a href="javascript:void(0)" class="easyui-linkbutton c6" iconCls="icon-ok" onclick="saveRecord()" style="width:90px">保存</a>
		        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel" onclick="javascript:$('#record-dlg').dialog('close')" style="width:90px">取消</a>
		    </div>	
		    
		</div>
		
		<div title="得分榜" style="padding:10px;">
			<table id="rank-dg" title="得分榜" class="easyui-datagrid" 
	            url="getRanks.action"
	            pagination="true"
	            rownumbers="true" fitColumns="true" singleSelect="true">
		        <thead>
		            <tr>
		                <th field="username" width="50" sortable="true">用户名</th>
		                <th field="chineseName" width="50" sortable="true">姓名</th>
		                <th field="primaryScore" width="50" sortable="true">初赛得分</th>
		                <th field="secondaryScore" width="50" sortable="true">复赛得分</th>
		                <th field="phone" width="50" sortable="true">电话号码</th>
		                <th field="school" width="50" sortable="true">学校</th>
		                <th field="institute" width="50" sortable="true">学院</th>
		                <th field="major" width="50" sortable="true">专业</th>              
		            </tr>
		        </thead>
	    	</table>	
		    
		</div>
	
	</div>
	
	<div class="blue-sky">
		<div class="Footer f14">
	        <p>备注：本次第八届“百度无限”全国高校信息搜索大赛解释权归武汉大学信息素养协会所有</p>
			<p>Copyright © 2014 武汉大学信息素养协会技术部 版权所有</p>
		</div>	
	</div>
</body>
</html>