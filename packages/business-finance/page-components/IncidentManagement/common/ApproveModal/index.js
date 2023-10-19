import { Modal, Button } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';

import STATUS_MAPPING from '../../Constants/status_mapping';

import styles from './styles.module.css';

function ApproveModal({
	setShowApproveModal = () => {},
	onAction = () => {}, showApproveModal = false, loading = false,
}) {
	return (
		<div>
			<Modal show={showApproveModal} onClose={() => setShowApproveModal(false)} placement="center" size="sm">
				<Modal.Body className={styles.approve_body}>
					<IcMInfo height={20} width={20} className={styles.infoIcon} />
					<div className={styles.approve_text}>Are you sure you want to Approve?</div>
					<div className={styles.flex}>
						<Button
							size="sm"
							themeType="secondary"
							onClick={() => setShowApproveModal(false)}
						>
							No

						</Button>
						<Button
							size="sm"
							themeType="primary"
							className={styles.formButton}
							onClick={() => onAction({ status: STATUS_MAPPING.approved })}
							disabled={loading}
						>
							Yes

						</Button>
					</div>
				</Modal.Body>

			</Modal>

		</div>
	);
}
export default ApproveModal;
