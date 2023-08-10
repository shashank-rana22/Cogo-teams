import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const DEFAULT_PAGE_LIMIT = 10;

export default function useListShipmentAdditionalServices({ shipment_data = {}, pageLimit, filters = {} }) {
	const { importer_exporter_id = '', id:shipment_id = '' } = shipment_data || {};

	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_shipment_additional_services',
		params : {
			performed_by_org_id : importer_exporter_id,
			filters             : {
				shipment_id,
				...filters,
			},
			page_limit: pageLimit || DEFAULT_PAGE_LIMIT,
		},
	}, { manual: true });

	const getAdditionalServiceListApi = useCallback(() => {
		try {
			trigger();
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		getAdditionalServiceListApi();
	}, [getAdditionalServiceListApi]);

	return {
		loading,
		list       : data?.list || [],
		refetch    : getAdditionalServiceListApi,
		totalCount : data?.total_count,
	};
}
