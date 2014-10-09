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
var tabs = new Array();
var appname = null;
var frameMinimizeds;
var plataform_windows = new Array();
var plataform_windows_name = new Array();
var plataform_icons = new Array();
var xml_windows = new Array();
var xml_functions = new Array();
var window_z_index = 0;
var window_focus = null;
var zIndex_blackBackground = 1000000;
var frameInvisible = document.createElement('DIV');
var frameProperties = document.createElement('DIV');
var frameTableIcons = document.createElement('TABLE');
var frameMinimizeds = document.createElement('DIV');
var frameSysTray = document.createElement('DIV');
var frameDockMenu = document.createElement('DIV'); 
var	frameBarTop = document.createElement('DIV');
var img_back = document.createElement('IMG');
var divBlock = document.createElement('DIV');
var RB_FULL_SCREEN = false;
var RB_BAR_APPLICATION_DISPLAY = true;
var RB_BAR_SHORTCUT_DISPLAY = true;
var RB_BAR_DOCKMENU_DISPLAY = true;
var xm = xmb = ov = 0;
var M = true;

function buildPlataform(){
	
	//Div da janela quando arrastada
	divBlock.style.position = 'absolute';
	divBlock.style.border = 'dashed 2px';
	divBlock.style.borderColor = '#AAAAAA'; 
	divBlock.style.display = 'none';
	document.body.appendChild(divBlock);
	
	//Frame Invisivisel - DIV preto transparente(para bloquear acesso)
	frameInvisible.style.width = '100%';
	frameInvisible.style.height = '100%';
	frameInvisible.style.position = 'absolute';
	frameInvisible.id = 'invisible';
	frameInvisible.style.top = '0px';
	frameInvisible.style.left = '0px';
	frameInvisible.style.zIndex = zIndex_blackBackground;
	frameInvisible.style.display = 'none';
	frameInvisible.style.filter="alpha(opacity='40')";
	frameInvisible.style.MozOpacity = '0.4'
	frameInvisible.innerHTML = 'a';
	frameInvisible.style.backgroundColor = '#000000';
	
	// Barra do Topo
	frameBarTop.setAttribute('class','frame_bar_top');
	frameBarTop.setAttribute('className','frame_bar_top');
	frameBarTop.id = 'frame_bar_top';

	// Frame onde ficam os menus
	frameMenu = document.createElement('DIV');
	frameMenu.setAttribute('class','frame_menu');
	frameMenu.setAttribute('className','frame_menu');
	frameMenu.id = 'frame_menu';
	
	// Frame onde ficam os submenus
	frameSubMenu = document.createElement('DIV');
	frameSubMenu.setAttribute('class','frame_submenu');
	frameSubMenu.setAttribute('className','frame_submenu');
	frameSubMenu.id = 'frame_submenu';
	
	// Frame onde ficam os botões de acesso rápido atalho
	frameButtons = document.createElement('DIV');
	frameButtons.setAttribute('class','frame_buttons');
	frameButtons.setAttribute('className','frame_buttons');
	frameButtons.id = 'frame_buttons';
	frameButtons.oncontextmenu = function(){
	}
	
	frameLayout = document.createElement('DIV');
	frameLayout.setAttribute('class','frame_layout');
	frameLayout.setAttribute('className','frame_layout');
	frameLayout.id = 'frame_layout';

	frameProperties.style.width = '100%';
	frameProperties.style.height = '100%';
		img_back.src = 'img/back_body_image.jpg';
		img_back.style.width = '100%';
		img_back.style.height = '100%';
		img_back.id = 'frame_properties';
		img_back.onmousedown = function(){
			return false;
		}
		
	frameProperties.appendChild(img_back);
	
	//Tabela de Icones
	frameTableIcons.setAttribute('border','1');
	frameTableIcons.style.position = 'absolute';
	frameTableIcons.style.top = '72px';
	//frameTableIcons.style.left = '7px';
	frameTableIcons.style.width = '100%';
	frameTableIcons.style.height = '100%';
		tbodyFrameTableIcons = document.createElement('TBODY');
	frameTableIcons.appendChild(tbodyFrameTableIcons);
	
	// DIV onde fica o DockMenu
	frameDockMenu.style.width = '100%';
	frameDockMenu.style.height = '30px';
	frameDockMenu.id = 'frame_dock_menu';
	frameDockMenu.setAttribute('align','center');
	frameDockMenu.style.position = 'absolute';
	frameDockMenu.onmouseout = function(){
		hiddenLegendInnerHTML();
	}
	
	// DIV onde fica a legenda do DockMenu
	dockLegendDock = document.createElement('DIV');
	dockLegendDock.setAttribute('align','center');
	dockLegendDock.style.position= 'absolute';
	//dockLegendDock.style.width= '500px';
	//dockLegendDock.style.zIndex = '99999999';
	dockLegendDock.id = 'legend';
	//dockLegendDock.innerHTML = 'sdklsah fnhas jkfhsdjkhfjk<br>lszdhfjksdg<br>hfjkhsdjklfhsdl<br>fhjsdhfsdkl<br>';
	
	// DIV onde ficam as imagens do DockMenu
	dockMenu = document.createElement('DIV');
	dockMenu.id = 'dock';
	dockMenu.style.zIndex = '10000';
	dockMenu.style.verticalAlign = 'top';
	
	document.body.appendChild(dockLegendDock);
	frameDockMenu.appendChild(dockMenu);
	
	// DIV onde ficam as janelas minimizadas
	frameMinimizeds.id = 'frame_minimizeds';
	frameMinimizeds.style.width = '100%';
	frameMinimizeds.style.height = '30px';
	frameMinimizeds.style.background = '#D4D0C8';
	frameMinimizeds.style.border = '2px inset #eeeeee';
	frameMinimizeds.style.position = 'absolute';
	frameMinimizeds.style.fontFamily = 'tahoma';
	frameMinimizeds.style.fontSize = '11px';
	frameMinimizeds.style.padding = '2px';
	frameMinimizeds.style.zIndex = '10001';
	
	// DIV onde fica o SYSTRAY
	frameSysTray.id = 'frame_systray';
	frameSysTray.style.width = '100px';
	frameSysTray.style.paddingLeft = '42px';
	frameSysTray.style.paddingTop = '5px';
	frameSysTray.style.position = 'absolute';
	frameSysTray.style.zIndex = '100';
	frameSysTray.style.fontFamily = 'Tahoma';
	frameSysTray.style.fontSize = '11px';
	
	// Aloca todos elementos na plataforma ( corpo do documento HTML )
	document.body.appendChild(frameSysTray);
	document.body.appendChild(frameBarTop);
	document.body.appendChild(frameMenu);
	document.body.appendChild(frameSubMenu);
	document.body.appendChild(frameButtons);
	document.body.appendChild(frameProperties);	
	document.body.appendChild(frameMinimizeds);	
	document.body.appendChild(frameInvisible);
		//document.body.appendChild(frameTableIcons);
	document.body.appendChild(frameDockMenu);
	
	//Detecta o Browser
	browserDetect();
		
	//Aloca o framaMinimizeds sempre na posição correta
	setMinizeds();
	
	//Aloca o sysTray na posição correta
	setSysTrayPosition();
	
	// Constroi o menu superior, os menus de botao direito da plataforma e os menus de botão direito de cada janela
	buildMenu();
	buildRightButtonMenus();
	//buildWindowRightButtonMenu();
	buildDockMenu();
	buildIcons();
	buildContextMenuIcon();
	buildContextDockMenu();
	
	//Tabela de Icones
	mountTableIcons();
	
	// Relógio
	clock();
	
	setDockMenu();
	
	// Botao direito
	document.oncontextmenu = rightButtonMenu;
	img_back.oncontextmenu = rightButtonMenu;
	frameTableIcons.oncontextmenu = rightButtonMenu;
	
	//Desabilita o evento selecionar
	disableSelection(document.body);
	disableSelection(frameBarTop);
	disableSelection(frameMenu);
	disableSelection(frameDockMenu);
	disableSelection(frameProperties);
	disableSelection(img_back);
	
	// Le o arquivo XML e armazena no array GLOBAL xml_windows
	loadWindows();
	
	// Le o arquivo XML e armazena no array GLOBAL xml_functions
	loadFunctions();
	
	//Carrega as configurações do Sistema
	loadAppConfiguration();
}

//MOUSEDOWN
document.onmousedown = function(event){		
		if ( !event ){
		   event = window.event;
		 }
		 
		var target = event.target ? event.target : event.srcElement;
		var id = target.id;
		id = id.split('_');
		if(id[0] == 'menu')
			return false;
			
		hiddenMenus();
		activeMenu = false;
		resetStyleMenus();
		resetRightButtonMenus();
		hiddenLegendInnerHTML();
}

//KEYDOWN
document.onkeydown = function(event){
	if ( !event ){
		   event = window.event;
	}
	var key_code = event.keyCode  ? event.keyCode  :
				   event.charCode ? event.charCode :
				   event.which    ? event.which    : void 0;
			   	
	//Bloqueando F5
	if(key_code == 116){
	    cancelEvent(event);
	}
	    
}

//KEYPRESS
document.onkeypress = function(event){
	if ( !event ){
		   event = window.event;
	}
	var key_code = event.keyCode  ? event.keyCode  :
				   event.charCode ? event.charCode :
				   event.which    ? event.which    : void 0;

	if(key_code == '27'){
		hiddenMenus();
		resetRightButtonMenus();
		activeMenu = false;
		resetStyleMenus();
	}
}
