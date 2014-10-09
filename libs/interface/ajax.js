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
 
function ajax() {
   try 
   {
      xmlhttp = new XMLHttpRequest();
   }
   catch(ee) {
      try 
	  {
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	  }
      catch(e) {
         try 
		 {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
         }
         catch(E) {
            xmlhttp = false;
         }
      }
   }
}