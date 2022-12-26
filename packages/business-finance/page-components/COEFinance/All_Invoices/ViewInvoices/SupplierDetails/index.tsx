import React  from "react";
import { Tags } from "@cogoport/components";
import {IcCFtick} from '@cogoport/icons-react';
import styles from './styles.module.css';
const SupplierDetails =({data,paymentsData,accPaymentLoading})=>{
    console.log(data,"data");

    console.log(paymentsData,"paymentsData");
    
    const {sellerDetail} = data || {}
    const {payables,receivables,ledgerCurrency} = paymentsData || {}
    
    return(
        <div className={styles.container}> 

            <h3>Supplier Details</h3>

            <div className={styles.smallHr} />

            <div className={styles.card}>
                <div className={styles.orgNameAndVerified}>
                    <div>Name - <span style={{fontWeight:'600'}}>{sellerDetail?.organizationName}</span></div>
                    <div className={styles.tagsContainer}>
                        <Tags themeType="blue" size="md">Non - Asset</Tags>
                        <Tags themeType="blue" size="md">MSME</Tags>
                        <div className={styles.kycVerified}><IcCFtick/><div>kyc verified</div></div>
                    </div>      
                </div>

                <div className={styles.verticalSmallHr}/>

                <div className={styles.accountDetails}>
                    <div className={styles.accounts}>Amount Payables : <div style={{fontWeight:'600'}}>{ledgerCurrency} {payables}</div></div>  
                    <div className={styles.accounts}>Amount Receivables : <div style={{fontWeight:'600'}}>{ledgerCurrency} {receivables}</div></div>  
                </div>

                <div className={styles.verticalSmallHr}/>

                <div className={styles.supplierDetails}>
                    <div>Supplier History</div>
                    <div>Documents</div> 
                </div>
            </div>
          

        </div>
    )
}
export default SupplierDetails