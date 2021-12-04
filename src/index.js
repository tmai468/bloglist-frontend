import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import store from './store'
import { Provider } from 'react-redux'

const renderApp = () => {
    ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
store.subscribe(() => console.log(store.getState()))