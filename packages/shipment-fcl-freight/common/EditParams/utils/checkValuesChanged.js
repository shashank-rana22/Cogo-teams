import { Toast } from '@cogoport/components';

export default function checkValuesChanged({ formRefs }) {
	const isValuesChanged = (formRefs.current || []).some(({ defaultValues, getValues }) => {
		const { service_id, service_type, ...restFormValues } = getValues();

		const NEW_FORM_VALUES = {};

		Object.entries(restFormValues).forEach(([key, val]) => {
			NEW_FORM_VALUES[key] = Number(val);
		});

		return Object.keys(NEW_FORM_VALUES).some(
			(key) => NEW_FORM_VALUES[key] !== defaultValues[key],
		);
	});

	if (!isValuesChanged) {
		Toast.error('No parameters were changed');
	}

	return isValuesChanged;
}
