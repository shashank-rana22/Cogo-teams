import { useMemo } from 'react';

import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';

const useGetShipment = ({ contactId = '' }) => {
	const { query } = useRouter();

	const [{ data, loading }] = useRequest({
		method : 'get',
		url    : '/list_saas_container_subscriptions',
		params : {
			filters: {
				status                 : 'active',
				organization_branch_id : query?.branch_id,
			},
			page_limit: 100,
		},
	}, { manual: false });

	const [associatedShipments, otherShipments] = useMemo(() => {
		const shipmentList = data?.list || [];
		const associated = [];
		const other = [];

		shipmentList.forEach((shipment) => {
			const isAssociated = shipment.poc_details.some((item) => item?.id === contactId);

			if (isAssociated) {
				associated.push(shipment);
			} else {
				other.push(shipment);
			}
		});
		return [associated, other];
	}, [contactId, data]);

	return {
		associatedShipments,
		otherShipments,
		loading,
	};
};

export default useGetShipment;
