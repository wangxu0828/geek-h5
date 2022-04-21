import './App.scss'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Layout from '../src/pages/Layout'
import Login from '../src/pages/Login'

export default function App() {
  return (
    <Router>
      <div className="app">
        {/* <Redirect from='/' to='/layout'></Redirect> */}
        <Route path='/' render={() => <Redirect to='/layout'></Redirect>}></Route>
        <Route path="/layout">
          <Layout></Layout>
        </Route>
        <Route path="/login">
          <Login></Login>
        </Route>
      </div>
    </Router>
  )
}
