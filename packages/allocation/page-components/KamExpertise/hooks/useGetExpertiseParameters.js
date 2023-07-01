import { useAllocationRequest } from '@cogoport/request';

const useGetExpertiseParameters = (activeCollapse = '') => {
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
				expertise_type       : activeCollapse || '',
				event_scoring_status : 'draft',
			},

		},
	}, { manual: false });

	return {
		listExpertiseParams : data,
		expertiseLoading    : loading,
		expertiseRefetch    : refetch,
	};
};

export default useGetExpertiseParameters;
