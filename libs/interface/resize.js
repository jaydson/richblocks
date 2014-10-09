/* 
   Copyright 2008 Jaydson Gomes,Felipe Nascimento - RichBlocks  
   
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


function resizing(event){

	if(!event){
		event = window.event;
	}

	if(event.clientX - parseInt(document.getElementById(objToResize_ID).style.left) <= 200){
		document.getElementById(objToResize_ID).style.width= '200px';
		document.getElementById(objContentToResize_ID).style.width = 200 - 16 + 'px';
		return;
	}
	if(event.clientY - parseInt(document.getElementById(objToResize_ID).style.top) <= 100){
		document.getElementById(objToResize_ID).style.height= '100px';
		document.getElementById(objContentToResize_ID).style.height = 100 - 46 + 'px';
		return;
	}
	var ev = event || window.event;
	var mousePos = mouseCoords(ev);
  	mouseOffset = getPosition(objToResize_ID, ev);	
	divBlock.id = 'block_' + document.getElementById(objToResize_ID).id;
	divBlock.style.width = document.getElementById(objToResize_ID).style.width;
	divBlock.style.height = document.getElementById(objToResize_ID).style.height;
	divBlock.style.zIndex = document.getElementById(objToResize_ID).style.zIndex + 1;
	divBlock.style.display = 'block';
	divBlock.style.left = mousePos.x - mouseOffset.x + 'px';
	divBlock.style.top = mousePos.y - mouseOffset.y + 'px';
	document.getElementById(objToResize_ID).style.width= event.clientX - parseInt(document.getElementById(objToResize_ID).style.left);
	document.getElementById(objToResize_ID).style.height= event.clientY - parseInt(document.getElementById(objToResize_ID).style.top);
	
	if(document.all){
		document.getElementById(objContentToResize_ID).style.width = parseInt(document.getElementById(objToResize_ID).style.width) - 5 + 'px';
		document.getElementById(objContentToResize_ID).style.height = parseInt(document.getElementById(objToResize_ID).style.height) - 46 + 'px';
	}else{
		document.getElementById(objContentToResize_ID).style.width = parseInt(document.getElementById(objToResize_ID).style.width) - 8 + 'px';
		document.getElementById(objContentToResize_ID).style.height = parseInt(document.getElementById(objToResize_ID).style.height) - 46 + 'px';
	}
	
	document.getElementById(objToResize_ID).original_width = parseInt(document.getElementById(objToResize_ID).style.width) - 16 + 'px';
	document.getElementById(objToResize_ID).original_height = parseInt(document.getElementById(objToResize_ID).style.height) - 60 + 'px';
	
}

function stopResizing(event){
	if(!event){
		event = window.event;
	}

	if(window.removeEventListener){
		window.removeEventListener('mousemove', resizing, true);
		window.removeEventListener('mouseup', stopResizing, true);
	}else if(document.detachEvent){
		document.detachEvent('onmousemove', resizing);
		document.detachEvent('onmouseup', stopResizing);
	}
}
