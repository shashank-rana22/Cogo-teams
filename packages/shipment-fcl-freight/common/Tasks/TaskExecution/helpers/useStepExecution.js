// import { ShipmentDetailContext } from '@cogoport/context';
import { useForm } from '@cogoport/forms';
// import { useContext } from 'react';

import getDefaultValues from '../utils/get-default-values';
import injectValues from '../utils/inject-Values';
import populateControls from '../utils/populate-controls';

function useStepExecution({
	task = {},
	stepConfig = {},
	primaryService = {},
	getApisData = {},
	selectedMail,
}) {
	// const { servicesList } = useContext(ShipmentDetailContext);

	const populatedControls = populateControls(stepConfig.controls);

	const valueInjectedControls = injectValues(
		selectedMail,
		populatedControls,
		task,
		getApisData,
		primaryService,
		stepConfig,
	);

	const defaultValues = getDefaultValues(valueInjectedControls);

	const formProps = useForm({ defaultValues });

	const showElements = {};

	// Here some more manipulation is done
	// const { finalConfig, showElements } = injectForm({
	// 	stepConfig,
	// 	formProps,
	// 	task,
	// 	shipment_data,
	// 	formValues,
	// });

	return {
		fields: valueInjectedControls,
		formProps,
		showElements,
		// servicesList,
	};
}
export default useStepExecution;
