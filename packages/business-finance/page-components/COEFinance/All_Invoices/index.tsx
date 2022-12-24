import React,{useState} from "react"
import PurchaseInvoice from './PurchaseInvoiceView';
import styles from './styles.module.css'
const AllInvoices =()=>{
    const [isPurchase,setIsPurchase]=useState(true);

return(
    <div>
    <div className={styles.container}>

                <div  onClick={()=>setIsPurchase(true)}>
                    <div className={isPurchase ? styles.subContainerClick :styles.subContainer }> PURCHASE INVOICE VIEW </div> 
                </div>
                <div onClick={()=>setIsPurchase(false)}>
                    <div className={!isPurchase ? styles.subContainerClick :styles.subContainer } >SHIPMENT ID VIEW</div>
                </div>


    </div>
           {isPurchase && <PurchaseInvoice/>}
    </div>
)
      
   
 
}
export default AllInvoices