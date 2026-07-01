import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { persistor, reduxstore } from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Provider store={reduxstore}>
    <PersistGate loading={<div>Loading saved state...</div>}  persistor={persistor}>
    <BrowserRouter>
    <App />
  </BrowserRouter>
  </PersistGate>
  </Provider>
  // </StrictMode>,
)
