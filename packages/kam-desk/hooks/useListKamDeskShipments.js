import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

const defaultAdditionalMethod = ['pagination'];

const useListKamDeskShipments = () => {
	const [apiData, setApiData] = useState({});

	const [{ loading }, trigger] = useRequest({
		url    : 'fcl_freight/list_kam_desk_shipments',
		method : 'GET',
	});

	const apiTrigger = useCallback(() => {
		(async () => {
			try {
				const res = await trigger({
					params: { additional_methods: defaultAdditionalMethod },
				});

				setApiData(res?.data || {});
			} catch (err) {
				setApiData({});
				console.log({ err });
			}
		})();
	}, [trigger]);

	useEffect(() => {
		apiTrigger();
	}, [apiTrigger]);

	return {
		loading,
		data: apiData,
		apiTrigger,
	};
};
export default useListKamDeskShipments;
