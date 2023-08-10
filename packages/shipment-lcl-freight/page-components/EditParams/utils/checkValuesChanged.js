import { Toast } from '@cogoport/components';

export default function checkValuesChanged({ formRefs }) {
	const isValuesChanged = (formRefs.current || []).some(({ defaultValues, getValues }) => {
		const { service_id, service_type, ...restFormValues } = getValues();

		const newFormValues = {};

		Object.entries(restFormValues).forEach(([key, val]) => {
			newFormValues[key] = Number(val);
		});

		return Object.keys(newFormValues).some(
			(key) => newFormValues[key] !== defaultValues[key],
		);
	});

	if (!isValuesChanged) {
		Toast.error('No parameters were changed');
	}

	return isValuesChanged;
}
