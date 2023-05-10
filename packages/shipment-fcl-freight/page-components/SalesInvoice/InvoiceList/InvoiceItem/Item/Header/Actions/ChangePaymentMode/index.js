import { RadioGroup, Modal, Radio, Button } from '@cogoport/components';
import React, { useState } from 'react';

// import useUpdatePaymentMode from '../../../../../../../../hooks/useUpdatePaymentMode';
import styles from './styles.module.css';

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
	const options = [
		{ label: 'Cash', value: 'cash' },
		{ label: 'Deferred Payment', value: 'credit' },
	];

	const paymentMode = invoice?.payment_mode
		? optionsToShow[invoice?.payment_mode]?.value
		: value;

	const handleChange = () => {
		setCheck(!check);
	};

	// const { changePaymentMode, loading } = useUpdatePaymentMode({
	// 	setShow,
	// 	invoice,
	// 	refetch,
	// 	paymentMode,
	// });
	return (
		<Modal show={show} onClose={() => setShow(false)}>
			<Modal.Header title="Change Payment Mode" />
			<Modal.Body>
					{invoice?.payment_mode ? (
						<Radio
							label={optionsToShow[invoice?.payment_mode]?.label}
							checked={check}
							onChange={handleChange}
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
				<Button>
					Update
				</Button>

			</Modal.Footer>
		</Modal>
	);
}

export default ChangePaymentMode;
