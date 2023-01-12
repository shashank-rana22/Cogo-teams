import React, { useEffect, useState }  from "react";
import { Pill, Placeholder, Tooltip } from "@cogoport/components";
import {IcADocumentTemplates, IcCFtick, IcMInfo} from '@cogoport/icons-react';
import styles from './styles.module.css';
import { Modal } from "@cogoport/components";
import config from '../../../configurations/SUPPLIER_HISTORY';
import List from "../../../../commons/List/index";
import useSupplierHistory from '../../../hook/useSupplierHistory'
import showOverflowingNumber from "../../../../commons/showOverflowingNumber";

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
    
    const { sellerDetail, serviceProviderCategory='', serviceProviderAdditionalDetail} = data;
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
                    <div className={styles.accounts}>
                        <Tooltip content="description here...">
                        <div className={styles.tooltip}>
                        <IcMInfo/>
                        </div>
                        </Tooltip>
                         &nbsp; Amount Payables : &nbsp; <div className={styles.textDecoration}>
                            {!accPaymentLoading ? <div className={styles.values}>
                             {ledgerCurrency} &nbsp;  {showOverflowingNumber(payables || '-',7)}
                             </div>:
                                 <div>
                                     <Placeholder height="20px" width="100px"/>
                                 </div>
                                 }
                             </div>
                    </div>  
                    <div className={styles.accounts}>
                        <Tooltip content="description here...">
                        <div className={styles.tooltip}>
                        <IcMInfo/>
                        </div>
                        </Tooltip>
                         &nbsp; Amount Receivables : &nbsp; <div className={styles.textDecoration}>
                           {!accPaymentLoading ? <div className={styles.values}>
                             {ledgerCurrency} &nbsp; {showOverflowingNumber(receivables || '-',7)}
                             </div>:
                                 <div>
                                     <Placeholder height="20px" width="100px"/>
                                 </div>
                                 }
                         </div>
                    </div>  
                </div>

                <div className={styles.verticalSmallHr}/>

                <div className={styles.supplierDetails}>
                    <div className={styles.supplierHistory} onClick={()=>{handleChange()}}>Supplier History</div>
                    {showModal && 
                    <Modal size="lg" show={showModal} onClose={()=>{setShowModal(false)}}>
                        <Modal.Header title="SUPPLIER HISTORY" />
                        <Modal.Body>
                            {historyData ? <List config={config} itemData={{list:historyData}}  loading={loading} /> : <div className={styles.supplyCard}>NO HISTORY</div>}
                            
                        </Modal.Body>
                    </Modal> 
                    }
                    <div className={styles.docsContainer}>
                        <div className={styles.docsIcon}><IcADocumentTemplates/></div>
                        <div>Documents</div>
                    </div> 
                </div>
            </div>
          

        </div>
    )
}
export default SupplierDetails