import { ApiResponse, Article, Channel } from '@/types/data'
import { HomeAction, RootThunkAction } from '@/types/store'
import instance from '@/utils/request'
import { getChannels, hasToken, setChannels } from '@/utils/storage'

export const getUserChannel = (): RootThunkAction => {
  return async (dispatch) => {
    if (hasToken()) {
      const res = await instance.get<ApiResponse<{ channels: Channel[] }>>(
        '/user/channels'
      )
      dispatch({
        type: 'home/saveUserChannels',
        payload: res.data.data.channels
      })
    } else {
      // 没有登陆，优先从本地获取
      const channels = getChannels()
      if (channels.length > 0) {
        // 本地有数据
        dispatch({
          type: 'home/saveUserChannels',
          payload: channels
        })
      } else {
        const res = await instance.get<ApiResponse<{ channels: Channel[] }>>(
          '/channels'
        )
        dispatch({
          type: 'home/saveUserChannels',
          payload: res.data.data.channels
        })
        // 保存到本地
        setChannels(res.data.data.channels)
      }
    }
  }
}

export const getALLChannel = (): RootThunkAction => {
  return async (dispatch) => {
    const res = await instance.get<ApiResponse<{ channels: Channel[] }>>(
      '/channels'
    )
    dispatch({
      type: 'home/saveAllChannels',
      payload: res.data.data.channels
    })
  }
}

export const changeActive = (id: number): HomeAction => {
  return {
    type: 'home/changeChannelsActive',
    payload: id
  }
}

// 添加频道
export const addChannel = (channel: Channel): RootThunkAction => {
  return async (dispatch, getState) => {
    // 获取到所有的userChannels
    const { userChannel } = getState().home
    if (hasToken()) {
      await instance.patch('/user/channels', {
        channels: [channel]
      })
    } else {
      // 未登录
      // 将channels信息保存到本地
      setChannels([...userChannel, channel])
    }
    dispatch({
      type: 'home/saveUserChannels',
      payload: [...userChannel, channel]
    })
  }
}

// 删除频道
export const delChannel = (id: number): RootThunkAction => {
  return async (dispatch, getState) => {
    // 获取到所有的userChannels
    const { userChannel } = getState().home
    console.log(id)

    if (hasToken()) {
      await instance.delete('/user/channels', {
        data: {
          channels: [id]
        }
      })
    } else {
      // 未登录
      // 将channels信息保存到本地
      setChannels(userChannel.filter((item) => item.id !== id))
    }
    console.log(3213123)

    dispatch({
      type: 'home/saveUserChannels',
      payload: userChannel.filter((item) => item.id !== id)
    })
  }
}

export const getArticleList = (
  channel_id: number,
  timestamp: string
): RootThunkAction => {
  return async (dispatch) => {
    const res = await instance.get<
      ApiResponse<{
        pre_timestamp: string
        results: Article[]
      }>
    >('/articles', {
      params: {
        channel_id,
        timestamp
      }
    })

    const { pre_timestamp, results } = res.data.data
    dispatch({
      type: 'home/saveChannelArticles',
      payload: {
        channel_id,
        timestamp: pre_timestamp,
        articles: results
      }
    })
  }
}

export const getNewList = (
  channel_id: number,
  timestamp: string
): RootThunkAction => {
  return async (dispatch) => {
    const res = await instance.get<
      ApiResponse<{
        pre_timestamp: string
        results: Article[]
      }>
    >('/articles', {
      params: {
        channel_id,
        timestamp
      }
    })
    const { pre_timestamp, results } = res.data.data
    dispatch({
      type: 'home/saveNewArticles',
      payload: {
        channel_id,
        timestamp: pre_timestamp,
        articles: results
      }
    })
  }
}
