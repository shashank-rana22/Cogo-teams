import React, {useState} from "react"
import Header from "./Header/index"
import {useRouter} from '@cogoport/next';
import SupplierDetails from "./SupplierDetails/index"
import ShipmentDetails from "./ShipmentDetails/index"
import useGetBill from "../../hook/useGetBill"
import InvoiceDetails from "./InvoiceDetails/index"

const ViewInvoices =()=>{
    const {query} = useRouter();
    const {billId,orgId,jobNumber}=query;
    const [remarksVal, setRemarksVal]=useState({
        bankDetailsRemarks:'',
        billingPartyRemarks:'',
        invoiceDetailsRemarks:'',
    });
    const [lineItem,setLineItem] = useState(false)
    const {
		list: { fullResponse },
		refetch: getBillRefetch,
		accPaymentLoading,
		paymentsData,
	} = useGetBill({ billId:billId, orgId:orgId});
    
    return(
    <div>
        <Header data={fullResponse} remarksVal={remarksVal}/>

        <SupplierDetails 
           data={fullResponse}
		   paymentsData={paymentsData}
		   accPaymentLoading={accPaymentLoading}
           />

        <InvoiceDetails data={fullResponse} getBillRefetch={getBillRefetch}/>

        <ShipmentDetails 
        	data={fullResponse}
            orgId = {query?.orgId || ''}
            jobNumber={jobNumber}
            remarksVal={remarksVal}
            setRemarksVal={setRemarksVal}
            setLineItem={setLineItem}
            />

    </div>
    )
}
export default ViewInvoices