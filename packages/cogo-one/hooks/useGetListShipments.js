import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

import { ID_TYPE_OPTIONS } from '../constants/shipmentConstants';

const getParams = ({ serialId }) => ({
	filters: {
		serial_id: serialId || undefined,
	},
});

function useGetListShipments({ serialId = '', ticketId = '', idType = '' }) {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_shipments',
		method : 'get',
	}, { manual: true });

	const getShipmentsList = useCallback(
		() => {
			if (!serialId || ID_TYPE_OPTIONS?.includes(idType)) {
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
		[serialId, trigger, idType],
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
