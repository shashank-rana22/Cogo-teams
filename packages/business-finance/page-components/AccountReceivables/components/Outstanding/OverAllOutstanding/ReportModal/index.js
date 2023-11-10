import { Modal, Button } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';

import useSendOutstandingReport from '../../../../hooks/useSendOutstandingReport';

import styles from './style.module.css';

function ReportModal({ show = {}, setShow = () => {} }) {
	const { downloadOsReport = () => {}, loading = false } = useSendOutstandingReport();
	return (
		<div>
			<Modal show={show} onClose={() => setShow(false)} placement="center" size="sm">
				<Modal.Body className={styles.approve_body}>
					<IcMInfo height={20} width={20} className={styles.infoIcon} />
					<div className={styles.approve_text}>Are you sure you want to Send?</div>
					<div className={styles.flex}>
						<Button
							size="sm"
							themeType="secondary"
							onClick={() => setShow(false)}
							disabled={loading}
						>
							No

						</Button>
						<Button
							size="sm"
							themeType="primary"
							className={styles.formButton}
							onClick={() => downloadOsReport()}
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

export default ReportModal;
