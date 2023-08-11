import { Button, Textarea, Modal, Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useUpdateInvoiceRemarks from '../../../../../../../../../hooks/useUpdateInvoiceRemarks';

import styles from './styles.module.css';

function AddRemarks({
	show = false,
	onClose = () => {},
	invoice = {},
	refetch = () => {},
}) {
	const [defaultRemarks] = invoice?.remarks || [];
	const [remarkValue, setRemarkValue] = useState(defaultRemarks);

	const refetchAfterCall = () => {
		refetch();
		onClose();
	};

	const { onSubmitRemarks = () => {}, loading } = useUpdateInvoiceRemarks({
		refetch: refetchAfterCall,
	});

	const handleSubmit = () => {
		if (isEmpty(remarkValue.trim())) {
			Toast.error('Remarks cannot be empty spaced!');
			return;
		}

		onSubmitRemarks({
			id      : invoice?.id,
			remarks : [remarkValue],
		});
	};

	return (
		<Modal
			onClose={onClose}
			show={show}
			size="lg"
			closeOnOuterClick={false}
			showCloseIcon={!loading}
		>
			<Modal.Header title="Invoice Remarks" />

			<Modal.Body>
				<Textarea
					value={remarkValue}
					size="md"
					rows="6"
					onChange={setRemarkValue}
					placeholder="Add remarks for your invoice..."
					className={styles.text_area}
				/>
			</Modal.Body>

			<Modal.Footer className={styles.button_div}>
				<Button
					themeType="secondary"
					onClick={onClose}
					className={styles.button_div}
					disabled={loading}
				>
					Cancel
				</Button>

				<Button
					size="md"
					onClick={handleSubmit}
					disabled={loading || isEmpty(remarkValue)}
				>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default AddRemarks;
