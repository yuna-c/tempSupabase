import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// yarn add @supabase/supabase-js

// yarn add styled-components
// yarn add react-router-dom

// yarn add redux react-redux
// yarn add react-redux @reduxjs/toolkit

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
