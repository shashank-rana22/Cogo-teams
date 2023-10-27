import { Modal, Button } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';
import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function RejectVerification({
	setRejectData = () => {}, rejectData = {},
	loadingUpdate = false,
	onStatusUpdate = () => {},
	requestId = '',
}) {
	const { showRejectModal = false, reason = [], type = '' } = rejectData || {};

	const hancleClose = () => {
		setRejectData(() => ({
			reason          : [],
			type            : '',
			showRejectModal : false,
		}));
	};

	const handleAllocate = () => {
		onStatusUpdate({ requestId, type, reason, requestStatus: 'processing' });
	};

	return (
		<Modal
			show={showRejectModal}
			onClose={hancleClose}
			size="sm"
			closeOnOuterClick={hancleClose}
			placement="top"
			scroll={false}
		>
			<Modal.Header title={type === 'approved' ? 'Allocation Request' : 'Reject Verification'} />
			<Modal.Body>
				{type === 'approved' ? (
					<div className={styles.title}>
						Are you sure you want to Approve this request ?
					</div>
				) : (
					<div className={styles.verification}>
						<div className={styles.title}>
							Please provide rejection details
						</div>
						<AsyncSelect
							asyncKey="allocation_rejection_type"
							multiple
							placeholder="Select reasons"
							isClearable
							value={reason}
							onChange={(val) => setRejectData((prev) => ({ ...prev, reason: val }))}
							initialCall
							renderLabel={(item) => <>{startCase(item?.reason)}</>}
						/>
					</div>
				)}
			</Modal.Body>
			<Modal.Footer>
				<Button
					className={styles.cancel_button}
					themeType="secondary"
					onClick={hancleClose}
					disabled={loadingUpdate}
				>
					{type === 'approved' ? 'No' : 'Cancel'}
				</Button>
				<Button
					loading={loadingUpdate}
					onClick={handleAllocate}
					disabled={type !== 'approved' ? isEmpty(reason) : undefined}
				>
					{type === 'approved' ? 'Yes, I do' : 'Submit'}
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default RejectVerification;
