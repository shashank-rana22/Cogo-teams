import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

function useListCogoOneShift({ activeCard = '' }) {
	const [{ loading, data }, trigger] = useRequest(
		{
			url    : '/list_cogoone_shifts',
			method : 'get',
		},
		{ manual: true, autoCancel: false },
	);

	const getAgentshift = useCallback(() => {
		if (activeCard !== 'agents_status') {
			return;
		}

		try {
			trigger();
		} catch (error) {
			console.log(error);
		}
	}, [trigger, activeCard]);

	useEffect(() => {
		getAgentshift();
	}, [getAgentshift]);

	const { list = [] } = data || {};

	return {
		loading,
		shiftList: list || [],
	};
}
export default useListCogoOneShift;
