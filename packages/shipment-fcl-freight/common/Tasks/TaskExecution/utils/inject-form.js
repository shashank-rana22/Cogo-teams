import getShowTaskFields from './get-show-task-fields';
import mutateControls from './mutate-controls';

const injectForm = ({
	stepConfig = {},
	formProps = {},
	task = {},
	shipment_data = {},
	formValues = {},
	getApisData = {},
	options,
	allCommodity = [],
	commodityUnit,
}) => {
	const showElements = getShowTaskFields(formValues, stepConfig.controls, getApisData);

	const finalControls = mutateControls(
		{
			controls : stepConfig?.controls,
			setValue : formProps?.setValue,
			task,
			shipment_data,
			formValues,
			options,
			allCommodity,
			commodityUnit,
		},
	);

	return {
		controls: finalControls,
		showElements,
	};
};

export default injectForm;
