import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';
import { useEffect, useCallback, useState } from 'react';

const useListAdditionalServices = ({ shipment_data = {}, pageLimit = 8, filters = {} }) => {
	const [apiData, setApiData] = useState({});

	const { importer_exporter_id = '', id:shipment_id = '' } = shipment_data || {};

	const [{ loading }, trigger] = useRequest({
		url    : '/list_shipment_additional_services',
		params : {
			performed_by_org_id : importer_exporter_id,
			filters             : {
				shipment_id,
				...filters,
			},
			page_limit: pageLimit || 8,
		},
		service_name: 'shipment',
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
