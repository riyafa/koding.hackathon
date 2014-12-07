
    
    function draw(n,rep){
        var cvs=document.getElementsByTagName('canvas')[0];   
            /** 
             * @type CanvasRenderingContext2D 
             **/
    var ctx=cvs.getContext('2d');
    
    var lines=[];
            
            ctx.beginPath();
            var randomX;
            var randomY;
            
            ctx.lineWidth=3;
            ctx.font  = '5'+' Arial';
            var weights=[];
            var lastRandomx=Math.random()*200;
            var lastRandomy=Math.random()*200;
            lines.push({              // store point to create a poly-line
                    x: lastRandomx,
                    y: lastRandomy
                  });
            for (var i = 0; i <n ; i++) {
                var cwidth = cvs.width;
		var cheight = cvs.height;                
                randomX = Math.random()*cwidth*2/3;
		randomY = Math.random()*cheight*2/3;
                weights.push(Math.round(Math.random()*20)); 
                var p1={x:lastRandomx,y:lastRandomy};
                var p2={x:randomX,y:randomY};
               //var p1 = {x:200,y:200};
                //var p2 = {x:400,y:300};	
                drawLabel(ctx,weights[i].toString(),p1,p2,'center',10);			
                ctx.fillRect(randomX,randomY,5,5);		
		ctx.moveTo(lastRandomx,lastRandomy);
		ctx.lineTo(randomX,randomY);               
                lastRandomx=randomX;
                lastRandomy=randomY;
                lines.push({              // store point to create a poly-line
                    x: randomX,
                    y: randomY
                  });
                
            }
            for (var i = 0; i < rep; i++) {
                var rand=Math.round(rep*Math.random());
                ctx.lineTo(lines[rand].x,lines[rand].y);
                 lines.push({              // store point to create a poly-line
                    x: lines[rand].x,
                    y: lines[rand].y
                  });
                  weights.push(Math.round(Math.random()*20)); 
                    p1={x:lastRandomx,y:lastRandomy};
                    p2={x:randomX,y:randomY};               	
                drawLabel(ctx,weights[n+i].toString(),p1,p2,'center',10);	
            } 
            ctx.closePath();
            ctx.stroke();
            
             cvs.addEventListener('click',
                            function(e) {

                var r = cvs.getBoundingClientRect(), // adjust to proper mouse position
                    x = e.clientX - r.left,
                    y = e.clientY - r.top,
                    i = 0;

                // for each line segment, build segment to path and check
                for(var m=lines.length; i < m - 1; i++) {
                  ctx.beginPath();                        // new segment
                  ctx.moveTo(lines[i].x, lines[i].y);     // start is current point
                  ctx.lineTo(lines[i+1].x, lines[i+1].y); // end point is next
                  if (ctx.isPointInStroke(x, y)) {        // x,y is on line?
                    ctx.strokeStyle = "red";              // stroke red for demo
                    ctx.stroke();
                    break;
                  }
                }
              });
    };  
   
function drawLabel( ctx, text, p1, p2, alignment, padding ){
                ctx.fillStyle='red';
		if (!alignment) alignment = 'center';
		if (!padding) padding = 0;
		
		var dx = p2.x - p1.x;
		var dy = p2.y - p1.y;
		var len = Math.sqrt(dx*dx+dy*dy);
		var avail = len - 2*padding;
		
		var textToDraw = text;
		if (ctx.measureText && ctx.measureText(textToDraw).width > avail){
			while (textToDraw && ctx.measureText(textToDraw+"…").width > avail) textToDraw = textToDraw.slice(0,-1);
			textToDraw += "…";
		}

		// Keep text upright
		var angle = Math.atan2(dy,dx);
		if (angle < -Math.PI/2 || angle > Math.PI/2){
			var p = p1;
			p1 = p2;
			p2 = p;
			dx *= -1;
			dy *= -1;
			angle -= Math.PI;
		}
		
		var p, pad;
		if (alignment==='center'){
			p = p1;
			pad = 1/2;
		} else {
			var left = alignment==='left';
			p = left ? p1 : p2;
			pad = padding / len * (left ? 1 : -1);
		}
		ctx.save();
		ctx.textAlign = alignment;
		ctx.translate(p.x+dx*pad,p.y+dy*pad);
		ctx.rotate(angle);
		ctx.fillText(textToDraw,0,0);
		ctx.restore();                
	};
        

        
window.addEventListener('load',function(){ draw(7,3); },false);