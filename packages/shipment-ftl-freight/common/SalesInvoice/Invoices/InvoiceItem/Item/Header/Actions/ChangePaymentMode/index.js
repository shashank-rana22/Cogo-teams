import { RadioGroup, Modal, Radio, Button } from '@cogoport/components';
import React, { useState } from 'react';

import useUpdateInvoicePaymentMode from '../../../../../../../../hooks/useUpdateInvoicePaymentMode';

function ChangePaymentMode({
	show = false,
	setShow = () => {},
	invoice = {},
	refetch = () => {},
}) {
	const [check, setCheck] = useState(!invoice?.paymentMode);
	const [value, setValue] = useState('');

	const optionsToShow = {
		credit : { label: 'Cash', value: 'cash' },
		cash   : { label: 'Deferred Payment', value: 'credit' },
	};

	const options = [optionsToShow.cash, optionsToShow.credit];

	const paymentMode = invoice?.payment_mode ? optionsToShow[invoice?.payment_mode]?.value : value;

	const payload = { id: invoice?.id, payment_mode: paymentMode };

	const refetchAfterCall = () => {
		setShow(false);
		refetch();
	};

	const { changePaymentMode = () => {}, loading } = useUpdateInvoicePaymentMode({ refetch: refetchAfterCall });

	return (
		<Modal show={show} onClose={() => setShow(false)}>
			<Modal.Header title="Change Payment Mode" />

			<Modal.Body>
				{invoice?.payment_mode ? (
					<Radio
						label={optionsToShow[invoice?.payment_mode]?.label}
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
