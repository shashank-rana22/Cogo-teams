import React, { useState }  from "react";
import { Pill } from "@cogoport/components";
import {IcCFtick} from '@cogoport/icons-react';
import styles from './styles.module.css';
import { Modal } from "@cogoport/components";
import config from '../../../configurations/SUPPLIER_HISTORY';
import List from "../../../../commons/List/index";
import useSupplierHistory from '../../../hook/useSupplierHistory'
interface SellerDetail {
    organizationName?:string

}
interface AdditionDetailInt{
    kycStatus?:string
}

interface DataProps {
    sellerDetail?:SellerDetail
    serviceProviderCategory?:string,
    serviceProviderAdditionalDetail?:AdditionDetailInt,
}

interface PaymentsData {
    payables?:string
    receivables?:string
    ledgerCurrency?:string
}
interface SupplierDetailsProps {
       data:DataProps
       paymentsData?:PaymentsData
       accPaymentLoading?:boolean

}
const SupplierDetails =({data,paymentsData,accPaymentLoading}:SupplierDetailsProps)=>{
    const {historyData,getSupplierHistory,loading} = useSupplierHistory({data});
    const [showModal, setShowModal] = useState(false)
    
    const { sellerDetail, serviceProviderCategory='', serviceProviderAdditionalDetail} = data || [{}];
    const {kycStatus=''}=serviceProviderAdditionalDetail || {};
    const {payables,receivables,ledgerCurrency} = paymentsData || {};

    const handleChange = () =>{
        setShowModal(!showModal) 
         getSupplierHistory()
    }
    
    return(
        <div className={styles.container}> 

            <h3>Supplier Details</h3>

            <div className={styles.smallHr} />

            <div className={styles.card}>
                <div className={styles.orgNameAndVerified}>
                    <div>Name - <span className={styles.textDecoration}>{sellerDetail?.organizationName}</span></div>
                    <div className={styles.tagsContainer}>
                        <Pill color="blue" size="sm">{serviceProviderCategory}</Pill>
                        {kycStatus==="verified" && <div className={styles.kycVerified}><IcCFtick/><div>kyc verified</div></div>}
                    </div>      
                </div>

                <div className={styles.verticalSmallHr}/>

                <div className={styles.accountDetails}>
                    <div className={styles.accounts}>Amount Payables : <div className={styles.textDecoration}>{ledgerCurrency} {payables}</div></div>  
                    <div className={styles.accounts}>Amount Receivables : <div className={styles.textDecoration}>{ledgerCurrency} {receivables}</div></div>  
                </div>

                <div className={styles.verticalSmallHr}/>

                <div className={styles.supplierDetails}>
                    <div className={styles.supplierHistory} onClick={()=>{handleChange()}}>Supplier History</div>
                    {showModal && 
                    <Modal size="lg" show={showModal} onClose={()=>{setShowModal(false)}}>
                        <Modal.Header title="SUPPLIER HISTORY" />
                        <Modal.Body>
                            <List config={config || {}} itemData={{list:historyData}}  loading={loading} />
                            
                        </Modal.Body>
                    </Modal> 
                    }
                    <div>Documents</div> 
                </div>
            </div>
          

        </div>
    )
}
export default SupplierDetails