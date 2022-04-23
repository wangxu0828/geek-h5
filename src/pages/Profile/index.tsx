import { getProfile } from '@/store/actions/profile'
import { RootState } from '@/types/store'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './index.module.scss'
import Icon from '@/components/Icon'

const Profile = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProfile())
  }, [dispatch])
  const profile = useSelector((state: RootState) => state.profile.profile)
  return (
    <div className={styles.root}>
      <div className="profile">
        {/* 个人信息 */}
        <div className="user-info">
          <div className="avatar">
            <img src={profile.photo} alt="" />
          </div>
          <div className="user-name">{profile.name}</div>
          <Link to="/profile/edit" className="user-profile">
            个人信息
            <Icon type="iconbtn_right" />
          </Link>
        </div>

        {/* 今日阅读 */}
        <div className="read-info">
          <Icon type="iconbtn_readingtime" />
          今日阅读
          <span>10</span>
          分钟
        </div>

        {/* 动态 - 对应的这一行 */}
        <div className="count-list">
          <div className="count-item">
            <p>{profile.art_count}</p>
            <p>动态</p>
          </div>
          <div className="count-item">
            <p>{profile.like_count}</p>
            <p>关注</p>
          </div>
          <div className="count-item">
            <p>{profile.fans_count}</p>
            <p>粉丝</p>
          </div>
          <div className="count-item">
            <p>{profile.follow_count}</p>
            <p>被赞</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
