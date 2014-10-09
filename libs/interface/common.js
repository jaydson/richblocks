/* 
   Copyright 2008 Jaydson Gomes - RichBlocks  
   
   This file is part of the program RichBlocks
   
   RichBlocks is free software: you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation, either version 3 of the License, or
   (at your option) any later version.
   
   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with this program.  If not, see <http://www.gnu.org/licenses/>.
   
   **********************************************************************
   
   Este arquivo é parte do programa RichBlocks
   
   RichBlocks é um software livre: você pode redistribui-lo e/ou
   modifica-lo dentro dos termos da Licença Pública Geral GNU como 
   publicada pela Fundação do Software Livre (FSF); na versão 2 da 
   Licença, ou (na sua opnião) qualquer versão.

   Este programa é distribuido na esperança que possa ser  util, 
   mas SEM NENHUMA GARANTIA; sem uma garantia implicita de ADEQUAÇÂO a qualquer
   MERCADO ou APLICAÇÃO EM PARTICULAR. Veja a
   Licença Pública Geral GNU para maiores detalhes.

   Você deve ter recebido uma cópia da Licença Pública Geral GNU
   junto com este programa, se não veja em <http://www.gnu.org/licenses/>.
*/

//Carrega o XML de configuração
function loadAppConfiguration(){
	xmlDoc =loadXmlDocument('conf/application.xml');    
	app = xmlDoc.getElementsByTagName("application");
	if(!document.all){
		appname =	app[0].getElementsByTagName('name')[0].textContent + " " + app[0].getElementsByTagName('version')[0].textContent + " " + app[0].getElementsByTagName('comment')[0].textContent; 
	}else{
		appname =	app[0].getElementsByTagName('name')[0].text + " " + app[0].getElementsByTagName('version')[0].text + " " + app[0].getElementsByTagName('comment')[0].text;
	}
	frameBarTop.innerHTML = appname;
	document.title = appname;  
	
	exec(app[0].getAttribute('onload'),'');
}

//Carrega o XML de estilos
function loadAppStyles(){
	
}

function browserDetect(){
	var b = navigator.appName;
	var ua = navigator.userAgent.toLowerCase();
	
	Browser = {};
	
	Browser.safari = ua.indexOf('safari') > -1;
	Browser.opera = ua.indexOf('opera') > -1;
	Browser.ns = !Browser.opera && !Browser.safari && b == 'Netscape';
	Browser.ie = !Browser.opera && b == 'Microsoft Internet Explorer';
	Browser.firefox = ua.indexOf('gecko') > -1;
	
	delete b;
	delete ua;
}

//Função que retorna o tamanho atual da janela do navegador
function getSizeWindow() {
   var sizeWindow = new Array();
   sizeWindow[0] = 0;  // Width
   sizeWindow[1] = 0;  // Height
  
  if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
    sizeWindow[0] = window.innerWidth;
    sizeWindow[1] = window.innerHeight;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight )) {
		    //IE 6+ in 'standards compliant mode'
		    sizeWindow[0] = document.documentElement.clientWidth;
		    sizeWindow[1] = document.documentElement.clientHeight;
		   } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
					  //IE 4 compatible
					  sizeWindow[0] = document.body.clientWidth;
					  sizeWindow[1] = document.body.clientHeight;
				    }
return sizeWindow;
}

//Aloca a barra de janela minmimizadas no local correto
function setMinizeds(){
	var sizeWindow = getSizeWindow();
	count_size = 0;
	line = 0;
	
	topMinimizeds = parseInt(sizeWindow[1]) - 28 + 'px';
	frameMinimizeds.style.top = topMinimizeds;
	frameDockMenu.style.top = parseInt(sizeWindow[1]) - 60 + 'px';
	
	for(i=0;i<frameMinimizeds.childNodes.length;i++){
		count_size += parseInt(frameMinimizeds.childNodes[i].style.width);
	}

	if(count_size >=sizeWindow[0]){
		line = line + 1; 
		frameMinimizeds.style.height = parseInt(frameMinimizeds.style.height) + parseInt(frameMinimizeds.style.height) + 'px';	
		topMinimizeds = parseInt(sizeWindow[1]) - 52 + 'px';
		frameMinimizeds.style.top = topMinimizeds;
		if(line == 1){
			//topMinimizeds = parseInt(sizeWindow[1]) - 77 + 'px';
			//frameMinimizeds.style.top = topMinimizeds ;
		}
	}
}

