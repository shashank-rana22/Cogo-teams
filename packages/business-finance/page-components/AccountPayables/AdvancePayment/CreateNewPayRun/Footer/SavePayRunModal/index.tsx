import { Modal, Button } from '@cogoport/components';
import { IcCError } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function SavePayRunModal({
	savePayrunModal,
	setSavePayrunModal,
}) {
	const handleCloseModal = () => {
		setSavePayrunModal(false);
	};
	return (
		<div>
			<Modal show={savePayrunModal} onClose={handleCloseModal} size="sm">
				<div className={styles.container}>
					<div className={styles.icon}>
						<IcCError style={{ width: 28, height: 28 }} />
					</div>
					<div className={styles.icon}>
						Are you sure You want to Save this payrun
					</div>
				</div>
				<Modal.Footer>
					<Button
						style={{ marginRight: 10 }}
						themeType="secondary"
						onClick={() => setSavePayrunModal(false)}
					>
						Cancel
					</Button>
					<Button>
						Yes
					</Button>
				</Modal.Footer>

			</Modal>
		</div>
	);
}

export default SavePayRunModal;
