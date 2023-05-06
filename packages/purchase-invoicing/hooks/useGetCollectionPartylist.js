import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

function useGetCollectionParty({ shipment_id }) {
	const [{ loading: collectionPartyLoading, data }, trigger] = useRequest({
		url    : '/list_shipment_collection_party',
		method : 'GET',
	}, { manual: true });

	const listCollectionParties = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						filters: {
							shipment_id,
						},
						page       : 1,
						page_limit : 100,
					},
				});
			} catch (err) {
				toastApiError(err);
			}
		})();
	}, [trigger, shipment_id]);

	useEffect(() => {
		if (shipment_id) listCollectionParties();
	}, [listCollectionParties, shipment_id]);

	return {
		collectionPartyLoading,
		refetchCollectionParties : listCollectionParties,
		collectionPartyList      : data?.list || [],
		refetch                  : listCollectionParties,
	};
}

export default useGetCollectionParty;
