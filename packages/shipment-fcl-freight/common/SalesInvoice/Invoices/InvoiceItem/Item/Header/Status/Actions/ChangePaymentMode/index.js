import { RadioGroup, Modal, Radio, Button } from '@cogoport/components';
import React, { useState } from 'react';

import useUpdateInvoicePaymentMode from '../../../../../../../../../hooks/useUpdateInvoicePaymentMode';

const OPTIONS_TO_SHOW = {
	credit : { label: 'Cash', value: 'cash' },
	cash   : { label: 'Deferred Payment', value: 'credit' },
};

function ChangePaymentMode({
	show = false,
	onClose = () => {},
	invoice = {},
	refetch = () => {},
}) {
	const [check, setCheck] = useState(!invoice?.paymentMode);
	const [value, setValue] = useState('');

	const options = [OPTIONS_TO_SHOW.cash, OPTIONS_TO_SHOW.credit];

	const paymentMode = invoice?.payment_mode ? OPTIONS_TO_SHOW[invoice?.payment_mode]?.value : value;

	const payload = { id: invoice?.id, payment_mode: paymentMode };

	const refetchAfterCall = () => {
		refetch();
		onClose();
	};

	const { changePaymentMode = () => {}, loading } = useUpdateInvoicePaymentMode({ refetch: refetchAfterCall });

	return (
		<Modal show={show} onClose={onClose} closeOnOuterClick={false} showCloseIcon={!loading}>
			<Modal.Header title="Change Payment Mode" />

			<Modal.Body>
				{invoice?.payment_mode ? (
					<Radio
						label={OPTIONS_TO_SHOW[invoice?.payment_mode]?.label}
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
