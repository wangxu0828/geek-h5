import styles from './index.module.scss'

type Props = {
  hideList: () => void
}
const EditList = ({ hideList }: Props) => {
  return (
    <div className={styles.root}>
      <div className="list-item">男</div>
      <div className="list-item">女</div>

      <div className="list-item" onClick={hideList}>
        取消
      </div>
    </div>
  )
}

export default EditList
