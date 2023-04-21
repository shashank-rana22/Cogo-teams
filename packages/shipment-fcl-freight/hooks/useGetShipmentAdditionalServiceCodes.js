import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useCallback, useState } from 'react';

const useGetShipmentAdditionalServiceCodes = ({ shipment_id, defaultFilters }) => {
	const [apiData, setApiData] = useState({});
	const [filters, setFilters] = useState({});

	const [{ loading }, trigger] = useRequest({
		url    : 'get_shipment_additional_service_codes',
		method : 'GET',
		params : {
			filters: { shipment_id, ...defaultFilters, ...filters },
		},
	}, { manual: true });

	const apiTrigger = useCallback(async () => {
		try {
			const res = await trigger();

			setApiData(res?.data || {});
		} catch (err) {
			setApiData({});

			toastApiError(err);
		}
	}, [trigger]);

	return {
		loading,
		data: apiData,
		apiTrigger,
		setFilters,
		filters,
	};
};

export default useGetShipmentAdditionalServiceCodes;
