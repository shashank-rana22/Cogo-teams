import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

const useGetSailingSchedulePortPairCoverage = ({
	originPort,
	destinationPort,
}) => {
	const { scope } = useSelector(({ general }) => ({ scope: general.scope }));
	const [{ data, loading }, trigger] = useRequest(
		{
			method : 'GET',
			url    : '/get_sailing_schedule_port_pair_coverages',
			scope,
		},
		{ manual: true },
	);

	const getSailingSchedulePortPairCoverageData = async () => {
		try {
			await trigger({
				params: {
					origin_port_id      : originPort,
					destination_port_id : destinationPort,
					page                : 1,
				},
			});
		} catch (e) {
			if (e.response?.data) { Toast.error(getApiErrorString(e.response?.data)); }
		}
	};

	useEffect(() => {
		getSailingSchedulePortPairCoverageData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		data       : data?.coverages,
		getSailingSchedulePortPairCoverageData,
		totalCount : data?.total_count,
		loading,
	};
};
export default useGetSailingSchedulePortPairCoverage;
