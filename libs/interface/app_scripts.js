function verifyChecked(){
	for(i=0;i<document.getElementsByTagName('input').length;i++){
		if(document.getElementsByTagName('input')[i].type == 'radio'){
			if(document.getElementsByTagName('input')[i].checked){
				top.changeBackground(document.getElementsByTagName('input')[i].id);
			}
		}
	}
}