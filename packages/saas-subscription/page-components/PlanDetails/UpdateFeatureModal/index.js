import { Modal } from '@cogoport/components';

import AddonUpdate from './AddonUpdate';

const createDrafultValue = (list) => {
	const defaultValue = list.map((item) => ({
		product_id : item?.saas_product_id,
		count      : item?.unit_count,
		discount   : item?.discount_percent,
	}));
	return ({
		updateAddon: defaultValue,
	});
};

function UpdateFeatureModal({ featureModal, setFeatureModal }) {
	const { openModal = false, info = [] } = featureModal;
	const modalCloseHandler = () => {
		setFeatureModal({ openModal: false });
	};
	const defaultValue = createDrafultValue(info);

	return (
		<Modal show={openModal} onClose={modalCloseHandler}>
			{openModal && <AddonUpdate modalCloseHandler={modalCloseHandler} info={info} defaultValue={defaultValue} />}
		</Modal>
	);
}

export default UpdateFeatureModal;
