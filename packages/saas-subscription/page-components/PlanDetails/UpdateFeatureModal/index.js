import { Modal } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import useUpdatePlanFeature from '../../../hooks/useUpdatePlanFeature';

import FeatureUpdate from './FeatureUpdate';

function UpdateFeatureModal({ featureModal, setFeatureModal, planId = '' }) {
	const { openModal = false, info = [], name } = featureModal;

	const { t } = useTranslation(['saasSubscription']);

	const {
		loading, getFeatureMapping,
		modalCloseHandler, submitHandlerMapping,
	} = useUpdatePlanFeature({ planId, setFeatureModal });

	const feature = getFeatureMapping(info, name, t);

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
