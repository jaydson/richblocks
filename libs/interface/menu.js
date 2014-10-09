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


/* GLOBALS */
var activeMenu;
var rightButtonMenus = new Array();
var windowRightButtonMenus = new Array(); 
var contextMenuIconFlag = null;

//Aplica o efeito de onmouseout em todos menus 
function resetStyleMenus(){
	for(i=0;i<document.getElementById('frame_menu').getElementsByTagName('div').length;i++){
		outMenu(document.getElementById('frame_menu').getElementsByTagName('div')[i].id);
	}
}

//Esconde os menus
function hiddenMenus(){
	for(i=0;i<document.getElementById('plataform').getElementsByTagName('TABLE').length;i++){
		table_id = document.getElementById('plataform').getElementsByTagName('TABLE')[i].id.split('_');
		if(table_id[0] == 'submenu')
			document.body.getElementsByTagName('TABLE')[i].style.display = 'none';
	}
}

//Efeito do onmouseover no menu
function overMenu(objMenuId){
	obj = document.getElementById(objMenuId);
	obj.style.background = '#0A246A';
	obj.style.color = '#ffffff';
}

//Efeito do onmouseout no menu
function outMenu(objMenuId){
	obj = document.getElementById(objMenuId);
	obj.style.background = '#D4D0C8';
	obj.style.color = '#000000';
}

function verifyChildMenu(subMenuCollection,pos){	
	for(si=0;si<subMenuCollection.length;si++){
		teste = document.createElement('DIV');
		teste.style.border = 'solid 10px';
		teste.style.position = 'absolute';
		teste.style.top = pos[0];
		teste.style.left = pos[1];
		teste.innerHTML = 'teste';
		//document.body.appendChild(teste);
		//alert(subMenuCollection[si].getAttribute('name'));
		if(subMenuCollection[si].hasChildNodes()){
			//alert(subMenuCollection[si].getAttribute('name'));
			verifyChildMenu(subMenuCollection[si].getElementsByTagName('sub')[0].getElementsByTagName('sub_option'));
		}
	}
}

function verifyPosSubMenu(obj){
	y = obj.offsetTop;
	x = obj.offsetLeft;
	he  = obj;
	while(he.tagName != 'BODY'){
		he = he.parentNode;
		y = y + he.offsetTop;
		x = x + he.offsetLeft;
	}	
//	alert('X: ' + x + ' Y: '+ y);
	return [y,x];
}

