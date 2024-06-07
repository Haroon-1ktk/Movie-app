import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios';
import { store } from './store/store'
import { Provider } from 'react-redux'

axios.defaults.baseURL='https://api.themoviedb.org/3'
axios.defaults.headers.common['Authorization']=`Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
)
