import { Button, Modal, Input } from '@cogoport/components';
import React, { useState } from 'react';

import useAddPoNumber from '../../../hooks/useUpdateShipment';

import styles from './styles.module.css';

function AddPoNumber({
	show = '',
	setShow = () => {},
	shipment_data = {},
}) {
	const [poNumber, setPoNumber] = useState('');

	const closeModal = () => setShow(false);

	const { loading, updateShipment } = useAddPoNumber({
		successCallbacks : [closeModal],
		successMsg       : 'Purchase Order Number Added!',
	});

	const onCreate = () => {
		updateShipment({
			payload: {
				id        : shipment_data?.id,
				po_number : poNumber,
			},
		});
	};

	return (
		<div className={styles.container}>
			<Modal
				show={show}
				onClose={closeModal}
				onOuterClick={closeModal}
			>
				<div className={styles.modal_container}>
					<div className={styles.title}>Add PO Number</div>
					<Input
						className="md"
						value={shipment_data?.po_number}
						placeholder="Add PO Number"
						onChange={setPoNumber}
					/>
					<div className={styles.button}>
						<Button
							className="md"
							onClick={closeModal}
							disabled={loading}
							style={{ marginRight: '8px' }}
						>
							Cancel
						</Button>

						<Button
							className="primary md"
							disabled={loading}
							onClick={onCreate}
						>
							Submit
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
}

export default AddPoNumber;
