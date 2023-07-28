import { ShipmentDetailContext } from '@cogoport/context';
import { useForm } from '@cogoport/forms';
import { useContext, useState } from 'react';

import getDefaultValues from '../utils/get-default-values';
import injectForm from '../utils/inject-form';
import injectValues from '../utils/inject-Values';
import populateControls from '../utils/populate-controls';

function useStepExecution({
	task = {},
	stepConfig = {},
	getApisData = {},
	selectedMail = {},
	allCommodity,

	options,
}) {
	const { shipment_data, primary_service } = useContext(ShipmentDetailContext);
	const [commodityUnit, setCommodityUnit] = useState({});
	const populatedControls = populateControls(stepConfig.controls);

	const valueInjectedControls = injectValues({
		selectedMail,
		populatedControls,
		task,
		getApisData,
		shipment_data,
		stepConfig,
		setCommodityUnit,
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
		getApisData,
		options,
		allCommodity,
		commodityUnit,
	});

	return {
		fields: controls,
		formProps,
		showElements,
	};
}
export default useStepExecution;
