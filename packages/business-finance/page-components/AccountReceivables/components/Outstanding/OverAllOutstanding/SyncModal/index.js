import { Modal, Button } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';

import useSyncSageArOutstanding from '../../../../hooks/useSyncSageArOutstanding';

import styles from './style.module.css';

function SyncModal({ show = {}, setShow = () => {} }) {
	const { syncSageArOutstanding = () => {}, loading = false } = useSyncSageArOutstanding();
	return (
		<div>
			<Modal show={show} onClose={() => setShow(false)} placement="center" size="sm">
				<Modal.Body className={styles.approve_body}>
					<IcMInfo height={20} width={20} className={styles.infoIcon} />
					<div className={styles.approve_text}>Are you sure  to kkkk send the Email  ?</div>
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
							onClick={() => syncSageArOutstanding(true)}
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

export default SyncModal;
