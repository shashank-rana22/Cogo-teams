import { useRequest } from '@cogoport/request';
import { useState, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const useListCogoEntity = ({ cogo_entity_id = '' }) => {
	const [apiData, setApiData] = useState({});
	const [trigger] = useRequest({
		url    : '/list_cogo_entities',
		method : 'GET',
		params : {
			filters: {
				status : 'active',
				id     : cogo_entity_id,
			},
			page_limit : 100000,
			page       : 1,
		},
	}, { manual: true });

	const listCogoEntities = useCallback(async () => {
		try {
			const res = await trigger();

			setApiData(res?.data || {});
		} catch (err) {
			toastApiError(err);
			setApiData({});
		}
	}, [trigger]);

	return {
		entity_data : apiData?.list || [],
		refetch     : listCogoEntities,
	};
};

export default useListCogoEntity;