//Aloca a barra SysTray no local correto
function setSysTrayPosition(){
	sizeWindow = getSizeWindow();
	document.getElementById('frame_systray').style.top = parseInt(sizeWindow[1]) - 23 + 'px';
	document.getElementById('frame_systray').style.left = parseInt(sizeWindow[0]) - 78 + 'px'; // 100 é o tamanho do elemento sysTray
}

// Mousemove do dockmenu
function dockMenuMove(ev){
	if(window.event) ev=window.event;
	xm = (ev.x || ev.clientX);
	if(xm!=xmb){
		M = true;
		xmb = xm;
	}
	ov = (ev.target)?ev.target:((ev.srcElement)?ev.srcElement:null);
	
	getSizeWindow();
	tamanhoTelaMenosPosMouse = sizeWindow[1] - ev.clientY; 
	calc = sizeWindow[1] + tamanhoTelaMenosPosMouse;
	pos = calc - (parseInt(document.getElementById('frame_dock_menu').style.height) + 250);
	//alert(document.getElementById('frame_dock_menu').style.top);
	if(pos >= parseInt(sizeWindow[1]) - 70){
		document.getElementById('frame_dock_menu').style.top = pos + 'px';
	}else{
		document.getElementById('frame_dock_menu').style.top = parseInt(sizeWindow[1]) - 70;
	}
}

function moveIconToDesktop(obj){

}

function mountTableIcons(){
	//getSizeWindow();
	//numColunas = screen.availWidth / 60;
	//numLinhas = screen.availHeight / 60;
	
	for(var i=0;i<=7;i++){
		tr = document.createElement('TR');
		for(var j=0;j<17;j++){
			td = document.createElement('TD');
			//td.style.width = '60px';
			td.style.paddingBottom = '55px';
			td.style.marginLeft = '18px';
			//td.style.height = '60px';
			td.setAttribute('busy','false');
			td.innerHTML ='<br>';
			tr.appendChild(td);
		}
		tbodyFrameTableIcons.appendChild(tr);
	}	
}

function displayLegend(event){
	document.getElementById("legend").style.top = parseInt(document.getElementById('frame_dock_menu').style.top) + 20;
	document.getElementById("legend").style.left = ov.offsetLeft;
	document.getElementById("legend").style.width = ov.offsetWidth;
}

function hiddenLegendInnerHTML(){
	document.getElementById('legend').innerHTML = '';
}

