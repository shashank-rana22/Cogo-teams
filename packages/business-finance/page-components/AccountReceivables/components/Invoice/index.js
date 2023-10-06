import React from 'react';

import InvoiceTable from '../../commons/InvoiceTable';

function Invoice({ entityCode }) {
	return (
		<InvoiceTable organizationId="" entityCode={entityCode} showName />
	);
}

export default Invoice;
