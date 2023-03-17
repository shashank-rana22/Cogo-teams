import { Placeholder } from '@cogoport/components';
import React from 'react'

import styles from './styles.module.css';

const LoadingState = () => {
  return (
    <div className={styles.card_item}>
        <div> <Placeholder width= "200px" height="20px"/></div>
    </div>
  )
}

export default LoadingState;