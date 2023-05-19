import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useListShipmentAdditionalServices = ({ shipment_id, shipment_data, filters = {} }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : 'list_shipment_additional_services',
		method : 'GET',
	}, { manual: true });

	const getListApi = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						performed_by_org_id : shipment_data?.importer_exporter_id,
						filters             : {
							shipment_id,

							...(filters || {}),
						},
					},
				});
			} catch (err) {
				toastApiError(err);
			}
		})();
	}, [trigger, shipment_data?.importer_exporter_id, shipment_id, filters]);

	useEffect(() => {
		if (shipment_id) {
			getListApi();
		}
	}, [getListApi, shipment_id]);

	return {
		loading,
		list    : data?.list || [],
		refetch : getListApi,
	};
};
export default useListShipmentAdditionalServices;
