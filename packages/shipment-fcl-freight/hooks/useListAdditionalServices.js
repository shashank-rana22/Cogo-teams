import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

import getApiErrorString from '../utils/getApiErrorString';

const useListAdditionalServices = ({ shipment_data, pageLimit }) => {
	const [apiData, setApiData] = useState({});

	const { importer_exporter_id, id } = shipment_data || {};

	const [{ loading }, trigger] = useRequest({
		url    : 'fcl_freight/list_additional_services',
		params : {
			performed_by_org_id : importer_exporter_id,
			filters             : {
				shipment_id: id,
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
			Toast.error(getApiErrorString(err));
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
