import { RadioGroup, Modal, Radio, Button } from '@cogoport/components';
import React, { useState } from 'react';

import useUpdateInvoicePaymentMode from '../../../../../../../../hooks/useUpdateInvoicePaymentMode';

const PAYMENT_MAPPING = {
	credit : { label: 'Cash', value: 'cash' },
	cash   : { label: 'Deferred Payment', value: 'credit' },
};

function ChangePaymentMode({
	setShowModal = () => {},
	invoice = {},
	refetch = () => {},
}) {
	const [check, setCheck] = useState(!invoice?.paymentMode);
	const [value, setValue] = useState('');

	const options = [PAYMENT_MAPPING.cash, PAYMENT_MAPPING.credit];

	const paymentMode = invoice?.payment_mode ? PAYMENT_MAPPING[invoice?.payment_mode]?.value : value;

	const payload = { id: invoice?.id, payment_mode: paymentMode };

	const refetchAfterCall = () => {
		setShowModal(false);
		refetch();
	};

	const { changePaymentMode = () => {}, loading } = useUpdateInvoicePaymentMode({ refetch: refetchAfterCall });

	return (
		<Modal
			show
			onClose={() => setShowModal(false)}
			showCloseIcon={false}
			closeOnOuterClick={false}
		>
			<Modal.Header title="Change Payment Mode" />

			<Modal.Body>
				{invoice?.payment_mode ? (
					<Radio
						label={PAYMENT_MAPPING[invoice?.payment_mode]?.label}
						checked={check}
						onChange={() => setCheck(!check)}
					/>
				) : (
					<RadioGroup
						options={options}
						value={value}
						onChange={(val) => setValue(val)}
					/>
				)}
			</Modal.Body>

			<Modal.Footer>
				<Button onClick={() => changePaymentMode(payload)} disabled={loading || !check}>
					Update
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ChangePaymentMode;
