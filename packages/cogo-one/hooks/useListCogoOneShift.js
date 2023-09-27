import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const getParams = () => ({
	filters: {
		team_name : 'shipment_specialist',
		status    : 'active',
	},
});

function useListCogoOneShift() {
	const [{ loading, data }, trigger] = useRequest(
		{
			url    : '/list_cogoone_shifts',
			method : 'get',
		},
		{ manual: true, autoCancel: false },
	);

	const getAgentshift = useCallback(() => {
		try {
			trigger({
				params: getParams(),
			});
		} catch (error) {
			console.error(error);
		}
	}, [trigger]);

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
