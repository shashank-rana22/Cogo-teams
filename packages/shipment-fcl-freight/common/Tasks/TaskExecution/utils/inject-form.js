import getShowTaskFields from './get-show-task-fields';
import mutateControls from './mutate-controls';

const injectForm = ({
	stepConfig = {},
	formProps = {},
	task = {},
	shipment_data = {},
	formValues = {},
	getApisData = {},
}) => {
	const showElements = getShowTaskFields(formValues, stepConfig.controls, getApisData);

	const finalControls = mutateControls(
		stepConfig?.controls,
		formProps?.setValue,
		task,
		shipment_data,
		formValues,
	);

	return {
		controls: finalControls,
		showElements,
	};
};

export default injectForm;
