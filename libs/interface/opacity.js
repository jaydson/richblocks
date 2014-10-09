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


function opacity(id, opacStart, opacEnd, millisec) {
	//speed for each frame
	var speed = Math.round(millisec / 100);
	var timer = 0;

	//determine the direction for the blending, if start and end are the same nothing happens
	if(opacStart > opacEnd) {
		for(i = opacStart; i >= opacEnd; i--) {
			setTimeout("changeOpac(" + i + ",'" + id + "')",(timer * speed));
			timer++;
		}
	} else if(opacStart < opacEnd) {
		for(i = opacStart; i <= opacEnd; i++)
			{
			setTimeout("changeOpac(" + i + ",'" + id + "')",(timer * speed));
			timer++;
		}
	}
}

//change the opacity for different browsers
function changeOpac(opacity, id) {
	var object = document.getElementById(id).style; 
	object.opacity = (opacity / 100);
	object.MozOpacity = (opacity / 100);
	object.KhtmlOpacity = (opacity / 100);
	object.filter = "alpha(opacity=" + opacity + ")";
}

function shiftOpacity(id, millisec) {
	//if an element is invisible, make it visible, else make it ivisible
	if(document.getElementById(id).style.opacity == 0) {
		opacity(id, 0, 100, millisec);
	} else {
		opacity(id, 100, 0, millisec);
	}
}

function blendimage(divid, imageid, imagefile, millisec) {
	var speed = Math.round(millisec / 100);
	var timer = 0;
	
	//set the current image as background
	document.getElementById(divid).style.backgroundImage = "url(" + document.getElementById(imageid).src + ")";
	
	//make image transparent
	changeOpac(0, imageid);
	
	//make new image
	document.getElementById(imageid).src = imagefile;

	//fade in image
	for(i = 0; i <= 100; i++) {
		setTimeout("changeOpac(" + i + ",'" + imageid + "')",(timer * speed));
		timer++;
	}
}

function currentOpac(id, opacEnd, millisec) {
	//standard opacity is 100
	var currentOpac = 100;
	
	//if the element has an opacity set, get it
	if(document.getElementById(id).style.opacity < 100) {
		currentOpac = document.getElementById(id).style.opacity * 100;
	}

	//call for the function that changes the opacity
	opacity(id, currentOpac, opacEnd, millisec)
}