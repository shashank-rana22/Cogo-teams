import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const getParams = ({ serialId }) => ({
	filters: {
		serial_id: serialId || undefined,
	},
});

function useGetListShipments({ serialId = '', ticketId = '' }) {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_shipments',
		method : 'get',
	}, { manual: true });

	const getShipmentsList = useCallback(
		() => {
			if (!serialId) {
				return;
			}

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

	const shipmentData = data?.list?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	return {
		listLoading: loading,
		shipmentData,
	};
}

export default useGetListShipments;
