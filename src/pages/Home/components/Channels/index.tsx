import classnames from 'classnames'

import Icon from '@/components/Icon'
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/types/store'
import { differenceBy } from 'lodash'
import {
  addChannel,
  changeActive,
  delChannel,
  getALLChannel
} from '@/store/actions/home'
import { useInitialState } from '@/utils/hooks'
import { useState } from 'react'
import { Channel } from '@/types/data'
type Props = {
  hide: () => void
}

const Channels = ({ hide }: Props) => {
  const { allChannel } = useInitialState(getALLChannel, 'home')
  const { userChannel, active } = useSelector((state: RootState) => state.home)
  const dispatch = useDispatch()
  const [isEdit, setIsEdit] = useState(false)
  const onEdit = () => {
    setIsEdit(!isEdit)
  }
  const onAddChannel = (item: Channel) => {
    dispatch(addChannel(item))
  }
  const del = (id: number) => {
    dispatch(delChannel(id))
  }
  return (
    <div className={styles.root} style={{ width: '100vw' }}>
      <div className="channel-header">
        <Icon type="iconbtn_channel_close" onClick={hide} />
      </div>
      <div className="channel-content">
        {/* 编辑时，添加类名 edit */}
        <div className={classnames('channel-item', isEdit && 'edit')}>
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">
              {isEdit ? '点击删除频道' : '点击进入频道'}
            </span>
            <span className="channel-item-edit" onClick={onEdit}>
              {isEdit ? '完成' : '编辑'}
            </span>
          </div>
          <div className="channel-list">
            {userChannel.map((item) => {
              return (
                <span
                  className={classnames(
                    'channel-list-item',
                    item.id === active && 'selected'
                  )}
                  key={item.id}
                  onClick={() => {
                    if (isEdit) return
                    dispatch(changeActive(item.id))
                    hide()
                  }}
                >
                  {item.name}
                  {item.id !== 0 && (
                    <Icon
                      type="iconbtn_tag_close"
                      onClick={() => del(item.id)}
                    />
                  )}
                </span>
              )
            })}
          </div>
        </div>

        <div className="channel-item">
          <div className="channel-item-header">
            <span className="channel-item-title">频道推荐</span>
            <span className="channel-item-title-extra">点击添加频道</span>
          </div>
          <div className="channel-list">
            {differenceBy(allChannel, userChannel, 'id') !== [] &&
              differenceBy(allChannel, userChannel, 'id').map((item) => (
                <span
                  className="channel-list-item"
                  key={item.id}
                  onClick={() => onAddChannel(item)}
                >
                  + {item.name}
                </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Channels
