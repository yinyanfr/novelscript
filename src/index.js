import React from 'react';
import ReactDOM from 'react-dom';
import NovelScript from "./NovelScript";
import {Provider} from "react-redux"
import store from "./redux/store"
import * as serviceWorker from './serviceWorker';

import "bulma/bulma.sass"

const jsx = (
    <Provider store={store}>
        <NovelScript />
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
