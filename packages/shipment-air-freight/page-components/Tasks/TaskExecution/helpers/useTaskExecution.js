import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState, useEffect } from 'react';

import injectUiConfigs from '../utils/inject-ui-configs';

const INITIAL_STEP_CHECK = 0;
const INITIAL_STEP_NUMBER = 1;
function useTaskExecution(
	{ task = {}, taskConfigData = {}, primaryService = {}, servicesList = [] },
) {
	const dataConfig = injectUiConfigs(taskConfigData, task, primaryService);

	let initialStep = 0;

	if (task?.tags && task?.tags?.length) {
		initialStep = Number(task?.tags?.[GLOBAL_CONSTANTS.zeroth_index]) + INITIAL_STEP_NUMBER;

		if (initialStep > (dataConfig?.steps || []).length - INITIAL_STEP_NUMBER
		&& initialStep !== INITIAL_STEP_CHECK) {
			initialStep = (dataConfig?.steps || []).length - INITIAL_STEP_NUMBER;
		}
	}

	const SERVICE_ID_MAPPING = {};

	const ID_CHECK = {};
	(servicesList || []).forEach((obj) => {
		if (!Array.isArray(SERVICE_ID_MAPPING[`${obj?.service_type}.id`])) {
			SERVICE_ID_MAPPING[`${obj?.service_type}.id`] = [];
		}

		if (!ID_CHECK[obj?.id]) {
			ID_CHECK[obj?.id] = true;
			SERVICE_ID_MAPPING[`${obj?.service_type}.id`].push(obj?.id);
		}
	});

	const [currentStep, setCurrentStep] = useState(initialStep);

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
