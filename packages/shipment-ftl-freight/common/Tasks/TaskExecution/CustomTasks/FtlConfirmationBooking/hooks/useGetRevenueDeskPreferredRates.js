import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';
import { useEffect, useCallback } from 'react';

const useGetRevenueDeskPreferedRates = ({
	service_type = '',
	shipment_id = '',
	group_by = 'service_id',
	services = [],
}) => {
	const [{ data: preferences, loading }, trigger] = useRequest({
		url    : '/list_shipment_booking_confirmation_preferences',
		method : 'GET',
	}, { manual: true });

	const grouped_services = services.reduce((acc, service) => {
		acc[service.id] = service;
		return acc;
	}, {});

	const getRates = useCallback(() => {
		try {
			const params = {
				filters: {
					shipment_id,
					service_type: service_type || undefined,
				},
			};
			trigger({ params });
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger, shipment_id, service_type]);

	useEffect(() => {
		getRates();
	}, [getRates]);

	const newRates = (preferences?.list || []).map((item) => {
		const { data, ...rest } = item;
		const price_details = data?.[GLOBAL_CONSTANTS.zeroth_index] || {};

		delete price_details.id;

		return {
			...price_details,
			...rest,
			preference_id: item.preference_id,
		};
	});

	const GROUPED_RATES = {};

	if (group_by) {
		newRates.forEach((rate) => {
			const newRate = { ...rate };
			let key = newRate[group_by];
			if (!rate[key]) {
				key = grouped_services[rate.service_id][group_by];
				newRate[group_by] = key;
			}
			GROUPED_RATES[key] = [...(GROUPED_RATES[key] || []), newRate];
		});
	}

	return {
		getRates,
		loading,
		newRates,
		groupedRates: GROUPED_RATES,
	};
};

export default useGetRevenueDeskPreferedRates;
