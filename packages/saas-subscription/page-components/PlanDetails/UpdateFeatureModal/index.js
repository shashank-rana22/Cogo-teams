import { Modal } from '@cogoport/components';

import AddonUpdate from './AddonUpdate';

function UpdateFeatureModal({ featureModal, setFeatureModal }) {
	const { openModal = false } = featureModal;
	const modalCloseHandler = () => {
		setFeatureModal({ openModal: false });
	};
	return (
		<Modal show={openModal} onClose={modalCloseHandler}>
			<AddonUpdate modalCloseHandler={modalCloseHandler} />
		</Modal>
	);
}

export default UpdateFeatureModal;
