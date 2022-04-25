import Icon from '@/components/Icon'
import { collectArticle, likeAritcle } from '@/store/actions/article'
import { ArticleDetail } from '@/types/data'
import { useDispatch } from 'react-redux'
import styles from './index.module.scss'

type Props = {
  // normal 普通评论
  // reply 回复评论
  type?: 'normal' | 'reply'
  info: ArticleDetail
  onComment?: () => void
  showComment: () => void
}

const CommentFooter = ({
  type = 'normal',
  info,
  onComment,
  showComment
}: Props) => {
  const dispatch = useDispatch()
  const onLike = async () => {
    await dispatch(likeAritcle(info.art_id, info.attitude))
  }
  const collect = async () => {
    dispatch(collectArticle(info.art_id, info.is_collected))
  }
  return (
    <div className={styles.root}>
      <div className="input-btn" onClick={showComment}>
        <Icon type="iconbianji" />
        <span>抢沙发</span>
      </div>

      {type === 'normal' && (
        <>
          <div className="action-item" onClick={onComment}>
            <Icon type="iconbtn_comment" />
            <p>评论</p>
            {!!info.comm_count && (
              <span className="bage">{info.comm_count}</span>
            )}
          </div>
          <div className="action-item" onClick={onLike}>
            <Icon
              type={info.attitude === 1 ? 'iconbtn_like_sel' : 'iconbtn_like2'}
            />
            <p>点赞</p>
          </div>
          <div className="action-item" onClick={collect}>
            <Icon
              type={
                info.is_collected ? 'iconbtn_collect_sel' : 'iconbtn_collect'
              }
            />
            <p>收藏</p>
          </div>
        </>
      )}

      {type === 'reply' && (
        <div className="action-item">
          <Icon
            type={info.attitude === 1 ? 'iconbtn_like_sel' : 'iconbtn_like2'}
          />
          <p>点赞</p>
        </div>
      )}

      <div className="action-item">
        <Icon type="iconbtn_share" />
        <p>分享</p>
      </div>
    </div>
  )
}

export default CommentFooter
