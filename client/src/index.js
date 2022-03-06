import ReactDOM from 'react-dom'
import React from 'react'

import './assets/main.css'
const App = ()=>{
    return <h1 className="text-3xl bg-red-300">This is a react app</h1>
}

ReactDOM.render(<App/>, document.getElementById('root'))