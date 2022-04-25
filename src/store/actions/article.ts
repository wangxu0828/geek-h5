import { ApiResponse, ArticleDetail, Comment, CommentRes } from '@/types/data'
import { ArticleAction, RootThunkAction } from '@/types/store'
import request from '@/utils/request'

export function getArticleInfo(id: string): RootThunkAction {
  return async (dispatch) => {
    const res = await request.get<ApiResponse<ArticleDetail>>(`/articles/${id}`)

    dispatch({
      type: 'article/setArticleInfo',
      payload: res.data.data
    })
  }
}
// 获取文章的评论
export function getCommentList(id: string, offset?: string): RootThunkAction {
  return async (dispatch) => {
    const res = await request.get<ApiResponse<CommentRes>>('/comments', {
      params: {
        type: 'a',
        source: id,
        offset
      }
    })

    dispatch({
      type: 'article/saveComment',
      payload: res.data.data
    })
  }
}

export function clearCommentList(): ArticleAction {
  return {
    type: 'article/clearComment'
  }
}

export function likeAritcle(id: string, attitude: number): RootThunkAction {
  return async (dispatch) => {
    if (attitude === 1) {
      // 取消点赞
      await request.delete('/article/likings/' + id)
    } else {
      // 点赞
      await request.post('/article/likings', { target: id })
    }
    // 更新
    await dispatch(getArticleInfo(id))
  }
}

// 收藏
export function collectArticle(
  id: string,
  is_collected: boolean
): RootThunkAction {
  return async (dispatch) => {
    if (is_collected) {
      // 取消收藏
      await request.delete('/article/collections/' + id)
    } else {
      // 收藏
      await request.post('/article/collections', {
        target: id
      })
    }
    await dispatch(getArticleInfo(id))
  }
}

export function followUser(
  userId: string,
  is_follow: boolean
): RootThunkAction {
  return async (dispatch, getState) => {
    if (is_follow) {
      // 取消关注
      await request.delete('/user/followings/' + userId)
    } else {
      // 关注
      await request.post('/user/followings', {
        target: userId
      })
    }
    await dispatch(getArticleInfo(getState().article.info.art_id))
  }
}

export function addComment(
  articleId: string,
  content: string
): RootThunkAction {
  return async (dispatch, getState) => {
    const res = await request.post<ApiResponse<{ new_obj: Comment }>>(
      '/comments',
      {
        target: articleId,
        content
      }
    )
    // console.log(res.data.data.new_obj)
    // 添加新评论
    await dispatch({
      type: 'article/saveNewComment',
      payload: res.data.data.new_obj
    })

    // 重新获取文章的详情
    dispatch(getArticleInfo(getState().article.info.art_id))
  }
}

export function addReplyCount(commentId: string): ArticleAction {
  return {
    type: 'article/addReplyCount',
    payload: commentId
  }
}
