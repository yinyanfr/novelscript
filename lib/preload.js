/**
 * Created by Joe
 * http://jr3.me/javascriptshi-xian-tu-pian-de-yu-jia-zai-gong-neng/
 * Adopted
 */

function preloadImgSimple(url,afterwards) {
    var img = new Image();
    img.src = url;
    if(img.complete) {
        afterwards();
    }
    else {
        img.onload = function() {
            afterwards();
        };
    }
}

function preloadImg(list,imgs) {
    var def = $.Deferred(),
        len = list.length;
    $(list).each(function(i,e) {
        var img = new Image();
        img.src = e;
        if(img.complete) {
            imgs[i] = img;
            len--;
            if(len == 0) {
                def.resolve();
            }
        }
        else {
            img.onload = (function(j) {
                return function() {
                    imgs[j] = img;
                    len--;
                    if(len == 0) {
                        def.resolve();
                    }
                };
            })(i);
            img.onerror = function() {
                len--;
                console.log('fail to load image');
            };
        }
    });
    return def.promise();
}


function preloadImgMain(list,imgs,afterwards) {
    $.when(preloadImg(list, imgs)).done(
        function () {
            afterwards();
        }
    );
}

/* demo
 * var list = [......],
 imgs = [];
 $.when(preloadImg(list, imgs)).done(
 function() {
 //do something here
 }
 );
 */