import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState, useContext, useEffect } from 'react';

import injectUiConfigs from '../utils/inject-ui-configs';

const DEFAULT_STEP = 0;
const OFFSET_FOR_LAST_INDEX = 1;
const OFFSET_TAG_FOR_STEP = 1;
function useTaskExecution({ task = {}, taskConfigData = {} }) {
	const { primary_service: primaryService = {}, servicesList = [] } = useContext(ShipmentDetailContext);

	const dataConfig = injectUiConfigs(taskConfigData, task, primaryService);

	let initialStep = DEFAULT_STEP;

	if (task?.tags && task?.tags?.length) {
		initialStep = Number(task?.tags?.[GLOBAL_CONSTANTS.zeroth_index]) + OFFSET_TAG_FOR_STEP;

		if (initialStep > (dataConfig?.steps || []).length - OFFSET_FOR_LAST_INDEX && initialStep !== DEFAULT_STEP) {
			initialStep = (dataConfig?.steps || []).length - OFFSET_FOR_LAST_INDEX;
		}
	}

	const [currentStep, setCurrentStep] = useState(initialStep);

	if (primaryService?.nomination_type === 'agent' && primaryService?.bl_category === 'mbl') {
		(dataConfig?.steps || []).shift();
	}

	const SERVICE_ID_MAPPING = {};
	const ID_MAPPING = {};

	(servicesList || []).forEach((obj) => {
		if (!Array.isArray(SERVICE_ID_MAPPING[`${obj?.service_type}.id`])) {
			SERVICE_ID_MAPPING[`${obj?.service_type}.id`] = [];
		}

		if (!ID_MAPPING[obj?.id]) {
			ID_MAPPING[obj?.id] = true;

			SERVICE_ID_MAPPING[`${obj?.service_type}.id`].push(obj?.id);
		}
	});

	useEffect(() => {
		setCurrentStep(initialStep);
	}, [initialStep]);

	return {
		steps            : dataConfig.steps || [],
		currentStep,
		setCurrentStep,
		serviceIdMapping : SERVICE_ID_MAPPING,
	};
}
export default useTaskExecution;
