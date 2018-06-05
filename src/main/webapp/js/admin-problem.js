function newProblem(){
    $('#problem-dlg').dialog('open').dialog('setTitle','新增题目');
    $('#problem-fm').form('clear');
    url = 'saveProblem.action';
}
function editProblem(){
    var row = $('#problem-dg').datagrid('getSelected');
    if (row){
        $('#problem-dlg').dialog('open').dialog('setTitle','编辑题目');
        $('#problem-fm').form('load',row);
        url = 'saveProblem.action?oldId='+row.id;
    }
}
function saveProblem(){
    $('#problem-fm').form('submit',{
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
                $('#problem-dlg').dialog('close');        // close the dialog
                $('#problem-dg').datagrid('reload');    // reload the user data
            }
        }
    });
}
function destroyProblem(){
    var row = $('#problem-dg').datagrid('getSelected');
    if (row){
        $.messager.confirm('确认删除','确认删除该题目?',function(r){
            if (r){
                $.post('removeProblem.action',{id:row.id},function(result){
                    if (result.success){
                        $('#problem-dg').datagrid('reload');    // reload the user data
                    } else {
                        $.messager.show({    // show error message
                            title: 'Error',
                            msg: result.errorMsg
                        });
                    }
                },'json');
            }
        });
    }
}
function problemSearch(){
	$('#problem-dg').datagrid('load',{
		keyword: $('#problem-keyword').val()
	});
}