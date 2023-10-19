import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const getParams = ({ serialId }) => ({
	filters: {
		serial_id: serialId || undefined,
	},
});

function useListShipments({ serialId = 0, ticketId = 0 }) {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_shipments',
		method : 'get',
	}, { manual: true });

	const getShipmentsList = useCallback(
		() => {
			try {
				trigger({
					params: getParams({ serialId }),
				});
			} catch (e) {
				console.error('e:', e);
			}
		},
		[serialId, trigger],
	);

	useEffect(() => {
		getShipmentsList({});
	}, [getShipmentsList, ticketId]);

	const shipmentsData = data?.list?.[GLOBAL_CONSTANTS.zeroth_index];

	return {
		listLoading: loading,
		shipmentsData,
	};
}

export default useListShipments;
