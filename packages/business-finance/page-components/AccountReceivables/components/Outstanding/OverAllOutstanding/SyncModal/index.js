import { Modal, Button, Table } from '@cogoport/components';

// import { IcMInfo } from '@cogoport/icons-react';
import useSyncSageArOutstanding from '../../../../hooks/useSyncSageArOutstanding';

import getColumns from './getColumns';
import styles from './style.module.css';

function SyncModal({ show = {}, setShow = () => {}, data = {} }) {
	const columns = getColumns();
	const { syncSageArOutstanding = () => {}, loading = false } = useSyncSageArOutstanding();
	return (
		<div>
			<Modal show={show} onClose={() => setShow(false)} placement="top" size="XL">
				<Modal.Body className={styles.approve_body}>
					<div style={{ marginBottom: '20px' }}><b> Last Synced Stats</b></div>

					<Table
						columns={columns}
						data={[data]}
						loading={loading}
					/>
					<div className={styles.approve_text}>
						Are you sure you want to sync data?
					</div>
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
