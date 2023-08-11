import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_LIMIT = 20;

const useListFieldServiceOpsDetails = ({ shipment_id = '' }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_shipment_field_service_ops_details',
		method : 'GET',
	}, { manual: true });

	const listDetails = useCallback(async () => {
		try {
			await trigger({
				params: {
					filters: {
						shipment_id,
					},
					page       : DEFAULT_PAGE,
					page_limit : DEFAULT_PAGE_LIMIT,
				},
			});
		} catch (error) {
			console.error(error?.data);
		}
	}, [shipment_id, trigger]);

	useEffect(() => {
		listDetails();
	}, [listDetails]);

	return {
		refetchList : listDetails,
		loading,
		list        : data?.list || [],
	};
};

export default useListFieldServiceOpsDetails;
