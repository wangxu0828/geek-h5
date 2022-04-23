import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/types/store'

const useInitialState = <T extends keyof RootState>(
  action: () => void,
  stateName: T
) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(action())
  }, [dispatch, action])

  const state = useSelector((state: RootState) => state[stateName])

  return state
}

export { useInitialState }
