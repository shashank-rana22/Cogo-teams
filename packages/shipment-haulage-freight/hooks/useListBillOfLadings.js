import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';
import { useEffect, useCallback, useState } from 'react';

const useListBillOfLadings = ({ shipment_data = {} }) => {
	const [apiData, setApiData] = useState({});

	const { id: shipment_id = '' } = shipment_data || {};

	const [{ loading }, trigger] = useRequest({
		url    : '/list_shipment_bl_details',
		params : {
			filters: {
				shipment_id,
			},
			container_details_required : false,
			page_limit                 : 100,
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
