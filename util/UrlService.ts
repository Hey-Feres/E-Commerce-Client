// Nele estamos criando uma interface que irá receber um objeto contendo a página selecionada pelo usuário (sempre será uma string, a tipagem string | string [] define que ele pode ser uma string um array de string, como iremos utilizar o query string do router do next, os parâmetros da query string são retornados podendo ser uma string | string [] ) e a pesquisa desejada do usuário caso haja uma.
// Basicamente ele recebe uma página e pode ou não receber um termo de pesquisa e retorna a junção dos campos já no formato de query string
/*
  UrlService.execute({ page: 1, search: 'test'})
    retorna: `?search=test&page=1`
  UrlService.execute({ page: 1})
    retorna: `?page=1`
*/


interface UrlServiceRequest {
  page: string | string[]
  search?: string
}

const UrlService = {
  execute({ page, search }: UrlServiceRequest): string {
    return(`${search !== '' ? `?search[name]=${search}` : ''}` + `${search !== '' ? '&' : '?'}page=${page}`)
  }
}

export default UrlService
