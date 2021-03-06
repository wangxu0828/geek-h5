import styles from './index.module.scss'
import { Tabs, Popup } from 'antd-mobile'
import { changeActive, getUserChannel } from '@/store/actions/home'
import { useInitialState } from '@/utils/hooks'
import Icon from '@/components/Icon'
import Channels from './components/Channels'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import ArticleList from './components/ArticleList'
import { useHistory } from 'react-router-dom'
const Home = () => {
  const { userChannel, active } = useInitialState(getUserChannel, 'home')
  const [visible, setVisible] = useState(false)
  const show = () => {
    setVisible(true)
  }
  const hide = () => {
    setVisible(false)
  }
  const dispatch = useDispatch()
  const onChange = (key: string) => {
    dispatch(changeActive(+key))
  }
  const history = useHistory()
  return (
    <div className={styles.root}>
      {/* ้ข้ Tabs ๅ่กจ */}
      <Tabs
        className="tabs"
        activeLineMode="fixed"
        activeKey={active + ''}
        onChange={onChange}
      >
        {userChannel.map((item) => (
          <Tabs.Tab title={item.name} key={item.id}>
            <ArticleList channelId={item.id}></ArticleList>
          </Tabs.Tab>
        ))}
      </Tabs>

      <div className="tabs-opration">
        <Icon type="iconbtn_search" onClick={() => history.push('/search')} />
        <Icon type="iconbtn_channel" onClick={show} />
      </div>
      <Popup position="left" visible={visible}>
        <div style={{ width: '100vw' }}>
          <Channels hide={hide}></Channels>
        </div>
      </Popup>
    </div>
  )
}

export default Home
