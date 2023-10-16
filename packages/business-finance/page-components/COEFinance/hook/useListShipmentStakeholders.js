import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import toastApiError from '../../commons/toastApiError';

const useListStakeholders = ({ shipmentId = '' }) => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_shipment_stakeholders',
		method : 'get',
		params : {
			filters: {
				shipment_id: shipmentId,
			},
			page_limit : 50,
			sort_by    : 'created_at',
			sort_type  : 'desc',
		},
	}, { manual: true });

	const apiTrigger = useCallback(async () => {
		try {
			await trigger();
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		apiTrigger();
	}, [apiTrigger]);

	return {
		loading,
		data,
	};
};

export default useListStakeholders;
