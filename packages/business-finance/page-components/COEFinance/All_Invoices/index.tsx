import React,{ useState} from "react"
import styles from './styles.module.css'
import { Button  } from "@cogoport/components"
import { useRouter } from '@cogoport/next';
import TabSelect from "../../commons/TabSelect/index";
const AllInvoices =()=>{
    const {push,query} = useRouter();
    const [isPurchase,setIsPurchase]=useState(true);

return(
    <div className={styles.container}>
                <div  onClick={()=>setIsPurchase(true)}>
                    <div className={isPurchase ? styles.subContainerClick :styles.subContainer }> PURCHASE INVOICE VIEW </div> 
                    <Button size="md" themeType="secondary" onClick={() => push(`/business-finance/coe-finance/${query.active_tab}/view-invoices`)}>View Invoices</Button>
                </div>
                <div onClick={()=>setIsPurchase(false)}>
                    <div className={!isPurchase ? styles.subContainerClick :styles.subContainer } >SHIPMENT ID VIEW</div>
                </div>
    </div>
)
}
export default AllInvoices