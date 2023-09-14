import { isEmpty, upperCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useCallback, useEffect, useState } from 'react';

import headerFormControls, { defaultValues } from '../configuration/headerFormControls';

import useRedirectFn from './useRedirectFn';

import { useForm } from '@/packages/forms';
import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';

const API_MAPPING = {
	ocean: {
		operatorApi : '/get_shipping_line_for_search_value',
		createApi   : '/create_saas_container_subscription',
		payloadKey  : 'search_value',
		operatorKey : 'shippingLine',
		threshold   : 4,
	},
	air: {
		operatorApi : '/get_airline_from_airway_bill',
		createApi   : '/create_saas_air_subscription',
		payloadKey  : 'airway_bill_no',
		operatorKey : 'airLine',
		threshold   : 3,
	},
};

const useCreateTracker = ({ operatorData }) => {
	const { query } = useRouter();

	const { t } = useTranslation(['common', 'airOceanTracking']);

	const [trackingType, setTrackingType] = useState('ocean');

	const { branch_id } = query || {};

	const { operatorApi, createApi, payloadKey, operatorKey, threshold } = API_MAPPING[trackingType];

	const [{ data }, trigger] = useRequest({
		method : 'get',
		url    : operatorApi,
	}, { manual: true });

	const [{ loading }, createTrigger] = useRequest({
		method : 'post',
		url    : createApi,
	}, { manual: true });

	const { redirectToTracker } = useRedirectFn();

	const formHook = useForm();
	const { watch, reset, setValue } = formHook;
	const shipmentNumber = watch('shipmentNumber');

	const controls = headerFormControls({ trackingType, operatorData, t });

	// require async await, hitting this api on every key stroke
	const getOperatorInfo = useCallback(async ({ shipmentNo }) => {
		try {
			await trigger({
				params: {
					[payloadKey]: upperCase(shipmentNo),
				},
			});
		} catch (err) {
			console.error(err);
		}
	}, [payloadKey, trigger]);

	const createTracker = async ({ payload }) => {
		try {
			const res = await createTrigger({
				data: {
					...payload,
					organization_branch_id: branch_id,
				},
			});
			const { id } = res?.data || {};
			redirectToTracker({ type: trackingType, id, isFirst: true });
		} catch (err) {
			console.error(err, 'err');
		}
	};

	const onSubmitHandler = (formData) => {
		const { airLine = '', shipmentNumber: shipmentNo = '', shippingLine = '' } = formData || {};

		const payloadMapping = {
			ocean: {
				shipping_line_id : shippingLine,
				search_value     : shipmentNo,
			},
			air: {
				airline_id     : airLine,
				airway_bill_no : shipmentNo,
			},
		};
		const payload = payloadMapping[trackingType];

		createTracker({ payload });
	};

	useEffect(() => {
		reset(defaultValues);
	}, [reset, trackingType]);

	useEffect(() => {
		if (shipmentNumber?.length >= threshold) {
			getOperatorInfo({ shipmentNo: shipmentNumber });
		}
	}, [getOperatorInfo, shipmentNumber, threshold]);

	useEffect(() => {
		if (!isEmpty(data)) {
			const { shipping_line_id, id } = data || {};

			setValue(operatorKey, shipping_line_id || id);
		}
	}, [data, operatorKey, setValue]);

	return {
		loading, getOperatorInfo, formHook, setTrackingType, trackingType, controls, onSubmitHandler,
	};
};

export default useCreateTracker;
