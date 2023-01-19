import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

import getField from '../configurations';
import FieldMutation from '../helpers/field-mutation';
import getPayload from '../helpers/getPayload';
import IncompletionReasons from '../IncompleteReasons/IncompleteReason';

import useGetRates from './useGetRates';
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

const useUpdateSpotNegotiationRate = ({
	service, setSubmittedEnquiry, setActiveService, selectedRate, selectedCard, setRevertCounts,
}) => {
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
	const { data, fetch } = useGetSpotNegotiationRate({
		values   : { ...values, spot_negotiation_id: service.id },
		controls : fields,
		service  : service.service,
	});

	const { data:rateSelected } = useGetRates({ service, selectedRate });

	const { newField } = FieldMutation({
		fields, values, service, data,
	});

	useEffect(() => {
		if (data) {
			const mandatoryFreightCodes = [];
			const mandatoryOriginChargeCodes = [];
			const mandatoryDestinationChargeCodes = [];
			const mandatorySurchargeCodes = [];
			Object.keys(data?.freights_charge_codes || {}).forEach((code) => {
				if (data?.freights_charge_codes?.[code].tags?.includes('mandatory')) {
					mandatoryFreightCodes.push({ code, price: '', unit: '', currency: '' });
				}
			});
			Object.keys(data?.origin_local_charge_codes || {}).forEach((code) => {
				if (data?.origin_local_charge_codes?.[code].tags?.includes('mandatory')) {
					mandatoryOriginChargeCodes.push({ code, price: '', unit: '', currency: '' });
				}
			});
			Object.keys(data?.destination_local_charge_codes || {}).forEach((code) => {
				if (data?.destination_local_charge_codes?.[code].tags?.includes('mandatory')) {
					mandatoryDestinationChargeCodes.push({ code, price: '', unit: '', currency: '' });
				}
			});
			Object.keys(data?.surcharge_charge_codes || {}).forEach((code) => {
				if (data?.surcharge_charge_codes?.[code].tags?.includes('mandatory')) {
					mandatorySurchargeCodes.push({ code, price: '', unit: '', currency: '' });
				}
			});
			if (mandatoryFreightCodes.length) {
				setValue('freights', mandatoryFreightCodes);
			}
			if (mandatoryOriginChargeCodes.length) {
				setValue('origin_local', mandatoryOriginChargeCodes);
			}
			if (mandatoryDestinationChargeCodes.length) {
				setValue('destination_local', mandatoryDestinationChargeCodes);
			}
			if (mandatorySurchargeCodes) {
				setValue('surcharge', mandatorySurchargeCodes);
			}
		}
		if (!rateSelected) {
			(Object.keys(data?.data || {})).forEach((item) => {
				const val = data?.data[item];
				if (val) {
					if (item === 'line_items') {
						setValue('line_items', val);
					} else if (item === 'origin_storage') {
						setValue('origin_free_limit', val?.free_limit);
						setValue('origin_slabs', val?.slabs);
					} else if (item === 'destination_storage') {
						setValue('destination_free_limit', val?.free_limit);
						setValue('destination_slabs', val?.slabs);
					} else if (Array.isArray(val)) {
						(Object.keys(val[0])).forEach((prefill) => {
							if (prefill === 'line_items') {
								setValue(item, val[0]?.[prefill]);
							} else if (prefill === 'validity_start' || prefill === 'validity_end') {
								setValue(prefill, new Date(val[0]?.[prefill]));
							} else if (prefill === 'departure_dates') {
								setValue(prefill, val[0]?.[prefill]);
							} else {
								setValue(prefill, val[0]?.[prefill]);
							}
						});
					} else if (typeof (val) === 'object') {
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
		}
		if (rateSelected) {
			if (rateSelected?.spot_negotiation_id) {
				setValue('service_provider_id', rateSelected?.service_provider_id);
				setValue('shipping_line_id', rateSelected?.data?.shipping_line_id);
				(Object.keys(rateSelected?.data || {})).forEach((item) => {
					const val = rateSelected?.data[item];
					if (val) {
						if (item === 'line_items') {
							setValue('line_items', val);
						} else if (item === 'origin_storage') {
							setValue('origin_free_limit', val?.free_limit);
							setValue('origin_slabs', val?.slabs);
						} else if (item === 'destination_storage') {
							setValue('destination_free_limit', val?.free_limit);
							setValue('destination_slabs', val?.slabs);
						} else if (Array.isArray(val)) {
							(Object.keys(val[0])).forEach((prefill) => {
								if (prefill === 'line_items') {
									setValue(item, val[0]?.[prefill]);
								} else if (prefill === 'validity_start' || prefill === 'validity_end') {
									setValue(prefill, new Date(val[0]?.[prefill]));
								} else if (prefill === 'departure_dates') {
									setValue(prefill, [(val[0]?.[prefill])]);
								} else {
									setValue(prefill, val[0]?.[prefill]);
								}
							});
						} else if (typeof (val) === 'object') {
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
			} else {
				setValue('service_provider_id', selectedRate?.service_provider_id);
				setValue('shipping_line_id', selectedRate?.shipping_line_id);
				if ((rateSelected?.validities || []).length) {
					setValue('freights', rateSelected?.validities[0]?.line_items);
					setValue('validity_start', rateSelected?.validities[0]?.validity_start);
					setValue('validity_end', rateSelected?.validities[0]?.validity_end);
				}
			}
		}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(data), JSON.stringify(rateSelected)]);

	useEffect(() => {
		if (values?.slabs || values?.origin_slabs || values?.destination_slabs) {
			(values?.slabs || values?.origin_slabs || values?.destination_slabs || []).forEach((obj, index) => {
				if (index === 0) {
					if (values?.slabs) {
						setValue('slabs.0.lower_limit', Number(values?.free_limit) + 1 || 0);
					}
				} else if (values?.slabs) {
					setValue(
						`slabs.${index}.lower_limit`,
						Number(values?.slabs[index - 1].upper_limit) + 1,
					);
				}
			});
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values?.free_limit,
		// eslint-disable-next-line react-hooks/exhaustive-deps
		JSON.stringify(values?.slabs),
	]);
	useEffect(() => {
		if (values?.origin_slabs) {
			(values?.origin_slabs || []).forEach((obj, index) => {
				if (index === 0) {
					setValue('origin_slabs.0.lower_limit', Number(values?.origin_free_limit) + 1 || 0);
				} else if (values?.origin_slabs) {
					setValue(
						`origin_slabs.${index}.lower_limit`,
						Number(values?.origin_slabs[index - 1].upper_limit) + 1,
					);
				}
			});
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values?.origin_free_limit, JSON.stringify(values?.origin_slabs)]);

	useEffect(() => {
		if (values?.destination_slabs) {
			(values?.destination_slabs || []).forEach((obj, index) => {
				if (index === 0) {
					setValue('destination_slabs.0.lower_limit', Number(values?.destination_free_limit) + 1 || 0);
				} else if (values?.destination_slabs) {
					setValue(
						`destination_slabs.${index}.lower_limit`,
						Number(values?.destination_slabs[index - 1].upper_limit) + 1,
					);
				}
			});
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values?.destination_free_limit, JSON.stringify(values?.destination_slabs)]);

	const showElements = {
		sourced_by_id            : !values?.service_provider_id,
		origin_main_port_id      : !service?.data?.origin_port?.is_icd,
		destination_main_port_id : !service?.data?.destination_port?.is_icd,
	};

	const onError = (errs, e) => {
		e.preventDefault();
		setErrors({ ...errs });
	};

	const [{ loading }, trigger] = useRequest({
		url    : '/update_spot_negotiation_rate',
		method : 'POST',
	}, { manual: true });

	const disableButton = loading || !(values?.rate_reference_number || values?.booking_rate_procurement_proof);

	const handleData = async (value) => {
		try {
			const payload = getPayload({ value, service });
			const response = await trigger({ data: { ...payload, procured_by_id: user_profile?.id } });
			if (response.hasError) {
				Toast.error(response?.message || 'Something Went Wrong');
				return;
			}
			try {
				const newRes = await fetch(
					{ service_provider_id: value?.service_provider_id, spot_negotiation_id: service?.id },
				);
				if (!(newRes?.data?.is_complete)) {
					let completeMessage = 'Incompletion Reasons :';
					const message = IncompletionReasons({ completionMessages: newRes?.data?.completion_messages });
					completeMessage += message;
					Toast.error(`${completeMessage}`);
				} else {
					setActiveService(null);
					setSubmittedEnquiry((prev) => [...prev, `${selectedCard?.id}${service?.service}`]);
					Toast.success('Negotiation Updated');
					if (!data?.is_complete) {
						setRevertCounts((prev) => ({ ...prev, [selectedCard?.id]: prev[selectedCard.id] + 1 }));
					}
				}
			} catch (err) {
				console.log(err?.message);
			}
		} catch (err) {
			Toast.error(err?.response?.data?.message || 'Something Went Wrong');
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
		disableButton,
	};
};
export default useUpdateSpotNegotiationRate;
