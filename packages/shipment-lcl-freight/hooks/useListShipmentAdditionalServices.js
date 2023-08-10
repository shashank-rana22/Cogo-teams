import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

export default function useListShipmentAdditionalServices({ shipment_data = {}, pageLimit, filters = {} }) {
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
}
