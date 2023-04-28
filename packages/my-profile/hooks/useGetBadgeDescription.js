import { useAllocationRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

function useGetBadgeDescription() {
	const [params, setParams] = useState({});

	const [{ loading, data = {} }, trigger] = useAllocationRequest({
		url     : '/kam_expertise_badge_description',
		mehtod  : 'GET',
		authkey : 'get_allocation_kam_expertise_badge_description',
	}, { manual: true });

	useEffect(() => {
		if (!isEmpty(params)) {
			trigger({ params });
		}
	}, [params, trigger]);

	return {
		badgeDetail        : data,
		badgeDetailloading : loading,
		setBadgeParams     : setParams,
	};
}

export default useGetBadgeDescription;
