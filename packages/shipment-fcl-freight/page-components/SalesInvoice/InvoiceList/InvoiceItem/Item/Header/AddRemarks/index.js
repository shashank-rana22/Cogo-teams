import { Button, Textarea, toast, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import styles from './styles.module.css';
// import useInvoiceRemarks from '../../../../../../../hooks/useInvoiceRemarks';

function AddRemarks({
	showAddRemarks = false,
	setShowAddRemarks = () => {},
	invoice = {},
	refetch = () => {},
}) {
	const [remarkValue, setRemarkValue] = useState(invoice?.remarks || '');

	const onClose = () => {
		setRemarkValue(invoice?.remarks);
		setShowAddRemarks(false);
	};

	// const { onSubmitRemarks, loading } = useInvoiceRemarks(
	// 	invoice,
	// 	refetch,
	// 	onClose,
	// 	remarkValue,
	// );

	// const handleSubmit = () => (isEmpty(remarkValue)
	// 	? toast.error('Please add remarks!')
	// 	: onSubmitRemarks());

	return (
		<Modal onClose={onClose} show={showAddRemarks} width={600}>
			<Modal.Header title="Invoice Remarks" />

			<Modal.Body>
				<Textarea
					value={remarkValue}
					size="md"
					rows="6"
					onChange={(e) => setRemarkValue(e?.target?.value)}
					placeholder="Add remarks for your invoice..."
				/>

			</Modal.Body>

			<Modal.Footer>
				<Button
					className="secondary md"
					onClick={onClose}
					style={{ marginRight: '20px' }}
				>
					Cancel
				</Button>

				<Button
					className="primary md"
				>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default AddRemarks;
