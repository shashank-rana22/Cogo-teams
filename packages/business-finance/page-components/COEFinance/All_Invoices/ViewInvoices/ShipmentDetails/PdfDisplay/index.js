import React from 'react';

function PdfDisplay({ data }) {
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