//Constroi os menus da parte superior
function buildMenu(){	
	
	var xmlDoc =loadXmlDocument('conf/menu.xml');    	   // Carrega o arquivo XML com a definição de Menus
	menu = xmlDoc.getElementsByTagName("menu"); 	   // Variavel menu pega todas as tags <menu> do arquivo XML

		var posTopMenu = 45; // Coltrola a posição TOP do menu
		
		// Laço que percorre o Objeto XML e encontra os nodos para formar o Menu
		for(i=0;i<menu.length;i++)
		{
			divMenu = document.createElement('DIV');
			divMenu.style.padding = '4px';
			divMenu.style.cursor = 'default';
			divMenu.style.cssFloat = 'left';
			divMenu.style.styleFloat = 'left';
			divMenu.style.fontFamily = 'tahoma';
			divMenu.style.fontSize = '11px';
			divMenu.id = menu[i].getAttribute('name');
			divMenu.innerHTML = menu[i].getAttribute('value');
			divMenu.onclick = function(){
				//Esconde o menu que estievr aberto
				resetRightButtonMenus();
				
				//Mostra o menu
				if(!RB_BAR_APPLICATION_DISPLAY)
					document.getElementById(this.getAttribute('childSubMenu')).style.top = '23px';
						else
							document.getElementById(this.getAttribute('childSubMenu')).style.top = '45px';
				opacity(this.getAttribute('childSubMenu'), 0, 100, 350);
				document.getElementById(this.getAttribute('childSubMenu')).style.display = 'block';
				
				//Essa variavel controla o menu que estão aparecendo
				activeMenu = true;
			}	
			divMenu.onmouseover = function(){
				//Reseta o estilo dos menus
				resetStyleMenus();	
				if(activeMenu){
					hiddenMenus();
					document.getElementById(this.getAttribute('childSubMenu')).style.display = 'block';
					opacity(this.getAttribute('childSubMenu'), 0, 100, 350);
				}
				overMenu(this.id);
			}
			divMenu.onmouseout = function(){
				if(activeMenu)
					return false;
				//outMenu(this.id);
				opacity(this.getAttribute('childSubMenu'), 100, 0, 350);
				document.getElementById(this.getAttribute('childSubMenu').style.MozOpacity = '0.0');
				document.getElementById(this.getAttribute('childSubMenu').style.filter = 'alpha(opacity=0');
			}
			document.getElementById('frame_menu').appendChild(divMenu);
			
			// submenuPosition é um espaço reservado para alocar os submenus, para cada menu, há um espaço para o respectivo submenu
			submenuPosition = document.createElement('DIV');
			frameSubMenu.appendChild(submenuPosition);
				tableSub = document.createElement('TABLE');
				//tableSub.setAttribute('border','1');
				tableSub.id = 'submenu_'+i;
				tableSub.setAttribute('class','table_sub');
				tableSub.setAttribute('className','table_sub');	
				tableSub.setAttribute('cellspacing','0');
				tableSub.style.left = divMenu.offsetLeft;
				tableSub.style.top = posTopMenu;
				tableSub.setAttribute('menuParent',divMenu.id);
				tBodySub = document.createElement('TBODY');
				
			//Laço que percorre as Opções de cada menu
			var widthMenu = 0;
			for(iOpt=0;iOpt<menu[i].getElementsByTagName('option').length;iOpt++)
			{		
				divMenu.setAttribute('childSubMenu',tableSub.id);
					trSub = document.createElement('TR');
					trSub.id = 'tr_menu'+i + iOpt;
					trSub.setAttribute('menu_reference',trSub.id)
					trSub.setAttribute('xml_window_name',menu[i].getElementsByTagName('option')[iOpt].getAttribute('windowTarget'));
						tdImg = document.createElement('TD');
						tdImg.setAttribute('class','img_submenu');
						tdImg.setAttribute('className','img_submenu');
							img = document.createElement('IMG');
							img.src = 'img/'+menu[i].getElementsByTagName('option')[iOpt].getAttribute('img');
						tdImg.appendChild(img);
						tdText = document.createElement('TD');
						tdText.setAttribute('class','text_sub_menu');
						tdText.setAttribute('className','text_sub_menu');
						tdText.innerHTML = menu[i].getElementsByTagName('option')[iOpt].getAttribute('value');
						tdShortcut = document.createElement('TD');
						tdShortcut.setAttribute('class','text_sub_menu');
						tdShortcut.setAttribute('className','text_sub_menu');
						
					trSub.onmouseover = function(){
						overMenu(document.getElementById(this.getAttribute('menu_reference')).id);
						if(this.getAttribute('has_sub_menu')=='true'){
							// TO DO
						}else{
							return false;
						}
					}
					trSub.onmouseout = function(){
						outMenu(document.getElementById(this.getAttribute('menu_reference')).id);
					}
					trSub.onmousedown = function(){
						//Do Something
						if(this.getAttribute('has_sub_menu')=='true'){
							alert('TRUE');
						}else{
							buildWindow(this.getAttribute('xml_window_name'));
						}
					}
					trSub.appendChild(tdImg);
					trSub.appendChild(tdText);
					trSub.appendChild(tdShortcut);
					tBodySub.appendChild(trSub);
				tableSub.appendChild(tBodySub);
				document.body.appendChild(tableSub);
				
				
				// Teste para verificar se existe um submenu nao opção
				if(menu[i].getElementsByTagName('option')[iOpt].getAttribute('hasChild') == 'true'){
						tdShortcut.style.backgroundImage = 'url(img/sub_menu_indicator.png)';
						tdShortcut.style.backgroundRepeat = 'no-repeat';
						tdShortcut.style.backgroundPosition = 'center';
						trSub.setAttribute('has_sub_menu','true');
						space_sub_menu = document.createElement('TD');
						//space_sub_menu.style.border = 'solid 1px';
						//space_sub_menu.style.fontSize = '1px';
						space_sub_menu.innerHTML = '';
						trSub.setAttribute('rowSpan','10');
						trSub.appendChild(space_sub_menu);
						
						divTempSubMenu = document.createElement('DIV');
						space_sub_menu.appendChild(divTempSubMenu);
				}
				
				//Calculo para colocar borda apenas no ultimo elemento 
				if(iOpt == menu[i].getElementsByTagName('option').length - 1){
					tableSub.style.borderBottom = '2px outset #eeeeee';
				}
				
				// Teste para separar o menu por categoria inserindo um separador
				if(menu[i].getElementsByTagName('option')[iOpt].getAttribute('separator')){
					trSeparator = document.createElement('TR');
						tdSeparator = document.createElement('TD');
						tdSeparator.setAttribute('colSpan','3');
						tdSeparator.style.fontSize = '2px';
						tdSeparator.style.borderBottom = '1px inset gray';
					trSeparator.appendChild(tdSeparator);
					tBodySub.appendChild(trSeparator);
				}
				//verifyChildMenu(menu[i].getElementsByTagName('option')[iOpt]);
				if(menu[i].getElementsByTagName('option')[iOpt].getAttribute('hasChild')){
					pos = verifyPosSubMenu(tdShortcut);
					verifyChildMenu(menu[i].getElementsByTagName('option')[iOpt].getElementsByTagName('sub')[0].getElementsByTagName('sub_option'),pos);
				}
			}
		}
}

