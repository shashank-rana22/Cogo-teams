import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

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
			Toast.error(e?.message);
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
