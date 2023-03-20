import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useListAdditionalServices = ({ shipment_data, filters = {} }) => {
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
						page_limit: 15,
					},
				});
			} catch (err) {
				console.log(err);
			}
		})();
	}, [trigger, importer_exporter_id, id, JSON.stringify(filters)]);

	useEffect(() => {
		getAdditionalServiceListApi();
	}, [getAdditionalServiceListApi]);

	return {
		loading,
		list    : data?.list || [],
		refetch : getAdditionalServiceListApi,
	};
};
export default useListAdditionalServices;
