import { Button, Modal, Input } from '@cogoport/components';
import React, { useState } from 'react';

import useAddPoNumber from '../../../../../hooks/useAddPoNumber';

import styles from './styles.module.css';

function AddPoNumber({
	show = '',
	setShow = () => {},
	shipment_data = {},
	refetch = () => {},
}) {
	const [poNumber, setPoNumber] = useState('');

	const { loading, onCreate } = useAddPoNumber({
		shipment_data,
		setShow,
		refetch,
		poNumber,
	});

	return (
		<div className={styles.container}>

			<Modal
				show={show}
				position="basic"
				onClose={() => setShow(false)}
				onOuterClick={() => setShow(false)}
			>
				<Modal.Header title={(<h2>Add PO Number </h2>)} />
				<Modal.Body>
					<Input
						className="primary md"
						value={shipment_data?.po_number}
						placeholder="Add PO Number"
						onChange={(val) => setPoNumber(val)}
					/>

				</Modal.Body>
				<Modal.Footer>
					<Button
						size="md"
						disabled={loading}
						onClick={() => setShow(false)}
					>
						Cancel
					</Button>
					<Button size="md" disabled={loading} onClick={() => onCreate()}> Submit </Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default AddPoNumber;
