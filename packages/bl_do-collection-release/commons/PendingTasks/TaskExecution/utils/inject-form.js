import getShowTaskFields from './get-show-task-fields';
import mutateControls from './mutate-controls';

const injectForm = ({
	stepConfig = {},
	formValues = {},
}) => {
	const showElements = getShowTaskFields(formValues, stepConfig.controls);

	const finalControls = mutateControls(stepConfig?.controls);

	return {
		controls: finalControls,
		showElements,
	};
};

export default injectForm;
