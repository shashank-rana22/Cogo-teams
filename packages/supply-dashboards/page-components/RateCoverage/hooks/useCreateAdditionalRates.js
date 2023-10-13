// /* eslint-disable react-hooks/exhaustive-deps */
// import { Toast } from '@cogoport/components';
// import { useForm } from '@cogoport/forms';
// import { useRequest } from '@cogoport/request';
// import { useSelector } from '@cogoport/store';
// import { useState, useEffect } from 'react';

// import showErrorsInToast from '../../../utils/showErrorsInToast';
// import configuration from '../components/AddRate/AddAdditionalRate/configurations';
// import FieldMutation from '../helpers/field-mutation-additional';
// import formatAirCustomsRate from '../helpers/format-air-customs-rate';
// import formatAirLocalCharge from '../helpers/format-air-local-charge';
// import formatAirSurcharge from '../helpers/format-air-surcharge';
// import formatFclCfs from '../helpers/format-fcl-cfs-additional-rate';
// import formatFclCustomsRate from '../helpers/format-fcl-customs-rate';
// import formatFclLocalCharge from '../helpers/format-fcl-local-charge';
// import formatFtlRate from '../helpers/format-ftl-rate';
// import formatHaulageFreightRate from '../helpers/format-haulage-freight-rate';
// import formatLtlRate from '../helpers/format-ltl-rate';
// import formatTrailerFreight from '../helpers/format-trailer-freight';
// import getDefaultValues from '../utils/get-default-values';

// import useGetChargeCodes from './useGetChargeCodes';
// import useGetRates from './useGetRates';

// const URL_MAPPING = {
// 	add_surcharge     : '/create_air_freight_rate_surcharge',
// 	air_freight_local : '/create_air_freight_rate_local',
// 	fcl_customs       : '/create_fcl_customs_rate',
// 	fcl_cfs           : '/create_fcl_cfs_rate',
// 	trailer_freight   : '/create_haulage_freight_rate',
// 	haulage_freight   : '/create_haulage_freight_rate',
// 	air_customs       : '/create_air_customs_rate',
// 	ltl_freight       : '/create_ltl_freight_rate',
// 	ftl_freight       : '/create_ftl_freight_rate',
// };

// const SERVICE_MAPPING = {
// 	fcl_freight_local : 'fcl_freight_local_charges',
// 	air_freight_local : 'air_freight_local_charges',
// 	add_surcharge     : 'air_freight_surcharges',
// 	fcl_customs       : 'fcl_customs_charges',
// 	air_customs       : 'air_customs_charges',
// 	haulage_freight   : 'haulage_freight_charges',
// };

// const DEFAULT_VALUE = 0;
// const INCREMENT_VALUE = 1;
// const FIRST_LINE_ITEM_IDX = 0;
// const SECOND_LINE_ITEM_IDX = 1;

// const getPayload = ({ values, payload, charge, chargeName }) => {
// 	switch (chargeName) {
// 		case 'fcl_freight_local':
// 			return formatFclLocalCharge(payload, values, charge);
// 		case 'add_surcharge':
// 			return formatAirSurcharge(payload, values);
// 		case 'fcl_customs':
// 			return formatFclCustomsRate(values);
// 		case 'fcl_cfs':
// 			return formatFclCfs(values);
// 		case 'trailer_freight':
// 			return formatTrailerFreight(values);
// 		case 'air_customs':
// 			return formatAirCustomsRate(values);
// 		case 'ftl_freight':
// 			return formatFtlRate(values);
// 		case 'haulage_freight':
// 			return formatHaulageFreightRate(values);
// 		case 'ltl_freight':
// 			return formatLtlRate(values);
// 		default:
// 			return formatAirLocalCharge(payload, values, charge);
// 	}
// };

// const useCreateAdditionalRates = ({
// 	payload,
// 	charge,
// 	setAdditionalCharge,
// 	additionalService,
// 	setChargeAdded,
// 	message,
// 	containerDetails,
// }) => {
// 	const [errors, setErrors] = useState({});
// 	const [mandatoryChargeCnt, setMandatoryChargeCnt] = useState(DEFAULT_VALUE);

// 	const [trade_type, chargeName] = (charge !== 'add_surcharge' ? charge : ':add_surcharge').split(':');

