/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useConfiguration from '../components/ListData/ListCard/AddRate/AddAdditionalRate/configurations';
import { VALUE_ONE, DEFAULT_VALUE } from '../configurations/helpers/constants';
import useFieldMutation from '../configurations/helpers/field-mutation-additional';
import formatAirCustomsRate from '../payload/format-air-customs-rate';
import formatAirLocalCharge from '../payload/format-air-local-charge';
import formatAirSurcharge from '../payload/format-air-surcharge';
import formatFclCfs from '../payload/format-fcl-cfs-additional-rate';
import formatFclCustomsRate from '../payload/format-fcl-customs-rate';
import formatFclLocalCharge from '../payload/format-fcl-local-charge';
import formatFtlRate from '../payload/format-ftl-rate';
import formatHaulageFreightRate from '../payload/format-haulage-freight-rate';
import formatLtlRate from '../payload/format-ltl-rate';
import formatTrailerFreightRate from '../payload/format-trailer-freight';
import getDefaultValues from '../utilis/get-default-values';

import useGetChargeCodes from './useGetChargeCodes';

const URL_MAPPING = {
	add_surcharge     : '/create_air_freight_rate_surcharge',
	air_freight_local : '/create_air_freight_rate_local',
	fcl_customs       : '/create_fcl_customs_rate',
	fcl_cfs           : '/create_fcl_cfs_rate',
	trailer_freight   : '/create_haulage_freight_rate',
	haulage_freight   : '/create_haulage_freight_rate',
	air_customs       : '/create_air_customs_rate',
	ltl_freight       : '/create_ltl_freight_rate',
	ftl_freight       : '/create_ftl_freight_rate',
};

const SERVICE_MAPPING = {
	fcl_freight_local : 'fcl_freight_local_charges',
	air_freight_local : 'air_freight_local_charges',
	add_surcharge     : 'air_freight_surcharges',
	fcl_customs       : 'fcl_customs_charges',
	air_customs       : 'air_customs_charges',
	haulage_freight   : 'haulage_freight_charges',
};

const getPayload = ({ values, payload, charge, chargeName }) => {
	switch (chargeName) {
		case 'fcl_freight_local':
			return formatFclLocalCharge(payload, values, charge);
		case 'add_surcharge':
			return formatAirSurcharge(payload, values);
		case 'fcl_customs':
			return formatFclCustomsRate(values);
		case 'fcl_cfs':
			return formatFclCfs(values);
		case 'trailer_freight':
			return formatTrailerFreightRate(values);
		case 'air_customs':
			return formatAirCustomsRate(values);
		case 'ftl_freight':
			return formatFtlRate(values);
		case 'haulage_freight':
			return formatHaulageFreightRate(values);
		case 'ltl_freight':
			return formatLtlRate(values);
		default:
			return formatAirLocalCharge(payload, values, charge);
	}
};

const useCreateAdditionalRates = ({
	payload,
	charge,
	additionalService,
	containerDetails,
	filter,
	data,
	source,
	triggeredFrom = '',
	setFeebBackModal,
	feedbackModal,
	setChargeAdded,
	setAdditionalCharge,
	feedbackData,
	message,
}) => {
	const [errors, setErrors] = useState({});

	const [trade_type, chargeName] = (charge !== 'add_surcharge' ? charge : ':add_surcharge').split(':');

	const controls = useConfiguration(
		chargeName,
		additionalService,
		payload,
		trade_type,
		containerDetails,
		filter,
		data,
		source,
	);

	const { defaultValues, fields } = getDefaultValues(controls);

	const {
		control, watch, handleSubmit, setValue, reset,
	} = useForm({ defaultValues });

	const service_name = SERVICE_MAPPING[chargeName] || 'fcl_cfs_charges';
	const values = watch();

	const cfsChargeRequired = !!(
		chargeName === 'fcl_customs' || chargeName === 'fcl_cfs'
	);

	const { list: chargeCodesAll } = useGetChargeCodes({
		service_name,
		trade_type,
	});
	const { list: cfsCharges } = useGetChargeCodes({
		service_name: 'fcl_cfs_charges',
		trade_type,
		cfsChargeRequired,
	});

	const showElements = {
		rate_provided  : watch('service_provider'),
		detention_days : watch('detention_free_days'),
		demurrage_days : watch('demurrage_free_days'),
	};

	const { newfields } = useFieldMutation({
		fields,
		values,
		chargeCodesAll,
		cfsCharges,
		setValue,
	});

	const freeLimitDays = watch('free_limit_days');
	const addSlabs = watch('add_slabs');

	const { user_profile } = useSelector(({ profile }) => ({ user_profile: profile }));

	const onError = (errs, e) => {
		e.preventDefault();
		setErrors({ ...errs });
	};

	const url = URL_MAPPING[chargeName] || 'create_fcl_freight_rate_local';

	const [{ loading }, trigger] = useRequest({ url, method: 'post' }, { manual: true });

	const handleData = async (val, e) => {
		e.preventDefault();
		try {
			const newValues = { ...val };
			const payloadRequired = getPayload({ values: newValues, payload, charge, chargeName });

			const res = await trigger({
				data: {
					...payloadRequired,
					source         : triggeredFrom || undefined,
					procured_by_id : user_profile?.user?.id,
				},
			});
			if (res?.hasError) {
				Toast.error('Unable to Add');
			}
			Toast.success(' Updated Successfully');
			if (!isEmpty(feedbackData)) {
				setFeebBackModal(!feedbackModal);
			} else {
				setChargeAdded((prev) => [...prev, `${charge}${message}`]);
				setAdditionalCharge(null);
			}
			reset();
		} catch (err) {
			Toast.error(err.data);
		}
	};

	useEffect(() => {
		if (addSlabs) {
			addSlabs.forEach((obj, index) => {
				if (!index) {
					setValue('add_slabs.0.lower_limit', Number(freeLimitDays) + VALUE_ONE || DEFAULT_VALUE);
				} else {
					setValue(
						`add_slabs.${index}.lower_limit`,
						Number(addSlabs[index - VALUE_ONE].upper_limit) + VALUE_ONE,
					);
				}
			});
		}
	}, [freeLimitDays, JSON.stringify(addSlabs)]);

	return {
		loading,
		handleSubmit,
		fields: newfields,
		errors,
		onError,
		handleData,
		watch,
		control,
		showElements,
	};
};

export default useCreateAdditionalRates;
