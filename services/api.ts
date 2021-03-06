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

const api = axios.create({
  baseURL: 'http://localhost:3001'
})

api.interceptors.response.use((res) => {
  if(res.headers['access-token']) {
    const apiData: ApiData = {
      'access-token': res.headers['access-token'],
      'client': res.headers.client,
      'expiry': res.headers.expiry,
      'token-type': res.headers['token-type'],
      'uid': res.headers.uid
    }

    api.defaults.headers = apiData
    Cookie.set('@api-data', apiData)
  }

  return res
})

api.interceptors.request.use((req) => {
  if(req.url.includes('admin')) {
    const apiData: ApiData = JSON.parse(Cookie.get('@api-data'))
    req.headers = apiData
  }

  return req
})

export default api
