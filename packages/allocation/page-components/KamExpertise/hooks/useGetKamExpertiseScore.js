import { useAllocationRequest } from '@cogoport/request';
// import { useState } from 'react';

const useGetKamExpertiseScore = ({ selectedVersion }) => {
	const [{ loading, data }, refetch] = useAllocationRequest({
		url     : '/kam_expertise_event_configuration',
		method  : 'GET',
		authkey : 'get_allocation_kam_expertise_event_configuration',
		params  : {
			pagination_data_required : false,
			for_configuration_stats  : true,
			audit_data_required      : true,
			// version_filter: selectedVersion,
		},
	}, { manual: false });

	return {
		data,
		loading,
		refetch,
	};
};

export default useGetKamExpertiseScore;
