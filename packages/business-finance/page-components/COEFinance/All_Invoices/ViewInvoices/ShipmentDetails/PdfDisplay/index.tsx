import React from 'react';

import { DataInterface } from '..';

interface Props {
	data?: DataInterface;
}
function PdfDisplay({ data }: Props) {
	return (
		<div>
			<object
				data={data?.bill?.billDocumentUrl}
				type="application/pdf"
				height="850px"
				width="100%"
			/>
		</div>
	);
}
export default PdfDisplay;
