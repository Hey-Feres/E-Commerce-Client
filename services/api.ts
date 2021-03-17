/*

  * Service *

  - Description: Aqui verificamos o interceptor de resposta e requisição.

  Esse código (L21) é executado a cada resposta, se comportando como um middleware, interceptando o request antes de devolver o response. Para cada resposta, é checado se existem os headers vindos da API que são necessários para o funcionamento da nossa aplicacão. Caso esses headers existam, é criado o objeto APIData, setamos ele como header padrão no objeto ´api´ e salvamos ele nos cookies do browser.

  Utilizaremos o axios para realizar as chamadas http para nosso api e js-cookie para armazenar os dados de autênticação necessários para acessarmos as rotas privadas.

  Toda vez que o axios realiza uma acão de request, esse código (L37) interfere antes da request ser realizada, verificando se a url contém o valor ´admin´, indicando que é uma rota protegida. Caso seja uma rota admin, recuperamos os dados de autenticacão dos cookies do browser e inserimos no request, usando para essa recuperacão os cookies do navegador.

*/

import axios from 'axios'
import Cookie from 'js-cookie'
import ApiData from '../dtos/ApiData'
import ApiResponseError from '../dtos/ApiReponseError'

// importação do router para que possamos realizar o redirect caso o usuário recebe a mensagem da api de que não acesso ao recurso que tentou acessar.
import Router from 'next/router'
import { toast } from 'react-toastify'

const api = axios.create({
  baseURL: 'http://localhost:3001'
})

// adição da função para setar os headers de authẽnticação na api e nos cookies do browser, iremos utilizar ela no interceptor de request (tanto no fluxo normal quando no fluxo de erro).
function setHeaders(res: AxiosResponse<any>) {
  if(res.headers['access-token'] && res.headers['access-token'] !== '') {
    const apiData: ApiData = {
      'access-token': res.headers['access-token'],
      client: res.headers.client,
      expiry: res.headers.expiry,
      'token-type': res.headers['token-type'],
      uid: res.headers.uid
    }

    api.defaults.headers = apiData
    Cookie.set('@api-data', apiData)
  }
}

api.interceptors.response.use(res => {
  setHeaders(res)
  return res
}, (err) => {
  // caso um erro ocorra na response, um novo token é retornado, logo devemos atualizá-lo na api e nos cookies
  if (err.response) {
    setHeaders(err.response)

    const data = err.response.data

    // aqui estamos tratando os erros no padrão que o rails no devolve, se existem algum array de erros, iremos extrair o nome do campo e as mensagens para que as mesmas possam ser exibidas na tela utilizando um toast
    if (data && data.errors && data.errors.fields) {
      const errors = data.errors as ApiResponseError

      const fieldsName = Object.keys(errors.fields)

      fieldsName.forEach(error => {
        toast.error(error + ': ' + errors.fields[error].join(`, `))
      })

      console.log('errors', errors)
    }
  }

  // caso a response tenha um status de não autorizado ou acesso negado, o usuário será redirecionado para o login.
  if (err.response && ( err.response.status === 401 || err.response.status === 403 )) {
    Router.push('/Auth/Login')
  }

  throw err
})

api.interceptors.request.use((req) => {
  if(req.url.includes('admin')) {
    const apiData: ApiData = JSON.parse(Cookie.get('@api-data'))
    req.headers = apiData
  }

  return req
})

export default api
