/**
 * 专题提交页面相关js
 * daiyunzhou 2019/03/29 18:10
 * last modify: 2019/03/29 18:10
 */
$(function (){
    function ZTFORM(){
        // state
        this.state = {
            province:'', // 省
            city: '', // 市
            type: '', // 类型
            title: '',//  标题
            desc: '',// 描述
        };
        // ajax 
        this.submit = function (){
            for (var key in this.state) {
                var props = this.state[key];
                var toast =  $('.zt-toast');
                var tips = toast.find('.zt-tips');
                if (!props) {
                    console.log(key);

                    switch (key) {
                        case 'province':
                        toast.addClass('zt-show');
                        tips.html('省份不能为空');
                        break;
                        case 'city':
                        toast.addClass('zt-show');
                        tips.html('城市不能为空');
                        break;
                        case 'type':
                        break;
                        default:
                        toast.addClass('zt-show');
                        tips.html(key+'不存在');
                    }
                    setTimeout(function(){
                        toast.removeClass('zt-show');
                    }, 2000);
                    return;
                }
                // 调用接口
                // TODO
            }

           
        };
        // 事件相关处理
        this.event = function (){
            var that = this;
            // select 
            $('.zt-select').on('change',function (){
                var props = $(this).attr('name');
                var val = $(this).find("option:selected").attr("value");
                switch (props) {
                    case 'province':
                    that.state.province = val;
                    // 判断city
                    if (!val) {
                        $('.zt-city').parents('.zt-form-item').addClass('zt-hidden');
                        that.state.city = '';
                    } else {
                        $('.zt-city').parents('.zt-form-item').removeClass('zt-hidden');
                        that.state.city = '';
                    }
                    break;
                    case 'city':
                    that.state.city = val;
                    break;
                    case 'type':
                    that.state.type = val;
                    break;
                    default:
                    $('.zt-toast').addClass('zt-show');
                    $('.zt-tips').html('不存在的下拉框');
                    return;
                }
                console.log(that.state);
            });
            // textarea input
            $('.zt-textarea').on('input',function (){
                var val = $(this).val();
                var props = $(this).attr('name');
                if (props === 'desc') {
                    that.state.desc = val;
                } else if (props === 'title'){
                    that.state.title = val;
                } else {
                    $('.zt-toast').addClass('zt-show');
                    $('.zt-tips').html('不存在的输入框');
                }
            });
            // 提交
            $('.zt-confirm').on('click',function (){
                that.submit();
            });
            // 取消
            $('.zt-cancel').on('click',function (){
                for (var key in that.state) {
                    that.state[key] = '';
                }
                $('.zt-form-body')[0].reset();
            });
        };

        // init ZTFORM
        this.init = function (){
            this.event();
        };
    };
    var ztfrom = new ZTFORM();
    ztfrom.init();
})