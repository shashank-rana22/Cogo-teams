import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

const useListBookingPreferences = ({ defaultFilters = {}, shipment_id = '' }) => {
	const [apiData, setApiData] = useState({});
	const [filters, setFilters] = useState({});

	const [{ loading }, trigger] = useRequest({
		url    : '/list_shipment_booking_confirmation_preferences',
		method : 'GET',
		params : {
			filters: {
				shipment_id,
				...defaultFilters,
				...filters,
			},
		},
	}, { manual: true });

	const apiTrigger = useCallback(async () => {
		try {
			const res = await trigger();

			setApiData(res.data || {});
		} catch (err) {
			setApiData({});

			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		apiTrigger();
	}, [shipment_id, apiTrigger]);

	return {
		loading,
		getList : apiTrigger,
		data    : apiData,
		filters,
		setFilters,
	};
};
export default useListBookingPreferences;
