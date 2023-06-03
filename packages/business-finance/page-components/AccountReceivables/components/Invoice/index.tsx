import React from 'react';

import InvoiceTable from '../../commons/InvoiceTable';

interface Params {
	entityCode?: string;
}

function Invoice({ entityCode }: Params) {
	return (
		<InvoiceTable organizationId="" entityCode={entityCode} showName />
	);
}

export default Invoice;
