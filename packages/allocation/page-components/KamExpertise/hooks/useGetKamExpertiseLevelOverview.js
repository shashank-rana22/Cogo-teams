import { useAllocationRequest } from '@cogoport/request';
import { useState } from 'react';

function useGetKamExpertiseLevelOverview() {
	const [params, setParams] = useState({});

	const [{ loading, data }] = useAllocationRequest({
		url     : '/kam_expertise_level_overview',
		method  : 'GET',
		authkey : 'get_allocation_kam_expertise_level_overview',
		params,
	}, { manual: !(params?.kam_expertise_level) });

	const { list = [] } = data || {};

	return {
		setOverviewParams : setParams,
		overviewLoading   : loading,
		overviewList      : list,
	};
}

export default useGetKamExpertiseLevelOverview;
