/**
 * Created by Ian on 2015/4/11.
 */

function Serifu(){
    this.hero = "none";
    this.info = "";
    this.chara = {
        left : "none",
        mid : "none",
        right : "none"
    };
    this.bgm = "none";
    this.bg = "none";
    this.cg = "false";
}

Serifu.prototype.getHero = function(hero){
    this.hero = hero;
    return this;
};

Serifu.prototype.getInfo = function(info){
    this.info = info;
    return this;
};

Serifu.prototype.getCharaLeft = function(left){
    this.chara.left = left;
    return this;
};

Serifu.prototype.getCharaMid = function(mid){
    this.chara.mid = mid;
    return this;
};

Serifu.prototype.getCharaRight = function(right){
    this.chara.right = right;
    return this;
};

Serifu.prototype.getBgm = function(bgm){
    this.bgm = bgm;
    return this;
};

Serifu.prototype.getBg = function(bg){
    this.bg = bg;
    return this;
};

Serifu.prototype.getCg = function(cg){
    this.cg = cg;
    return this;
};

Serifu.prototype.inherit = function(seri){
    this.chara = seri.chara;
    this.bgm = seri.bgm;
    this.bg = seri.bg;
    this.cg = seri.cg;
    return this;
};