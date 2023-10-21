import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

function useGetEntityMargin({ showModal = {}, service = '' }) {
	const { entities = [] } = showModal || {};

	const fromEntityId = entities[GLOBAL_CONSTANTS.zeroth_index]?.id || '';
	const toEntityId = entities[1]?.id || '';

	const [{ data, loading }, trigger] = useRequest(
		{
			url    : '/get_cogo_entity_margin',
			method : 'GET',
		},
		{ manual: true },
	);

	const getEntityMargin = useCallback(async () => {
		try {
			const params = {
				from_entity_id : fromEntityId,
				to_entity_id   : toEntityId,
				service_type   : service,
			};

			await trigger({ params });
		} catch (error) {
			if (error?.response) {
				Toast.error(getApiErrorString(error?.response?.data));
			}
		}
	}, [fromEntityId, toEntityId, service, trigger]);

	useEffect(() => {
		getEntityMargin();
	}, [fromEntityId, toEntityId, service, getEntityMargin]);

	return {
		getEntityMargin,
		data,
		loading,
	};
}

export default useGetEntityMargin;