// Remove o elemento botão direito da plataforma
function resetRightButtonMenus(){
	for(i=0;i<document.body.getElementsByTagName('DIV').length;i++)
	{
		divID = document.body.getElementsByTagName('DIV')[i].id.split('_');
		if(divID[0] == 'rightbutton')
		{
			document.body.removeChild(document.body.getElementsByTagName('DIV')[i]);
		}
		if(divID[0]== 'windowrightbutton')
		{
			document.body.removeChild(document.body.getElementsByTagName('DIV')[i]);
		}
	}
	document.getElementById('context_menu_icon_temp').style.display = 'none';
	document.getElementById('context_dockmenu_temp').style.display = 'none';
}

//Aloca o botão direito conforme a posição clicado na janela
function windowRightButtonMenu(event,obj){
	//alert(obj.getAttribute('xml_name'));
	//hiddenMenus();
	//alert(event);
	if ( !event ){event = window.event;}
	//alert(event);
	try{
		var target = event.target ? event.target : event.srcElement;
	}catch(e){}
	
	try{
		if(event.which == 3 || event.button == '0')
		{	
			for(i=0;i<windowRightButtonMenus.length;i++)
			{
				if(windowRightButtonMenus[i].getAttribute('windowReference') == obj.getAttribute('xml_name'))
				{	
					document.body.appendChild(windowRightButtonMenus[i]);				
					document.getElementById(windowRightButtonMenus[i].id).style.left= event.clientX;
					document.getElementById(windowRightButtonMenus[i].id).style.top= event.clientY;
				}
			}
		}
	}catch(e){}
}

//Aloca o botão direito conforme a posição clicada na plataforma
function rightButtonMenu(event){
	hiddenMenus();
	if ( !event ){event = window.event;}	
	var target = event.target ? event.target : event.srcElement;
	
	if(event.which == 3 || event.button == '0')
	{			
		for(i=0;i<rightButtonMenus.length;i++)
		{
			if(rightButtonMenus[i].getAttribute('frame_reference') == target.id)
			{	
				document.body.appendChild(rightButtonMenus[i]);				
				
				var sizeWindow = getSizeWindow();
				topMenu = rightButtonMenus[i].offsetTop + 30;
				leftMenu = rightButtonMenus[i].offsetLeft;
				
				widthMenu =  rightButtonMenus[i].offsetWidth;
				heightMenu = rightButtonMenus[i].offsetHeight;
				
				if(event.clientX + widthMenu > sizeWindow[0]){
					document.getElementById(rightButtonMenus[i].id).style.left = event.clientX -widthMenu;
				}else{
					document.getElementById(rightButtonMenus[i].id).style.left= event.clientX;
				}
				
				if(event.clientY + heightMenu + 24 > sizeWindow[1]){
					document.getElementById(rightButtonMenus[i].id).style.top= event.clientY - heightMenu;
				}else{
					document.getElementById(rightButtonMenus[i].id).style.top= event.clientY;
				}
			}
		}
	}
}

