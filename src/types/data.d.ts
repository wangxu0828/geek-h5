// 通用数据
export type loginForm = {
  mobile: string
  code: string
}

export type Token = {
  token: string
  refresh_token: string
}

export type ApiResponse<T> = {
  message: string
  data: T
}

// 获取用户信息接口的类型
export type Profile = {
  id: string
  name: string
  photo: string
  art_count: number
  follow_count: number
  fans_count: number
  like_count: number
}

// 获取个人信息接口
export type UserProfile = {
  id: string
  photo: string
  name: string
  mobile: string
  gender: number
  birthday: string
  intro: string
}

// 获取频道列表接口
export type Channel = {
  id: number
  name: string
}

export type Article = {
  art_id: string
  title: string
  aut_id: string
  comm_count: number
  pubdate: string
  aut_name: string
  is_top: number
  cover: {
    type: 0 | 1 | 3
    images: string[]
  }
}

export type Suggestion = string[]

export type History = string[]

export type SearchResultRes = {
  page: number
  per_page: number
  results: Article[]
  total_count: number
}

// 文章详情
export type ArticleDetail = {
  art_id: string
  attitude: number
  aut_id: string
  aut_name: string
  aut_photo: string
  comm_count: number
  content: string
  is_collected: boolean
  is_followed: boolean
  like_count: number
  pubdate: string
  read_count: number
  title: string
}

export type Comment = {
  aut_id: string
  aut_name: string
  aut_photo: string
  com_id: string
  content: string
  is_followed: boolean
  is_liking: boolean
  like_count: number
  pubdate: string
  reply_count: number
}

export type CommentRes = {
  end_id: string
  last_id: string
  results: Comment[]
  total_count: number
}
