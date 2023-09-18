import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const getPayload = ({ selectedTeam }) => ({
	filters: {
		team_name : selectedTeam || undefined,
		status    : 'active',
	},
});

function useListCogooneShiftConfiguration({ selectedTeam = '' }) {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_cogoone_shifts',
		method : 'get',
	}, { manual: true });

	const getListShift = useCallback(
		async () => {
			try {
				await trigger({
					params: getPayload({ selectedTeam }),
				});
			} catch (error) {
				console.error(error);
			}
		},
		[trigger, selectedTeam],
	);

	useEffect(() => {
		getListShift();
	}, [getListShift]);

	return {
		getListShift,
		shiftsData       : data,
		shiftDataLoading : loading,
	};
}

export default useListCogooneShiftConfiguration;
