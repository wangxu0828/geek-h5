import App from './App'
import './index.scss'

import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
createRoot(document.querySelector('#root') as Element).render(
  <Provider store={store}>
    <App></App>
  </Provider>
)
