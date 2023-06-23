import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

function useListShipmentCollectionParty(shipmentId) {
	const [paginationFilter, setPaginationFilter] = useState({ page: 1 });

	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_shipment_collection_party',
		method : 'GET',
	}, { manual: true });

	useEffect(() => {
		const fetch = async () => {
			try {
				await trigger({
					params: {
						filters    : { shipment_id: shipmentId },
						...paginationFilter,
						page_limit : 100,
					},

				});
			} catch (e) {
				console.log(e);
			}
		};
		fetch();
	}, [shipmentId, trigger, paginationFilter]);

	return {
		loading,
		data,
		setPaginationFilter,
	};
}

export default useListShipmentCollectionParty;
