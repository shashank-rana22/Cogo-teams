import React,{useState} from "react"
import PurchaseInvoice from './PurchaseInvoiceView';
import styles from './styles.module.css'
const AllInvoices =()=>{
    const [classNamePurchase, setClassNamePurchase] = useState(true)
    const [classNameSID, setClassNameSID] = useState(false)
    const getPurchase= () => { 
        setClassNamePurchase(true)
        setClassNameSID(false)
    } 
    const getSID =()=>{
        setClassNameSID(true)
        setClassNamePurchase(false)

    }
    const commonCard =[
        {id:1, name:'purchase-invoice-view', label:'PURCHASE INVOICE VIEW'},
        {id:2, name:'shipment-id-view', label:'SHIPMENT ID VIEW'}
    ]
return(
    <div>
    <div className={styles.container}>

                <div className={classNamePurchase ? styles.subContainerClick :styles.subContainer  } onClick={getPurchase}>PURCHASE INVOICE VIEW</div>
                <div className={classNameSID ? styles.subContainerClick :styles.subContainer } onClick={getSID}>SHIPMENT ID VIEW</div>


    </div>
           {classNamePurchase && <PurchaseInvoice/>}
    </div>
)
      
   
 
}
export default AllInvoices