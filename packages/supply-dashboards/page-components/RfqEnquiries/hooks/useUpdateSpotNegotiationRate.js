import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import getField from '../configurations';
import FieldMutation from '../utils/field-mutation';
import getPayload from '../utils/getPayload';

const useUpdateSpotNegotiationRate = ({ service }) => {
	const oldfields = getField({ data: service });
	const [errors, setErrors] = useState({});

	const { user_profile } = useSelector(({ profile }) => ({
		user_profile: profile,
	}));

	const getDefaultValues = () => {
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

	const { defaultValues, fields } = getDefaultValues();
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

	const [{ loading }, trigger] = useRequest({
		url    : '/update_spot_negotiation_rate',
		method : 'POST',
	}, { manual: true });

	const handleData = async (value) => {
		try {
			const payload = getPayload({ value, service });
			const response = await trigger({ data: { ...payload, procured_by_id: user_profile?.id } });
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
		loading,
	};
};
export default useUpdateSpotNegotiationRate;
