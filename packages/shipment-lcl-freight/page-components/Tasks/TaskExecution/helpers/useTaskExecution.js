import { useState, useEffect } from 'react';

import injectUiConfigs from '../utils/inject-ui-configs';

function useTaskExecution({ task = {}, taskConfigData = {}, primaryService = {}, servicesList = [] }) {
	const dataConfig = injectUiConfigs(taskConfigData, task, primaryService);

	let initialStep = 0;

	if (task?.tags && task?.tags?.length) {
		initialStep = Number(task?.tags?.[0]) + 1;

		if (initialStep > (dataConfig?.steps || []).length - 1 && initialStep !== 0) {
			initialStep = (dataConfig?.steps || []).length - 1;
		}
	}

	if (primaryService?.nomination_type === 'agent' && primaryService?.bl_category === 'mbl') {
		(dataConfig?.steps || []).shift();
	}

	const serviceIdMapping = {};

	const idCheck = {};

	(servicesList || []).forEach((obj) => {
		if (!Array.isArray(serviceIdMapping[`${obj?.service_type}.id`])) {
			serviceIdMapping[`${obj?.service_type}.id`] = [];
		}

		if (!idCheck[obj?.id]) {
			idCheck[obj?.id] = true;
			serviceIdMapping[`${obj?.service_type}.id`].push(obj?.id);
		}
	});

	const [currentStep, setCurrentStep] = useState(initialStep);

	useEffect(() => {
		setCurrentStep(initialStep);
	}, [initialStep]);

	return {
		steps: dataConfig.steps || [],
		currentStep,
		setCurrentStep,
		serviceIdMapping,
	};
}
export default useTaskExecution;