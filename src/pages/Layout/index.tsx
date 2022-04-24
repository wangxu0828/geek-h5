import React from 'react'
import styles from './index.module.scss'
import { TabBar } from 'antd-mobile'
import {} from 'antd-mobile-icons'
import Icon from '@/components/Icon'
import { useHistory, useLocation } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import Home from '../Home'
import Question from '../Question'
import Profile from '../Profile'
import Video from '../Video'
import PrivateRoute from '@/components/AuthRoute'
export default function Layout() {
  const tabs = [
    { path: '/home', icon: 'iconbtn_home', text: '首页' },
    { path: '/home/question', icon: 'iconbtn_qa', text: '问答' },
    { path: '/home/video', icon: 'iconbtn_video', text: '视频' },
    { path: '/home/profile', icon: 'iconbtn_mine', text: '我的' }
  ]
  const history = useHistory()
  const setRouteActive = (value: string) => {
    history.push(value)
  }
  const location = useLocation()
  return (
    <div className={styles.root}>
      <Switch>
        <Route exact path="/home">
          <Home></Home>
        </Route>
        <Route path="/home/question">
          <Question></Question>
        </Route>
        <Route path="/home/video">
          <Video></Video>
        </Route>
        <PrivateRoute path="/home/profile">
          <Profile></Profile>
        </PrivateRoute>
      </Switch>
      <TabBar
        className="tab-bar"
        onChange={(value) => setRouteActive(value)}
        activeKey={location.pathname}
      >
        {tabs.map((item) => (
          <TabBar.Item
            key={item.path}
            icon={(active) => (
              <Icon
                type={active ? `${item.icon}_sel` : item.icon}
                className="tab-bar-item-icon"
              ></Icon>
            )}
            title={item.text}
          />
        ))}
      </TabBar>
    </div>
  )
}
