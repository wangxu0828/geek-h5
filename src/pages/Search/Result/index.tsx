import { useHistory, useLocation } from 'react-router-dom'
import { NavBar, InfiniteScroll } from 'antd-mobile'

import ArticleItem from '@/components/ArticleItem'

import styles from './index.module.scss'
import { useRef, useState } from 'react'
import { getSearchResults } from '@/store/actions/search'
import { SearchResultRes } from '@/types/data'

const Result = () => {
  const history = useHistory()
  // 1. 获取到地址栏中的key
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const key = params.get('key')!
  // const dispatch = useDispatch()
  const [result, setResult] = useState<SearchResultRes>({} as SearchResultRes)
  // useEffect(() => {
  //   async function getData() {
  //     const res = await getSearchResults(key)
  //     setResult(res.data.data)
  //   }
  //   getData()
  // }, [dispatch, key])
  const { results = [], total_count } = result
  const pageRef = useRef(1)
  const loadMore = async () => {
    const res = await getSearchResults(key, pageRef.current)
    setResult({
      ...res.data.data,
      results: [...results, ...res.data.data.results]
    })
    pageRef.current++
  }

  let hasMore = true
  if (total_count !== undefined && results.length >= total_count) {
    hasMore = false
  }
  // console.log(results.length, total_count)

  return (
    <div className={styles.root}>
      <NavBar onBack={() => history.go(-1)}>搜索结果</NavBar>
      <div className="article-list">
        {results.map((item, index) => (
          <div
            className="article-item"
            key={item.art_id}
            onClick={() => history.push(`/article/${item.art_id}`)}
          >
            <ArticleItem article={item}></ArticleItem>
          </div>
        ))}
      </div>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </div>
  )
}

export default Result
