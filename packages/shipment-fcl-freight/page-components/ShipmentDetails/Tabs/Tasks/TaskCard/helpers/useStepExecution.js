import { ShipmentDetailContext } from '@cogoport/context';
import { useForm } from '@cogoport/forms';
import { useContext, useState } from 'react';

import getShowTaskFields from '../utils/get-show-task-fields';
import injectValues from '../utils/inject-Values';
// import useForm from './useForm';

const getDefaultValues = (oldfields) => {
	const defaultValues = {};
	const newfields = oldfields.map((field) => {
		const { value, ...rest } = field;
		if (field.type === 'fieldArray') {
			defaultValues[field.name] = value || [];
		} else {
			defaultValues[field.name] = value || '';
		}
		return rest;
	});
	return { defaultValues, fields: newfields };
};

// here controls manipulation can take place people had done prefilling here but it is not recommended
const populateControls = (
	controls,
) => controls;

const mutateFields = (fields, primaryService, formValues) => {
	const newFields = fields;
	Object.keys(fields).forEach((key) => {
		if (key === 'shipper_contact_status') {
			if (primaryService?.shipper_contact_status === 'pending') {
				newFields[key].options = [
					{ label: 'Confirmed', value: 'confirmed' },
					{ label: 'Not Contacted', value: 'pending' },
					{ label: 'Retry', value: 'retry' },
				];
			} else if (primaryService?.shipper_contact_status === 'retry') {
				newFields[key].options = [
					{ label: 'Confirmed', value: 'confirmed' },
					{ label: 'Retry', value: 'retry' },
				];
			} else {
				newFields[key].options = [
					{ label: 'Confirmed', value: 'confirmed' },
					{ label: 'Not Contacted', value: 'pending' },
				];
			}
			newFields[key].value = fields[key].value || primaryService?.shipper_contact_status;
		}

		if (['booking_reference_proof', 'booking_reference_number'].includes(key)) {
			newFields[key].rules = {
				validate: () => (!formValues.booking_reference_proof
						&& !formValues.booking_reference_number
					? 'At least one field is required'
					: undefined),
			};
		}
	});

	return newFields;
};

// This was used in older code for injection form and form mutating
const injectForm = (config, formProps, task, primaryService, formValues) => {
	const showElements = getShowTaskFields(formValues, config.controls);

	const newFields = mutateFields(
		formProps.fields,
		primaryService,
		formValues,
	);

	return {
		finalConfig: {
			...config,
			formProps: { ...formProps, fields: newFields },
		},
		controls: config.controls,
		showElements,
	};
};

function useStepExecution({
	task = {},
	stepConfig = {},
	primaryService = {},
	getApisData = {},
	selectedMail,
}) {
	const { servicesList } = useContext(ShipmentDetailContext);

	const populatedControls = populateControls(stepConfig.controls);

	const valueInjectedControls = injectValues(
		selectedMail,
		populatedControls,
		task,
		getApisData,
		primaryService,
		stepConfig,
	);

	const { defaultValues, fields } = getDefaultValues(valueInjectedControls);

	const formProps = useForm({ defaultValues });

	// Here some more manipulation is done

	const [error, setError] = useState({});

	const [isLoading, setIsLoading] = useState(false);

	const onError = (err) => {
		setError(err);
	};

	return {
		fields,
		formProps,
		error,
		setError,
		isLoading,
		setIsLoading,
		onError,
		servicesList,
	};
}
export default useStepExecution;
