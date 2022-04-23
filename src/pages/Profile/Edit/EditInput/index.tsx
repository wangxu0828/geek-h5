import { getUserProfile } from '@/store/actions/profile'
import { useInitialState } from '@/utils/hooks'
import { Input, NavBar, TextArea } from 'antd-mobile'
import { InputRef } from 'antd-mobile/es/components/input'
import { TextAreaRef } from 'antd-mobile/es/components/text-area'
import { useEffect, useRef, useState } from 'react'

import styles from './index.module.scss'

type Props = {
  hideInput: () => void
  type: string
  onUpdate: (key: string, value: string) => void
}
// 数据回显
const EditInput = ({ hideInput, type, onUpdate }: Props) => {
  const { userProfile } = useInitialState(getUserProfile, 'profile')
  const [value, seValue] = useState(
    type === 'name' ? userProfile.name : userProfile.intro
  )

  // 自动获取焦点
  const inputRef = useRef<InputRef>(null)
  const teatAreaRef = useRef<TextAreaRef>(null)
  useEffect(() => {
    if (type === 'name') {
      inputRef.current?.focus()
    } else {
      teatAreaRef.current?.focus()
      // textarea 光标指到最后
      document.querySelector('textarea')?.setSelectionRange(-1, -1)
    }
  }, [type])

  return (
    <div className={styles.root}>
      <NavBar
        className="navbar"
        right={
          <span
            className="commit-btn"
            onClick={() => {
              onUpdate(type, value)
            }}
          >
            提交
          </span>
        }
        onBack={hideInput}
      >
        编辑{type === 'name' ? '呢称' : '简介'}
      </NavBar>

      <div className="edit-input-content">
        <h3>{type === 'name' ? '呢称' : '简介'}</h3>

        {type === 'name' ? (
          <div className="input-wrap">
            <Input
              placeholder="请输入昵称"
              value={value}
              onChange={(e) => {
                seValue(e)
              }}
              ref={inputRef}
            />
          </div>
        ) : (
          <TextArea
            className="textarea"
            placeholder="请输入简介"
            showCount
            maxLength={99}
            value={value || ''}
            onChange={(e) => {
              seValue(e)
            }}
            ref={teatAreaRef}
          />
        )}
      </div>
    </div>
  )
}

export default EditInput
