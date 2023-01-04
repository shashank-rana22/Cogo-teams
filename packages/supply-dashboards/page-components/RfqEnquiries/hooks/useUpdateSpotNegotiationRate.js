import { useForm } from '@cogoport/forms';

import getField from '../configurations/index';
import FieldMutation from '../utils/field-mutation';

const useUpdateSpotNegotiationRate = ({ service }) => {
	const fields = getField({ service });

	const getDefaultValues = () => {
		const defaultValues = {};
		fields.forEach((field) => {
			const { value, name } = field;
			if (field.type === 'fieldArray') {
				defaultValues[name] = value || [];
			} else {
				defaultValues[name] = value || '';
			}
		});
		return { defaultValues };
	};

	const { defaultValues } = getDefaultValues();
	const {
		control, watch, register,
	} = useForm({ defaultValues });
	const values = watch();
	const showElements = { sourced_by_id: !values?.service_provider_id };

	const { newField } = FieldMutation({ fields, values, service });

	return {
		fields: newField,
		control,
		showElements,
		register,
	};
};
export default useUpdateSpotNegotiationRate;
