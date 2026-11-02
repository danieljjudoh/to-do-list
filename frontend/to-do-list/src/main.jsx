// import core and third party packages
import 'bootstrap/dist/css/bootstrap.min.css'; // npm install bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // npm install @popperjs/core
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// render the application on the root div
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
