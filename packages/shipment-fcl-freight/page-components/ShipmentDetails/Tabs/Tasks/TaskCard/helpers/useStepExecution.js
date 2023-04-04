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
	// getApisData,
	// task,
	// shipment_data,
	// stepConfig,
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

	const populatedControls = populateControls(
		stepConfig.controls,
		getApisData,
		task,
		primaryService,
		stepConfig,
	);

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

	// const formProps = useForm(valueInjectedControls || []);

	// const formValues = formProps.watch();

	// const { finalConfig, controls, showElements } = injectForm(
	// 	stepConfig,
	// 	formProps,
	// 	task,
	// 	primaryService,
	// 	formValues,
	// );

	// const groupSubHeadings = {};
	// if (task.task === 'mark_confirmed') {
	// 	(controls || []).forEach((obj) => {
	// 		if (!Array.isArray(groupSubHeadings[obj.subHeading])) {
	// 			groupSubHeadings[obj.subHeading] = [];
	// 			groupSubHeadings[obj.subHeading].push(obj);
	// 		} else {
	// 			groupSubHeadings[obj.subHeading].push(obj);
	// 		}
	// 	});
	// }

	const [error, setError] = useState({});

	// const { fields = {}, handleSubmit } = finalConfig.formProps;
	const [isLoading, setIsLoading] = useState(false);

	const onError = (err) => {
		setError(err);
	};

	// return {
	// 	finalConfig,
	// 	controls,
	// 	showElements,
	// 	error,
	// 	setError,
	// 	fields,
	// 	handleSubmit,
	// 	isLoading,
	// 	setIsLoading,
	// 	onError,
	// 	groupSubHeadings,
	// 	servicesList,
	// };

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
