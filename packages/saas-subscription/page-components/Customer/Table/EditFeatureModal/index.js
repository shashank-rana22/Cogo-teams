import { Modal } from '@cogoport/components';

import Quota from './Quota';
import styles from './styles.module.css';

function EditFeatureModal({ editModal, setEditModal }) {
	const {
		openEditFeatureModal = false,
		editAddon = false,
		editPlan = false, quotaInfo = {},
	} = editModal;
	return (
		<Modal
			show={openEditFeatureModal}
			onClose={() => setEditModal((prev) => ({ ...prev, openEditFeatureModal: false }))}
		>
			{editAddon && <Quota quotaInfo={quotaInfo} />}
		</Modal>
	);
}

export default EditFeatureModal;