// 	const controls = configuration(
// 		chargeName,
// 		additionalService,
// 		payload,
// 		trade_type,
// 		containerDetails,
// 	);

// 	const { defaultValues, fields } = getDefaultValues(controls);

// 	const {
// 		control, watch, handleSubmit, setValue, reset,
// 	} = useForm({ defaultValues });

// 	const { data } = useGetRates({
// 		payload,
// 		chargeName,
// 		watch,
// 		trade_type,
// 	});

// 	const service_name = SERVICE_MAPPING[chargeName] || 'fcl_cfs_charges';
// 	const values = watch();

// 	const cfsChargeRequired = !!(
// 		chargeName === 'fcl_customs' || chargeName === 'fcl_cfs'
// 	);

// 	const { list: chargeCodesAll } = useGetChargeCodes({
// 		service_name,
// 		trade_type,
// 	});
// 	const { list: cfsCharges } = useGetChargeCodes({
// 		service_name: 'fcl_cfs_charges',
// 		trade_type,
// 		cfsChargeRequired,
// 	});

// 	const showElements = {
// 		rate_provided  : watch('service_provider'),
// 		detention_days : watch('detention_free_days'),
// 		demurrage_days : watch('demurrage_free_days'),
// 	};

// 	const { newfields } = FieldMutation({
// 		fields,
// 		values,
// 		chargeCodesAll,
// 		cfsCharges,
// 		data,
// 		mandatoryChargeCnt,
// 		setValue,
// 	});

// 	const freeLimitDays = watch('free_limit_days');
// 	const addSlabs = watch('add_slabs');

// 	const { user_profile } = useSelector(({ profile }) => ({
// 		user_profile: profile,
// 	}));

// 	const onError = (errs, e) => {
// 		e.preventDefault();
// 		setErrors({ ...errs });
// 	};

// 	const url = URL_MAPPING[chargeName] || '/create_fcl_freight_rate_local';

// 	const [{ loading }, trigger] = useRequest({ url, method: 'post' }, { manual: true });

// 	const handleData = async (val, e) => {
// 		e.preventDefault();
// 		try {
// 			const newValues = { ...val, procured_by_id: user_profile?.user?.id };
// 			const payloadRequired = getPayload({ values: newValues, payload, charge, chargeName });
// 			const res = await trigger({
// 				data: {
// 					...payloadRequired,
// 				},
// 			});
// 			if (res?.hasError) {
// 				Toast.error('Unable to Add');
// 			}
// 			Toast.success(' Updated Successfully');
// 			setChargeAdded((prev) => [...prev, `${charge}${message}`]);
// 			setAdditionalCharge(null);
// 			reset();
// 		} catch (err) {
// 			showErrorsInToast(err.data);
// 		}
// 	};

// 	useEffect(() => {
// 		if (addSlabs) {
// 			addSlabs.forEach((obj, index) => {
// 				if (!index) {
// 					setValue('add_slabs.0.lower_limit', Number(freeLimitDays) + INCREMENT_VALUE || DEFAULT_VALUE);
// 				} else {
// 					setValue(
// 						`add_slabs.${index}.lower_limit`,
// 						Number(addSlabs[index - INCREMENT_VALUE].upper_limit) + INCREMENT_VALUE,
// 					);
// 				}
// 			});
// 		}
// 	}, [freeLimitDays, JSON.stringify(addSlabs)]);

