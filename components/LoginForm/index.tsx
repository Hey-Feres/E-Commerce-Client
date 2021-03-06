/*

  * Component *

  - Description: Form for Login

*/

import React from 'react'
import { InputGroup, FormControl, Button, Row, Col } from 'react-bootstrap'
import BlueBackground from '../shared/BlueBackground'
import Link from 'next/link'
import AuthState from '../../dtos/AuthState'
import User from '../../dtos/User'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { setLoggedUser } from '../../store/modules/auth/reducer'
import UsersService from '../../services/users'
import { toast } from 'react-toastify'

interface LoginProps {
  titlePhrase: String,
  buttonPhrase: String
}

const LoginForm: React.FC<LoginProps> = ({ titlePhrase, buttonPhrase }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const loggedUser: User = useSelector((state: AuthState) => state.auth.loggedUser)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const passwordRef = useRef(null)
  /*
    Aqui pegamos o evento do handle Submit e realizamos a tipagem do email e do password, mandando pro endpoint do signIn. Assim, armazenamos os dados recebidos em um objeto e enviamos para o redux por meio do Dispatch. Caso o endpoint retornasse 200, exibe o toast de sucesso e redireciona /Admin (rota do dashboard). Caso não, renderiza o Toast de warning exibindo o erro. Para isso, usaremos a tipagem do nosso /dtos/AuthState, tipando os dados do nosso estado da autenticacão.
  */
  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()

    try {
      const response = await UsersService.signIn({ email, password })

      const { id, email: userEmail, name, profile } = response.data.data

      const user = {
        id,
        name,
        email: userEmail,
        profile: profile
      }

      dispatch(setLoggedUser(user))

      toast.info('Login realizado com sucesso!')

      router.push(user.profile === 'admin' ? '/Admin/' : '/')
    } catch (err) {
      toast.error('E-mail ou senha inválidos!')
    }
  }

  /*
    Basicamente quando um usuário realizar o seu cadastro, o campo de e-mail do form de sign in será preenchido e campo de senha receberá o foco, assim deixando a tela mais intuitiva.
  */

  useEffect(() => {
    if(loggedUser) {
      setEmail(loggedUser.email);
      if(passwordRef && passwordRef.current) {
        passwordRef.current.focus();
      }
    }
  }, [loggedUser])

  return (
    <form onSubmit={handleSubmit}>
      <Row>
          <Col lg={{span: 6, offset: 3}} md={{span: 8, offset: 2}}>
            <BlueBackground>
              <h4>{ titlePhrase }</h4>

              <InputGroup className="mt-3">
                <FormControl
                  placeholder="Meu e-mail"
                  value={email}
                  type="email"
                  onChange={ (evt: React.ChangeEvent<HTMLInputElement>) => setEmail(evt.target.value)}
                  required
                />
              </InputGroup>

              <InputGroup className="mt-3">
                <FormControl
                  ref={passwordRef}
                  placeholder="Senha"
                  value={password}
                  type="password"
                  onChange={ (evt: React.ChangeEvent<HTMLInputElement>) =>setPassword(evt.target.value) }
                  required
                />
              </InputGroup>

              <Button className="btn btn-info mt-3 w-100">{ buttonPhrase }</Button>

              <br/>

              <Link href="/Auth/PasswordRecovery">Esqueci minha senha</Link>

              <br/>
            </BlueBackground>
          </Col>
      </Row>
    </form>
  )
}

export default LoginForm
