import React,{useState} from "react"
import styles from './styles.module.css'
import ViewInvoices from "./ViewInvoices/index"
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

return(
    <div className={styles.container}>

                <div  onClick={getPurchase}>
                    <div className={classNamePurchase ? styles.subContainerClick :styles.subContainer }> PURCHASE INVOICE VIEW </div> 
                    <ViewInvoices/>
                </div>
                <div onClick={getSID}>
                    <div className={classNameSID ? styles.subContainerClick :styles.subContainer } >SHIPMENT ID VIEW</div>
                </div>
                

    </div>
)
      
   
 
}
export default AllInvoices