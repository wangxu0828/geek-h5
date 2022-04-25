import classnames from 'classnames'
import Image from '@/components/Image'

import Icon from '@/components/Icon'

import styles from './index.module.scss'
import { Article } from '@/types/data'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)
type Props = {
  article: Article
}

const ArticleItem = ({ article }: Props) => {
  const {
    title,
    cover: { type, images },
    aut_name,
    comm_count,
    pubdate
  } = article
  return (
    <div className={styles.root}>
      <div
        className={classnames(
          'article-content',
          type === 3 && 't3',
          type === 0 && 'none-mt'
        )}
      >
        <h3>{title}</h3>
        {type !== 0 && (
          <div className="article-imgs">
            <div className="article-img-wrapper">
              {images.map((image, index) => (
                <Image src={image} key={index} />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className={classnames('article-info', type === 0 && 'none-mt')}>
        <span>{aut_name}</span>
        <span>{comm_count} 评论</span>
        <span>{dayjs(pubdate).toNow()}</span>
        <span className="close">
          <Icon type="iconbtn_essay_close" />
        </span>
      </div>
    </div>
  )
}

export default ArticleItem
