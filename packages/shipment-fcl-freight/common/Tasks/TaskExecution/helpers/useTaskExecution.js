import { ShipmentDetailContext } from '@cogoport/context';
import { useState, useEffect, useContext } from 'react';

import prepareSteps from '../utils/prepareSteps';

function injectUiConfigs(rawTaskUiResponse, task, primaryService) {
	const config = rawTaskUiResponse.task_config || {};

	const modifiedConfig = {
		label      : config.label,
		task_type  : config.task_type,
		created_at : config.created_at,
		task       : config.task,
		steps      : prepareSteps(config.ui_config, task, primaryService),
	};

	return modifiedConfig;
}

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

	useEffect(() => {
		setCurrentStep(initialStep);
	}, [initialStep]);

	return {
		steps: dataConfig.steps || [],
		currentStep,
		setCurrentStep,
		primaryService,
	};
}
export default useTaskExecution;
