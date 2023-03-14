import { useAllocationRequest } from '@cogoport/request';
// import { useState } from 'react';

const useGetKamExpertiseScore = () => {
	// const [params, setParams] = useState({
	// 	pagination_data_required  : false,
	// 	for_configuration_stats   : true,
	// 	for_configuration_details : activeCollapse ? true : undefined,
	// 	audit_data_required       : true,
	// 	filter                    : {
	// 		expertise_type: activeCollapse || undefined,
	// 	},
	// });

	const [{ loading, data }, refetch] = useAllocationRequest({
		url     : '/kam_expertise_event_configuration',
		method  : 'GET',
		authkey : 'get_allocation_kam_expertise_event_configuration',
		params  : {
			pagination_data_required : false,
			for_configuration_stats  : true,
			audit_data_required      : true,
		},
	}, { manual: false });

	return {
		data,
		loading,
		refetch,
	};
};

export default useGetKamExpertiseScore;
