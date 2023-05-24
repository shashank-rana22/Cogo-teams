import { Modal } from '@cogoport/components';

import useUpdatePlanFeature from '../../../hooks/useUpdatePlanFeature';

import AddonUpdate from './AddonUpdate';

function UpdateFeatureModal({ featureModal, setFeatureModal, planId = '' }) {
	const { openModal = false, info = [], name } = featureModal;

	const { loading, getFeatureMapping, modalCloseHandler } = useUpdatePlanFeature({ planId, setFeatureModal });

	const feature = getFeatureMapping(info, name);

	return (
		<Modal show={openModal} onClose={modalCloseHandler}>
			{openModal && (
				<AddonUpdate
					modalCloseHandler={modalCloseHandler}
					featureInfo={feature?.[name]}
					loading={loading}
				/>
			)}
		</Modal>
	);
}

export default UpdateFeatureModal;
