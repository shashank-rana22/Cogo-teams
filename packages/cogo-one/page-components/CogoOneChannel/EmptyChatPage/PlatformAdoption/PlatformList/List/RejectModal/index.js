import { Modal, Button, Textarea } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';

import { getOrgId } from '../../../../../../../utils/platformAdoption';

import styles from './styles.module.css';

function RejectAccount({
	rejectAccount = '', setRejectAccount = () => {},
	verifyAccount = {}, setVerifyAccount = () => {}, selectDoc = {},
	verifyKyc = () => {}, loading = false, updateCpDocument = () => {},
}) {
	const { show = false, rejectReason = [], otherReason = '' } = rejectAccount || {};
	const { accountType = '', orgData = {}, showAccountDetails = false } = verifyAccount || {};
	const { id = '' } = orgData || {};

	const handleClose = () => {
		setRejectAccount(() => ({
			rejectReason : [],
			otherReason  : '',
			show         : false,
		}));
		setVerifyAccount((prev) => ({
			...prev,
			show: true,
		}));
	};

	const handleReject = (status) => {
		if (['CP', 'SP'].includes(accountType) && !showAccountDetails) {
			updateCpDocument({
				id        : selectDoc?.docId,
				status,
				partnerId : getOrgId({ orgData })?.[accountType],
				rejectReason,
				otherReason,
			});
		} else {
			verifyKyc({
				orgId         : getOrgId({ orgData })?.[accountType],
				type          : status,
				rejectReason,
				requestId     : id,
				requestStatus : 'processing',
				otherReason,
			});
		}
	};

	if (!show) {
		return null;
	}

	return (
		<Modal size="sm" scroll={false} show={show} onClose={handleClose}>
			<Modal.Header title="Reject Verification" />
			<Modal.Body>
				<div className={styles.verification}>
					{['CP', 'SP'].includes(accountType) && showAccountDetails ? (
						<>
							<div className={styles.title}>
								Please provide rejection details
							</div>
							<AsyncSelect
								asyncKey="allocation_rejection_type"
								placeholder="Select reasons"
								isClearable
								value={rejectReason}
								onChange={(val) => setRejectAccount((prev) => ({ ...prev, rejectReason: val }))}
								initialCall
								multiple
								renderLabel={(item) => <>{startCase(item?.reason)}</>}
							/>
						</>
					) : null}
					<div className={styles.title}>Enter Remark</div>
					<Textarea
						size="md"
						placeholder="Enter remark here"
						value={otherReason}
						onChange={(val) => setRejectAccount((prev) => ({ ...prev, otherReason: val }))}
					/>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					themeType="tertiary"
					onClick={handleClose}
					disabled={loading}
					className={styles.cancel_button}
				>
					Cancel
				</Button>
				<Button
					themeType="primary"
					onClick={() => handleReject('rejected')}
					loading={loading}
					disabled={!rejectReason}
				>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default RejectAccount;
