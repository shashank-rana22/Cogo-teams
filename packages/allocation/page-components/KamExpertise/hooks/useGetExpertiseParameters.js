import { useAllocationRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetExpertiseParameters = ({ activeCollapse = '', responseId }) => {
	const [{ loading, data }, refetch] = useAllocationRequest({
		url     : '/kam_expertise_event_configuration',
		method  : 'GET',
		authkey : 'get_allocation_kam_expertise_event_configuration',
		params  : {
			pagination_data_required  : false,
			for_configuration_stats   : activeCollapse ? undefined : true,
			for_configuration_details : activeCollapse ? true : undefined,
			audit_data_required       : true,
			filters                   : {
				expertise_type       : activeCollapse || undefined,
				event_scoring_status : 'draft',
			},
		},
	}, { manual: false });

	useEffect(() => {
		refetch();
	}, [responseId, refetch]);

	return {
		data,
		loading,
		refetch,
	};
};

export default useGetExpertiseParameters;
