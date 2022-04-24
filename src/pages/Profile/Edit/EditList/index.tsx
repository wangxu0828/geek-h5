import styles from './index.module.scss'

type Props = {
  hideList: () => void
  type: '' | 'gender' | 'photo'
  onUpdate: (key: string, value: string) => void
}
const genderList = [
  { title: '男', value: '0' },
  { title: '女', value: 1 }
]

const photoList = [
  { title: '拍照', value: '' },
  { title: '本地选择', value: '' }
]

const EditList = ({ hideList, type, onUpdate }: Props) => {
  let list: any[] = []
  list = type === 'gender' ? genderList : photoList
  return (
    <div className={styles.root}>
      {list.map((item) => (
        <div
          key={item.title}
          className="list-item"
          onClick={() => onUpdate(type, item.value)}
        >
          {item.title}
        </div>
      ))}
      <div className="list-item" onClick={hideList}>
        取消
      </div>
    </div>
  )
}

export default EditList
