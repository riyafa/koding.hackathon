    var lines=[];
    var weights=[];
    var selected=[];
    var s="";
    var id=3;
    var repet=1,num=0;
function draw(n,rep){
    var cvs=document.getElementsByTagName('canvas')[0];  
	cvs.width = window.innerWidth-100; 
            /** 
             * @type CanvasRenderingContext2D 
             **/
    var ctx=cvs.getContext('2d');
    var cwidth = cvs.width;
    var cheight = cvs.height; 
    ctx.clearRect ( 0 , 0 , cwidth, cheight );
    lines.length=0;
    weights.length=0;
    selected.length=0;
    //document.getElementById("p1").innerHTML = "Try";
            ctx.strokeStyle='black';
            ctx.beginPath();
            var randomX;
            var randomY;
            
            ctx.lineWidth=3;
            ctx.font  = "normal bold 1em Arial";            
            var lastRandomx=Math.random()*200;
            var lastRandomy=Math.random()*200;
            lines.push({              // store point to create a poly-line
                    x: lastRandomx,
                    y: lastRandomy
                  });
            for (var i = 0; i <n ; i++) {                               
                randomX = Math.random()*cwidth;
		randomY = Math.random()*cheight;
                		
                ctx.fillRect(randomX,randomY,5,5);		
		ctx.moveTo(lastRandomx,lastRandomy);
		ctx.lineTo(randomX,randomY); 
                weights.push(Math.round(Math.random()*20)+1); 
                var p1={x:lastRandomx,y:lastRandomy};
                var p2={x:randomX,y:randomY};
               //var p1 = {x:200,y:200};
                //var p2 = {x:400,y:300};	
                drawLabel(ctx,weights[i].toString(),p1,p2,'center',0);	
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
                  weights.push(Math.round(Math.random()*20)+1); 
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
                      if(selected.length===0)
                          num=i;
                    selected.push(lines[i]);
                    selected.push(lines[i+1]);
                    ctx.strokeStyle = "green";              // stroke red for demo
                    ctx.stroke();
                    break;
                  }
                }
              });
              
        for (var i = 0, max = lines.length; i < max; i++) {
        lines[i].toString=function()
                    {
                        return "("+this.x+","+this.y+")";
                    };
                    //s+=lines[i].toString()+" ";
        }
              //document.write(weights.length+"<br>"+lines.length);
    }; 
    
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
 
    function Prim(g) {
        var result = [];
        var usedNodes = {};        
        function findMin(g) { 
            var min = [999999,null];
            for(var i=0;i<result.length;i++)
                for(var n=0;n<g.edges[result[i]].length;n++){
                    
                    
                    if(g.edges[result[i]][n].capacity < min[0] && usedNodes[g.edges[result[i]][n].sink.toString()] === undefined){
                        min = [g.edges[result[i]][n].capacity, g.edges[result[i]][n].sink];
                    }}
            return min[1];
        };        
        // Pick random start point
        var node = g.nodes[num];          
        result.push(node);  
       
       
        usedNodes[node.toString()] = true; 
        //s+="xxx"+node.toString()+" ";
        var min = findMin(g);        
        //document.getElementById("p1").innerHTML +=min+" <br>";
        while(min !==null) {
            result.push(min);
            usedNodes[min] = true;
            min = findMin(g);
        }        
        return result;
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
        
function inArray(array, el) {
  for ( var i = array.length; i--; ) {
    if ( array[i] === el ) return true;
  }
  return false;
};

function isEqArrays(arr1, arr2) {
  if ( arr1.length !== arr2.length ) {
    return false;
  }
  for ( var i = arr1.length; i--; ) {
    if ( !inArray( arr2, arr1[i] ) ) {
      return false;
    }
  }
  return true;
};

function clickMe(){
    
    var g = new Graph();
        
        for (var i = 0, max = lines.length; i < max; i++) {
            g.addNode(lines[i]);
        }
        
        for (var i = 0, max = weights.length; i < max; i++) {
            
            g.addEdge(lines[i],lines[i+1],weights[i]);
        }
        
        var result=Prim(g);
        
        /*selected=selected.filter( function( item, index, inputArray ) {
            return inputArray.indexOf(item) ===index;
        });*/
    removeDuplicates(selected,thingsEqual);
        /*for (var i = 0, max = selected.length; i < max; i++) {
        s+=selected[i].x+","+selected[i].y+" ";
    }*/
        //document.getElementById("p1").innerHTML +=s+ "result:"+result.length+"<br>"+"selected:"+selected.length;
        if (isEqArrays(result,selected)) {
           document.getElementById("p1").innerHTML = "Success";
           id++;
           if (repet%3===0) {
            repet++;
            }
            draw(id,repet);
        }else{
             document.getElementById("p1").innerHTML = "Failed";
        }
}

function reset(){
    
    draw(id,repet);
}
function arrayContains(arr, val, equals) {
    var i = arr.length;
    while (i--) {
        if ( equals(arr[i], val) ) {
            return true;
        }
    }
    return false;
}

function removeDuplicates(arr, equals) {
    var originalArr = arr.slice(0);
    var i, len, j, val;
    arr.length = 0;

    for (i = 0, len = originalArr.length; i < len; ++i) {
        val = originalArr[i];
        if (!arrayContains(arr, val, equals)) {
            arr.push(val);
        }
    }
}

function thingsEqual(thing1, thing2) {
    return thing1.x === thing2.x
        && thing1.y === thing2.y;
}

window.addEventListener('load',function(){ draw(id,repet); },false);