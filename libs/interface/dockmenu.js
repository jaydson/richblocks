// ================================================================
//                   ------ dock menu -------
// script by Gerard Ferrandez - Ge-1-doot - February 2006
// http://www.dhteumeuleu.com
//
// Todos os créditos deste script vai para o Gerard Ferrandez
// Quem tiver oportunidade acesse o site dele. É muito bom o que o cara faz
//
// ================================================================

function dock(dock, sMin, sMax)
{
	this.icons = document.getElementById(dock).getElementsByTagName('img');
	this.N = this.icons.length;
	this.s = sMin;
	this.ovk = 0;
	this.pxLeft = function(o)
	{
		for(var x=-document.documentElement.scrollLeft; o != null; o = o.offsetParent) x+=o.offsetLeft;
		return x;
	}
	for(var i=0;i<this.N;i++)
	{
		with(this.icons[i])
		{
			style.width = sMin+"px";
			style.height = sMin+"px";
			className = "dockicon";
		}
	}
	this.run = function()
	{
		with(this)
		{
			for(var i=0;i<N;i++)
			{
				var o = icons[i];
				var W = parseInt(o.style.width);				
				if(ov && ov.className=="dockicon")
				{
					if(ov!=ovk)
					{
						ovk=ov;
						document.getElementById("legend").innerHTML = ov.lang;
						//document.getElementById("legend").style.top = parseInt(document.getElementById('frame_dock_menu').style.top) + 20;
						//document.getElementById("legend").style.left = ov.offsetLeft;
						//document.getElementById("legend").style.width = ov.offsetWidth;
						//alert(document.getElementById("legend").style.top + document.getElementById("legend").innerHTML);
						//alert(ov.offsetTop);
					}
					if(M) W = Math.max((s*Math.cos(((pxLeft(o)+W/2)-xm)/sMax)),sMin);
					s = Math.min(sMax,s+1);
				}
				else
				{
					s = Math.max(s-1,sMin);
					W = Math.max(W-N,sMin);
				}
				o.style.width = W+"px";
				o.style.height = W+"px";
			}
			if(s >= sMax) M = false;
		}
	}
}