//Função responsável por fazer o efeito de minimizar a janela
function minimized(objWindow){
	
	objWindow.childNodes[0].style.backgroundColor='#BABABA';
	
	tempDivMinimized = document.createElement('DIV');
	tempDivMinimized.id = 'temp_minimized_' + objWindow.id;
	tempDivMinimized.style.width = '120px';
	tempDivMinimized.style.height = '20px';
	tempDivMinimized.style.background = '#D4D0C8';
	tempDivMinimized.style.border = '1px outset #eeeeee';
	tempDivMinimized.style.cssFloat = 'left';
	tempDivMinimized.style.styleFloat = 'left';
	tempDivMinimized.style.paddingLeft = '5px';
	tempDivMinimized.style.paddingTop = '2px';
	tempDivMinimized.style.textAlign = 'left';
	tempDivMinimized.style.cursor = 'default';
	
	fullname = objWindow.title;
	halfname = objWindow.title.substring(0,20) + '...';
	if(objWindow.title.length > 20){
		tempDivMinimized.innerHTML = halfname;
	}else{
		tempDivMinimized.innerHTML = fullname;
	}
	
	tempDivMinimized.setAttribute('title',objWindow.title);
	frameMinimizeds.appendChild(tempDivMinimized);
	
	count_size = 100;
	var sizeWindow = getSizeWindow();
	
	for(i=0;i<frameMinimizeds.childNodes.length;i++){
		count_size += parseInt(frameMinimizeds.childNodes[i].style.width);
	}

	if(count_size >=sizeWindow[0]){
		frameMinimizeds.style.height = parseInt(frameMinimizeds.style.height) + parseInt(frameMinimizeds.style.height) + 'px';	
		topMinimizeds = parseInt(sizeWindow[1]) - 52 + 'px';
		frameMinimizeds.style.top = topMinimizeds;
	}
	
	for(i=0;i<frameMinimizeds.childNodes.length;i++){
		if(frameMinimizeds.id == frameMinimizeds.childNodes[i].id){
			alert('Iguais');
		}
	}
	
	tempDivMinimized.onmousedown = function(){
		this.style.border = '1px inset #eeeeee';
	}	
	tempDivMinimized.onmouseup = function(){
		this.style.border = '1px outset #eeeeee';
	}
	tempDivMinimized.onmouseout = function(){
		this.style.border = '1px outset #eeeeee';
	}
	tempDivMinimized.onclick = function(){
		window_z_index = window_z_index + 1;
		objWindow.style.display = '';
		objWindow.style.zIndex = window_z_index;
		objWindow.childNodes[0].style.backgroundColor='#34508E';
		frameMinimizeds.removeChild(this);
		setMinizeds();
	}
	changeBackgroundWindowBar();
	objWindow.style.display = 'none';
}

function restore(objId,contentId){
	document.getElementById(objId).style.top = document.getElementById(objId).getAttribute('top');
	document.getElementById(objId).style.left = document.getElementById(objId).getAttribute('left');
	document.getElementById(objId).style.width = document.getElementById(objId).getAttribute('w');
	document.getElementById(objId).style.height = document.getElementById(objId).getAttribute('h');
	if(document.all){
		document.getElementById(contentId).style.width = document.getElementById(objId).getAttribute('w') - 5 + 'px';
	}else{
		document.getElementById(contentId).style.width = document.getElementById(objId).getAttribute('w') - 8 + 'px';
	}
	document.getElementById(contentId).style.height = document.getElementById(objId).getAttribute('h') - 46 + 'px'; 
	document.getElementById(objId).setAttribute('maximized',false);
}

//Função responsável por fazer o efeito de maximizar a janela
function maximized(objWindow,objContent,iptMax){
	if(document.getElementById(objWindow.id).getAttribute('maximized')== 'true' || document.getElementById(objWindow.id).getAttribute('maximized')== true){
		restore(objWindow.id,objContent.id);
		return true;
	}
	document.getElementById(objWindow.id).setAttribute('maximized',true);
	document.getElementById(objWindow.id).setAttribute('top',objWindow.offsetTop);
	document.getElementById(objWindow.id).setAttribute('left',objWindow.offsetLeft);
	document.getElementById(objWindow.id).setAttribute('w',objWindow.offsetWidth);
	document.getElementById(objWindow.id).setAttribute('h',objWindow.offsetHeight);
	
	var topMax = null;
	if(RB_BAR_APPLICATION_DISPLAY && RB_BAR_SHORTCUT_DISPLAY){
		topMax = 72;
		heightWin = 0;
	}
	if(!RB_BAR_APPLICATION_DISPLAY){
    	topMax = 50;
    	heightWin = 22;    	
	}
    if(!RB_BAR_SHORTCUT_DISPLAY){
    	topMax = 45;
    	heightWin = 32;
    }
    if(!RB_BAR_APPLICATION_DISPLAY && !RB_BAR_SHORTCUT_DISPLAY){
    	topMax = 24;
    	heightWin = 48;
    }
	
	var sizeWindow = getSizeWindow();
	objWindow.style.top = topMax;
	objWindow.style.left = '0px';
	objWindow.style.width = sizeWindow[0];
	objContent.style.width = parseInt(sizeWindow[0]) - 5 + 'px';
	objWindow.style.height = parseInt(sizeWindow[1] - 102 + heightWin + 'px');
	objContent.style.height = parseInt(sizeWindow[1] - 148 + + heightWin + 'px');	
}

