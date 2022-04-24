import { Route, Redirect, RouteProps, useLocation } from 'react-router-dom'
import cache from '@/utils/cache'
import { cache_Token } from '@/constance/index'

export default function PrivateRoute({ children, ...rest }: RouteProps) {
  const location = useLocation()
  console.log(cache.hasCache(cache_Token))

  return cache.hasCache(cache_Token) ? (
    <Route {...rest} children={children} />
  ) : (
    <Route
      {...rest}
      render={() => {
        // 没有登录
        return (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: location.pathname
              }
            }}
          ></Redirect>
        )
      }}
    />
  )
}
