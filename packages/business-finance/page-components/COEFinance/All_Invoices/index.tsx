import React,{useState} from "react"
import styles from './styles.module.css'
import { Button  } from "@cogoport/components"
import { Link, useRouter } from '@cogoport/next';
import ViewInvoices from "./ViewInvoices/index"
const AllInvoices =()=>{
    const [classNamePurchase, setClassNamePurchase] = useState(true)
    const [classNameSID, setClassNameSID] = useState(false)
    const router = useRouter();

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
                    <Button size="md" themeType="secondary" onClick={() => router.push('/business-finance/coe-finance/view-invoices')}>rgjndkjk</Button>
                </div>
                <div onClick={getSID}>
                    <div className={classNameSID ? styles.subContainerClick :styles.subContainer } >SHIPMENT ID VIEW</div>
                </div>
                

    </div>
)
      
   
 
}
export default AllInvoices