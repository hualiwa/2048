function showNumberWithAnimation(x,y,number){
    var numberCell = $('#number-cell-'+x+'-'+y);
    numberCell.css('background',getNumberBackgroundColor(number));
    numberCell.css('color',getNumberColor(number));
    numberCell.text(number);
    numberCell.animate({
        width:'100px',
        height:'100px',
        top:getTop(x),
        left:getLeft(y)
    },50)
}
function showMoveAnimation(fromx , fromy , tox, toy){
    var numberCell = $('#number-cell-'+fromx+'-'+fromy);
    numberCell.animate({
        top:getTop(tox),
        left:getLeft(toy)
    },200)
}