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
zIndexMax = 99;
var URL_PAGE='';

//Função que Carrega o XML de Janelas
function loadWindows(){
	xmlDoc =loadXmlDocument('conf/windows.xml');    	
	windows = xmlDoc.getElementsByTagName("window"); 	 
	
	for(i=0;i<windows.length;i++){
		xml_windows.push(windows[i]);
	}
}	

// Função que constroi a Janela, setando os atributos
function constructWindow(XMLwindow){	
	objWindow = new Window(XMLwindow.getAttribute('ajax'),XMLwindow.getAttribute('newInstance'),XMLwindow.getAttribute('forceZindex'));
	if(URL_PAGE){
		var src = URL_PAGE; 
	}else{
		var src = XMLwindow.getAttribute('pageSrc');
	}
	
	if(XMLwindow.getAttribute('newInstance') == 'false'){
		for(i in plataform_windows_name){
			if(XMLwindow.getAttribute('name') == i){
				alert('Não são permitidas 2 istâncias desta janela no Sistema.');
				return false;
			}
		}
	}

	//alert(XMLwindow.getAttribute('newInstance'));
	objWindow.setProperties(XMLwindow.getAttribute('name'),
							XMLwindow.getAttribute('title'),
							XMLwindow.getAttribute('description'),
							XMLwindow.getAttribute('defaultTop'),
							XMLwindow.getAttribute('defaultLeft'),
							XMLwindow.getAttribute('defaultWidth'),
							XMLwindow.getAttribute('defaultHeight'),
							src,
							XMLwindow.getAttribute('defaultFooter'),
							XMLwindow.getAttribute('newInstance'),
							'',
							XMLwindow.getAttribute('posAbsolute'));
	objWindow.setActions(eval(XMLwindow.getAttribute('minimize')),eval(XMLwindow.getAttribute('maximize')),eval(XMLwindow.getAttribute('close')),eval(XMLwindow.getAttribute('drag')),eval(XMLwindow.getAttribute('resize')));
	theWindow = objWindow.build();
	plataform_windows[theWindow.id] = theWindow;
	plataform_windows_name[objWindow.getXMLname()] = objWindow.getXMLname();
	changeBackgroundWindowBar(theWindow.id);
}

//Função que recebe o nome e procurra no array de janelas a janela a ser criada
function buildWindow(nameWindow,url){
	error = null;
	URL_PAGE = url;
	
	for(i=0;i<xml_windows.length;i++){		
		if(xml_windows[i].getAttribute('name') == nameWindow){			
			constructWindow(xml_windows[i]);
				return true;
		}else{
			  error = 'Erro ao tentar encontrar a janela de nome "'+nameWindow+'". \nVerifique no arquivo menu.xml se existe alguma janela com este nome.';
		}
	}
	if(error){
		alert(error);
	}
}

	