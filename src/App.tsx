import './App.scss'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Layout from '../src/pages/Layout'
import Login from '../src/pages/Login'
import Edit from '@/pages/Profile/Edit'
import PrivateRoute from './components/AuthRoute'
import Chat from '@/pages/Profile/Chat'
import Article from '@/pages/Article'
export default function App() {
  return (
    <Router>
      <div className="app">
        {/* <Redirect from='/' to='/layout'></Redirect> */}
        <Route
          exact
          path="/"
          render={() => <Redirect to="/home"></Redirect>}
        ></Route>
        <Route path="/home">
          <Layout></Layout>
        </Route>
        <Route path="/login">
          <Login></Login>
        </Route>
        <PrivateRoute path="/profile/edit">
          <Edit></Edit>
        </PrivateRoute>
        <PrivateRoute path="/profile/chat">
          <Chat></Chat>
        </PrivateRoute>
        <Route path="/article/:id">
          <Article />
        </Route>
      </div>
    </Router>
  )
}
