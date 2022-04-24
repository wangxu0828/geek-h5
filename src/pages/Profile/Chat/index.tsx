import Icon from '@/components/Icon'
import { getUserProfile } from '@/store/actions/profile'
import { useInitialState } from '@/utils/hooks'
import { NavBar, Input } from 'antd-mobile'
import { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './index.module.scss'
import io, { Socket } from 'socket.io-client'
import cache from '@/utils/cache'
import { cache_Token } from '@/constance'
const Chat = () => {
  const history = useHistory()
  const [messageList, setMessageList] = useState<
    {
      type: 'robot' | 'user'
      text: string
    }[]
  >([
    { type: 'robot', text: '亲爱的用户你好,小智同学为您服务' },
    {
      type: 'user',
      text: '你好'
    }
  ])
  const { userProfile } = useInitialState(getUserProfile, 'profile')
  // 和服务器建立连接
  const clientRef = useRef<Socket | null>(null)
  useEffect(() => {
    const client = io('http://geek.itheima.net', {
      query: {
        token: cache.getCache(cache_Token)
      },
      transports: ['websocket']
    })

    client.on('connect', () => {
      // 向聊天记录中添加一条记录
      setMessageList((messageList) => [
        ...messageList,
        {
          text: '我现在恭候您的问候',
          type: 'robot'
        }
      ])
    })

    // 监听收到的消息
    client.on('message', (data) => {
      // 向聊天记录中添加机器人回复的消息
      setMessageList((messageList) => [
        ...messageList,
        { type: 'robot', text: data.msg }
      ])
    })
    clientRef.current = client
    // 在组件销毁时关闭 socket.io 的连接
    return () => {
      clientRef.current!.close()
    }
  }, [])
  // 给用户发消息
  const [message, setMessage] = useState('')
  const onSendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      // 通过 socket.io 客户端向服务端发送消息
      clientRef.current!.emit('message', {
        msg: message,
        timestamp: Date.now()
      })

      setMessageList((messageList) => [
        ...messageList,
        { type: 'user', text: message }
      ])

      setMessage('')
    }
  }

  const messageListRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const current = messageListRef.current
    current!.scrollTop = current!.scrollHeight
  }, [messageList])

  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar className="fixed-header" onBack={() => history.go(-1)}>
        小智同学
      </NavBar>

      {/* 聊天记录列表 */}
      <div className="chat-list" ref={messageListRef}>
        {messageList.map((item, index) => {
          if (item.type === 'robot') {
            return (
              <div className="chat-item" key={index}>
                <Icon type="iconbtn_xiaozhitongxue" />
                <div className="message">{item.text}</div>
              </div>
            )
          } else {
            return (
              <div className="chat-item user" key={index}>
                <img src={userProfile.photo} alt="" />
                <div className="message">{item.text}</div>
              </div>
            )
          }
        })}

        {/* 用户的消息 */}
      </div>

      {/* 底部消息输入框 */}
      <div className="input-footer">
        <Input
          className="no-border"
          placeholder="请描述您的问题"
          onKeyUp={onSendMessage}
          value={message}
          onChange={(e) => setMessage(e)}
        />
        <Icon type="iconbianji" />
      </div>
    </div>
  )
}

export default Chat
