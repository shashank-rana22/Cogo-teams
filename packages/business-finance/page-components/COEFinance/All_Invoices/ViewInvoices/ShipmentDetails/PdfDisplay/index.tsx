import React from "react";

interface BillInterface{
    billDocumentUrl?:string
}
interface DataInterface {
    bill?:BillInterface
}
interface Props {
    data?:DataInterface
}
const PdfDisplay = ({data}:Props) =>{
    
    return(
        <div>
            <object
				data={data?.bill?.billDocumentUrl}
				type="application/pdf"
				height="850px"
				width="100%"
						/>
        </div>
    )
}
export default PdfDisplay