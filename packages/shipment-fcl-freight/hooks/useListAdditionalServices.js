import { ShipmentDetailContext } from '@cogoport/context';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useContext, useEffect, useCallback, useState } from 'react';

const useListAdditionalServices = ({ payload = {} } = {}) => {
	const [apiData, setApiData] = useState({});
	const { shipment_data } = useContext(ShipmentDetailContext);

	const { importer_exporter_id = '', id:shipment_id = '' } = shipment_data || {};

	const [{ loading }, trigger] = useRequest({
		url    : 'fcl_freight/list_additional_services',
		params : {
			performed_by_org_id : importer_exporter_id,
			filters             : {
				shipment_id,
				...payload,
			},
			additional_methods : ['pagination'],
			page_limit         : 8,
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
