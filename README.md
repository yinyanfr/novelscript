# NovelScript
[![npm](https://img.shields.io/npm/v/novelscript.svg)](https://www.npmjs.com/package/novelscript) [![npm](https://img.shields.io/npm/l/novelscript.svg)]() [![Build Status](https://travis-ci.org/yinyanfr/NovelScript.svg?branch=master)](https://travis-ci.org/yinyanfr/NovelScript)

## A visual novel renderer based on React

- from simple script (<a href="https://github.com/yinyanfr/nsml">nsml</a>)
```nsml
[scene] start
[bgm] bgm1
[bg] classroom
[join] yuyao normal
[join] nanzhi normal
[animate] yuyao [move] 20 0 [zoom] 1.1
[animate] nanzhi [move] 20 0 [zoom] 0.9
[yuyao] 非洲农业不发达，必须要有金坷垃

[reset] yuyao nanzhi
[animate] nanzhi [move] -20 0 [zoom] 1.1
[animate] yuyao [move] -40 0 [zoom] 0.9
[nanzhi] 日本资源太缺乏，必须要有金坷垃
```
- to visual novels

  <img src="http://gal.yinyan.fr/demo/hina/new42.png" />
  <br />
  <img src="http://gal.yinyan.fr/demo/hane/hane.jpg" />

<a href="http://gal.yinyan.fr/demo/hane/">Demo Site</a>

## Get Started
```bash
$ npm start
```
or
```bash
$ yarn start
```

## Documentation

<a href="https://github.com/yinyanfr/NovelScript/tree/master/doc">点此查阅文档 Documentation</a> (Not available for now)

## Roadmap

This project is now on its way of reconstruction. Further information will be added with progress.
