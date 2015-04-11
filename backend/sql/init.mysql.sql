create table account(
login varchar(50) not null primary key
);

create table danmaku(
idDan int not null primary key,
info varchar(140) not null,
login varchar(50) not null
);

create table setting(
idSet int not null primary key,
login varchar(50) not null
);

create table saving(
idSave int not null primary key,
numSave int not null,
login varchar(50) not null
);

create table script(
idScr int not null primary key,
info varchar(300) not null,
chara varchar(50),
bgm varchar(50),
bg varchar(50),
idScrs int not null
);

create table music(
idBgm int not null primary key,
src varchar(140) not null
);

create table compose(
idScr int not null,
idBgm int not null,
primary key(idScr,idBgm)
);

create table scripts(
idScrs int not null primary key
);

insert into account(login) values('yan');

insert into danmaku(idDan,info,login) values(1,'php is the best language, i gonna persuade them the whole night.','yan');

select a.login from account a, danmaku d where d.login = a.login and d.login = 'yan';