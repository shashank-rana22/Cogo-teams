import { ShipmentDetailContext } from '@cogoport/context';
import { useForm } from '@cogoport/forms';
import { useContext } from 'react';

import getDefaultValues from '../utils/get-default-values';
import injectForm from '../utils/inject-form';
import injectValues from '../utils/inject-Values';
import populateControls from '../utils/populate-controls';

function useStepExecution({
	task = {},
	stepConfig = {},
	selectedMail = {},
}) {
	const { shipment_data, servicesList } = useContext(ShipmentDetailContext);

	const populatedControls = populateControls(stepConfig.controls);

	const valueInjectedControls = injectValues({
		selectedMail,
		populatedControls,
		task,
		servicesList,
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
