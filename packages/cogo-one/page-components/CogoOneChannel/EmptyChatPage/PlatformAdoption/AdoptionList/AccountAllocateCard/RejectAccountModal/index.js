import { Modal, RadioGroup, Input, Button } from '@cogoport/components';
import React from 'react';

import { REASON_OPTIONS } from '../../../../../../../constants/PLATFORM_ADOPTION_CONSTANTS';

import styles from './styles.module.css';

function RejectVerification({
	setShowReject = () => {}, loading = false,
	handleReject = () => {},
	reason = {}, showReject = false,
	setReason = () => {},
}) {
	const { type = '', otherReason = '' } = reason || {};

	return (
		<Modal
			show={showReject}
			onClose={() => setShowReject(false)}
			size="sm"
			closeOnOuterClick={() => setShowReject(false)}
			placement="top"
		>
			<Modal.Header title="Reject Verification" />
			<Modal.Body>
				<div className={styles.verification}>
					<div className={styles.title}>
						Please select reason(s) to reject verification
					</div>
					<RadioGroup
						options={REASON_OPTIONS}
						onChange={(val) => setReason(({ type: val }))}
						value={type}
					/>
					{type === 'Other' && (
						<div className={styles.other_reason}>
							<div className={styles.label}>Other reason: </div>
							<Input
								size="sm"
								onChange={(val) => setReason((prev) => ({
									...prev,
									otherReason: val,
								}))}
								placeholder="Type here..."
								value={otherReason}
							/>
						</div>
					)}
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					className={styles.cancel_button}
					themeType="secondary"
					onClick={() => {
						setReason({
							type        : '',
							otherReason : '',
						});
						setShowReject(false);
					}}
					disabled={loading}
				>
					Cancel
				</Button>
				<Button loading={loading} onClick={() => handleReject('rejected')}>Submit</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default RejectVerification;
