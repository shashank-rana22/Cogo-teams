import React, { useEffect } from "react"
import Header from "./Header/index"
import {useRouter} from '@cogoport/next';
import SupplierDetails from "./SupplierDetails/index"
import ShipmentDetails from "./ShipmentDetails/index"
import useGetBill from "../../hook/useGetBill"
import InvoiceDetails from "./InvoiceDetails/index"
const ViewInvoices =()=>{
    const {push, query} = useRouter();
    
    const {
		loading,
		list: { fullResponse },
		refetch: getBillRefetch,
		accPaymentLoading,
		paymentsData,
	} = useGetBill({ billId: query?.billId, orgId: query?.orgId});
   
    return(
    <div>
        <Header/>

        <SupplierDetails 
           data={fullResponse}
		   loading={loading}
		   paymentsData={paymentsData}
		   accPaymentLoading={accPaymentLoading}
           />

        <InvoiceDetails/>

        <ShipmentDetails 
        	data={fullResponse}
            // loading={loading}
            // invoiceData={data}
            />
  

    </div>
    )
}
export default ViewInvoices