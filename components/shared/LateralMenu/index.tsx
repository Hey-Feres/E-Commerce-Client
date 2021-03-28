import React from 'react'
import Logo from '../Logo'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignal, faUser, faGamepad, faCheckSquare, faLaptop, faTicketAlt, faDollarSign, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'

import styles from './styles.module.css'

const LateralMenu: React.FC = () => {
  const router = useRouter()

  return (
    <div className={styles.background}>
      <Logo />

      <div className={styles.list}>
        <Link href="/Admin">
          <a>
            <FontAwesomeIcon icon={faSignal} color="var(--color-gray-light)" className={router.pathname === '/Admin' ? styles.active : ''} />
            Painel Inicial
            <hr />
          </a>
        </Link>

        <Link href="/Admin/Users/List">
          <a>
            <FontAwesomeIcon icon={faUser} color="var(--color-gray-light)" className={router.pathname === '/Admin/Users/List' ? styles.active : ''} />
            Usuários
            <hr />
          </a>
        </Link>

        <Link href="/Admin/Products/List">
          <a>
            <FontAwesomeIcon icon={faGamepad} color="var(--color-gray-light)" className={router.pathname === '/Admin/Products/List' ? styles.active : ''} />
            Produtos
            <hr />
          </a>
        </Link>

        <Link href="/Admin/Categories/List">
          <a>
            <FontAwesomeIcon icon={faCheckSquare} color="var(--color-gray-light)" className={router.pathname === '/Admin/Categories/List' ? styles.active : ''} />
            Categorias
            <hr />
          </a>
        </Link>

        <Link href="/Admin/SystemRequirements/List">
          <a>
            <FontAwesomeIcon icon={faLaptop} color="var(--color-gray-light)" className={router.pathname === '/Admin/SystemRequirements/List' ? styles.active : ''} />
              Requisitos do sistema
              <hr />
          </a>
        </Link>

        <Link href="/Admin/Coupons/List">
          <a>
            <FontAwesomeIcon icon={faTicketAlt} color="var(--color-gray-light)" className={router.pathname === '/Admin/Coupons/List' ? styles.active : ''} />
            Cupons
            <hr />
          </a>
        </Link>

        <Link href="/Admin/#">
          <a>
            <FontAwesomeIcon icon={faDollarSign} color="var(--color-gray-light)" className={router.pathname === '/Admin/#' ? styles.active : ''} />
            Financeiro
            <hr />
          </a>
        </Link>

        <Link href="/Admin/#">
          <a>
            <FontAwesomeIcon icon={faSignOutAlt} color="var(--color-gray-light)" className={router.pathname === '/Admin/#' ? styles.active : ''} />
            Sair
            <hr />
          </a>
        </Link>
      </div>
    </div>
  )
}

export default LateralMenu