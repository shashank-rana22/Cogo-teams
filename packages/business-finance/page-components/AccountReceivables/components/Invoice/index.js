import React from 'react';

import InvoiceTable from '../../commons/InvoiceTable';

function Invoice({ entityCode, invoiceJourney = false }) {
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