//Constroi os menus de botão direito
function buildRightButtonMenus(){

	xmlDoc =loadXmlDocument('conf/right_button_menu.xml');    	    // Carrega o arquivo XML com a definição de Menus do botao direito
	menu = xmlDoc.getElementsByTagName("menu"); 	   				// Variavel menu pega todas as tags <menu> do arquivo XML
	
	for(i=0;i<menu.length;i++)
	{
		frameMenuRightButton = document.createElement('DIV');
		frameMenuRightButton.setAttribute('class','rb_frame_menu');		
		frameMenuRightButton.setAttribute('className','rb_frame_menu');
		frameMenuRightButton.id = 'rightbutton_'+menu[i].getAttribute('name');
		frameMenuRightButton.setAttribute('frame_reference',menu[i].getAttribute('frameReference'));
		tableSubframeMenu = document.createElement('TABLE');
		tableSubframeMenu.setAttribute('cellspacing','0');
		tBodySubFrameMenu = document.createElement('TBODY');
		for(iOpt=0;iOpt<menu[i].getElementsByTagName('option').length;iOpt++)
		{
			trSubframeMenu = document.createElement('TR');
			trSubframeMenu.id = 'tr_frame_menu_'+i+iOpt;
			trSubframeMenu.setAttribute('menu_reference',trSubframeMenu.id);
			if(menu[i].getElementsByTagName('option')[iOpt].getAttribute('windowTarget') != null){
				trSubframeMenu.setAttribute('xml_window_name',menu[i].getElementsByTagName('option')[iOpt].getAttribute('windowTarget'));	
			}
			if(menu[i].getElementsByTagName('option')[iOpt].getAttribute('functionTarget') != null){
				trSubframeMenu.setAttribute('xml_function_name',menu[i].getElementsByTagName('option')[iOpt].getAttribute('functionTarget'));	
			}
			trSubframeMenu.onmouseover = function(){
				overMenu(document.getElementById(this.getAttribute('menu_reference')).id);
			}
			trSubframeMenu.onmouseout = function(){
				outMenu(document.getElementById(this.getAttribute('menu_reference')).id);
			}
			trSubframeMenu.onmousedown = function(){
				outMenu(this.id);
				if(this.getAttribute('xml_function_name')){
					exec(this.getAttribute('xml_function_name'));
				}	
				if(this.getAttribute('xml_window_name')){
					buildWindow(this.getAttribute('xml_window_name'))	
				} 
			}
			tdImgframeMenu = document.createElement('TD');
			tdImgframeMenu.setAttribute('class','rb_text_frame_menu');
			tdImgframeMenu.setAttribute('className','rb_text_frame_menu');
				imgFrameMenu = document.createElement('IMG');
				imgFrameMenu.src = 'img/'+menu[i].getElementsByTagName('option')[iOpt].getAttribute('img');
			tdImgframeMenu.appendChild(imgFrameMenu);
			tdTextFrameMenu = document.createElement('TD');			
			tdTextFrameMenu.setAttribute('class','rb_text_frame_menu');
			tdTextFrameMenu.setAttribute('className','rb_text_frame_menu');
			tdTextFrameMenu.style.paddingLeft = '6px';
			tdTextFrameMenu.innerHTML = menu[i].getElementsByTagName('option')[iOpt].getAttribute('value');
			trSubframeMenu.appendChild(tdImgframeMenu);
			trSubframeMenu.appendChild(tdTextFrameMenu);
			tBodySubFrameMenu.appendChild(trSubframeMenu);
			tableSubframeMenu.appendChild(tBodySubFrameMenu);

			// Teste para separar o menu por categoria inserindo um separador
				if(menu[i].getElementsByTagName('option')[iOpt].getAttribute('separator')){					
					trSeparator = document.createElement('TR');
						tdSeparator = document.createElement('TD');
						tdSeparator.setAttribute('colSpan','3');
						tdSeparator.style.fontSize = '2px';
						tdSeparator.style.paddingTop = '3px';
						tdSeparator.style.marginTop = '3px';
						tdSeparator.style.borderBottom = '1px inset gray';
					trSeparator.appendChild(tdSeparator);
					tBodySubFrameMenu.appendChild(trSeparator);
				}	
		}
		frameMenuRightButton.appendChild(tableSubframeMenu);
		rightButtonMenus.push(frameMenuRightButton);
	}
}

