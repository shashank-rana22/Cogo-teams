import { Button } from "@cogoport/components";
import { IcCFtick } from "@cogoport/icons-react";
import React, { useState } from "react";
import styles from './styles.module.css'
const ShipmentDetailsCard = ({data}:any) =>{
    const [showValue, setShowValue ] = useState(false)

    const {buyerDetail , sellerBankDetail , sellerDetail , bill} = data || {}
    const {entityCode ='' , organizationName:organizationNameBuyer ='', address ='' , registrationNumber:registrationNumberBuyer ='', taxNumber:taxNumberBuyer ='' } = buyerDetail || {}
    const {organizationName =''  , registrationNumber ='',taxNumber ='' } = sellerDetail || {}
    const {bankName ='' , accountNumber ='' , ifscCode =''}  = sellerBankDetail || {}
    const {billNumber ='' , billDate ='' ,status ='' ,placeOfSupply =''} = bill || {}

    const DetailsCard = [
        {id :1, name:'billing-party', label:'Billing Party'},
        {id :2, name:'invoice-details', label:'Invoice Details'},
        {id :3, name:'billing-details', label:'Bank Details - Collection Party'}
    ]

    return(
    <div>
        {DetailsCard.map((itemData)=>{
            const {label} = itemData || {}
            return(
            <div className={styles.container} >
                <div className={styles.headerContainer}>
                   <div className={showValue ? styles.labelApproved : styles.label}>{label}
                   <div style={{justifyContent:'center',display:'flex'}} >{showValue && <IcCFtick height="17px" width="17px" />}</div>
                   </div>
                   {
                    showValue ? 
                    <div className={styles.buttonContainer} onClick={(item:any)=>{setShowValue(!showValue)}}>
                        <Button size='sm' themeType="secondary">Undo</Button>
                    </div> :         
                <div className={styles.buttonContainer}>
                    <Button size='sm'  themeType="secondary" onClick={(item:any)=>{setShowValue(!showValue)}}>Approve</Button>
                    <Button  size='sm' themeType="secondary" style={{border:'1px solid #ed3726'}}>Reject</Button>
                 </div>
                   } 
           
                </div>
                <div className={styles.hr}/>

                {itemData.label === 'Billing Party' &&
                      <div className={styles.billingPartyContainer}>
                        <div style={{marginBottom:'8px'}}>Entity - <span style={{fontWeight:'600'}}>{entityCode}</span> - <span style={{fontWeight:'600'}}>{organizationNameBuyer}</span></div>
                        <div style={{marginBottom:'8px'}}>Address - <span>{address}</span></div>
                        <div style={{marginBottom:'8px'}}>PAN Number - <span>{registrationNumberBuyer}</span></div>
                        <div style={{marginBottom:'8px'}}>GST Number - <span>{taxNumberBuyer}</span></div>
                      </div>
                }

                {itemData.label === 'Invoice Details' &&
                      <div className={styles.billingPartyContainer}>
                        <div style={{marginBottom:'8px'}}>Invoice Number - <span>{billNumber}</span></div>
                        <div style={{marginBottom:'8px'}}>Invoice Date - <span>{billDate}</span></div>
                        <div style={{marginBottom:'8px'}}>Status - <span>{status}</span></div>
                        <div style={{marginBottom:'8px'}}>Place Of Supply - <span>{placeOfSupply}</span></div>
                      </div>
                }

                {itemData.label === 'Bank Details - Collection Party' &&
                      <div className={styles.billingPartyContainer}>
                        <div style={{marginBottom:'8px'}}>Name - <span>{organizationName}</span></div>
                        <div style={{marginBottom:'8px'}}> Bank Name - <span>{bankName}</span></div>
                        <div style={{marginBottom:'8px'}}> Account Number - <span style={{color:"#ed3726"}} >{accountNumber}</span></div>
                        <div style={{marginBottom:'8px'}}> IFSC - <span style={{color:"#ed3726"}}>{ifscCode}</span></div>
                        <div style={{marginBottom:'8px'}}>PAN Number - <span>{registrationNumber}</span></div>
                        <div style={{marginBottom:'8px'}}>GST Number - <span>{taxNumber}</span></div>
                      </div>
                }
                
            </div>
            )
        })}
    </div>
    )
}
export default ShipmentDetailsCard