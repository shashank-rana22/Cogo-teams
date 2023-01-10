import React from 'react';
import styles from './styles.module.css';
import Line from '../Line';
import { Placeholder } from '@cogoport/components';

interface Props{
  heading?:string;
  expected?:string|number;
  actual?:string|number;
  loading?:boolean;
}

const StatRect = ({heading,expected,actual,loading}:Props) => {
  return (
    <div className={styles.layout}>
        {!loading?(
        <>
        <div className={styles.heading}>
        {heading}
        </div>
        <Line color='#F68B21'margin='10px 0px 0px 0px'/>
        <div className={styles.spacebetween}>
          <div className={styles.column}>
          <span className={styles.number}>{expected} </span>
          <span className={styles.label}>Expected</span>
          </div>
          <div className={styles.column}>
          <span className={styles.number}>{actual}</span>
          <span className={styles.label}>Actual</span></div>
        </div>
        </>
        ):<Placeholder height='100px' width='100%'/>}
    </div>
  )
}

export default StatRect