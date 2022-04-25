import classnames from 'classnames'
import { useHistory } from 'react-router'
import { Dialog, NavBar, SearchBar } from 'antd-mobile'

import Icon from '@/components/Icon'
import styles from './index.module.scss'
import { useState } from 'react'
import { useDebounceFn } from 'ahooks'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearHistories,
  getSuggestion,
  savehistory
} from '@/store/actions/search'
import { RootState } from '@/types/store'

const SearchPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [keyword, setKeyword] = useState('')
  const { run: getSuggestFn } = useDebounceFn(
    (e: string) => {
      dispatch(getSuggestion(e))
    },
    {
      wait: 200
    }
  )

  const onChange = (e: string) => {
    setKeyword(e)
    if (e === '') return
    getSuggestFn(e)
  }
  const { suggestion, histories } = useSelector(
    (state: RootState) => state.search
  )

  const highLight = (str: string) => {
    return (
      str &&
      str.replace(new RegExp(keyword, 'gi'), (match) => `<span>${match}</span>`)
    )
  }
  const onSearch = (keyword: string) => {
    if (!keyword) return
    dispatch(savehistory(keyword))
    // 跳转页面
    history.push('/search/result?key=' + keyword)
  }
  const onClearHistory = () => {
    // 清空历史记录
    Dialog.confirm({
      title: '温馨提示',
      content: '你确定要清空记录吗？',
      onConfirm: function () {
        dispatch(clearHistories())
      }
    })
  }
  return (
    <div className={styles.root}>
      <NavBar
        className="navbar"
        onBack={() => history.go(-1)}
        right={
          <span className="search-text" onClick={() => onSearch(keyword)}>
            搜索
          </span>
        }
      >
        <SearchBar
          placeholder="请输入关键字搜索"
          value={keyword}
          onChange={onChange}
        />
      </NavBar>

      {keyword.length === 0 && (
        <div
          className="history"
          style={{
            display: keyword.length !== 0 ? 'none' : 'block'
          }}
        >
          <div className="history-header">
            <span>搜索历史</span>
            <span onClick={onClearHistory}>
              <Icon type="iconbtn_del" />
              清除全部
            </span>
          </div>

          <div className="history-list">
            {histories.map((item, index) => {
              return (
                <span
                  className="history-item"
                  key={index}
                  onClick={() => onSearch(item)}
                >
                  <span className="text-overflow">{item}</span>
                  <Icon type="iconbtn_essay_close" />
                </span>
              )
            })}
          </div>
        </div>
      )}

      <div
        className={classnames(
          'search-result',
          keyword.length > 0 ? 'show' : ''
        )}
      >
        {suggestion.map((item, index) => {
          return (
            <div
              className="result-item"
              key={index}
              onClick={() => onSearch(item)}
            >
              <Icon className="icon-search" type="iconbtn_search" />
              <div
                className="result-value text-overflow"
                dangerouslySetInnerHTML={{
                  __html: highLight(item)
                }}
              ></div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SearchPage
