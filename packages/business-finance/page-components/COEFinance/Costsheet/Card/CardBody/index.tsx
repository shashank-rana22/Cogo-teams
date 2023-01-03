import React, { useState } from 'react'
import styles from './styles.module.css'
import { startCase } from '@cogoport/utils'
import { GenericObject } from '../../../../commons/Interfaces'
import getFormattedPrice from '../../../../commons/utils/getFormattedPrice'
import { IcMArrowNext, IcMArrowRotateDown } from '@cogoport/icons-react'

interface Props{
  charge:GenericObject;
}

export const CardBody = ({charge}:Props) => {
  const [showFullDetails, setShowFullDetails] =useState(false);

  const handleWidth=()=>{
    setShowFullDetails(!showFullDetails)
  }

  const {service_type,line_items=[]}=charge||{}
  const hidden=line_items.length<2?styles.hidden:''
  const borderColor='#333333'
  return (charge?(
    <div className={`${showFullDetails?styles.card:styles.custompadding} ${line_items.length<2?styles.padding:""}`} style={{ '--bordercolor':borderColor} as React.CSSProperties}>
    <div className={styles.layout}>
        <div className={styles.heading} style={{ '--span': 2 } as React.CSSProperties}>{startCase(service_type) || 'Platform Fees'}</div>
        <div className={styles.flex} style={{ '--span': 1 } as React.CSSProperties}>Expected</div>
        <div className={styles.flex} style={{ '--span': 1 } as React.CSSProperties}>Actual</div>
    </div>
    {(showFullDetails?line_items:line_items.slice(0,2)).map((lineItem:GenericObject)=>{
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
										lineItem?.actual_price_currency || 'INR',)}<span className={iconClassName}><IcMArrowNext height={15} width={15}/></span></div>
  </div>
    )
    })}
    {(showFullDetails||line_items.length<2)&&<div className={styles.total}>
        <div className={styles.heading} style={{ '--span': 2 } as React.CSSProperties}></div>
        <div className={`${styles.flex} ${styles.totalamount}`} style={{ '--span': 1 } as React.CSSProperties}>INR 70,000</div>
        <div className={`${styles.flex} ${styles.totalamount}`} style={{ '--span': 1 } as React.CSSProperties}>{getFormattedPrice(charge?.tax_total_price||charge?.total_price,charge?.currency||'INR')}</div>
    </div>}
    <div className={`${styles.viewmore} ${hidden}`} role='presentation' onClick={handleWidth}>{showFullDetails?"View Less":"View More"}<span className={showFullDetails?styles.arrowicon:styles.bottomicon}><IcMArrowRotateDown height={15} width={15}/></span></div>
    </div>):null
  )
}
