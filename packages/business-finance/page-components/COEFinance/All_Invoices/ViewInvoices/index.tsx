import React from "react"
import Header from "./Header/index"
import SupplierDetails from "./SupplierDetails/index"
import ShipmentDetails from "./ShipmentDetails/index"
import InvoiceDetails from "./InvoiceDetails/index"
const ViewInvoices =()=>{
    return(
    <div>
        <Header/>
        <SupplierDetails/>
        <InvoiceDetails/>
        <ShipmentDetails/>
    </div>
    )
}
export default ViewInvoices