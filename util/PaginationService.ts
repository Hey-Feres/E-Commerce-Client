// Seu funcionamento consistem em retornar um array de strings contendo a páginação baseados nos dados que o mesmo recebe, total_pages and page
// total_pages é o total de páginas retornada pela api de acordo com os critérios que foram passadas para a mesma (pesquisa, quantidade de registros por página)
// page é a página corrente, ou seja, o index sem critério nenhum sempre vai retornar a página 1.
// Sempre serão mostrados a primeira e a última página.
/*
  PaginationService.execute({ page: 1, total_pages: 5});
    retorna: ['1', '2', '3', '4', '5']

  PaginationService.execute({ page: 1, total_pages: 10});
    retorna: ['1', '2', '3', '...', '10']

  PaginationService.execute({ page: 4, total_pages: 10});
    retorna: ['1','...', '3', '4', '5', '...', '10']

  PaginationService.execute({ page: 8, total_pages: 10});
    retorna: ['1','...', '7', '8', '9', '10']

  PaginationService.execute({ page: 9, total_pages: 10});
    retorna: ['1','...', '8', '9', '10']
*/


const PaginationService = {
  execute(total_pages: number, current_page: number): Array<string> {
    let arr: Array<string> = []

    arr.push('1')

    // se o total de páginas for maior que 5, ele irá realizar a montagem do array de páginação de acordo com a página atual
    // se for menor que 5 páginas, todas serão retornadas no array de páginação
    if (total_pages > 5) {
      // se página atual for menor ou igual a 3, ele irá retornar as três primeiras paǵinas o simbolismo de mais páginas e a última página
      if (current_page <= 3) {
        arr.push('2')
        arr.push('3')
        // utilizado para simbolizar que existem páginas entre a listagem e o final
        arr.push('...')

        arr.push(total_pages.toString())
      } else  {
        // se página atual for maior que 3, ele irá retornar o array de páginação de acordo com a posição da página, com simbolimo e mais páginas antes ou depois do conjunto de páginas exibidos
        arr.push('...')
        arr.push((current_page - 1).toString())
        arr.push(current_page.toString())

        if (current_page + 1 < total_pages ) {
          arr.push((current_page + 1).toString())
        }

        if (current_page + 2 < total_pages) {
          // utilizado para simbolizar que existem páginas entre a listagem e o inicial
          arr.push('...')
        }

        if (current_page < total_pages) {
          arr.push(total_pages.toString())
        }
      }
    } else {
      for(let i = 2; i <= total_pages; i++) {
        arr.push(i.toString())
      }
    }

    return arr
  }
}

export default PaginationService
