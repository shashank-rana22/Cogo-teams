import { ShipmentDetailContext } from '@cogoport/context';
import { useState, useContext } from 'react';

import injectUiConfigs from '../utils/inject-ui-configs';

function useTaskExecution({ task = {}, taskConfigData = {} }) {
	const { primary_service: primaryService } = useContext(ShipmentDetailContext);

	const dataConfig = injectUiConfigs(taskConfigData, task, primaryService);

	let initialStep = 0;
	if (task.tags && task.tags.length) {
		initialStep = Number(task.tags[0]) + 1;

		if (initialStep > (dataConfig.steps || []).length - 1 && initialStep !== 0) {
			initialStep = (dataConfig.steps || []).length - 1;
		}
	}

	const [currentStep, setCurrentStep] = useState(initialStep);

	return {
		steps: dataConfig.steps || [],
		currentStep,
		setCurrentStep,
	};
}
export default useTaskExecution;
