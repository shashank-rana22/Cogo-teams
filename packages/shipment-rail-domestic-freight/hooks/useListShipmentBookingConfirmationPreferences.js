import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';
import { useEffect, useCallback, useState } from 'react';

const useListShipmentBookingConfirmationPreferences = ({ defaultFilters = {}, shipment_id = '' }) => {
	const [apiData, setApiData] = useState({});
	const [filters, setFilters] = useState({});

	const [{ loading }, trigger] = useRequest({
		url    : 'list_shipment_booking_confirmation_preferences',
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
		apiTrigger,
		data: apiData,
		filters,
		setFilters,
	};
};
export default useListShipmentBookingConfirmationPreferences;