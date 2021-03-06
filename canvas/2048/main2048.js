var board = new Array();
var score = 0;
$(document).ready(function(){
    newgame()

});
function newgame(){
    //初始化2048棋盘格
    init();
    //随机两个格子里生成数字
    generateOneNumber();
    generateOneNumber();
}
function init(){
    for(var i =0;i<4;i++){
        for(var j =0;j<4;j++){
            var gridCell = $("#grid-cell-"+i+"-"+j);
            gridCell.css('left',getLeft(j)+'px');
            gridCell.css('top',getTop(i)+'px');

        }
    }
    for(var i =0;i<4;i++){
        board[i]=new Array();
        for(var j =0;j<4;j++){
            board[i][j]=0;

        }
    }
    updateBoardView();
}
function updateBoardView(){
    $(".number-cell").remove();
    for(var i=0;i<4;i++){
        for(var j =0;j<4;j++){
            var html = "<div class='number-cell' id='number-cell-"+i+'-'+j+"'></div>"
            $("#grid-container").append(html);
            var theNumberCell = $("#number-cell-"+i+"-"+j);
            if(board[i][j] == 0){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getTop(i)+50);
                theNumberCell.css('left',getLeft(j)+50);
            }else{
                theNumberCell.css('width','100px');
                theNumberCell.css('height','100px');
                theNumberCell.css('top',getTop(i));
                theNumberCell.css('left',getLeft(j));
                theNumberCell.css('background',getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color',getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }
        }
    }
}
function generateOneNumber(){
    if(nospace(board))//看看16个格子里还有没有空间
       return false;

    //随机一个位置
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));
    while(true){
        if(board[randx][randy]==0)
            break;

         randx = parseInt(Math.floor(Math.random() * 4));
         randy = parseInt(Math.floor(Math.random() * 4));
    }
    //随机一个数字
    var randNumber=Math.random() < 0.5 ? 2 : 4;
    //在随机位置显示随机数字
    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx,randy,randNumber);
    return true
}
$(document).keydown(function(event){
    switch (event.keyCode){
        case 37://left
            if(moveLeft()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 38://up
            if(moveUp()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 39://right
            if(moveRight()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 40://down
            if(moveDown()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        default://default
            break;
    }
});
function moveLeft(){
    if(!canMoveLeft(board )){
        return false;
    }
    //moveLeft
    for(var i =0;i < 4;i++){
        for(var j=1;j<4;j++){
            if(board[i][j] != 0){
                for(var k=0;k < j;k++){
                    if(board[i][k] == 0 && noBlockHorizontal(i,k,j,board)){
                        //move
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[i][k] == board[i][j] && noBlockHorizontal(i,k,j,board)){
                        //move
                        showMoveAnimation(i,j,i,k);
                        //add
                        board[i][k]+=board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}
function moveRight(){
    if(!canMoveRight(board)){
        return false
    }
    for(var i =0;i<4;i++){
         for(var j=0;j<3;j++){
                
         }
    }
}
function isgameover(){

}