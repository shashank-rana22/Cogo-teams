import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState } from 'react';

import BillingAddress from './BillingAddress';
import CustomerContacts from './CustomerContacts';

function VerifyShipperDetails({
	task = {},
	shipment_data = {},
	refetch = () => {},
}) {
	const [step, setStep] = useState(null);
	return (
		<div>
			{task?.tags?.[GLOBAL_CONSTANTS.zeroth_index] === '0' ? (
				<CustomerContacts setStep={setStep} task={task} />

			) : null}

			{(task?.tags?.[GLOBAL_CONSTANTS.zeroth_index] === '1' || step === '1') ? (
				<BillingAddress task={task} shipment_data={shipment_data} refetch={refetch} />

			) : null}
		</div>

	);
}

export default VerifyShipperDetails;
