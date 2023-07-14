import { Modal } from '@cogoport/components';

import useUpdatePlanFeature from '../../../hooks/useUpdatePlanFeature';

import FeatureUpdate from './FeatureUpdate';

function UpdateFeatureModal({ featureModal, setFeatureModal, planId = '' }) {
	const { openModal = false, info = [], name } = featureModal;

	const {
		loading, getFeatureMapping,
		modalCloseHandler, submitHandlerMapping,
	} = useUpdatePlanFeature({ planId, setFeatureModal });

	const feature = getFeatureMapping(info, name);

	return (
		<Modal show={openModal} onClose={modalCloseHandler}>
			{openModal && (
				<FeatureUpdate
					modalCloseHandler={modalCloseHandler}
					featureInfo={feature?.[name]}
					submitHandler={submitHandlerMapping?.[name]}
					loading={loading}
				/>
			)}
		</Modal>
	);
}

export default UpdateFeatureModal;
