import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

const useGetShipmentServicesQuotation = ({ defaultParams }) => {
	const [apiData, setApiData] = useState({});
	const [{ loading }, trigger] = useRequest({
		url    : '/get_shipment_services_quotation',
		method : 'GET',
		params : defaultParams,
	});

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
	}, [apiTrigger]);

	return {
		apiTrigger,
		data: apiData,
		loading,
	};
};

export default useGetShipmentServicesQuotation;
