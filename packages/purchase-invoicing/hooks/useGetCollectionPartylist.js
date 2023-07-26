import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

function useGetCollectionParty({ shipment_id, shipment_type = '' }) {
	const { partner, user_id } = useSelector(({ profile }) => ({
		partner : (profile || {}).partner || {},
		user_id : (profile || {}).user?.id,
	}));

	const [{ loading: collectionPartyLoading, data }, trigger] = useRequest({
		url    : '/list_shipment_collection_party',
		method : 'GET',
	}, { manual: true });

	const geo = getGeoConstants();

	const operationRoles = (partner?.user_role_ids?.some((ele) => [
		geo.uuid.lastmile_ops_id,
		geo.uuid.lastmile_ops_manager_id,
		geo.uuid.service_ops2_role_id,
		geo.uuid.so_2_manager,
		geo.uuid.so1_so2_role_id,
		geo.uuid.costbooking_ops_role_ids,
		geo.uuid.costbooking_ops_manager_role_ids,
	].includes(ele)));

	const showPurchaseEntityWise = operationRoles && shipment_type === 'fcl_freight';

	const listCollectionParties = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						filters: {
							shipment_id,
							stakeholder_id: showPurchaseEntityWise ? user_id : undefined,
						},
						page       : 1,
						page_limit : 100,
					},
				});
			} catch (err) {
				toastApiError(err);
			}
		})();
	}, [trigger, shipment_id, showPurchaseEntityWise, user_id]);

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
