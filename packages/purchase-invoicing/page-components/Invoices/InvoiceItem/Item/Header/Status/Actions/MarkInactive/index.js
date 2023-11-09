import { Button, Modal } from '@cogoport/components';
import React, { useState } from 'react';

import useUpdateCrossEntityStatus from '../../../../../../../../hooks/useUpdateCrossEntityStatus';

import Confirmation from './Confirmation';
import styles from './styles.module.css';

function MarkInactive({
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
			<Modal.Header title="MARK AS INACTIVE" />

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
					onClick={() => updateStatus({
						invoice_id : invoice?.id,
						status     : 'inactive',
						refetch    : refetchAfterCall,
					})}
					disabled={loading || !value}
					loading={loading}
				>
					Mark Inactive
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default MarkInactive;
