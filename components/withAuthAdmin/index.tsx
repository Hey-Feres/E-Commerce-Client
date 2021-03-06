/*

  * Component *

  - Description: O componente withAuthAdmin será um componente de ordem superior ( HOC ), basicamente ele recebe um componente e retorna um novo component. Ele basicamente checa se o usuário tem acesso as rotas admin, se sim ele devolverá o componente protegido, se não ele irá redicionar o usuário para a tela de login.

*/

import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Cookie from 'js-cookie'

import AuthState from '../../dtos/AuthState'
import User from '../../dtos/User'
import ApiData from '../../dtos/ApiData'

const withAuthAdmin = (Component) => {
  const Auth = (props) => {
    const router = useRouter()
    const loggedUser: User = useSelector((state: AuthState) => state.auth.loggedUser)
    const apiData: ApiData = JSON.parse(Cookie.get('@api-data'))
    const accessDenied = !loggedUser || loggedUser.profile !== 'admin' || !apiData || !apiData['access-token'] || apiData['aceess-token'] === ''

    if(accessDenied) {
      router.push('/Auth/Login')
    }

    return <Component {...props} />
  }

  if(Component.getServerSideProps) {
    Auth.getServerSideProps = Component.getServerSideProps
  }

  return Auth
}

export default withAuthAdmin
