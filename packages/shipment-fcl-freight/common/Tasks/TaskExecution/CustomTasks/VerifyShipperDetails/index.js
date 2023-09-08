import { useState } from 'react';

import BillingAddress from './BillingAddress';
import CustomerContacts from './CustomerContacts';

const FIRST_STEP = 1;
const SECOND_STEP = 2;

function VerifyShipperDetails() {
	const [step, setStep] = useState(FIRST_STEP);
	return (
		<div>
			{step === FIRST_STEP ? (
				<CustomerContacts setStep={setStep} />

			) : null}

			{step === SECOND_STEP ? (
				<BillingAddress />

			) : null}
		</div>

	);
}

export default VerifyShipperDetails;
