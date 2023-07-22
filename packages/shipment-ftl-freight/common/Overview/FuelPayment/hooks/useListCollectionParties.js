import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const DEFAULT_PAGE_LIMIT = 10;
const DEFAULT_PAGE = 1;

const useListCollectionParties = ({ shipment_data = {} }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_shipment_collection_party',
		method : 'GET',
	}, { manual: true });

	const getCollectionParties = useCallback(async () => {
		try {
			await trigger({
				params: {
					filters: {
						shipment_id: shipment_data?.id,
					},
					page_limit : DEFAULT_PAGE_LIMIT,
					page       : DEFAULT_PAGE,
				},
			});
		} catch (error) {
			console.error(error?.data);
		}
	}, [shipment_data, trigger]);

	useEffect(() => {
		getCollectionParties();
	}, [getCollectionParties]);

	return {
		loading,
		data,
	};
};

export default useListCollectionParties;
