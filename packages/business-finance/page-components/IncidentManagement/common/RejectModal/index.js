import { Modal, Button } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';

import STATUS_MAPPING from '../../Constants/status_mapping';

import styles from './styles.module.css';

function RejectModal({ setShowRejectModal = () => {}, onAction = () => {}, showRejectModal = false, loading = false }) {
	return (
		<div>
			<Modal show={showRejectModal} onClose={() => setShowRejectModal(false)} placement="center" size="sm">
				<Modal.Body style={{ height: '200px', width: '364px' }} className={styles.deleteBody}>
					<IcMInfo height={20} width={20} className={styles.infoIcon} />
					<div className={styles.deleteText}>Are you sure you want to reject?</div>
					<div className={styles.flex}>
						<Button
							size="sm"
							themeType="secondary"
							onClick={() => setShowRejectModal(false)}
						>
							No

						</Button>
						<Button
							size="sm"
							themeType="primary"
							className={styles.formButton}
							onClick={() => onAction({ status: STATUS_MAPPING.rejected })}
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
export default RejectModal;
