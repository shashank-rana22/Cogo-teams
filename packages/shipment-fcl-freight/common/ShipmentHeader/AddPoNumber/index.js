import { Button, Modal, Input } from '@cogoport/components';
import React, { useState } from 'react';

import useAddPoNumber from '../../../hooks/useUpdateShipment';

import styles from './styles.module.css';

function AddPoNumber({
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
		<Modal
			show
			onClose={closeModal}
			showCloseIcon={!loading}
			closeOnOuterClick={false}
		>
			<Modal.Header title="Add PO Number" />
			<Modal.Body>
				<Input
					size="sm"
					value={shipment_data?.po_number}
					placeholder="Add PO Number"
					onChange={setPoNumber}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button
					themeType="secondary"
					onClick={closeModal}
					disabled={loading}
					style={{ marginRight: '12px' }}
				>
					Cancel
				</Button>

				<Button
					disabled={loading}
					onClick={onCreate}
				>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default AddPoNumber;
