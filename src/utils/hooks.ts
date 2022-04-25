import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/types/store'

const useInitialState = <T extends keyof RootState>(
  action: () => void,
  stateName: T
) => {
  const dispatch = useDispatch()
  const actionRef = useRef(action)
  useEffect(() => {
    const actionFn = actionRef.current
    dispatch(actionFn())
  }, [dispatch])

  const state = useSelector((state: RootState) => state[stateName])

  return state
}

export { useInitialState }
