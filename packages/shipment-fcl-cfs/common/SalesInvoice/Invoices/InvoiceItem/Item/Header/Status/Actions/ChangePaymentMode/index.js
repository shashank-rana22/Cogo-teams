import { RadioGroup, Modal, Radio, Button } from '@cogoport/components';
import { useState } from 'react';

import useUpdateInvoicePaymentMode from '../../../../../../../../../hooks/useUpdateInvoicePaymentMode';

import styles from './styles.module.css';

const OPTIONS_TO_SHOW = {
	credit : { label: 'Cash', value: 'cash' },
	cash   : { label: 'Deferred Payment', value: 'credit' },
};

function ChangePaymentMode({
	show = false,
	setShow = () => {},
	invoice = {},
	refetch = () => {},
}) {
	const [check, setCheck] = useState(!invoice?.paymentMode);
	const [value, setValue] = useState('');

	const options = [OPTIONS_TO_SHOW.cash, OPTIONS_TO_SHOW.credit];

	const paymentMode = invoice?.payment_mode ? OPTIONS_TO_SHOW[invoice?.payment_mode]?.value : value;

	const payload = { id: invoice?.id, payment_mode: paymentMode };

	const refetchAfterCall = () => {
		setShow(false);
		refetch();
	};

	const { changePaymentMode = () => {}, loading } = useUpdateInvoicePaymentMode({ refetch: refetchAfterCall });

	return (
		<Modal show={show} onClose={() => setShow(false)} closeOnOuterClick={false}>
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
				<div className={styles.button_wrapper}>
					<Button themeType="secondary" onClick={() => setShow(false)}>Cancel</Button>
					<Button onClick={() => changePaymentMode(payload)} disabled={loading || !check}>
						Update
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default ChangePaymentMode;
