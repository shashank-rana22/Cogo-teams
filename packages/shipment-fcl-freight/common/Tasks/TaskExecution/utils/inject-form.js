import getShowTaskFields from './get-show-task-fields';

// This was used in older code for injection form and form mutating
const injectForm = ({ stepConfig, formProps, task, primaryService, formValues }) => {
	const showElements = getShowTaskFields(formValues, stepConfig.controls);

	// const newFields = mutateFields(
	// 	formProps.fields,
	// 	primaryService,
	// 	formValues,
	// );

	return {
		// finalConfig: {
		// 	...config,
		// 	formProps: { ...formProps, fields: newFields },
		// },
		// controls: config.controls,
		showElements,
	};
};

export default injectForm;
