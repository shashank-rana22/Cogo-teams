import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useMemo } from 'react';

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
		const ASSOCIATED = [];
		const OTHER = [];

		shipmentList.forEach((shipment) => {
			const isAssociated = shipment.poc_details.some((item) => item?.id === contactId);

			if (isAssociated) {
				ASSOCIATED.push(shipment);
			} else {
				OTHER.push(shipment);
			}
		});
		return [ASSOCIATED, OTHER];
	}, [contactId, data]);

	return {
		associatedShipments,
		otherShipments,
		loading,
	};
};

export default useGetShipment;
