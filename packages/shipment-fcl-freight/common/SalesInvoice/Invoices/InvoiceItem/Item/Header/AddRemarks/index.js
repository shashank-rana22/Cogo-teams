import { Button, Textarea, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useUpdateInvoiceRemarks from '../../../../../../../hooks/useUpdateInvoiceRemarks';

function AddRemarks({
	showAddRemarks = false,
	setShowAddRemarks = () => {},
	invoice = {},
	refetch = () => {},
}) {
	const [remarkValue, setRemarkValue] = useState(invoice?.remarks || []);

	const onClose = () => {
		setRemarkValue(invoice?.remarks);
		setShowAddRemarks(false);
	};
	const payload = {
		id      : invoice?.id,
		remarks : remarkValue,
	};

	const refetchAfterCall = () => {
		onClose();
		refetch();
	};
	const { onSubmitRemarks, loading } = useUpdateInvoiceRemarks({
		refetch: refetchAfterCall,
		payload,
	});

	return (
		<Modal onClose={onClose} show={showAddRemarks} width={600}>
			<Modal.Header title="Invoice Remarks" />
			<Modal.Body>
				<Textarea
					value={remarkValue}
					size="md"
					rows="6"
					onChange={(e) => setRemarkValue([e])}
					placeholder="Add remarks for your invoice..."
					style={{ padding: '3px' }}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button
					themeType="tertiary"
					onClick={onClose}
					style={{ marginRight: '20px' }}
				>
					Cancel
				</Button>
				<Button
					className="primary md"
					onClick={() => onSubmitRemarks(payload)}
					disabled={loading || isEmpty(remarkValue)}
				>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default AddRemarks;
