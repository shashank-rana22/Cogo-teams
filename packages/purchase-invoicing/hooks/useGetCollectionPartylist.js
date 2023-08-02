import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

import getCollectionPartyParams from '../helpers/getCollectionPartyParams';
import toastApiError from '../utils/toastApiError';

function useGetCollectionParty({ shipmentData = {}, servicesData = [], shipment_id = '', shipment_type = '' }) {
	const profile_data = useSelector(({ profile }) => (profile));

	const geo = getGeoConstants();

	const stakeholder_based_params = getCollectionPartyParams({ profile_data, servicesData, shipmentData });

	const isStakeholderIdFilterAllowed = [
		geo.uuid.service_ops2_role_id,
		geo.uuid.lastmile_ops_id,
		geo.uuid.lastmile_ops_manager_id,
		geo.uuid.so1_so2_ops_role_id,
		geo.uuid.costbooking_ops_role_ids,
		geo.uuid.costbooking_ops_manager_role_ids,
		geo.uuid.so1_so2_role_id,
		geo.uuid.so_2_manager,
	].some((ele) => profile_data?.partner.user_role_ids?.includes(ele));

	const [{ loading: collectionPartyLoading, data }, trigger] = useRequest({
		url    : '/list_shipment_collection_party',
		method : 'GET',
		params : {
			filters: {
				shipment_id,
				stakeholder_id: shipment_type === 'fcl_freight'
			&& isStakeholderIdFilterAllowed ? profile_data?.user?.id : undefined,
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
