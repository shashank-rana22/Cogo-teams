import { Modal } from '@cogoport/components';

import styles from './styles.module.css';

function EditAddonModal({ editAddonModal, setEditAddonModal }) {
	const { open, info = {} } = editAddonModal;
	return (
		<Modal show={open} onClose={() => setEditAddonModal({ open: false })}>
			<div className={styles.container} />
		</Modal>
	);
}

export default EditAddonModal;
