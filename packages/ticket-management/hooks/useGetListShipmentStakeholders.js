import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

function useListShipmentStakeholders({ requestType = '' }) {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_shipment_stakeholders',
		method : 'get',
	}, { manual: true });

	const getShipmentStakeholdersList = useCallback(
		async () => {
			try {
				await trigger({
					params: {
						page_limit: 100,
					},
				});
			} catch (e) {
				console.error('e:', e);
			}
		},
		[trigger],
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
