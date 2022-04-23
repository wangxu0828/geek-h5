import { Button, List, NavBar, Popup, Toast } from 'antd-mobile'
import classNames from 'classnames'
import { getUserProfile, updateUserProfile } from '@/store/actions/profile'
import styles from './index.module.scss'
import { useHistory } from 'react-router-dom'
import { useInitialState } from '@/utils/hooks'
import { useState } from 'react'
import EditInput from './EditInput'
import EditList from './EditList'
import { useDispatch } from 'react-redux'
const Item = List.Item
type InputState = {
  visible: boolean
  type: '' | 'name' | 'intro'
}

type ListState = {
  visible: boolean
  type: '' | 'gender' | 'photo'
}

const ProfileEdit = () => {
  const history = useHistory()
  const { userProfile } = useInitialState(getUserProfile, 'profile')
  const [showInput, setShowInput] = useState<InputState>({
    visible: false,
    type: ''
  })
  // 关闭弹层函数
  const hideInput = () => {
    setShowInput({
      visible: false,
      type: ''
    })
  }
  // 讲editinput的数据回传给父组件
  const dispatch = useDispatch()
  const onUpdate = (key: string, value: string) => {
    console.log(key, value)
    dispatch(updateUserProfile(key, value))
    Toast.show({
      icon: 'success',
      content: '修改成功'
    })
    hideInput()
  }

  const [showList, setShowList] = useState<ListState>({
    type: '',
    visible: false
  })

  const hideList = () => {
    setShowList({
      type: '',
      visible: false
    })
  }

  return (
    <div className={styles.root}>
      <div className="content">
        {/* 标题 */}
        <NavBar
          style={{
            '--border-bottom': '1px solid #F0F0F0'
          }}
          onBack={() => history.go(-1)}
        >
          个人信息
        </NavBar>

        <div className="wrapper">
          {/* 列表 */}
          <List className="profile-list">
            {/* 列表项 */}
            <Item
              extra={
                <span className="avatar-wrapper">
                  <img width={24} height={24} src={userProfile.photo} alt="" />
                </span>
              }
              arrow
              onClick={() =>
                setShowList({
                  type: 'photo',
                  visible: true
                })
              }
            >
              头像
            </Item>
            <Item
              arrow
              extra={userProfile.name}
              onClick={() => {
                setShowInput({
                  visible: true,
                  type: 'name'
                })
              }}
            >
              昵称
            </Item>
            <Item
              arrow
              extra={
                <span className={classNames('intro', 'normal')}>
                  {userProfile.intro || '未填写'}
                </span>
              }
              onClick={() => {
                setShowInput({
                  visible: true,
                  type: 'intro'
                })
              }}
            >
              简介
            </Item>
          </List>

          <List className="profile-list">
            <Item arrow extra={userProfile.gender === 0 ? '男' : '女'}>
              {'性别'}
            </Item>
            <Item arrow extra={userProfile.birthday}>
              生日
            </Item>
          </List>
        </div>

        <div className="logout">
          <Button className="btn">退出登录</Button>
        </div>
      </div>
      {/* destroyOnClose保证关闭弹层的时候销毁组件 */}
      <Popup visible={showInput.visible} position="right" destroyOnClose>
        <div style={{ width: '100vw' }}>
          <EditInput
            hideInput={hideInput}
            type={showInput.type}
            onUpdate={onUpdate}
          ></EditInput>
        </div>
      </Popup>
      <Popup visible={showList.visible}>
        <EditList hideList={hideList} />
      </Popup>
    </div>
  )
}

export default ProfileEdit
