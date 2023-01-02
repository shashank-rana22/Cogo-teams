import React from 'react'
import styles from './styles.module.css'
import { startCase } from '@cogoport/utils'
import { GenericObject } from '../../../../commons/Interfaces'
import getFormattedPrice from '../../../../commons/utils/getFormattedPrice'
import { IcMArrowNext } from '@cogoport/icons-react'

interface Props{
  charge:GenericObject
}

export const CardBody = ({charge}:Props) => {

  const {service_type,line_items=[]}=charge||{}
  const borderColor='#333333'
  return (
    <div className={styles.card} style={{ '--bordercolor':borderColor } as React.CSSProperties}>
    <div className={styles.layout}>
        <div className={styles.heading} style={{ '--span': 2 } as React.CSSProperties}>{startCase(service_type) || 'Platform Fees'}</div>
        <div className={styles.flex} style={{ '--span': 1 } as React.CSSProperties}>Expected</div>
        <div className={styles.flex} style={{ '--span': 1 } as React.CSSProperties}>Actual</div>
    </div>
    {line_items.map((lineItem:GenericObject)=>{
      const value=(lineItem?.actual_price)-(lineItem?.tax_total_price_discounted || lineItem?.tax_total_price)
      let className=styles.neutral
      let iconClassName=styles.neutralIcon
      if(value>0){
        className=styles.positive
        iconClassName=styles.profiticon
      }else if(value<0){
        className=styles.negative
        iconClassName=styles.negativeIcon
      }
      return(
      <div className={styles.values}>
      <div className={`${styles.coloredlabel} ${className}`} style={{ '--span': 2 } as React.CSSProperties}>{lineItem.name}</div>
      <div className={styles.flex} style={{ '--span': 1 } as React.CSSProperties}>{getFormattedPrice(lineItem?.tax_total_price_discounted ||
											lineItem?.tax_total_price,
                      lineItem?.currency || 'INR')}</div>
      <div className={styles.flex} style={{ '--span': 1 } as React.CSSProperties}>{getFormattedPrice(lineItem?.actual_price,
										lineItem?.actual_price_currency || 'INR',)}<span className={iconClassName}><IcMArrowNext height={20} width={20}/></span></div>
   </div>
    )
    })}
    <div className={styles.total}>
        <div className={styles.heading} style={{ '--span': 2 } as React.CSSProperties}></div>
        <div className={`${styles.flex} ${styles.totalamount}`} style={{ '--span': 1 } as React.CSSProperties}>INR 70,000</div>
        <div className={`${styles.flex} ${styles.totalamount}`} style={{ '--span': 1 } as React.CSSProperties}>{getFormattedPrice(charge.tax_total_price||charge.total_price,charge.currency||'INR')}</div>
    </div>
    </div>
  )
}
