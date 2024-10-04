import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import TodoAppComponent from './App.tsx'
import './index.css'

createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <TodoAppComponent />
  </StrictMode>,
)
