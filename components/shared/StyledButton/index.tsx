// Estamos realizar a junção dos atributos padrão de um botão mais os atributos personalizados que necessitamos
// Quando tipamos um componente como ButtonHTMLAttributes<HTMLButtonElement> ele nos possíbilita a utilização do ...rest que deixa claro para o React que qualquer propriedade que um botão tem por padrão (type, disabled, autoFocus, name, value, etc) poderá ser recebido nessa propriedade e repassada ao componenent com {..rest} .
// Facilitando assim a nossa vida, pois temos acesso a todos os atributos padrão de um botão sem a necessidade de expecificarmos nas nossas custom props.
// HTMLButtonElement é uma interface que provê propriedades e metódos (além dos regulares contidos na interface HTMLElement) para manipular elementos do tipo button - Essas interfaces estão disponíveis através da web apis como a fetch api por exemplo.
// ButtonHTMLAttributes é uma tipagem do React para typescript que expõe algumas propriedades padrão de um botão, mas como podemos ter uma div, a, span, etc, que podem ser estilizados como um botão, o React permite, através do generics do typescript, a junção dessas propriedades e métodos padrões do botão com o tipo que for passado para ele, assim podemos ter acesso a propriedades que aquele tipo possue que um botão não possue.

import { ButtonHTMLAttributes } from 'react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

import styles from './styles.module.css'

type ButtonProps =  ButtonHTMLAttributes<HTMLButtonElement> & {
    icon?: IconProp
    action?: string
    type_button: string
}

const StyledButton: React.FC<ButtonProps> = ({ icon, action, type_button, ...rest }) => {
  return (
    <Button className={(type_button == "red") ? styles.red_button : styles.blue_button} {...rest}>
      { icon && <FontAwesomeIcon icon={icon} className={action && "mr-2"} /> } {action}
    </Button>
  )
}

export default StyledButton