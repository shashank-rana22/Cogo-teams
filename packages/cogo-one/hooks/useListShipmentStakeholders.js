import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const getParams = ({ shipmentId }) => ({
	filters: {
		shipment_id: shipmentId,
	},
	format_by_stakeholder_type_required : true,
	page_limit                          : 1000,
});

function useListShipmentStakeholders({ shipmentId }) {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_shipment_stakeholders',
		method : 'get',
	}, { manual: true });

	const getShipmentStakeholdersList = useCallback(
		async () => {
			try {
				await trigger({
					params: getParams({ shipmentId }),
				});
			} catch (e) {
				console.error('e:', e);
			}
		},
		[shipmentId, trigger],
	);

	useEffect(
		() => {
			getShipmentStakeholdersList();
		},
		[getShipmentStakeholdersList],
	);

	return {
		loading,
		stakeHoldersData: data,
	};
}

export default useListShipmentStakeholders;
