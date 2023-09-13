import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState } from 'react';

import BillingAddress from './BillingAddress';
import CustomerContacts from './CustomerContacts';

const COMPONENT_MAPPING = {
	0 : CustomerContacts,
	1 : BillingAddress,
};

function VerifyShipperDetails({
	task = {},
	shipment_data = {},
	refetch = () => {},
}) {
	const [step, setStep] = useState(task?.tags?.[GLOBAL_CONSTANTS.zeroth_index]);
	const [orgId, setOrgId] = useState(shipment_data?.consignee_shipper_id);

	const componentProps = {
		0: {
			setStep, task, setOrgId,
		},
		1: {
			task, shipment_data, refetch, orgId,
		},
	};

	const Component = COMPONENT_MAPPING[step] || null;
	const props = componentProps[step] || {};

	return (
		<Component {...props} />
	);
}

export default VerifyShipperDetails;
