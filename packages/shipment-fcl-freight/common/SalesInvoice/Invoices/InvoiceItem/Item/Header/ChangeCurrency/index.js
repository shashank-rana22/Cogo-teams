import { Button, Modal, Select } from '@cogoport/components';
import React, { useState } from 'react';

// import Layout from '../Layout';
import useUpdateCurrency from '../../../../../Hooks/useUpdateCurrency';
// import useUpdateCurrency from './hooks/useUpdateCurrency';
import styles from './styles.module.css';

function ChangeCurrency({
	isChangeCurrency = false,
	setIsChangeCurrency = () => {},
	invoice = {},
	refetch = () => {},
	isIE = false,
}) {
	const onClose = () => {
		setIsChangeCurrency(false);
	};
	const [value, setValue] = useState('');

	const payload = {
		id: invoice?.id,
		invoice_currency: value,
		shipment_id: invoice.shipment_id,
	};

	const { onCreate, loading } =
	useUpdateCurrency({payload, onClose, refetch,currency: invoice?.invoice_currency});

	return (
		<Modal
			className="primary sm"
			show={isChangeCurrency}
			onClose={onClose}
		>
			<Modal.Header title="CHANGE CURRENCY" />
			<Modal.Body>
				<div className={styles.form}>
					{/* <Layout fields={fields} controls={controls} errors={errors} /> */}
					<div>Select Currency</div>
					<Select
						value={value}
						onChange={setValue}
						placeholder="Select Currency"
						options={[
							{ label: 'INR', value: 'INR' },
							{ label: 'USD', value: 'USD' },
						]}
						size="md"
						style={{ width: '250px' }}
					/>
				</div>

			</Modal.Body>
			<Modal.Footer>
				<Button
					className="secondary md"
					onClick={() => setIsChangeCurrency(false)}
							disabled={loading}
				>
					Cancel
				</Button>

				<Button
					className="primary md"
					style={{ marginLeft: '16px' }}
					onClick={onCreate}
					disabled={loading}
				>
					Confirm
				</Button>

			</Modal.Footer>
		</Modal>
	);
}

export default ChangeCurrency;
