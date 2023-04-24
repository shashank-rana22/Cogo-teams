import { useDebounceQuery } from '@cogoport/forms';
import { useAllocationRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

function useGetEngagementScoringConfiguration(props) {
	const { activeCollapse } = props;

	console.log('activeCollapse', activeCollapse);
	const { debounceQuery, query: searchQuery } = useDebounceQuery();

	const [searchValue, setSearchValue] = useState('');

	const [{ loading, data }, refetch] = useAllocationRequest({
		url     : 'engagement_scoring_event_configurations',
		method  : 'GET',
		authkey : 'get_allocation_engagement_scoring_event_configurations',
		params  : {
			filters: {
				q: searchQuery || undefined,
			},
		},
	});

	useEffect(() => {
		if (activeCollapse) {
			refetch();
		}
	}, [activeCollapse, refetch]);

	return { loading, data, debounceQuery, refetch, searchValue, setSearchValue };
}

export default useGetEngagementScoringConfiguration;
