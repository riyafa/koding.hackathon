var ctx = canvas.getContext("2d"),
    lines = [],  // store line segments for demo
    count = 10,  // max 10 lines for demo
    i = 0;

for(; i < count; i++) {
  var x = Math.random() * canvas.width;  // random point for end points
  var y = Math.random() * canvas.height;
  
  if (i) ctx.lineTo(x, y);  // if not first line, add lineTo
  else ctx.moveTo(x, y);    // start point
  
  lines.push({              // store point to create a poly-line
    x: x,
    y: y
  });
}

ctx.lineWidth = 5;
ctx.lineJoin = "round";
ctx.strokeStyle = "blue";
ctx.stroke();              // ..and draw line

// here we use the principle
canvas.onclick = function(e) {

  var r = canvas.getBoundingClientRect(), // adjust to proper mouse position
      x = e.clientX - r.left,
      y = e.clientY - r.top,
      i = 0;
  
  // for each line segment, build segment to path and check
  for(; i < count - 1; i++) {
    ctx.beginPath();                        // new segment
    ctx.moveTo(lines[i].x, lines[i].y);     // start is current point
    ctx.lineTo(lines[i+1].x, lines[i+1].y); // end point is next
    if (ctx.isPointInStroke(x, y)) {        // x,y is on line?
      ctx.strokeStyle = "red";              // stroke red for demo
      ctx.stroke();
      break;
    }
  }
};