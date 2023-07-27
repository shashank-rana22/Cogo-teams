import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';
import { useSelector } from '@cogoport/store';

import getCollectionPartyParams from '../helpers/getCollectionPartyParams';
import toastApiError from '../utils/toastApiError';

function useGetCollectionParty({ shipmentData, servicesData }) {
	const profile_data = useSelector(({ profile }) => (profile));

	const stakeholder_based_params = getCollectionPartyParams({ profile_data, servicesData, shipmentData });

	const [{ loading: collectionPartyLoading, data }, trigger] = useRequest({
		url    : '/list_shipment_collection_party',
		method : 'GET',
		params : {
			filters: {
				shipment_id:shipmentData?.id,
			},
			page       : 1,
			page_limit : 100,
			...stakeholder_based_params,

		},
	}, { manual: true });

	const listCollectionParties = useCallback(() => {
		(async () => {
			try {
				await trigger();
			} catch (err) {
				toastApiError(err);
			}
		})();
	}, [trigger]);

	useEffect(() => {
		if (shipment_id) listCollectionParties();
	}, [listCollectionParties, shipment_id]);

	return {
		collectionPartyLoading,
		collectionPartyList : data?.list || [],
		refetch             : listCollectionParties,
	};
}

export default useGetCollectionParty;