// Constroi os menus de botão direito de cada janela
function buildWindowRightButtonMenu(){
	xmlDoc =loadXmlDocument('conf/window_right_button_menu.xml');   // Carrega o arquivo XML com a definição de Menus do botao direito
	menu = xmlDoc.getElementsByTagName("menu"); 	   				// Variavel menu pega todas as tags <menu> do arquivo XML
	for(i=0;i<menu.length;i++)
	{
		frameMenuRightButton = document.createElement('DIV');
		frameMenuRightButton.setAttribute('class','rb_frame_menu');		
		frameMenuRightButton.setAttribute('className','rb_frame_menu');
		frameMenuRightButton.id = 'windowrightbutton_'+menu[i].getAttribute('name');
		frameMenuRightButton.setAttribute('windowReference',menu[i].getAttribute('windowReference'));
		tableSubframeMenu = document.createElement('TABLE');
		tableSubframeMenu.setAttribute('cellspacing','0');
		tBodySubFrameMenu = document.createElement('TBODY');
		for(iOpt=0;iOpt<menu[i].getElementsByTagName('option').length;iOpt++)
		{
			trSubframeMenu = document.createElement('TR');
			trSubframeMenu.id = 'window_tr_frame_menu_'+i+iOpt;
			trSubframeMenu.setAttribute('menu_reference',trSubframeMenu.id);
			trSubframeMenu.setAttribute('xml_window_name',menu[i].getElementsByTagName('option')[iOpt].getAttribute('windowTarget'));
			trSubframeMenu.setAttribute('xml_function_name',menu[i].getElementsByTagName('option')[iOpt].getAttribute('functionTarget'));
			trSubframeMenu.onmouseover = function(){
				overMenu(document.getElementById(this.getAttribute('menu_reference')).id);
			}
			trSubframeMenu.onmouseout = function(){
				outMenu(document.getElementById(this.getAttribute('menu_reference')).id);
			}
			trSubframeMenu.onmousedown = function(){
				outMenu(this.id);
				if(this.getAttribute('xml_function_name')){
					for(i=0;i<xml_functions.length;i++){
						if(xml_functions[i].getAttribute('name') == this.getAttribute('xml_function_name')){
							alert();
							exec(this.getAttribute('xml_function_name'),'sdasd');
						}
					}
				}	
				if(this.getAttribute('xml_window_name')){
					buildWindow(this.getAttribute('xml_window_name'))	
				} 
			}
			
			tdImgframeMenu = document.createElement('TD');
			tdImgframeMenu.setAttribute('class','rb_text_frame_menu');
			tdImgframeMenu.setAttribute('className','rb_text_frame_menu');
				imgFrameMenu = document.createElement('IMG');
				imgFrameMenu.src = 'img/'+menu[i].getElementsByTagName('option')[iOpt].getAttribute('img');
			tdImgframeMenu.appendChild(imgFrameMenu);
			tdTextFrameMenu = document.createElement('TD');			
			tdTextFrameMenu.setAttribute('class','rb_text_frame_menu');
			tdTextFrameMenu.setAttribute('className','rb_text_frame_menu');
			tdTextFrameMenu.style.paddingLeft = '6\px';
			tdTextFrameMenu.innerHTML = menu[i].getElementsByTagName('option')[iOpt].getAttribute('value');
			trSubframeMenu.appendChild(tdImgframeMenu);
			trSubframeMenu.appendChild(tdTextFrameMenu);
			tBodySubFrameMenu.appendChild(trSubframeMenu);
			tableSubframeMenu.appendChild(tBodySubFrameMenu);
		}
		frameMenuRightButton.appendChild(tableSubframeMenu);
		windowRightButtonMenus.push(frameMenuRightButton);
	}
}

