import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState } from 'react';

import BillingAddress from './BillingAddress';
import CustomerContacts from './CustomerContacts';

function VerifyShipperDetails({
	task = {},
	shipment_data = {},
	refetch = () => {},
}) {
	const [step, setStep] = useState(task?.tags?.[GLOBAL_CONSTANTS.zeroth_index]);
	const [orgId, setOrgId] = useState(shipment_data?.consignee_shipper_id);

	return (
		<div>
			{ step === '0' ? (
				<CustomerContacts setStep={setStep} task={task} setOrgId={setOrgId} />

			) : null}

			{step === '1' ? (
				<BillingAddress task={task} shipment_data={shipment_data} refetch={refetch} orgId={orgId} />

			) : null}
		</div>

	);
}

export default VerifyShipperDetails;
