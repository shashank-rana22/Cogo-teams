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
	const { show = false, rejectReason = '' } = rejectAccount || {};
	const { accountType = '', orgData = {}, showAccountDetails = false } = verifyAccount || {};
	const { id = '' } = orgData || {};

	const handleClose = () => {
		setRejectAccount(() => ({
			rejectReason : '',
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
			});
		} else {
			verifyKyc({
				orgId         : getOrgId({ orgData })?.[accountType],
				type          : status,
				rejectReason,
				requestId     : id,
				requestStatus : 'processing',
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
					<div className={styles.title}>
						Please provide rejection details
					</div>
					{['CP', 'SP', 'trade_party'].includes(accountType) ? (
						<Textarea
							size="md"
							placeholder="Enter remark here"
							value={rejectReason}
							onChange={(val) => setRejectAccount((prev) => ({ ...prev, rejectReason: val }))}
						/>
					) : (
						<AsyncSelect
							asyncKey="allocation_rejection_type"
							placeholder="Select reasons"
							isClearable
							value={rejectReason}
							onChange={(val) => setRejectAccount((prev) => ({ ...prev, rejectReason: val }))}
							initialCall
							renderLabel={(item) => <>{startCase(item?.reason)}</>}
						/>
					)}
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
				>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default RejectAccount;
