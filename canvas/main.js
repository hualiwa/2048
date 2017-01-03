var loadingLayer,backLayer;
var imglist = {};
var imgData = [(
    {name:"headImage",path:"http://cdn.ufenqi.com/cms/img/moonHead.jpg"},
    {name:"bottomImage",path:"http://cdn.ufenqi.com/cms/img/moonBottom.jpg"}
     )];
function main(){
    //背景层初始化
    backLayer = new LSprite();
    //在背景层上绘制黑色背景
    backLayer.graphics.drawRect(1,"#000000",[0,0,320,480],true,"#000000");
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
function gameInit(result){
    imglist = result;
}