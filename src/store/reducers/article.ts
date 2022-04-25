import { ArticleDetail, CommentRes } from '@/types/data'
import { ArticleAction } from '@/types/store'

type ArticleType = {
  info: ArticleDetail
  comment: CommentRes
}

const initialState: ArticleType = {
  // 文章详情数据
  info: {},
  comment: {}
} as ArticleType

export default function article(
  state = initialState,
  action: ArticleAction
): ArticleType {
  if (action.type === 'article/setArticleInfo') {
    return {
      ...state,
      info: action.payload
    }
  }
  if (action.type === 'article/saveComment') {
    const old = state.comment.results || []
    return {
      ...state,
      comment: {
        ...action.payload,
        results: [...old, ...action.payload.results]
      }
    }
  }
  if (action.type === 'article/clearComment') {
    return {
      ...state,
      comment: {} as CommentRes
    }
  }

  if (action.type === 'article/saveNewComment') {
    return {
      ...state,
      comment: {
        ...state.comment,
        results: [...state.comment.results]
      }
    }
  }
  if (action.type === 'article/addReplyCount') {
    return {
      ...state,
      comment: {
        ...state.comment,
        results: state.comment.results.map((item) => {
          if (item.com_id === action.payload) {
            return {
              ...item,
              reply_count: item.reply_count + 1
            }
          } else {
            return item
          }
        })
      }
    }
  }
  return state
}
