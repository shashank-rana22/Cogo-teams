import { Button, Modal } from '@cogoport/components';
import React, { useState } from 'react';

import useUpdateCrossEntityStatus from '../../../../../../../../hooks/useUpdateCrossEntityStatus';

import Confirmation from './Confirmation';
import styles from './styles.module.css';

function ApproveInvoice({
	show = false,
	onClose = () => {},
	invoice = {},
	refetch = () => {},
}) {
	const refetchAfterCall = () => {
		refetch();
		onClose();
	};

	const { loading = false, updateStatus = () => {} }	= useUpdateCrossEntityStatus();

	const [value, setValue] = useState(false);

	return (
		<Modal show={show} onClose={onClose} closeOnOuterClick={false} showCloseIcon={!loading}>
			<Modal.Header title="MARK AS APPROVED" />

			<Modal.Body>
				<div className={styles.form}>
					<Confirmation value={value} setValue={setValue} />
				</div>
			</Modal.Body>

			<Modal.Footer className={styles.close_button}>
				<Button
					themeType="secondary"
					onClick={onClose}
					disabled={loading}
				>
					Close
				</Button>

				<Button
					onClick={() => updateStatus({ invoice_id: invoice?.id, status: 'approved', refetchAfterCall })}
					disabled={loading || !value}
					loading={loading}
				>
					Approved
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ApproveInvoice;
