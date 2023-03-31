import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import getApiErrorString from '../utils/getApiErrorString';

const useListAdditionalServices = ({ shipment_data, filters = {}, pageLimit }) => {
	const [{ data, loading }, trigger] = useRequest({
		url    : 'fcl_freight/list_additional_services',
		method : 'GET',
	}, { manual: true });
	const { importer_exporter_id, id } = shipment_data || {};

	const getAdditionalServiceListApi = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						performed_by_org_id : importer_exporter_id,
						filters             : {
							shipment_id: id,
							...(filters || {}),
						},
						additional_methods : ['pagination'],
						page_limit         : pageLimit || 8,
					},
				});
			} catch (err) {
				Toast.error(getApiErrorString(err));
			}
		})();
	}, [trigger, importer_exporter_id, id, JSON.stringify(filters), pageLimit]);

	useEffect(() => {
		getAdditionalServiceListApi();
	}, [getAdditionalServiceListApi]);

	return {
		loading,
		list        : data?.list || [],
		refetch     : getAdditionalServiceListApi,
		total_count : data?.total_count,
	};
};
export default useListAdditionalServices;