function buildDockMenu(){
	var xmlDoc =loadXmlDocument('conf/menu.xml');    	           // Carrega o arquivo XML com a definição de Menus
	var optionsdock = xmlDoc.getElementsByTagName("dockmenu"); 	   // Variavel menu pega todas as tags <dockmenu> do arquivo XML
	for(var i=0;i < optionsdock[0].getElementsByTagName('option').length;i++){
		windowTarget = optionsdock[0].getElementsByTagName('option')[i].getAttribute('windowTarget');
		dockMenu.innerHTML += '<a href="#" onclick="buildWindow(\''+windowTarget+'\')"> <img window="'+windowTarget+'" onmousemove="displayLegend(event)" oncontextmenu="contextDockMenu(event,this)" id="img_'+optionsdock[0].getElementsByTagName('option')[i].getAttribute('name')+'" src="img/'+ optionsdock[0].getElementsByTagName('option')[i].getAttribute('img')+ '" lang="'+ optionsdock[0].getElementsByTagName('option')[i].getAttribute('value') +'"</a>';
		//dragdrop(document.getElementById(optionsdock[0].getElementsByTagName('option')[i].getAttribute('name')).id,'img_'+document.getElementById(optionsdock[0].getElementsByTagName('option')[i].getAttribute('name')).id);
		//dragdrop(document.getElementById(optionsdock[0].getElementsByTagName('option')[i].getAttribute('name').id),optionsdock[0].getElementsByTagName('option')[i].getAttribute('name').id);
	}
}

// Instancia o DockMenu
function setDockMenu(){
	
	dock = new dock("dock", 38, 100);
	setInterval("dock.run()", 16);
}

function buildContextDockMenu(){
	//alert(imgId);
	//document.getElementById(imgId).style.display = 'none';
	
	contextDockMenuTemp = document.createElement('DIV');
	contextDockMenuTemp .setAttribute('class','rb_frame_menu');		
	contextDockMenuTemp .setAttribute('className','rb_frame_menu');
	contextDockMenuTemp.id = 'context_dockmenu_temp';
	contextDockMenuTemp.style.position = 'absolute';
	contextDockMenuTemp.style.fontFamily = 'tahoma';
	contextDockMenuTemp.style.fontSize = '11px';
	contextDockMenuTemp.style.display = 'none';
	
		tableSubframeDockMenu = document.createElement('TABLE');
		tableSubframeDockMenu.setAttribute('cellspacing','0');
		tBodySubFrameDockMenu = document.createElement('TBODY');
		trSubframeDockMenu = document.createElement('TR');
		trSubframeDockMenu.id = 'trSubframeDockMenu';
		trSubframeDockMenu.setAttribute('menu_reference',trSubframeDockMenu.id);
			
		trSubframeDockMenu2 = document.createElement('TR');
		trSubframeDockMenu2.id = 'trSubframeDockMenu2';
		trSubframeDockMenu2.setAttribute('menu_reference',trSubframeDockMenu2.id);
		
		trSubframeDockMenu3 = document.createElement('TR');
		trSubframeDockMenu3.id = 'trSubframeMenu3';
		trSubframeDockMenu3.setAttribute('menu_reference',trSubframeDockMenu3.id);
			
		tdImgframeDockMenu = document.createElement('TD');
		tdImgframeDockMenu.setAttribute('class','rb_text_frame_menu');
		tdImgframeDockMenu.setAttribute('className','rb_text_frame_menu');
			imgFrameDockMenu = document.createElement('IMG');
			imgFrameDockMenu.src = 'img/open_window.png';
		tdImgframeDockMenu.appendChild(imgFrameDockMenu);
		tdTextFrameDockMenu = document.createElement('TD');			
		tdTextFrameDockMenu.setAttribute('class','rb_text_frame_menu');
		tdTextFrameDockMenu.setAttribute('className','rb_text_frame_menu');
		tdTextFrameDockMenu.style.paddingLeft = '6px';
		tdTextFrameDockMenu.innerHTML = 'Abrir';
		
		tdImgframeDockMenu2 = document.createElement('TD');
		tdImgframeDockMenu2.setAttribute('class','rb_text_frame_menu');
		tdImgframeDockMenu2.setAttribute('className','rb_text_frame_menu');
			imgFrameDockMenu2 = document.createElement('IMG');
			imgFrameDockMenu2.src = 'img/delete.png';
		tdImgframeDockMenu2.appendChild(imgFrameDockMenu2);
		tdTextFrameDockMenu2 = document.createElement('TD');			
		tdTextFrameDockMenu2.setAttribute('class','rb_text_frame_menu');
		tdTextFrameDockMenu2.setAttribute('className','rb_text_frame_menu');
		tdTextFrameDockMenu2.style.paddingLeft = '6px';
		tdTextFrameDockMenu2.innerHTML = 'Excluir';
		
		tdImgframeDockMenu3 = document.createElement('TD');
		tdImgframeDockMenu3.setAttribute('class','rb_text_frame_menu');
		tdImgframeDockMenu3.setAttribute('className','rb_text_frame_menu');
			imgFrameDockMenu3 = document.createElement('IMG');
			imgFrameDockMenu3.src = 'img/delete.png';
		tdImgframeDockMenu3.appendChild(imgFrameDockMenu3);
		tdTextFrameDockMenu3 = document.createElement('TD');			
		tdTextFrameDockMenu3.setAttribute('class','rb_text_frame_menu');
		tdTextFrameDockMenu3.setAttribute('className','rb_text_frame_menu');
		tdTextFrameDockMenu3.style.paddingLeft = '6px';
		tdTextFrameDockMenu3.innerHTML = 'Mover para o Desktop';
		
		trSubframeDockMenu.appendChild(tdImgframeDockMenu);
		trSubframeDockMenu.appendChild(tdTextFrameDockMenu);
		trSubframeDockMenu2.appendChild(tdImgframeDockMenu2);
		trSubframeDockMenu2.appendChild(tdTextFrameDockMenu2);
		trSubframeDockMenu3.appendChild(tdImgframeDockMenu3);
		trSubframeDockMenu3.appendChild(tdTextFrameDockMenu3);
		tBodySubFrameDockMenu.appendChild(trSubframeDockMenu);
		tBodySubFrameDockMenu.appendChild(trSubframeDockMenu2);
		tBodySubFrameDockMenu.appendChild(trSubframeDockMenu3);
		tableSubframeDockMenu.appendChild(tBodySubFrameDockMenu);
	contextDockMenuTemp.appendChild(tableSubframeDockMenu);
	
	document.getElementById('plataform').appendChild(contextDockMenuTemp);
	
}

