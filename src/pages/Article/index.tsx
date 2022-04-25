import { NavBar, InfiniteScroll, Toast, Popup } from 'antd-mobile'
import { useHistory, useParams } from 'react-router-dom'
import classNames from 'classnames'
import styles from './index.module.scss'
import DOMPurify from 'dompurify'
import Icon from '@/components/Icon'
import CommentItem from './components/CommentItem'
import CommentFooter from './components/CommentFooter'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import {
  addComment,
  clearCommentList,
  followUser,
  getArticleInfo,
  getCommentList
} from '@/store/actions/article'
import dayjs from 'dayjs'
import { useInitialState } from '@/utils/hooks'
import hljs from 'highlight.js'
import 'highlight.js/styles/vs2015.css'
import NoComment from './components/NoComment'
import { RootState } from '@/types/store'
import CommentInput from './components/CommentInput'
import CommentReply from './components/CommentReply'
import { Comment } from '@/types/data'
const Article = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const params = useParams<{ id: string }>()

  // 获取动态路由参数
  const articleId = params.id
  useEffect(() => {
    dispatch(getArticleInfo(articleId))
  }, [dispatch, articleId])
  // 获取文章详情信息
  const { info } = useInitialState(() => getArticleInfo(articleId), 'article')

  useEffect(() => {
    // 配置highlight
    hljs.configure({
      // 忽略未经转义的HTML字符
      ignoreUnescapedHTML: true
    })
    // 获取到内容中所有的code标签
    const codes = document.querySelectorAll('.dg-html pre code')
    codes.forEach((el) => {
      // 让code高亮
      hljs.highlightElement(el as HTMLElement)
    })
  })
  // 是否显示顶部信息
  const [isShowAuthor, setIsShowAuthor] = useState(false)
  const authorRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const wrapDOM = wrapRef.current!
    const authDOM = authorRef.current!
    const onScroll = function () {
      const rect = authDOM.getBoundingClientRect()!

      if (rect.top <= 0) {
        setIsShowAuthor(true)
      } else {
        setIsShowAuthor(false)
      }
    }
    wrapDOM.addEventListener('scroll', onScroll)
    return () => {
      wrapDOM.removeEventListener('scroll', onScroll)
    }
  }, [])
  useEffect(() => {
    return () => {
      dispatch(clearCommentList())
    }
  }, [dispatch])
  // 获取评论数据
  const {
    results = [],
    last_id,
    end_id = ''
  } = useSelector((state: RootState) => state.article.comment)
  const hasMore = last_id !== end_id

  const loadMore = async () => {
    // console.log('加载更多数据')
    await dispatch(getCommentList(articleId, last_id))
  }

  const onFollowUser = async () => {
    await dispatch(followUser(info.aut_id, info.is_followed))
    Toast.show('操作成功')
  }
  const [isComment, setIsComment] = useState(false)
  const commentRef = useRef<HTMLDivElement>(null)
  const onComment = () => {
    // console.log('跳转到')
    const commentDOM = commentRef.current!
    const wrapDOM = wrapRef.current!
    if (isComment) {
      wrapDOM.scrollTo(0, 0)
    } else {
      wrapDOM.scrollTo(0, commentDOM.offsetTop - 44)
    }
    setIsComment(!isComment)
  }

  // 评论表单显示状态
  const [commentShow, setCommentShow] = useState(false)
  const hideComment = () => {
    setCommentShow(false)
  }
  const showComment = () => {
    setCommentShow(true)
  }

  const onReply = (value: string) => {
    dispatch(addComment(articleId, value))
    hideComment()
    onComment()
    Toast.show({
      icon: 'success',
      content: '发表成功'
    })
  }

  const [replyShow, setReplyShow] = useState({
    visible: false,
    origin: {} as Comment
  })
  const hideCommentReply = () => {
    setReplyShow({
      visible: false,
      origin: {} as Comment
    })
  }
  const onCommentReply = (comment: Comment) => {
    setReplyShow({
      visible: true,
      origin: comment
    })
  }
  return (
    <div className={styles.root}>
      <div className="root-wrapper">
        <NavBar
          onBack={() => history.go(-1)}
          right={
            <span>
              <Icon type="icongengduo" />
            </span>
          }
        >
          {isShowAuthor && (
            <div className="nav-author">
              <img src={info.aut_photo} alt="" />
              <span className="name">{info.aut_name}</span>
              <span
                className={classNames(
                  'follow',
                  info.is_followed ? 'followed' : ''
                )}
              >
                {info.is_followed ? '已关注' : '关注'}
              </span>
            </div>
          )}
        </NavBar>
        {/* 文章详情和评论 */}
        <div className="wrapper" ref={wrapRef}>
          <div className="article-wrapper">
            <div className="header">
              <h1 className="title">{info.title}</h1>

              <div className="info">
                <span>{dayjs(info.pubdate).format('YYYY-MM-DD')}</span>
                <span>{info.read_count} 阅读</span>
                <span>{info.comm_count} 评论</span>
              </div>

              <div className="author" ref={authorRef}>
                <img src={info.aut_photo} alt="" />
                <span className="name">{info.aut_name}</span>
                <span
                  className={classNames(
                    'follow',
                    info.is_followed ? 'followed' : ''
                  )}
                  onClick={onFollowUser}
                >
                  {info.is_followed ? '已关注' : '关注'}
                </span>
              </div>
            </div>

            <div className="content">
              <div
                className="content-html dg-html"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(info.content || '')
                }}
              />
              <div className="date">
                发布文章时间：{dayjs(info.pubdate).format('YYYY-MM-DD')}
              </div>
            </div>
          </div>

          <div className="comment" ref={commentRef}>
            <div className="comment-header">
              <span>全部评论（{info.comm_count}）</span>
              <span>{info.like_count} 点赞</span>
            </div>

            <div className="comment-list">
              {info.comm_count === 0 ? (
                <NoComment></NoComment>
              ) : (
                results?.map((item, index) => (
                  <CommentItem
                    key={item.com_id}
                    type="normal"
                    comment={item}
                    onCommentReply={onCommentReply}
                  ></CommentItem>
                ))
              )}

              <InfiniteScroll hasMore={hasMore} loadMore={loadMore} />
            </div>
          </div>
        </div>

        {/* 底部评论栏 */}
        <CommentFooter
          info={info}
          onComment={onComment}
          showComment={showComment}
        />

        <Popup visible={commentShow} position="right">
          <CommentInput
            hideComment={hideComment}
            onReply={onReply}
          ></CommentInput>
        </Popup>

        <Popup visible={replyShow.visible} position="right" destroyOnClose>
          <CommentReply
            origin={replyShow.origin}
            onHideReply={hideCommentReply}
          ></CommentReply>
        </Popup>
      </div>
    </div>
  )
}

export default Article
