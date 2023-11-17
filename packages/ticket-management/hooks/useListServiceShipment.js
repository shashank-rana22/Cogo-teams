import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

import { SERVICE_API_MAPPING } from '../constants';

const getParams = ({ serialId }) => ({
	filters: {
		serial_id: serialId ? `${serialId}` : undefined,
	},
});

function useListServiceTypeShipment({ serialId = 0, ticketId = 0, idType = '', requestType = '', service = '' }) {
	const API_NAME = SERVICE_API_MAPPING?.[idType]?.[service] || null;

	const [{ loading, data }, trigger] = useRequest({
		url    : `/${API_NAME}`,
		method : 'get',
	}, { manual: true });

	const getServiceType = useCallback(
		() => {
			if (idType === 'sid' || requestType !== 'rate') {
				return;
			}

			try {
				trigger({
					params: getParams({ serialId }),
				});
			} catch (e) {
				console.error('err:', e);
			}
		},
		[serialId, trigger, idType, requestType],
	);

	useEffect(() => {
		getServiceType();
	}, [getServiceType, ticketId]);

	const shipmentsData = data?.list?.[GLOBAL_CONSTANTS.zeroth_index];

	return {
		serviceLoading : loading,
		serviceData    : shipmentsData,
	};
}

export default useListServiceTypeShipment;
