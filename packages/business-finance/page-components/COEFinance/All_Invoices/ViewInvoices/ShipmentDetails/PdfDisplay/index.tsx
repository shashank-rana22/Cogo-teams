import React from "react";
const PdfDisplay = ({data}:any) =>{
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