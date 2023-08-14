import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

const DEFAULT_PAGE_LIMIT = 20;

const getParams = (shipmentId = '', paginationFilter = {}) => ({
	filters    : { shipment_id: shipmentId },
	...paginationFilter,
	page_limit : DEFAULT_PAGE_LIMIT,
});

function useListShipmentCollectionParty(shipmentId) {
	const [paginationFilter, setPaginationFilter] = useState({ page: 1 });

	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_shipment_collection_party',
		method : 'GET',
	}, { manual: true });

	const fetch = useCallback(async () => {
		try {
			await trigger({
				params: getParams(shipmentId, paginationFilter),
			});
		} catch (e) {
			console.error(e);
		}
	}, [trigger, shipmentId, paginationFilter]);

	useEffect(() => {
		fetch();
	}, [fetch]);

	return {
		loading,
		data,
		setPaginationFilter,
	};
}

export default useListShipmentCollectionParty;
