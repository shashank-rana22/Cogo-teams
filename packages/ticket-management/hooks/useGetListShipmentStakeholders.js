import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const getParams = ({ shipmentId = '' }) => ({
	page_limit : 100,
	filters    : {
		shipment_id : shipmentId,
		status      : 'active',
	},
});

function useListShipmentStakeholders({ requestType = '', shipmentId = '' }) {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_shipment_stakeholders',
		method : 'get',
	}, { manual: true });

	const getShipmentStakeholdersList = useCallback(
		async () => {
			if (!shipmentId) {
				Toast.error('Shipment Id is required');
				return;
			}

			try {
				await trigger({
					params: getParams({ shipmentId }),
				});
			} catch (e) {
				console.error('e:', e);
			}
		},
		[trigger, shipmentId],
	);

	useEffect(() => {
		if (requestType === 'shipment') {
			getShipmentStakeholdersList();
		}
	}, [getShipmentStakeholdersList, requestType]);

	return {
		loading,
		stakeHoldersData: data,
	};
}

export default useListShipmentStakeholders;
