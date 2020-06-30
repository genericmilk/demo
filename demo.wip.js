var d = {
    pos:0,
    data:[],
    open:false,
    skippable: false,
    boot:function(){
        var s='<style>';
            s+='.demo{position:fixed;top:0px;left:0px;width:100%;height:100%;background-color:rgba(0,0,0,0.8);z-index:99;display:none}';
            s+='.demo-highlighted{position:relative;z-index:100;pointer-events:none;clear:both;}';   
            s+='.demo-clickable{pointer-events:all;}';   
            s+='.demo .demo-tooltip{position:fixed;padding:15px;background-color:white;z-index:101;border-radius:5px;max-width:500px;}';   
            s+='.demo .demo-tooltip .title{font-weight:bold;}';   
            s+='.demo .demo-tooltip .title:empty{display:none;}';   
            s+='.demo .demo-tooltip button:nth-of-type(1){float:left;background:none;border:0;color:#0468fe;border-radius: 5px;padding: 5px 15px;}';  
            s+='.demo .demo-tooltip button:nth-of-type(2){float:right;background:none;border:0;background-color:#0468fe;color:white;border-radius: 5px;padding: 5px 15px;}';                 
        s+='</style>';
        $('head').append(s);
    },
    build:function(data,options){
        var b = '<div class="demo">';
            b +='<div class="demo-tooltip">';
                b += '<div class="title"></div>';
                b += '<div class="inner"></div>';
                b += '<hr/>';
                b += '<button>Skip</button><button>Next</button>';
            b += '</div>';
            b+='<div class="background"></div>';
        b+='</div>';
        options.attachTo!==undefined ? $(options.attachTo).append(b) : $('body').append(b);
        $(".demo .demo-tooltip button:nth-of-type(1)").click(function(){
            d.close();
        });
        $(".demo .demo-tooltip button:nth-of-type(2)").click(function(){
            if(d.data[d.pos - 1].clickOnNext!==undefined){
                if(d.data[d.pos - 1].clickOnNext){
                    d.data[d.pos - 1].element.click();
                }
            }
            d.next();
        });
        d.data = data;
        d.pos = 0;        
        d.open = true;
        $(".demo .demo-tooltip button:nth-of-type(2)").text('Next');
        d.skippable = options.skippable!==undefined ? true : options.skippable;
        $('.demo').fadeIn('fast');
        d.next();
    },
    next:function(){
        if(!d.open){
            return;
        }
        $('*').removeClass('demo-highlighted').removeClass('demo-clickable');
        $('.demo .demo-tooltip button,.demo .demo-tooltip hr').show();
        if(d.data[d.pos]===undefined){
            d.close();
            return;
        }
        var b = d.data[d.pos];        
        $('.demo .demo-tooltip .title').html(b.title); 
        $('.demo .demo-tooltip .inner').html(b.text);        
        if(b.element===undefined){
            $('.demo .demo-tooltip').css({left: $(window).width() / 2 - $('.demo .demo-tooltip').innerWidth() / 2,top:$(window).height() / 2 - $('.demo .demo-tooltip').height(),right:'initial'});
        }else{
            b.element.addClass('demo-highlighted');            
            if(b.element.offset().top>$(window).height() / 2 / 2){
                var y = b.element.offset().top - $('.demo .demo-tooltip').height() - 40;
                $('.demo .demo-tooltip').css({top:y});
            }else{
                var y = b.element.offset().top + b.element.height() + 40;
                $('.demo .demo-tooltip').css({top:y,bottom:'initial'});
            }
            if(b.element.offset().left>$(window).width() / 2){            
                var x = ($(window).width() - (b.element.offset().left + b.element.outerWidth()));
                $('.demo .demo-tooltip').css({right: x,left:'initial'});
            }else{
                var x = b.element.offset().left;
                $('.demo .demo-tooltip').css({left: x,right:'initial'});
            }
        }
        if(d.skippable){
            $(".demo .demo-tooltip button:nth-of-type(1)").hide();
        }else{
            $(".demo .demo-tooltip button:nth-of-type(1)").show();
        }
        if(b.waitForInput!==undefined){
            if(b.waitForInput){
                $('.demo .demo-tooltip button,.demo .demo-tooltip hr').hide();
                b.element.addClass('demo-clickable');
            }
        }
        d.pos++;
        if(d.data[d.pos]===undefined && d.data[d.pos-1].clickOnNext===undefined){
            $(".demo .demo-tooltip button:nth-of-type(1)").hide();
            $(".demo .demo-tooltip button:nth-of-type(2)").text('Finish');            
        }
    },
    close:function(){
        d.open = false;
        d.data = [];
        d.pos = 0;
        $('.demo').remove();
    }
};
d.boot();
