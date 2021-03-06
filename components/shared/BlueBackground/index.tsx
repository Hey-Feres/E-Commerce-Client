/*

  * Component *

  - Description: Blue Background

*/

import React from 'react'
import styles from '../../../styles/Background.module.css'

const BlueBackground: React.FC = ({ children }) => {
  return (
    <div className={styles.main}>
      { children }
    </div>
  )
}

export default BlueBackground