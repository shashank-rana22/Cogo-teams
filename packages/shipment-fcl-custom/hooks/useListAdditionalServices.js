import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

const useListAdditionalServices = ({ shipment_data = {}, pageLimit = 8, filters = {} }) => {
	const [apiData, setApiData] = useState({});

	const { id:shipment_id = '' } = shipment_data || {};

	const [{ loading }, trigger] = useRequest({
		url    : 'fcl_customs/list_additional_services',
		params : {
			filters: {
				shipment_id,
				...filters,
			},
			additional_methods : ['pagination'],
			page_limit         : pageLimit || 8,
		},
	}, { manual: true });

	const getAdditionalServiceListApi = useCallback(async () => {
		try {
			const res = await trigger();

			setApiData(res.data || {});
		} catch (err) {
			setApiData({});

			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		getAdditionalServiceListApi();
	}, [getAdditionalServiceListApi]);

	return {
		loading,
		list       : apiData?.list || [],
		refetch    : getAdditionalServiceListApi,
		totalCount : apiData?.total_count,
	};
};
export default useListAdditionalServices;
