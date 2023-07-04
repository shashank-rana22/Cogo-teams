import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

const useListServiceChargeCodes = ({ shipmentId = '' }) => {
	const [apiData, setApiData] = useState({});

	const [{ loading }, trigger] = useRequest({
		url    : '/get_shipment_additional_service_codes',
		method : 'GET',
		params : { filters: { shipment_id: shipmentId } },
	});

	const getListChargeCodes = useCallback(async () => {
		try {
			const res = await trigger();

			setApiData(res.data || {});
		} catch (err) {
			setApiData({});

			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		getListChargeCodes();
	}, [getListChargeCodes, shipmentId]);

	return {
		loading,
		list    : apiData?.list || [],
		refetch : getListChargeCodes,
		apiList : apiData,
	};
};
export default useListServiceChargeCodes;
