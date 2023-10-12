import React from 'react';

import InvoiceTable from '../../commons/InvoiceTable';

interface Params {
	entityCode?: string;
	invoiceJourney?: boolean;
}

function Invoice({ entityCode, invoiceJourney = false }: Params) {
	return (
		<InvoiceTable
			organizationId=""
			entityCode={entityCode}
			showName
			invoiceJourney={invoiceJourney}
		/>
	);
}

export default Invoice;
