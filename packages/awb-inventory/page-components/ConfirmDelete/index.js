import { Button } from '@cogoport/components';
import { IcMError } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function ConfirmDelete({
	setShowConfirm = () => {},
	editAwbNumber = () => {},
	loading,
	status,
}) {
	const confirmMessage = status === 'available' ? 'delete' : 'recover';
	const updateStatus = status === 'available' ? 'cancelled' : 'available';
	return (
		<div className={styles.delete_container}>
			<h2 className={styles.modal_title}>
				<IcMError />
			</h2>
			<div className={styles.text}>{`Are you sure you want to ${confirmMessage} the AWB number ?`}</div>
			<div className={styles.button_container}>
				<Button
					size="md"
					themeType="secondary"
					onClick={() => setShowConfirm(false)}
					style={{ marginRight: 12 }}
				>
					Cancel
				</Button>
				<Button
					size="md"
					onClick={() => {
						editAwbNumber({ status: updateStatus });
					}}
					disabled={loading}
				>
					{loading ? 'wait' : 'Confirm'}
				</Button>
			</div>
		</div>
	);
}
export default ConfirmDelete;
