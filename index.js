import "babel-polyfill";
import "normalize.css/normalize.css";

import React, { Component } from 'react';
import ReactDOM from "react-dom";

import NovelScript from "./NovelScript"

ReactDOM.render(<NovelScript />, document.getElementById("galgame"));

