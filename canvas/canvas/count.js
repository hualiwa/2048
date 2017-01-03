var canvas = {
	opts:{
		radius:8,
		width:1024,
		height:768,
		left:30,
		top:60,
		curShowTime:0,
		balls:[],
		color:['#33b5e5','#0099cc','#aa66cc','#9933cc','#99cc00','#669900','#ffbb33','#ff8800','#ff4444','#cc0000']
	},
	init:function(){
		var me = this;
		me.opts.width = document.body.clientWidth;
		me.opts.height = document.body.clientHeight;
		me.opts.left = Math.round(me.opts.width/10);
		me.opts.top = Math.round(me.opts.height/5);
		me.opts.radius = Math.round(me.opts.width*4/5/108)-1;
		var width = me.opts.width;
		var height = me.opts.height;
		var left = me.opts.left;
		var top = me.opts.top;
		// me.opts.endTime = new Date(2016,11,22,18,47,52);
		me.opts.curShowTime = me.getCurentTime();
		var canvas = document.getElementById('canvas');
		var context = canvas.getContext('2d');
		canvas.width=width;
		canvas.height = height;
		setInterval(function(){
			me.render(context);
			me.update()
		},50)
		
	},
	update:function(){
		var me = this;
		var left = me.opts.left;
		var top = me.opts.top;
		var nextShowTime = me.getCurentTime();
		var nextHours = parseInt(nextShowTime / 3600);
		var nextMinutes = parseInt((nextShowTime - nextHours*3600)/60);
		var nextSeconds = nextShowTime % 60;

		var curHours=parseInt(me.opts.curShowTime/3600);
		var curMinutes = parseInt((me.opts.curShowTime - curHours*3600)/60);
		var curSeconds = me.opts.curShowTime % 60;

		if(nextSeconds != curSeconds){
			if(parseInt(curHours/10) != parseInt(nextHours/10)){
				me.addsBall(left,top,parseInt(curHours/10))
			} 
			if(parseInt(curHours%10) != parseInt(nextHours%10)){
				me.addsBall(left+15*(me.opts.radius+1),top,parseInt(curHours%10))
			}
			if(parseInt(curMinutes/10) != parseInt(nextMinutes/10)){
				me.addsBall(left+39*(me.opts.radius+1),top,parseInt(curMinutes/10))
			}
			if(parseInt(curMinutes%10) != parseInt(nextMinutes%10)){
				me.addsBall(left+54*(me.opts.radius+1),top,parseInt(curMinutes%10))
			}
			if(parseInt(curSeconds/10) != parseInt(nextSeconds/10)){
				me.addsBall(left+78*(me.opts.radius+1),top,parseInt(curSeconds/10))
			}
			if(parseInt(curSeconds%10) != parseInt(nextSeconds%10)){
				me.addsBall(left+93*(me.opts.radius+1),top,parseInt(curSeconds%10))
			}
			me.opts.curShowTime = nextShowTime
		}
		me.updateBalls()
		// console.log(me.opts.balls.length)
	},
	updateBalls:function(){
		var me =this;
		for(var i=0;i<me.opts.balls.length;i++){
			me.opts.balls[i].x+= me.opts.balls[i].vx;
			var c = 0;
			if(me.opts.balls[i].y+me.opts.radius+me.opts.balls[i].vy >= me.opts.height){
				c = (me.opts.height-(me.opts.balls[i].y+me.opts.radius))/me.opts.balls[i].vy;
				console.log(c)
			}
			me.opts.balls[i].y+= me.opts.balls[i].vy;
			me.opts.balls[i].vy += c+(me.opts.balls[i].g);
			if(me.opts.balls[i].y >= me.opts.height-1.5*me.opts.radius){
				me.opts.balls[i].y = me.opts.height-1.5*me.opts.radius;
				me.opts.balls[i].vy = - Math.abs(me.opts.balls[i].vy)*0.75
			}
			
		}
		var cnt = 0;
		for(var i =0;i<me.opts.balls.length;i++){
			if(me.opts.balls[i].x +me.opts.radius > 0 && me.opts.balls[i].x - me.opts.radius < me.opts.width){
				me.opts.balls[cnt++] = me.opts.balls[i]
			}
		}
		while(me.opts.balls.length > cnt){
			me.opts.balls.pop()
		}
	},
	addsBall:function(x,y,num){
		var me = this;
		var colors = me.opts.color;
		var radius = me.opts.radius;
		for(var i = 0;i < digit[num].length;i++){
			for(var j = 0;j<digit[num][i].length;j++){
				var balls = {
					x:x+j*2*(radius+1)+(radius+1),
					y:y+i*2*(radius+1)+(radius+1),
					g:1.5+Math.random(),
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
					vy:-5,
					color:colors[Math.floor(Math.random()*colors.length)]
				}
				me.opts.balls.push(balls)
			}
		}
	},
	render:function(context){
		var me = this;
		var left = me.opts.left;
		var top = me.opts.top;
		var hours=parseInt(me.opts.curShowTime/3600);
		var minutes = parseInt((me.opts.curShowTime - hours*3600)/60);
		var seconds = me.opts.curShowTime % 60;
		context.clearRect(0,0,me.opts.width,me.opts.height);
		me.renderNum(left,top,parseInt(hours/10),context);
		me.renderNum(left+15*(me.opts.radius+1),top,parseInt(hours%10),context);
		me.renderNum(left+30*(me.opts.radius+1),top,10,context);
		me.renderNum(left+39*(me.opts.radius+1),top,parseInt(minutes/10),context);
		me.renderNum(left+54*(me.opts.radius+1),top,parseInt(minutes%10),context);
		me.renderNum(left+69*(me.opts.radius+1),top,10,context);
		me.renderNum(left+78*(me.opts.radius+1),top,parseInt(seconds/10),context);
		me.renderNum(left+93*(me.opts.radius+1),top,parseInt(seconds%10),context);
		var balls = me.opts.balls;
		for(var i =0;i < balls.length;i++){
			context.beginPath();
			context.arc(balls[i].x,balls[i].y,me.opts.radius,0,2*Math.PI,true);
			context.fillStyle=balls[i].color;
			context.closePath();
			context.fill()
		}
	},
	getCurentTime:function(){
		var me = this;
		var now = new Date();
		var ret = now.getHours()*3600+now.getMinutes()*60+now.getSeconds();
		return ret 

	},
	renderNum:function(x,y,num,cxt){
		cxt.fillStyle =  "rgb(0,102,153)";
		var me = this;
		var radius = me.opts.radius;
		for(var i = 0;i<digit[num].length;i++){
			for(var j = 0;j<digit[num][i].length;j++){
				if(digit[num][i][j] == 1){
					cxt.beginPath();
					cxt.arc(x+j*2*(radius+1)+(radius+1),y+i*2*(radius+1)+(radius+1),radius,0,2*Math.PI);
					cxt.closePath();
					cxt.fill()
				}	
			}
		}
	}
};
canvas.init()