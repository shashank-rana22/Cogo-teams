// import { ShipmentDetailContext } from '@cogoport/context';
import { useForm } from '@cogoport/forms';
// import { useContext } from 'react';

import getShowTaskFields from '../utils/get-show-task-fields';
import injectValues from '../utils/inject-Values';

const getDefaultValues = (oldfields) => {
	const defaultValues = {};
	oldfields.forEach((field) => {
		const { value, ...rest } = field;
		if (field.type === 'fieldArray') {
			const childDeafultValues = {};
			field.controls.forEach((ctrl) => {
				childDeafultValues[ctrl.name] = defaultValues[ctrl.name];
			});
			defaultValues[field.name] = value || childDeafultValues;
		} else {
			defaultValues[field.name] = value || '';
		}
		return rest;
	});
	return defaultValues;
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
