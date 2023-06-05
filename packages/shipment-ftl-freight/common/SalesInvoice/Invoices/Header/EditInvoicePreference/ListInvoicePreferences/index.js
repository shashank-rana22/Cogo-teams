import React, { useState } from 'react';

import InvoiceItem from './Item';

function ListInvoicePreferences({
	shipmentData = {},
	invoicingParties = [],
	raw_invoicing_parties,
	...rest
}) {
	const [openedService, setOpenedService] = useState(null);

	const allTakenServices = (raw_invoicing_parties || []).map((ip) => ip?.services?.map((item) => ({
		...item,
		currency       : ip?.invoice_currency,
		service_source : ip?.source,
		is_igst        : ip?.is_igst,
		status         : ip?.status,
	}))).flat();

	return (
		<div>
			{(invoicingParties || []).map((invoice) => (
				<InvoiceItem
					key={invoice?.id}
					invoice={invoice}
					shipmentData={shipmentData}
					{...rest}
					openedService={openedService}
					setOpenedService={setOpenedService}
					allTakenServices={allTakenServices}
				/>
			))}
		</div>
	);
}

export default ListInvoicePreferences;
