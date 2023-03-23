import { useAllocationRequest } from '@cogoport/request';
import { useState } from 'react';

function useGetKamExpertiseLevelOverview() {
	const [params, setParams] = useState({
		kam_expertise_level : '',
		filters             : {
			created_at_greater_than : '',
			created_at_less_than    : '',
		},
	}, { manual: false });

	const [{ loading, data }] = useAllocationRequest({
		url     : '/kam_expertise_level_overview',
		method  : 'GET',
		authkey : 'get_allocation_kam_expertise_level_overview',
		params,
	});

	const { list = [] } = data || {};

	return {
		setOverviewParams : setParams,
		overviewLoading   : loading,
		overviewList      : list,
	};
}

export default useGetKamExpertiseLevelOverview;
