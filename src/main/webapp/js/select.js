	function selectAll(obj){
		//页面全选
			var elem = document.getElementsByName("record");  
	  		var len = elem.length;     
	  		for(var i=0; i<len; i++) { 
	      		elem[i].checked = obj.checked; 
	 		} 
		}
		
		function selectCheck(){
		//页面全选
			var elem = document.getElementsByName("record");    
			var all=document.getElementById("allSelect");
			all.checked=true;  
	  		var len = elem.length;     
	  		for(var i=0; i<len; i++) { 
	      			elem[i].checked = true;  

	 		} 
		}
		
		function checkAll(){
			var elem = document.getElementsByName("record");
		 	var all=document.getElementById("allSelect");
			var count=0;
			var len = elem.length;     
	  		for(var i=0; i<len; i++) { 
	      		if(elem[i].checked == true){
	      			count++;
	      		}  
	 		} 
	 		if(count==len){
				all.checked=true;
			}else{
				all.checked=false;
			}
		}
		
		 function reserveCheck() { 
		 //页面反选
		     var el=document.getElementById("allSelect");
		     var count=0;
	         var elem =document.getElementsByName("record");   
	         var len = elem.length;       
	         if (len > 0) { 
	             for (var i = 0; i < len; i++) {  
	                  if (elem[i].checked){
	                  	 elem[i].checked = false; 
	                  }
	                  else {
	                 	 elem[i].checked = true; 
	                  	 count++;
	                  }
	             }  
	          }  
	          if(count==len){
	          	  el.checked=true;
	          }else el.checked=false;
	     } 