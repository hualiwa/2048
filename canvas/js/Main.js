//声明变量
//进度条显示层，背景层，方块绘制层，方块预览层
var loadingLayer,backLayer,backAction,backAction1,txtTime,graphicsMap,nextLayer,background,background1,background2,background3,background4,backLayer1,counter,graphics,graphics1;
var imglist = {};
var imgData = new Array(
	{name:"moonbtn",path:"http://cdn.ufenqi.com/cms/img/moonstart.png"},
	{name:"moonback",path:"http://cdn.ufenqi.com/cms/img/moonback.jpg"},
	{name:"headImage",path:"http://cdn.ufenqi.com/cms/img/moonHead.png"},
	{name:"bottomImage",path:"http://cdn.ufenqi.com/cms/img/moonBottom.jpg"},
	{name:"moonback1",path:"http://cdn.ufenqi.com/cms/img/moonback1.jpg"},
	{name:"moondata",path:"http://cdn.ufenqi.com/cms/img/moondata.png"},
	{name:"moontxt",path:"http://cdn.ufenqi.com/cms/img/moontxt.png"},
	{name:"mooncloud",path:"http://cdn.ufenqi.com/cms/img/mooncloud.png"}
	);
var _w = window.screen.width;
var _h = window.screen.height;
function main(){
	//背景层初始化
	backLayer = new LSprite();
	//在背景层上绘制黑色背景
	backLayer.graphics.drawRect(1,"#000000",[0,0,_w,_h],true,"#000000");
	//背景显示
	addChild(backLayer);
	//进度条读取层初始化
	loadingLayer = new LoadingSample1();
	//进度条读取层显示
	backLayer.addChild(loadingLayer);
	//利用LLoadManage类，读取所有图片，并显示进度条进程	
	LLoadManage.load(
		imgData,
		function(progress){
			loadingLayer.setProgress(progress);
		},
		gameInit
	);
}
//读取完所有图片，进行游戏标题画面的初始化工作
function gameInit(result){
	var html="";
	//取得图片读取结果
	imglist = result;
	//移除进度条层
	backLayer.removeChild(loadingLayer);
	loadingLayer = null;
	background =  new LBitmap(new LBitmapData(imglist["moonback"]));
	// background.scaleX = background.scaleY = 0.5;
	background.scaleX = LGlobal.width/background.width;
	background.scaleY = LGlobal.height/background.height;
	backLayer.addChild(background);
	background1 =  new LBitmap(new LBitmapData(imglist["headImage"]));
	background1.scaleX = LGlobal.width/background1.width;
	background1.scaleY = (LGlobal.height*(background1.height/background.height))/background1.height;
	backLayer.addChild(background1);
	background2 =  new LBitmap(new LBitmapData(imglist["moonbtn"]));
	background2.scaleX = LGlobal.width/background2.width;
	background2.scaleY = (LGlobal.height*(background2.height/background.height))/background2.height;
	var button = new LButton(background2,background2);
	button.x = 0;
	button.y = LGlobal.height/2;
	backLayer.addChild(button);
	button.addEventListener(LMouseEvent.MOUSE_UP,gameToStart);
}
function gameToStart(){
	//背景层清空
	backLayer.die();
	backLayer.removeAllChild();
	background3 =  new LBitmap(new LBitmapData(imglist["moonback1"]));
	// background.scaleX = background.scaleY = 0.5;
	background3.scaleX = LGlobal.width/background3.width;
	background3.scaleY = LGlobal.height/background3.height;
	backLayer.addChild(background3);
	background4 =  new LBitmap(new LBitmapData(imglist["moondata"]));
	background4.scaleX = LGlobal.width/background4.width;
	background4.scaleY = (LGlobal.height*(background4.height/background.height))/background4.height;
	background4.x = 0;
	background4.y = (background4.scaleY * background4.height)/4;
	backLayer.addChild(background4);
	var txtDate = new LTextField();
	var val = 1000;
	txtDate.text=val/100+".00s";
	// counter=setInterval(function(){
	// 	val--;
	// 	if(val == 0 ){
	// 		clearInterval(counter);
	// 		txtDate.text = val/100+"s"
	// 	}
	// 	var res = val/100;
	// 	txtDate.text = res.toPrecision(val.toString().length) + " s"
	// },10);
	txtDate.size=36;
	txtDate.font = "arial";
	txtDate.color="#ffffff";
	txtDate.weight = "bolder";
	txtDate.x=(LGlobal.width)/2 - 70;
	txtDate.y= (background4.scaleY * background4.height)/1.7;
	backLayer.addChild(txtDate);
	backAction = new LGraphics();
	backLayer.addChild(backAction);
	backAction.add(function(coodx,coody){
		LGlobal.canvas.strokeStyle = "#000000";
		LGlobal.canvas.lineWidth = 1.5;
		LGlobal.canvas.moveTo((LGlobal.width/2-1),((background4.scaleY * background4.height) *1.4)+10);
		LGlobal.canvas.lineTo((LGlobal.width/2-1),((background4.scaleY * background4.height) *1.4 +190));
		LGlobal.canvas.stroke();
	});
	backAction1 = new LGraphics();
	backLayer.addChild(backAction1);
	backAction1.add(function(coodx,coody){
		LGlobal.canvas.strokeStyle = "#000000";
		LGlobal.canvas.lineWidth = 1.5;
		LGlobal.canvas.moveTo((LGlobal.width/2-90),((background4.scaleY * background4.height) *1.4)+100);
		LGlobal.canvas.lineTo((LGlobal.width/2+89),((background4.scaleY * background4.height) *1.4 +100));
		LGlobal.canvas.stroke();
	});
	graphics = new LGraphics();
	backLayer.addChild(graphics);
	var _a = (LGlobal.width-100)/2+50;
	var _b = (background4.scaleY * background4.height) *1.4 +100;
	graphics.drawArc(1,'#ffffff',[_a,_b,100,0,360*Math.PI/180]);
	graphics1 = new LGraphics();
	backLayer.addChild(graphics1);
	var _c = (LGlobal.width-100)/2+50;
	var _d = (background4.scaleY * background4.height) *1.4 +100;
	graphics1.drawArc(1,'#ffffff',[_c,_d,90,0,360*Math.PI/180]);
	txtTime = new LTextField();
	txtTime.text = "3";
	txtTime.size = 80;
	txtTime.color= "#ffffff";
	var val1 = 3;
	var time1 = setInterval(function(){
		val1--;
		if(val1 == 0){
			clearInterval(time1);
			txtTime.text = "0";
			txtTime.addEventListener(LMouseEvent.MOUSE_UP,goToAction)
		}
		txtTime.text = val1;
	},1000);
	txtTime.font = "arial";
	txtTime.x = LGlobal.width/2-30;
	txtTime.y = ((background4.scaleY * background4.height) *1.4+40);
	backLayer.addChild(txtTime)
}
function goToAction(){
	alert("111")
}
//游戏画面初始化
