import { useState, useEffect } from 'react';

import injectUiConfigs from '../utils/inject-ui-configs';

function useTaskExecution({ task = {}, taskConfigData = {}, primary_service = {}, servicesList = [] }) {
	const dataConfig = injectUiConfigs(taskConfigData, task, primary_service);

	let initialStep = 0;

	if (task?.tags && task?.tags?.length) {
		initialStep = Number(task?.tags?.[0]) + 1;

		if (initialStep > (dataConfig?.steps || []).length - 1 && initialStep !== 0) {
			initialStep = (dataConfig?.steps || []).length - 1;
		}
	}

	if (primary_service?.nomination_type === 'agent' && primary_service?.bl_category === 'mbl') {
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
