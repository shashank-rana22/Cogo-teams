import React, { useEffect } from "react"
import Header from "./Header/index"
import {useRouter} from '@cogoport/next';
import SupplierDetails from "./SupplierDetails/index"
import ShipmentDetails from "./ShipmentDetails/index"
import useGetBill from "../../hook/useGetBill"
import InvoiceDetails from "./InvoiceDetails/index"
const ViewInvoices =()=>{
    const {push, query} = useRouter();
    const {billId,orgId,jobNumber}=query;
    const {
		loading,
		list: { fullResponse },
		refetch: getBillRefetch,
		accPaymentLoading,
		paymentsData,
	} = useGetBill({ billId:billId, orgId:orgId});
   
    return(
    <div>
        <Header/>

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
            />
  

    </div>
    )
}
export default ViewInvoices