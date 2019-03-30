/**
 * window size
 */
(()=>{
    class PageResize {
        GetSize() {
            var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            width > 750 ? width = 750 : null;
            width < 320 ? width = 320 : null;
            document.documentElement.style.fontSize = (width * (100 / 750)) + "px";
            if (!window.onresize) {
                window.onresize = ()=> {
                    onFooEndFunc();
                }
            }
        }
        onFooEndFunc() {
            let executionTimer = null;
            var delay = 300; // 根据实际情况可调整延时时间
            if (!!executionTimer) {
                clearTimeout(executionTimer);
            }
            //这里延时执行你的函数
            executionTimer = setTimeout(()=> {
                this.GetSize();
            }, delay);
        }
    };
    const page_size = new PageResize();
    page_size.GetSize();
})();

//返回默认图片
function GetDefaultHeadImg(obj) {
    obj.src = "/images/base/no-pic.png";
};
// 房源详情页 轮播图报错时的占位图
function GetDetailImg(obj){
    obj.src = "/images/page/details/defaultImg.png";
};
// 没有楼盘图片
function GetDefaultComplexImg(obj){
    obj.src = "/images/page/newhouse/noComplexPic.jpg";
};
// 没有户型图片
function GetDefaultHouseImg(obj){
    obj.src = "/images/page/newhouse/no-housetype.jpg";
}
// 重复加载一次图片
function loadImg(obj){
    var thisImg = obj.src;
    setTimeout(function(){
        obj.src = thisImg;
    },200);
};
//图片居中
function imgCenter(obj) {
    setTimeout(function () {
        obj.style.cssText = "position:absolute;left:50%;top:50%;margin:-" + (obj.height / 2) + "px 0 0 -" + (obj.width / 2) + "px;";
    }, 300);
};