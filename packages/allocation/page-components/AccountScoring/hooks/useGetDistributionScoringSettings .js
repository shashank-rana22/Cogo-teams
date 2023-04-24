import { useAllocationRequest } from '@cogoport/request';
import { useState } from 'react';

function useGetDistributionScoringSettings() {
	const [params, setParams] = useState({});

	const [{ loading, data }, refetch] = useAllocationRequest({
		url     : 'engagement_distribution_settings',
		method  : 'GET',
		authkey : 'get_allocation_engagement_distribution_settings',
	}, { manual: false });

	const { list = [] } = data || {};

	return {
		distributionLoading : loading,
		distributionRefetch : refetch,
		distributionList    : list,
		setParams,
	};
}

export default useGetDistributionScoringSettings;
