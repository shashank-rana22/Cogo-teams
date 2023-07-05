import { Button, Modal, Input } from '@cogoport/components';
import React, { useState } from 'react';

import useUpdateShipment from '../../../hooks/useUpdateShipment';

import styles from './styles.module.css';

function AddPoNumber({
	setShow = () => {},
	shipment_data = {},
}) {
	const [poNumber, setPoNumber] = useState('');

	const closeModal = () => setShow(false);

	const { loading, updateShipment } = useUpdateShipment({
		refetch        : closeModal,
		successMessage : 'Purchase Order Number Added!',
	});

	const onCreate = () => {
		updateShipment({
			id        : shipment_data?.id,
			po_number : poNumber,
		});
	};

	return (
		<Modal
			show
			onClose={closeModal}
			showCloseIcon={!loading}
			closeOnOuterClick={false}
			className={styles.custom_modal}
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
				>
					Cancel
				</Button>

				<Button
					disabled={loading || !poNumber}
					onClick={onCreate}
				>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default AddPoNumber;
