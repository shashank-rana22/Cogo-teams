import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

import { CATEGORY_SID_TYPES, FETCH_API_FOR_REQUEST } from '../constants';

const getParams = ({ serialId }) => ({
	filters: {
		serial_id: serialId || undefined,
	},
});

function useListShipments({ serialId = 0, ticketId = 0, idType = '', requestType = '', category = '' }) {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_shipments',
		method : 'get',
	}, { manual: true });

	const getShipmentsList = useCallback(
		() => {
			if (idType !== 'sid' && !FETCH_API_FOR_REQUEST.includes(requestType)) {
				return;
			}

			if (!FETCH_API_FOR_REQUEST.includes(requestType)
			&& !CATEGORY_SID_TYPES.includes(category?.toLowerCase())) {
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
		[serialId, trigger, idType, requestType, category],
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
