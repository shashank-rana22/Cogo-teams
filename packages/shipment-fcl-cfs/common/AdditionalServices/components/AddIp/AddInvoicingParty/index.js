import { RadioGroup } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState } from 'react';

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
	const [activeKey, setActiveKey] = useState(() => RADIO_GROUP_OPTIONS[GLOBAL_CONSTANTS.zeroth_index].value);

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

	const ActiveComponent = COMPONENTS_MAPPING[activeKey].component;
	const activeComponentProps = componentProps[activeKey];

	return (
		<div>
			<RadioGroup
				options={RADIO_GROUP_OPTIONS}
				value={activeKey}
				onChange={setActiveKey}
				style={{ justifyContent: 'space-around' }}
			/>

			<ActiveComponent key={activeKey} {...activeComponentProps} />
		</div>
	);
}

export default AddInvoicingParty;
