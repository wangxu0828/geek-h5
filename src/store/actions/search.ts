import { ApiResponse, SearchResultRes, Suggestion } from '@/types/data'
import { RootThunkAction } from '@/types/store'
import request from '@/utils/request'
import { removeLocalHistories, setLocalHistories } from '@/utils/storage'

export const getSuggestion = (value: string): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.get<ApiResponse<{ options: Suggestion }>>(
      '/suggestion',
      {
        params: {
          q: value
        }
      }
    )

    dispatch({ type: 'search/suggestion', payload: res.data.data.options })
  }
}

export const savehistory = (value: string): RootThunkAction => {
  return (dispatch, getState) => {
    let history = getState().search.histories || []
    if (history.includes(value)) {
      history = [value, ...history.filter((item) => item !== value)]
    } else {
      if (history.length === 10) {
        history.unshift(value)
        history.pop()
      } else {
        history.push(value)
      }
    }
    dispatch({
      type: 'search/history',
      payload: history
    })
    setLocalHistories(history)
  }
}

/**
 * 清空历史记录
 * @returns
 */
export function clearHistories(): RootThunkAction {
  return async (dispatch) => {
    // 清空本地历史记录
    removeLocalHistories()
    // 清空redux数据
    dispatch({
      type: 'search/clearHistories'
    })
  }
}

/**
 * 获取搜索结果数据
 */
export const getSearchResults = async (keyword: string, page: number) => {
  return await request.get<ApiResponse<SearchResultRes>>('search', {
    params: {
      q: keyword,
      page,
      per_page: 10
    }
  })
}
