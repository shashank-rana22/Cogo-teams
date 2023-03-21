import { Button, Modal } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';
// import useRequestCancellation from './hooks/useRequestCancellation';

function RequestCancellation({
	showCancel = false,
	setShowCancel = () => {},
	onClose = () => {},
}) {
	// const { loading, onRequest } = useRequestCancellation({
	// 	setShowCancel,
	// 	refetch,
	// });

	return (
		<div>
			<div
				className={styles.button}
				onClick={() => {
					onClose();
					setShowCancel(true);
				}}
			>
				Request Cancellation
			</div>

			{showCancel ? (
				<Modal
					className="primary sm"
					show={showCancel}
					onClose={() => setShowCancel(false)}
				>
					<div className={styles.heading}>Request for Cancellation</div>

					<div className={styles.text}>Are you sure you want to request for Cancellation?</div>

					<div className={styles.btn_wrap}>
						<Button>
							Request
						</Button>
					</div>
				</Modal>
			) : null}
		</div>
	);
}

export default RequestCancellation;
