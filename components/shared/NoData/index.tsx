// Esse componente apenas será utilizado para ser exibido enquanto o fetch nas listagens esta sendo executado, quando não existirem dados cadastrados ou ainda quando uma pesquisa não retorndar dado algum.
// Ele recebe uma mensagem do tipo string que é opcional, sinta-se livre para utilizá-la nos componentes de listagem.

import styles from '../../../styles/AdminPanel.module.css'

interface NoDataProps {
  message?: string
}

const NoData: React.FC<NoDataProps> =
  ({ message = 'Não há dados cadastrados ou encontrados =(' }) => {
  return (
    <div className={styles.admin_panel}>
      { message }
    </div>
  )
}
export default NoData