import { Modal } from '@cogoport/components';

import styles from './styles.module.css';

function EditFeatureModal({ editModal, setEditModal }) {
	const {
		openEditFeatureModal = false,
		editAddon = false,
		editPlan = false, info = {},
	} = editModal;
	return (
		<Modal
			show={openEditFeatureModal}
			onClose={() => setEditModal((prev) => ({ ...prev, openEditFeatureModal: false }))}
		>
			<div className={styles.container} />
		</Modal>
	);
}

export default EditFeatureModal;
