import { Modal } from '@cogoport/components';
import { IcCError } from '@cogoport/icons-react';

import styles from './styles.module.css';

function RestrictRequest({ closeModal = () => {} }) {
	return (
		<Modal show onClose={closeModal}>
			<div style={{ textAlign: 'center' }}>
				<IcCError width={28} height={28} />
			</div>

			<div className={styles.content}>
				Oops!!! You cannot request for document release as some of your
				mandatory tasks are not completed yet.
			</div>
		</Modal>
	);
}

export default RestrictRequest;
