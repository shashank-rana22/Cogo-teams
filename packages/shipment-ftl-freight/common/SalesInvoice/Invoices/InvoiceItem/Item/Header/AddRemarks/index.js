import { Button, Textarea, Modal } from '@cogoport/components';
import FooterButtonWrapper from '@cogoport/surface-modules/common/FooterButtonWrapper';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useUpdateInvoiceRemarks from '../../../../../../../hooks/useUpdateInvoiceRemarks';

import styles from './styles.module.css';

function AddRemarks({
	setShowModal = () => {},
	invoice = {},
	refetch = () => {},
}) {
	const [remarkValue, setRemarkValue] = useState(invoice?.remarks || []);

	const onClose = () => {
		setRemarkValue(invoice?.remarks);
		setShowModal(false);
	};

	const refetchAfterCall = () => {
		onClose();
		refetch();
	};

	const { onSubmitRemarks = () => {}, loading } = useUpdateInvoiceRemarks({
		refetch: refetchAfterCall,
	});

	return (
		<Modal onClose={onClose} show width={600} closeOnOuterClick={false}>
			<Modal.Header title="Invoice Remarks" />

			<Modal.Body>
				<Textarea
					value={remarkValue}
					size="md"
					rows="6"
					onChange={(e) => setRemarkValue([e])}
					placeholder="Add remarks for your invoice..."
					className={styles.text_area}
				/>
			</Modal.Body>

			<Modal.Footer>
				<FooterButtonWrapper>
					<Button
						themeType="secondary"
						onClick={onClose}
						className={styles.button_div}
					>
						Cancel
					</Button>

					<Button
						size="md"
						onClick={() => onSubmitRemarks({
							id      : invoice?.id,
							remarks : remarkValue,
						})}
						disabled={loading || isEmpty(remarkValue)}
					>
						Submit
					</Button>
				</FooterButtonWrapper>
			</Modal.Footer>
		</Modal>
	);
}

export default AddRemarks;
