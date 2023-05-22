import { RadioGroup } from '@cogoport/components';
import React, { useState } from 'react';

import InvoicingParties from './InvoicingParties';

const BOOKING_OPTIONS = [
	{
		label : 'Invoice to Self',
		value : 'self',
	},
	{
		label : 'Invoice to Trade Partner',
		value : 'paying_party',
	},
];

function AddInvoicingParty({
	organizationDetails = {},
	primary_service,
	updateInvoicingParty = () => {},
}) {
	const [activeComponentKey, setActiveComponentKey] = useState(BOOKING_OPTIONS[0].value);

	return (
		<div>
			<RadioGroup
				options={BOOKING_OPTIONS}
				value={activeComponentKey}
				onChange={setActiveComponentKey}
				style={{ justifyContent: 'space-around' }}
			/>
			<InvoicingParties
				organization={organizationDetails}
				primary_service={primary_service}
				updateInvoicingParty={updateInvoicingParty}
				bookingType={activeComponentKey}
			/>
		</div>
	);
}

export default AddInvoicingParty;
