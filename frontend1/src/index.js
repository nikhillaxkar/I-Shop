import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Main from './Main';
import { Provider } from 'react-redux';
import store from './store'; // Make sure you import store correctly

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <Main>
            <App />
        </Main>
    </Provider>
);
