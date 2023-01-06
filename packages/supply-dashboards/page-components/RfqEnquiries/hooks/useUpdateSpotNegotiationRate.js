import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

import getField from '../configurations';
import FieldMutation from '../helpers/field-mutation';
import getPayload from '../helpers/getPayload';

import useGetSpotNegotiationRate from './useGetSpotNegotiatonRate';

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

const useUpdateSpotNegotiationRate = ({ service, setSubmittedEnquiry, setActiveService }) => {
	const oldfields = getField({ data: service });
	const [errors, setErrors] = useState({});

	const { user_profile } = useSelector(({ profile }) => ({
		user_profile: profile,
	}));

	const { defaultValues, fields } = getDefaultValues(oldfields);
	const {
		control, watch, register, handleSubmit, setValue,
	} = useForm({ defaultValues });
	const values = watch();
	const { data } = useGetSpotNegotiationRate({
		values   : { ...values, spot_negotiation_id: service.id },
		controls : fields,
		service  : service.service,
	});

	useEffect(() => {
		(Object.keys(data?.data || {})).forEach((item) => {
			const val = data?.data[item];
			if (val) {
				if (item === 'line_items') {
					setValue('line_items', val);
				} else if (Array.isArray(val)) {
					(Object.keys(val[0])).forEach((prefill) => {
						if (prefill === 'line_items') {
							setValue(item, val[0]?.[prefill]);
						} else {
							setValue(prefill, val[0]?.[prefill]);
						}
					});
				} else {
					(Object.keys(val)).forEach((prefill) => {
						if (prefill === 'line_items') {
							setValue(item, val?.[prefill]);
						} else {
							setValue(prefill, val?.[prefill]);
						}
					});
				}
			}
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(data)]);
	const showElements = { sourced_by_id: !values?.service_provider_id };

	const { newField } = FieldMutation({
		fields, values, service, data,
	});

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
			setActiveService(null);
			setSubmittedEnquiry((prev) => [...prev, service?.service]);
		} catch (err) {
			Toast.error('something went wrong');
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