// 	useEffect(() => {
// 		if (chargeName === 'fcl_freight_local') {
// 			const line_items = data?.line_items || [];
// 			Object.entries(data?.local_charge_codes || {}).forEach(([code, item]) => {
// 				if (item.tags.includes('mandatory')) {
// 					line_items.push({
// 						code,
// 						label : item?.name,
// 						value : code,
// 						...item,
// 					});
// 				}
// 			});
// 			setMandatoryChargeCnt(line_items.length);
// 			setValue('line_items', line_items);
// 		} else if (chargeName === 'air_freight_local') {
// 			setValue('line_items', data?.local?.line_items);
// 		} else if (chargeName === 'ftl_freight') {
// 			setValue('fuel_surcharge', {
// 				fuel_surcharge_type  : data?.ftl_freight?.line_items[SECOND_LINE_ITEM_IDX].unit,
// 				fuel_surcharge_value : data?.ftl_freight?.line_items[SECOND_LINE_ITEM_IDX].price,
// 			});
// 			setValue('price_per_truck', {
// 				price_per_truck_type  : data?.ftl_freight?.line_items[FIRST_LINE_ITEM_IDX].unit,
// 				price_per_truck_value : data?.ftl_freight?.line_items[FIRST_LINE_ITEM_IDX].price,
// 			});
// 		} else if (chargeName === 'ltl_freight') {
// 			setValue('fuel_surcharge', {
// 				fuel_surcharge_type  : data?.ltl_freight?.line_items[SECOND_LINE_ITEM_IDX].unit,
// 				fuel_surcharge_value : data?.ltl_freight?.line_items[SECOND_LINE_ITEM_IDX].price,
// 			});
// 			setValue('freight_on_value', {
// 				freight_on_value_type  : data?.ltl_freight?.line_items[FIRST_LINE_ITEM_IDX].unit,
// 				freight_on_value_value : data?.ltl_freight?.line_items[FIRST_LINE_ITEM_IDX].price,
// 			});
// 		} else if (chargeName === 'trailer_freight') {
// 			setValue('fuel_surcharge', {
// 				fuel_surcharge_type  : data?.trailer_freight?.line_items[SECOND_LINE_ITEM_IDX].unit,
// 				fuel_surcharge_value : data?.trailer_freight?.line_items[SECOND_LINE_ITEM_IDX].price,
// 			});
// 			setValue('price_per_trailer', {
// 				price_per_trailer_type  : data?.trailer_freight?.line_items[FIRST_LINE_ITEM_IDX].unit,
// 				price_per_trailer_value : data?.trailer_freight?.line_items[FIRST_LINE_ITEM_IDX].price,
// 			});
// 		} else if (chargeName === 'fcl_customs') {
// 			const CUSTOMS_LINE_ITEMS = [];
// 			(data?.fcl_customs?.customs_line_items || []).forEach((item) => {
// 				CUSTOMS_LINE_ITEMS.push({
// 					code     : item?.code,
// 					currency : item?.currency,
// 					price    : item?.price,
// 					unit     : item?.unit,
// 				});
// 			});
// 			const FCL_CUSTOMS_CFS = [];
// 			(data?.fcl_customs?.cfs_line_items || []).forEach((item) => {
// 				FCL_CUSTOMS_CFS.push({
// 					code     : item?.code,
// 					currency : item?.currency,
// 					price    : item?.price,
// 					unit     : item?.unit,
// 				});
// 			});
// 			setValue('customs_line_items', CUSTOMS_LINE_ITEMS);
// 			setValue('fcl_customs_cfs_line_items', FCL_CUSTOMS_CFS);
// 		} else if (chargeName === 'air_customs') {
// 			const CUSTOMS_LINE_ITEMS = [];
// 			(data?.air_customs?.line_items || []).forEach((item) => {
// 				CUSTOMS_LINE_ITEMS.push({
// 					code     : item?.code,
// 					currency : item?.currency,
// 					price    : item?.price,
// 					unit     : item?.unit,
// 				});
// 			});
// 			setValue('customs_line_items', CUSTOMS_LINE_ITEMS);
// 		} else if (chargeName === 'fcl_cfs') {
// 			const CFS_LINE_ITEMS = [];
// 			(data?.fcl_cfs?.line_items || []).forEach((item) => {
// 				CFS_LINE_ITEMS.push({
// 					code     : item?.code,
// 					currency : item?.currency,
// 					price    : item?.price,
// 					unit     : item?.unit,
// 				});
// 			});
// 			setValue('line_items', CFS_LINE_ITEMS);
// 		} else if (chargeName === 'haulage_freight') {
// 			const LINE_ITEMS = [];
// 			(data?.haulage_freight?.line_items || []).forEach((item) => {
// 				LINE_ITEMS.push({
// 					code     : item?.code,
// 					currency : item?.currency,
// 					price    : item?.price,
// 					unit     : item?.unit,
// 				});
// 			});
// 			setValue('line_items', LINE_ITEMS);
// 		}
// 	}, [JSON.stringify(data)]);

// 	return {
// 		loading,
// 		handleSubmit,
// 		fields: newfields,
// 		errors,
// 		onError,
// 		handleData,
// 		watch,
// 		control,
// 		showElements,
// 	};
// };

// export default useCreateAdditionalRates;
