import React from 'react'
import styles from './styles.module.css'

interface Props{
    header?: string;
    value?: string|number;
}

const CardHeader = ({header,value}:Props) => {
  return (
    <div className={styles.header}>
        <span className={styles.font}>{header}</span>
        <span className={styles.font}>Total - {value}</span>
    </div>
  )
}

export default CardHeader