function contextDockMenu(event,obj){
	hiddenMenus();
	if ( !event ){event = window.event;}	
	var target = event.target ? event.target : event.srcElement;
	
	if(event.which == 3 || event.button == '0'){
		trSubframeDockMenu.onmouseover = function(){
			overMenu(document.getElementById(this.getAttribute('menu_reference')).id);
		}
		trSubframeDockMenu.onmouseout = function(){
			outMenu(document.getElementById(this.getAttribute('menu_reference')).id);
		}
		trSubframeDockMenu.onmousedown = function(){
			outMenu(this.id);
			buildWindow(obj.getAttribute('window'));
		}
		
		trSubframeDockMenu2.onmouseover = function(){
			overMenu(document.getElementById(this.getAttribute('menu_reference')).id);
		}
		trSubframeDockMenu2.onmouseout = function(){
			outMenu(document.getElementById(this.getAttribute('menu_reference')).id);
		}
		trSubframeDockMenu2.onmousedown = function(){
			outMenu(this.id);
			if(confirm('Tem certeza que deseja excluir este icone?')){
				toremove = document.getElementById(obj.id);
				toremove.parentNode.removeChild(toremove);
			}else{
				return false;
			}
		}
		trSubframeDockMenu3.onmouseover = function(){
			overMenu(document.getElementById(this.getAttribute('menu_reference')).id);
		}
		trSubframeDockMenu3.onmouseout = function(){
			outMenu(document.getElementById(this.getAttribute('menu_reference')).id);
		}
		trSubframeDockMenu3.onmousedown = function(){
			outMenu(this.id);
			toremove = document.getElementById(obj.id);
			toremove.parentNode.removeChild(toremove);
			moveIconToDesktop(obj);
		}
		
		document.getElementById('context_dockmenu_temp').style.display = 'block';
		document.getElementById('context_dockmenu_temp').style.top = event.clientY;
		document.getElementById('context_dockmenu_temp').style.left = event.clientX;
	}
}


