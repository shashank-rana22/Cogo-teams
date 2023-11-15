import { useAllocationRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const getParams = ({ partnerId, officeLocationId }) => ({
	page               : 1,
	page_limit         : 100,
	user_data_required : true,
	filters            : {
		report_view_type   : 'manager_wise',
		report_type        : 'manager_report',
		office_location_id : officeLocationId || undefined,
		partner_id         : partnerId || undefined,
	},
	additional_stat_required: false,
});

function useGetLeaderbordList({
	officeLocationId = '',
	partnerId = '',
	nextViewType = '',
}) {
	const [{ data, loading }, trigger] = useAllocationRequest({
		url     : '/reports',
		method  : 'GET',
		authkey : 'get_agent_scoring_reports',
	}, { manual: true });

	const getLeaderList = useCallback(
		async () => {
			try {
				if (nextViewType !== 'managers') {
					return;
				}

				await trigger({
					params: getParams({ partnerId, officeLocationId }),
				});
			} catch (error) {
				console.error('err', error);
			}
		},
		[nextViewType, officeLocationId, partnerId, trigger],
	);

	useEffect(() => {
		getLeaderList();
	}, [getLeaderList]);

	return {
		leaderBoardLoading : loading,
		leaderBoardData    : data,
	};
}

export default useGetLeaderbordList;
