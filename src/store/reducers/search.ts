import { History, SearchResultRes, Suggestion } from '@/types/data'
import { SearchAction } from '@/types/store'
import { getLocalHistories } from '@/utils/storage'

type SearchState = {
  suggestion: Suggestion
  histories: History
  searchResultRes: SearchResultRes
}

const initialState: SearchState = {
  suggestion: [],
  histories: getLocalHistories(),
  // 存放搜索的结果
  searchResultRes: {} as SearchResultRes
}

const Search = (state = initialState, action: SearchAction): SearchState => {
  switch (action.type) {
    case 'search/suggestion':
      return {
        ...state,
        suggestion: action.payload
      }
    case 'search/history':
      return {
        ...state,
        histories: action.payload
      }
    case 'search/clearHistories':
      return {
        ...state,
        histories: []
      }
    default:
      return state
  }
}

export default Search
