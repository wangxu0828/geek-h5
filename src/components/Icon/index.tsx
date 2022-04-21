import React from 'react'
import classnames from 'classnames'

type Props = {
  // icon的类型
  type: string
  // icon的自动一榜示
  className?: string
  // 点击时间
  onClick?: () => void
}

export default function icon({ type, className, onClick }: Props) {
  return (
    <div>
      <svg
        className={classnames('icon', className)}
        aria-hidden="true"
        onClick={onClick}
      >
        {/* 使用时，只需要将此处的 iconbtn_like_sel 替换为 icon 的名称即可*/}
        <use xlinkHref={`#${type}`}></use>
      </svg>
    </div>
  )
}