function buildContextMenuIcon(){

	contextMenuIconTemp = document.createElement('DIV');
	contextMenuIconTemp .setAttribute('class','rb_frame_menu');		
	contextMenuIconTemp .setAttribute('className','rb_frame_menu');
	contextMenuIconTemp.id = 'context_menu_icon_temp';
	contextMenuIconTemp.style.position = 'absolute';
	contextMenuIconTemp.style.fontFamily = 'tahoma';
	contextMenuIconTemp.style.fontSize = '11px';
	contextMenuIconTemp.style.display = 'none';
	
		tableSubframeMenu = document.createElement('TABLE');
		tableSubframeMenu.setAttribute('cellspacing','0');
		tBodySubFrameMenu = document.createElement('TBODY');
		trSubframeMenu = document.createElement('TR');
		trSubframeMenu.id = 'trSubframeMenu';
		trSubframeMenu.setAttribute('menu_reference',trSubframeMenu.id);
			
		trSubframeMenu2 = document.createElement('TR');
		trSubframeMenu2.id = 'trSubframeMenu2';
		trSubframeMenu2.setAttribute('menu_reference',trSubframeMenu2.id);
			
		tdImgframeMenu = document.createElement('TD');
		tdImgframeMenu.setAttribute('class','rb_text_frame_menu');
		tdImgframeMenu.setAttribute('className','rb_text_frame_menu');
			imgFrameMenu = document.createElement('IMG');
			imgFrameMenu.src = 'img/open_window.png';
		tdImgframeMenu.appendChild(imgFrameMenu);
		tdTextFrameMenu = document.createElement('TD');			
		tdTextFrameMenu.setAttribute('class','rb_text_frame_menu');
		tdTextFrameMenu.setAttribute('className','rb_text_frame_menu');
		tdTextFrameMenu.style.paddingLeft = '6px';
		tdTextFrameMenu.innerHTML = 'Abrir';
		
		tdImgframeMenu2 = document.createElement('TD');
		tdImgframeMenu2.setAttribute('class','rb_text_frame_menu');
		tdImgframeMenu2.setAttribute('className','rb_text_frame_menu');
			imgFrameMenu2 = document.createElement('IMG');
			imgFrameMenu2.src = 'img/delete.png';
		tdImgframeMenu2.appendChild(imgFrameMenu2);
		tdTextFrameMenu2 = document.createElement('TD');			
		tdTextFrameMenu2.setAttribute('class','rb_text_frame_menu');
		tdTextFrameMenu2.setAttribute('className','rb_text_frame_menu');
		tdTextFrameMenu2.style.paddingLeft = '6px';
		tdTextFrameMenu2.innerHTML = 'Excluir';
		
		
		trSubframeMenu.appendChild(tdImgframeMenu);
		trSubframeMenu.appendChild(tdTextFrameMenu);
		trSubframeMenu2.appendChild(tdImgframeMenu2);
		trSubframeMenu2.appendChild(tdTextFrameMenu2);
		tBodySubFrameMenu.appendChild(trSubframeMenu);
		tBodySubFrameMenu.appendChild(trSubframeMenu2);
		tableSubframeMenu.appendChild(tBodySubFrameMenu);
	contextMenuIconTemp.appendChild(tableSubframeMenu);
	
	document.body.appendChild(contextMenuIconTemp);
}


function contextMenuIcon(event,obj){
	hiddenMenus();
	if ( !event ){event = window.event;}	
	var target = event.target ? event.target : event.srcElement;
	
	if(event.which == 3 || event.button == '0'){
		trSubframeMenu.onmouseover = function(){
			overMenu(document.getElementById(this.getAttribute('menu_reference')).id);
		}
		trSubframeMenu.onmouseout = function(){
			outMenu(document.getElementById(this.getAttribute('menu_reference')).id);
		}
		trSubframeMenu.onmousedown = function(){
			outMenu(this.id);
			buildWindow(obj.getAttribute('window'));
		}
		
		trSubframeMenu2.onmouseover = function(){
			overMenu(document.getElementById(this.getAttribute('menu_reference')).id);
		}
		trSubframeMenu2.onmouseout = function(){
			outMenu(document.getElementById(this.getAttribute('menu_reference')).id);
		}
		trSubframeMenu2.onmousedown = function(){
			outMenu(this.id);
			if(confirm('Tem certeza que deseja excluir este icone?')){
				document.body.removeChild(document.getElementById(obj.id));	
			}else{
				return false;
			}
		}
		
		document.getElementById('context_menu_icon_temp').style.display = 'block';
		document.getElementById('context_menu_icon_temp').style.top = event.clientY;
		document.getElementById('context_menu_icon_temp').style.left = event.clientX;
	}
}





