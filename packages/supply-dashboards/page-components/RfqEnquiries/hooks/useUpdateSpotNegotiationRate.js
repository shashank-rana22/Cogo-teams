import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

import getField from '../configurations';
import FieldMutation from '../utils/field-mutation';
import getPayload from '../utils/getPayload';

const useUpdateSpotNegotiationRate = ({ service }) => {
	const fields = getField({ data: service });
	const [errors, setErrors] = useState({});

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
		control, watch, register, handleSubmit,
	} = useForm({ defaultValues });
	const values = watch();
	const showElements = { sourced_by_id: !values?.service_provider_id };

	const { newField } = FieldMutation({ fields, values, service });

	const onError = (errs, e) => {
		e.preventDefault();
		setErrors({ ...errs });
	};

	const [trigger] = useRequest({
		url    : '/update_spot_negotiation_rate',
		method : 'POST',
	}, { manual: true });

	const handleData = async (value) => {
		try {
			const payload = getPayload({ value, service });
			console.log(payload, 'values');
			const response = await trigger({ params: { payload } });
			if (response.hasError) {
				Toast.error(response?.message || 'Something Went Wrong');
				return;
			}
			Toast.success('Negotiation Updated');
		} catch (err) {
			console.log(err);
		}
	};

	return {
		fields: newField,
		control,
		showElements,
		register,
		errors,
		onError,
		handleSubmit,
		handleData,
	};
};
export default useUpdateSpotNegotiationRate;
