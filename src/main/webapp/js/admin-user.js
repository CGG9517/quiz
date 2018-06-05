var url;

function newUser(){
    $('#dlg').dialog('open').dialog('setTitle','新建管理员');
    $('#fm').form('clear');
    url = 'saveUser.action';
}
function editUser(){
    var row = $('#dg').datagrid('getSelected');
    if (row){
        $('#edit-dlg').dialog('open').dialog('setTitle','编辑用户');
        $('#edit-fm').form('load',row);
        url = 'saveUser.action?id='+row.id;
    }
}
function saveAdmin(){
    $('#fm').form('submit',{
        url: url + "?isAdmin=true",
        onSubmit: function(){
            return $(this).form('validate');
        },
        success: function(result){
            var result = eval('('+result+')');
            if (result.errorMsg){
                $.messager.show({
                    title: 'Error',
                    msg: result.errorMsg
                });
            } else {
                $('#dlg').dialog('close');        // close the dialog
                $('#dg').datagrid('reload');    // reload the user data
            }
        }
    });
}
function saveUser(){
    $('#edit-fm').form('submit',{
        url: url,
        onSubmit: function(){
            return $(this).form('validate');
        },
        success: function(result){
            var result = eval('('+result+')');
            if (result.errorMsg){
                $.messager.show({
                    title: 'Error',
                    msg: result.errorMsg
                });
            } else {
                $('#edit-dlg').dialog('close');        // close the dialog
                $('#dg').datagrid('reload');    // reload the user data
            }
        }
    });
} 
function destroyUser(){
    var row = $('#dg').datagrid('getSelected');
    if (row){
        $.messager.confirm('确认删除','确认删除该用户？',function(r){
            if (r){
                $.post('removeUser.action',{id:row.id},function(result){
                    if (result.success){
                        $('#dg').datagrid('reload');    // reload the user data
                    } else {
                        $.messager.show({    // show error message
                            title: '删除失败',
                            msg: result.errorMsg
                        });
                    }
                },'json');
            }
        });
    }
}
function userSearch(){
	$('#dg').datagrid('load',{
		keyword: $('#keyword').val()
	});
}