import { Button } from "@cogoport/components";
import React, { useState } from "react";
import styles from './styles.module.css'
const ShipmentDetailsCard = ({data}) =>{
    const [showValue, setShowValue ] = useState(false)
    const DetailsCard = [
        {id :1, name:'billing-party', label:'Billing Party'},
        {id :2, name:'invoice-details', label:'Invoice Details'},
        {id :3, name:'billing-details', label:'Bank Details - Collection Party'}
    ]

    return(
    <div>
        {DetailsCard.map((item)=>{
            const {label} = item || {}
            return(
            <div className={styles.container} >
                <div className={styles.headerContainer}>
                   <div style={{}} className={styles.label}>{label}</div> 
                   <div className={styles.buttonContainer}>
                       <Button themeType="secondary" onClick={()=>{setShowValue(true)}}>Approve</Button>
                       <Button themeType="secondary" style={{border:'1px solid #ed3726'}}>Reject</Button>
                    </div>
                </div>
                <div className={styles.hr}/>
                
            </div>
            )
        })}
    </div>
    )
}
export default ShipmentDetailsCard