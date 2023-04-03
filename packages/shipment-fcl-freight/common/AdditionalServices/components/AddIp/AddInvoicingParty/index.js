import { RadioGroup } from '@cogoport/components';
import React, { useState } from 'react';

import InvoicingParties from './InvoicingParties';

const COMPONENTS_MAPPING = {
	invoice_to_self: {
		label     : 'Invoice to Self',
		component : InvoicingParties,
	},
	invoice_to_trade_partner: {
		label     : 'Invoice to Trade Partner',
		component : InvoicingParties,
	},
};

const RADIO_GROUP_OPTIONS = Object.entries(COMPONENTS_MAPPING).map(
	([key, value]) => ({ label: value.label, value: key }),
);

function AddInvoicingParty({
	organizationDetails = {},
	primary_service,
	updateInvoicingParty = () => {},
	isIE = false,
}) {
	const [activeComponentKey, setActiveComponentKey] = useState(() => RADIO_GROUP_OPTIONS[0].value);

	const componentProps = {
		invoice_to_self: {
			organization : organizationDetails,
			primary_service,
			updateInvoicingParty,
			bookingType  : 'self',
			isIE,
		},
		invoice_to_trade_partner: {
			organization : organizationDetails,
			primary_service,
			updateInvoicingParty,
			bookingType  : 'paying_party',
		},
	};

	const ActiveComponent = COMPONENTS_MAPPING[activeComponentKey].component;
	const activeComponentProps = componentProps[activeComponentKey];

	return (
		<div>
			<RadioGroup
				options={RADIO_GROUP_OPTIONS}
				value={activeComponentKey}
				onChange={setActiveComponentKey}
				style={{ justifyContent: 'space-around' }}
			/>

			<ActiveComponent key={activeComponentKey} {...activeComponentProps} />
		</div>
	);
}

export default AddInvoicingParty;