//Função responsável aletar a cor da barra da janela quando esta em foco
function changeBackgroundWindowBar(id){
	for(i in plataform_windows){
		if(!id){
			window_z_index = window_z_index + 1;
			document.getElementById(i).childNodes[0].style.backgroundColor = '#34508E';
			document.getElementById(i).style.zIndex = window_z_index;
			return;
		}
		//document.getElementById(i).firstChild.syle.backgroundColor = 'red';	
		// alert('ID '+id);
		// alert('i ' +i);
		try{
			if(document.getElementById(id).id == i){
				document.getElementById(i).childNodes[0].style.backgroundColor = '#34508E';
			}else{
				document.getElementById(i).childNodes[0].style.backgroundColor = '#BABABA';
			}
		}catch(e){
		}	
	}
}

// Função que desbilita a seleção do mouse
function disableSelection(target){
	try{
		if (typeof target.onselectstart!="undefined") //IE route
			target.onselectstart=function(){return false}
		else if (typeof target.style.MozUserSelect!="undefined") //Firefox route
			target.style.MozUserSelect="none"
		else //All other route (ie: Opera)
			target.onmousedown=function(){return false}
	}catch(e){}
}

function retornado(returnedContent, ajaxObject){
		document.getElementById(ajaxObject.objIdInner).innerHTML= returnedContent;
}
function testeAjaxChange(status, ajaxObject){
	
	var img_load = document.createElement('IMG');
	img_load.src = 'img/load.gif';
		
	tablelaod = document.createElement("TABLE");
	tablelaod.setAttribute('width','100%');
	tablelaod.setAttribute('height','100%');
		tbdodyload = document.createElement("TBODY");
			trload = document.createElement("TR");
				tdload = document.createElement("TD");
			tdload.setAttribute("align","center");
					spanload = document.createElement("SPAN");
					spanload.style.fontFamily = 'verdana';
					spanload.style.fontSize = '16px';
					spanload.style.fontWeight = 'bold';
					spanload.innerHTML = 'Carregando...';
					nobreak = document.createElement("BR");
					tdload.appendChild(img_load);
				tdload.appendChild(nobreak);
				tdload.appendChild(spanload);
			trload.appendChild(tdload);
		tbdodyload.appendChild(trload);
	tablelaod.appendChild(tbdodyload);	
	document.getElementById(ajaxObject.objIdInner).appendChild(tablelaod);								  
}

//Função que carrega uma URL dentro da janela(Parametros: URL,Id da janela, Método:Ajax ou Iframe)
function loadPage(page,windowContentId,method){
   if(method != 'true'){
   		document.getElementById(windowContentId).src = page;
   }else{
   	  
   		var d1= new Ajax();
		d1.callBack= retornado;
		d1.url= 'src_application/'+ page;
		d1.objIdInner = windowContentId;
		d1.onStateChange= testeAjaxChange;
		d1.onError= function (status, ajaxObj)
					{
						document.getElementById(ajaxObj.objIdInner).innerHTML+= '<br>Erro cod: '+status;
						return false;
					}
		
		d1.call();
	}
}

//Função que altera o Plano de Fundo (Parametro: nome da imagem, o diretório é img)
function changeBackground(imgName){
	document.getElementById('invisible').style.display = '';
	document.getElementById('frame_properties').src = 'img/'+imgName+'';
	document.getElementById('invisible').style.display = 'none';
}

// Função responsável por criar o Relógio
function clock(){
    momentoAtual = new Date();
    hora = momentoAtual.getHours();
    minuto = momentoAtual.getMinutes();
    if(parseInt(minuto) < 10){
    	minuto = '0' + minuto;
    }
    horaImprimivel = hora + ":" + minuto;
    document.getElementById('frame_systray').innerHTML = horaImprimivel;
    setTimeout("clock()",1000);
} 

// Função que cancela eventos
function cancelEvent(event){
	if (typeof(event.preventDefault)=='function'){
	        event.preventDefault();
	    } else {
	        event.returnValue = false;
	        event.keyCode = 0;
	    }
}


