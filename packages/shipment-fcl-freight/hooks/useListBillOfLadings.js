import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

const useListBillOfLadings = ({ shipment_data = {} }) => {
	const [apiData, setApiData] = useState({});

	const { id: sid } = shipment_data;

	const [{ loading }, trigger] = useRequest({
		url    : 'fcl_freight/list_bill_of_ladings',
		params : {
			filters: {
				shipment_id: sid,
			},
			additional_methods: ['cargo_details'],
		},
	}, { manual: true });

	const getBillOfLadingApi = useCallback(async () => {
		try {
			const res = await trigger();
			setApiData(res.data || {});
		} catch (err) {
			setApiData({});
			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		getBillOfLadingApi();
	}, [getBillOfLadingApi]);

	return {
		loading,
		containerDetails : apiData?.container_details,
		list             : apiData?.list || [],
		refetch          : getBillOfLadingApi,
	};
};
export default useListBillOfLadings;
