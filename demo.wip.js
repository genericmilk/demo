var d = {
    pos:0,
    data:[],
    open:false,
    skipCallback:null,
    skippable:true,
    waitForAction: false,
    boot:function(){
        var s='<style>';
            s+='.demo{position:fixed;top:0px;left:0px;width:100%;height:100%;background-color:rgba(0,0,0,0.8);z-index:99;display:none}';
            s+='.demo-highlighted{position:relative;z-index:100;pointer-events:none;}';   
            s+='.demo .demo-tooltip{position:fixed;padding:15px;background-color:white;z-index:101;border-radius:5px;max-width:500px;}';   
            s+='.demo .demo-tooltip .title{font-weight:bold;}';   
            s+='.demo .demo-tooltip .title:empty{display:none;}';   
            s+='.demo .demo-tooltip button:nth-of-type(1){float:left;background:none;border:0;color:#0468fe;border-radius: 5px;padding: 5px 15px;}';  
            s+='.demo .demo-tooltip button:nth-of-type(2){float:right;background:none;border:0;background-color:#0468fe;color:white;border-radius: 5px;padding: 5px 15px;}';                 
        s+='</style>';
        $('head').append(s);
        var b = '<div class="demo">';
            b +='<div class="demo-tooltip">';
                b += '<div class="title"></div>';
                b += '<div class="inner"></div>';
                b += '<hr/>';
                b += '<button>Skip</button><button>Next</button>';
            b += '</div>';
            b+='<div class="background"></div>';
        b+='</div>';
        $('body').append(b);
        // Attach listeners
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
    },
    build:function(data){
        d.data = data;
        d.pos = 0;        
        d.open = true;
        $(".demo .demo-tooltip button:nth-of-type(2)").text('Next');
        d.skippable ? $('.demo .demo-tooltip button:nth-of-type(1)').show() : $('.demo .demo-tooltip button:nth-of-type(1)').hide();
        $('.demo').fadeIn('fast');
        d.next();
    },
    next:function(){
        if(!d.open){
            return;
        }
        $('*').removeClass('demo-highlighted');
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
            var y = b.element.offset().top + b.element.height() + 40;                
            if(b.element.offset().left>$(window).width() / 2){            
                var x = ($(window).width() - (b.element.offset().left + b.element.outerWidth()));
                $('.demo .demo-tooltip').css({right: x,top:y,left:'initial'});
            }else{
                var x = b.element.offset().left;
                $('.demo .demo-tooltip').css({left: x,top:y,right:'initial'});
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
        $('.demo').fadeOut('fast');
    }
};
d.boot();
