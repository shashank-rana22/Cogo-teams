import { RadioGroup } from '@cogoport/components';
import { useState } from 'react';

import InvoicingParties from './InvoicingParties';

const DEFAULT_VALUE = 0;

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
	primary_service = {},
	updateInvoicingParty = () => {},
}) {
	const [activeComponentKey, setActiveComponentKey] = useState(() => RADIO_GROUP_OPTIONS[DEFAULT_VALUE].value);

	const componentProps = {
		invoice_to_self: {
			organization : organizationDetails,
			primary_service,
			updateInvoicingParty,
			bookingType  : 'self',
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
