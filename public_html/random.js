function draw(n,rep){
    var Edge = function(source, sink, capacity) {
        this.source = source;
        this.sink = sink;
        this.capacity = capacity;
    };

// Main class to manage the network
    var Graph = function() {
        this.edges = {};
        this.nodes = [];
        this.nodeMap = {};
        // Add a node to the graph
        this.addNode = function(node) {
        this.nodes.push(node);
        this.nodeMap[node] = this.nodes.length-1;
        this.edges[node] = [];
    };
    
    // Add an edge from source to sink with capacity
    this.addEdge = function(source, sink, capacity) {
        // Create the two edges = one being the reverse of the other
        this.edges[source].push(new Edge(source, sink, capacity));
        this.edges[sink].push(new Edge(sink, source, capacity));
    };
    // Does edge from source to sink exist?
    this.edgeExists = function(source, sink) {
        if(this.edges[source] !== undefined)
            for(var i=0;i<this.edges[source].length;i++)
                if(this.edges[source][i].sink === sink)
                    return this.edges[source][i];
                    return null;
                };
    };

    function Prim(graph) {
        var result = [];
        var usedNodes = {};
        function findMin(g) {
            var min = [999999,null];
            for(var i=0;i<result.length;i++)
                for(var n=0;n<g.edges[result[i]].length;n++)
                    if(g.edges[result[i]][n].capacity < min[0] && usedNodes[g.edges[result[i]][n].sink] === undefined)
                        min = [g.edges[result[i]][n].capacity, g.edges[result[i]][n].sink];
            return min[1];
        }
        // Pick random start point
        var node = g.nodes[Math.round(Math.random()*(g.nodes.length-1))];
        result.push(node);
        usedNodes[node] = true;
        var min = findMin(g);
        while(min !==null) {
            result.push(min);
            usedNodes[min] = true;
            min = findMin(g);
        }
        return result;
    };

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
                		
                ctx.fillRect(randomX,randomY,5,5);		
		ctx.moveTo(lastRandomx,lastRandomy);
		ctx.lineTo(randomX,randomY); 
                weights.push(Math.round(Math.random()*20)); 
                var p1={x:lastRandomx,y:lastRandomy};
                var p2={x:randomX,y:randomY};
               //var p1 = {x:200,y:200};
                //var p2 = {x:400,y:300};	
                drawLabel(ctx,weights[i].toString(),p1,p2,'center',10);	
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
                p2={x:lines[rand].x,y:lines[rand].y};
                p1={x:lastRandomx,y:lastRandomy};               	
                drawLabel(ctx,weights[n+i].toString(),p1,p2,'center',10);
                lastRandomx=lines[rand].x;
                lastRandomy=lines[rand].y;
            }             
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