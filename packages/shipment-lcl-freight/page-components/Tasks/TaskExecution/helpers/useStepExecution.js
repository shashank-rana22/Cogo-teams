import { useForm } from '@cogoport/forms';

import getDefaultValues from '../utils/get-default-values';
import injectForm from '../utils/inject-form';
import injectValues from '../utils/inject-Values';

function useStepExecution({
	task = {},
	stepConfig = {},
	getApisData = {},
	selectedMail = {},
	shipment_data = {},
	primary_service = {},
}) {
	const populatedControls = stepConfig.controls;

	const valueInjectedControls = injectValues({
		selectedMail,
		populatedControls,
		task,
		getApisData,
		stepConfig,
		shipment_data,
		primary_service,
	});

	const defaultValues = getDefaultValues(valueInjectedControls);

	const formProps = useForm({ defaultValues });

	const formValues = formProps?.watch();

	const { controls, showElements } = injectForm({
		stepConfig,
		formProps,
		formValues,
		task,
		shipment_data,
	});

	return {
		fields: controls,
		formProps,
		showElements,
	};
}
export default useStepExecution;
