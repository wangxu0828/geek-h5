import ArticleItem from '@/components/ArticleItem'
import { getArticleList, getNewList } from '@/store/actions/home'
import { RootState } from '@/types/store'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { InfiniteScroll, PullToRefresh } from 'antd-mobile'

import styles from './index.module.scss'
import { useHistory } from 'react-router-dom'
type Props = {
  channelId: number
}

const ArticleList = ({ channelId }: Props) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getArticleList(channelId, Date.now() + ''))
  }, [dispatch, channelId])
  const { channelArticles } = useSelector((state: RootState) => state.home)
  console.log(channelArticles)

  const { articles = [], timestamp } = channelArticles[channelId] || {}
  // 必须返回一个Promise对象
  const loadMore = async () => {
    await dispatch(getArticleList(channelId, timestamp || Date.now() + ''))
    // await sleep(1000)
  }
  const hasMore = timestamp !== null
  const onRefresh = async () => {
    // 重置当前频道的数据，重新加载第一页的数据
    await dispatch(getNewList(channelId, Date.now() + ''))
  }
  const history = useHistory()
  return (
    <div className={styles.root}>
      {/* 文章列表中的每一项 */}
      <PullToRefresh onRefresh={onRefresh}>
        {articles.map((item, index) => {
          return (
            <div
              className="article-item"
              key={index}
              onClick={() => history.push(`/article/${item.art_id}`)}
            >
              <ArticleItem article={item} />
            </div>
          )
        })}

        {/* 无限加载组件 */}
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
      </PullToRefresh>
    </div>
  )
}

export default ArticleList
