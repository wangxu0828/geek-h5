import { ApiResponse, Comment, CommentRes } from '@/types/data'
import { NavBar, InfiniteScroll, Popup } from 'antd-mobile'
import CommentFooter from '../CommentFooter'
import NoComment from '../NoComment'
import styles from './index.module.scss'
import CommentItem from '../CommentItem'
import { useState } from 'react'
import request from '@/utils/request'
import CommentInput from '../CommentInput'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/types/store'
import { addReplyCount } from '@/store/actions/article'
type Props = {
  onHideReply: () => void
  origin: Comment
}
export default function CommentReply({ onHideReply, origin }: Props) {
  console.log(origin.reply_count)

  const [reply, setReply] = useState<CommentRes>({} as CommentRes)

  const { last_id, end_id = '' } = reply
  const hasMore = last_id !== end_id
  const loadMore = async () => {
    const res = await request.get<ApiResponse<CommentRes>>('/comments', {
      params: {
        type: 'c',
        source: origin.com_id,
        offset: reply.last_id
      }
    })
    setReply({
      ...res.data.data,
      results: [...(reply.results || []), ...res.data.data.results]
    })
  }

  const [show, setShow] = useState(false)
  const showComment = () => {
    setShow(true)
  }
  const hideComment = () => {
    setShow(false)
  }
  const { art_id } = useSelector((state: RootState) => state.article.info)
  const dispatch = useDispatch()
  const onReply = async (value: string) => {
    // console.log(value)
    // 发送请求，添加回复
    const res = await request.post<ApiResponse<{ new_obj: Comment }>>(
      '/comments',
      {
        target: origin.com_id,
        content: value,
        art_id
      }
    )
    const old = reply.results || []
    setReply({
      ...reply,
      results: [res.data.data.new_obj, ...old]
    })

    // 让评论的数量+1
    dispatch(addReplyCount(origin.com_id))

    hideComment()
  }

  const info = useSelector((state: RootState) => state.article.info)
  return (
    <div className={styles.root}>
      <div className="reply-wrapper">
        {/* 顶部导航栏 */}
        <NavBar className="transparent-navbar" onBack={onHideReply}>
          <div>{origin.reply_count}条回复</div>
        </NavBar>

        {/* 原评论信息 */}
        <div className="origin-comment">
          <CommentItem type="origin" comment={origin}></CommentItem>
        </div>

        {/* 回复评论的列表 */}
        <div className="reply-list">
          <div className="reply-header">全部回复</div>

          {origin.reply_count === 0 ? (
            <NoComment />
          ) : (
            reply.results?.map((item) => (
              <CommentItem
                type="reply"
                comment={item}
                key={item.com_id}
              ></CommentItem>
            ))
          )}
          <InfiniteScroll
            hasMore={hasMore}
            loadMore={loadMore}
          ></InfiniteScroll>
        </div>

        {/* 评论工具栏，设置 type="reply" 不显示评论和点赞按钮 */}
        <CommentFooter info={info} showComment={showComment} type="reply" />
      </div>

      {/* 添加回复的弹窗 */}
      <Popup visible={show} position="right" destroyOnClose>
        <CommentInput
          onReply={onReply}
          hideComment={hideComment}
          name={origin.aut_name}
        ></CommentInput>
      </Popup>
    </div>
  )
}
