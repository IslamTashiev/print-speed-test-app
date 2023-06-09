import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from '@mui/material'

import App from './App.tsx'
import theme from './theme/index.ts'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <ThemeProvider theme={theme("dark")}>
      <App />
    </ThemeProvider>
  </BrowserRouter>
)
