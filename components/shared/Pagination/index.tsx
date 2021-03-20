// O componente de páginação é responsável por realizar a renderização e acionar a revalidação de dados do SRW caso a página seja alterada na listagem de recursos.
// Basicamente ela recebe os dados dos meta devolvidos pela api e repassá-lo para o PaginationService que irá fazer a criação do array contendo os dados da páginação.
// Quando o usuário realizar o click em qualquer um dos botões de paginação, o mesmo irá realizar uma 'navegação' para o recurso que esta sendo listado + a página que foi selecionada, nesse momento o UrlService será executado alterando a url e assim forçando o SWR a fazer uma revalidação dos dados.

import { useState, useEffect } from 'react'
import Meta from '../../../dtos/Meta'
import StyledButton from '../StyledButton'
import PaginationService from '../../../util/PaginationService'

import { useRouter } from 'next/router'

const Pagination: React.FunctionComponent<Meta> = ({ page, length, total, total_pages }) => {
  const [pagination, setPagination] = useState(['1'])
  const router = useRouter()

  //sempre que o total_pages mudar, o array de listagem também deverá mudar
  useEffect(() => {
    setPagination(PaginationService.execute(total_pages, page))
  }, [total_pages])

  // método utilizado para tratar a seleção das páginas
  const handlePageClick = (page: string): void => {
    router.push(`${router.pathname}?page=${page}`)
  }

  // método para tratar a seleção da página posterior a atual
  const handleNextPageClick = (): void => {
    if (page < total_pages) {
      router.push(`${router.pathname}?page=${page + 1}`)
    }
  }

  // método para tratar a seleção da página anterior a atual
  const handlePreviusPageClick = (): void => {
    if (page > 1) {
      router.push(`${router.pathname}?page=${page - 1}`)
    }
  }

  return (
    <div className='pagination justify-content-end'>
      <div className='pagination'>
        <StyledButton
          action='<'
          type_button='blue'
          onClick={handlePreviusPageClick}
        />

        {
          // quando o item do array da páginação for '...' será apenas renderizado o texto '...', caso contrário será renderizado um botão com os números das páginas
          pagination.map((item, index) => (
            item === '...' ? '...' : (
                <StyledButton
                  key={index}
                  action={item}
                  type_button='blue'
                  active={page === Number(item) }
                  onClick={() => handlePageClick(item)}
                />
              )
            ))
        }

        <StyledButton
          action='>'
          type_button='blue'
          onClick={handleNextPageClick}
        />
      </div>
    </div>
  )
}

export default Pagination