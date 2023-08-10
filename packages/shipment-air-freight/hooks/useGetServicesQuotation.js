import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

const useGetServicesQuotation = (defaultParams = {}) => {
	const [apiData, setApiData] = useState({});

	const [{ loading }, trigger] = useRequest({
		url    : '/get_shipment_services_quotation',
		method : 'GET',
		params : defaultParams,
	});

	const apiTrigger = useCallback(async () => {
		try {
			const res = await trigger({
				params: defaultParams,
			});

			setApiData(res.data || {});
		} catch (err) {
			setApiData({});

			toastApiError(err);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
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

export default useGetServicesQuotation;
