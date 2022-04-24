import {
  Button,
  List,
  NavBar,
  Popup,
  Toast,
  DatePicker,
  Dialog
} from 'antd-mobile'
import classNames from 'classnames'
import {
  getUserProfile,
  updateUserPhoto,
  updateUserProfile
} from '@/store/actions/profile'
import styles from './index.module.scss'
import { useHistory } from 'react-router-dom'
import { useInitialState } from '@/utils/hooks'
import { useRef, useState } from 'react'
import EditInput from './EditInput'
import EditList from './EditList'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import { logout } from '@/store/actions/login'
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
    if (key === 'photo') {
      // 需要修改头像
      fileRef.current!.click()
      return
    }
    dispatch(updateUserProfile(key, value))
    Toast.show({
      icon: 'success',
      content: '修改成功'
    })
    hideInput()
    hideList()
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
  // 图片上传组件ref
  const fileRef = useRef<HTMLInputElement>(null)

  const onPhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]
    // 需要上传这张图片
    const fd = new FormData()
    fd.append('photo', file)
    // 发送请求
    await dispatch(updateUserPhoto(fd))
    Toast.show({
      icon: 'success',
      content: '修改头像成功'
    })
    hideList()
  }

  // 日期选择器
  const [showBirthday, setShowBirthday] = useState(false)
  const onBirthdayShow = () => {
    setShowBirthday(true)
  }
  const onBirthdayHide = () => {
    setShowBirthday(false)
  }
  // 退出功能
  const onLogout = () => {
    Dialog.show({
      title: '温馨提示',
      content: '你确定要退出吗？',
      closeOnAction: true,
      actions: [
        [
          {
            key: 'cancel',
            text: '取消',
            style: {
              color: 'blue'
            }
          },
          {
            key: 'confirm',
            text: '确定',
            danger: true,
            bold: true,
            onClick: () => {
              // 1. 清除token
              dispatch(logout())
              // 2. 跳转到登录
              history.replace('/login')
              // 3. 给一个提示消息
              Toast.show({
                icon: 'success',
                content: '退出成功'
              })
            }
          }
        ]
      ]
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
            <Item
              arrow
              extra={userProfile.gender === 0 ? '男' : '女'}
              onClick={() => {
                setShowList({
                  visible: true,
                  type: 'gender'
                })
              }}
            >
              {'性别'}
            </Item>
            <Item arrow extra={userProfile.birthday} onClick={onBirthdayShow}>
              生日
            </Item>
          </List>
        </div>

        <div className="logout">
          <Button className="btn" onClick={onLogout}>
            退出登录
          </Button>
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
      <Popup visible={showList.visible} destroyOnClose>
        <EditList
          type={showList.type}
          hideList={hideList}
          onUpdate={onUpdate}
        />
      </Popup>
      <DatePicker
        visible={showBirthday}
        onCancel={onBirthdayHide}
        value={new Date(userProfile.birthday)}
        title="请选择日期"
        min={new Date('1900-01-01')}
        max={new Date()}
        onConfirm={(val) => {
          onUpdate('birthday', dayjs(val).format('YYYY-MM-DD'))
          onBirthdayHide()
        }}
      />
      <input type="file" hidden ref={fileRef} onChange={onPhotoChange} />
    </div>
  )
}

export default ProfileEdit
