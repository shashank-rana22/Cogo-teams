import { useRequestBf } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import toastApiError from '../../../commons/toastApiError';

const useGetEntityLevelOutstanding = ({ entityCode = '' }) => {
	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/payments/outstanding/entity-level-stats',
			method  : 'get',
			authKey : 'get_payments_outstanding_entity_level_stats',
		},
		{ manual: true },
	);

	const refetch = useCallback(() => {
		try {
			trigger({
				params: {
					entityCode: entityCode || undefined,
				},
			});
		} catch (e) {
			toastApiError(e);
		}
	}, [entityCode, trigger]);

	useEffect(() => {
		refetch();
	}, [refetch]);

	return {
		entityDataLoading : loading,
		entityData        : data,
		refetch,
	};
};

export default useGetEntityLevelOutstanding;
