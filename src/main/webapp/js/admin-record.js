function editRecord(){
    var row = $('#record-dg').datagrid('getSelected');
    if (row){
        $('#record-dlg').dialog('open').dialog('setTitle','编辑答题记录');
        $('#record-fm').form('load',row);
        url = 'saveRecord.action?id='+row.id;
    }
}
function saveRecord(){
    $('#record-fm').form('submit',{
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
                $('#record-dlg').dialog('close');        // close the dialog
                $('#record-dg').datagrid('reload');    // reload the user data
            }
        }
    });
}
function destroyRecord(){
    var row = $('#record-dg').datagrid('getSelected');
    if (row){
        $.messager.confirm('确认删除','确认删除该答题记录?',function(r){
            if (r){
                $.post('removeRecord.action',{id:row.id},function(result){
                    if (result.success){
                        $('#record-dg').datagrid('reload');    // reload the user data
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
function recordSearch(){
	$('#record-dg').datagrid('load',{
		keyword: $('#record-keyword').val()
	});
}