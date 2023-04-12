import { Button, Modal, Input } from '@cogoport/components';
import React, { useState } from 'react';

import useAddPoNumber from '../../../hooks/useAddPoNumber';

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
				onClose={() => setShow(false)}
				onOuterClick={() => setShow(false)}
			>
				<div className={styles.modal_container}>
					<div className={styles.title}>Add PO Number</div>
					<Input
						className="md"
						value={shipment_data?.po_number}
						placeholder="Add PO Number"
						onChange={(val) => setPoNumber(val)}
					/>
					<div className={styles.button}>
						<Button
							themeType="secondary"
							onClick={() => setShow(false)}
							disabled={loading}
							style={{ marginRight: '8px' }}
						>
							Cancel
						</Button>

						<Button
							className="primary md"
							disabled={loading}
							onClick={() => onCreate()}
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
