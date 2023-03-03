import React from 'react';

interface BillDocument {
	billDocumentUrl?:string
}
interface Data {
	bill?:BillDocument
}

interface Props {
	data?: Data;
}
function PdfDisplay({ data }: Props) {
	return (
		<div>
			<object
				data={data?.bill?.billDocumentUrl}
				type="application/pdf"
				height="850px"
				width="100%"
				aria-label="Document"
			/>
		</div>
	);
}
export default PdfDisplay;
