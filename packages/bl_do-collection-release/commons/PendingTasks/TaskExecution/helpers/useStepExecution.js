import { useForm } from '@cogoport/forms';

import getDefaultValues from '../utils/get-default-values';
import injectForm from '../utils/inject-form';
import injectValues from '../utils/inject-Values';
import populateControls from '../utils/populate-controls';

function useStepExecution({
	task = {},
	stepConfig = {},
	getApisData = {},
	selectedMail = [],
}) {
	const populatedControls = populateControls(stepConfig.controls);

	const valueInjectedControls = injectValues(
		populatedControls,
		task,
		getApisData,
		selectedMail,
	);

	const defaultValues = getDefaultValues(valueInjectedControls);

	const formProps = useForm({ defaultValues });

	const formValues = formProps?.watch();

	const { controls, showElements } = injectForm({
		stepConfig,
		formValues,
	});

	return {
		fields: controls,
		formProps,
		showElements,
	};
}
export default useStepExecution;
