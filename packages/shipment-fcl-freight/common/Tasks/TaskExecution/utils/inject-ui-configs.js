import prepareSteps from './prepareSteps';

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

export default injectUiConfigs;
