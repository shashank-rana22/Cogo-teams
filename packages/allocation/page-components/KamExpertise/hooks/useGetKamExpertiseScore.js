import { useAllocationRequest } from '@cogoport/request';
import { useState } from 'react';

const useGetKamExpertiseScore = () => {
	const [params, setParams] = useState({
		pagination_data_required : false,
		for_configuration_stats  : true,
		// for_configuration_details : true,
		audit_data_required      : true,
	});

	const [{ loading, data }] = useAllocationRequest({
		url     : '/kam_expertise_event_configuration',
		method  : 'GET',
		authkey : 'get_allocation_kam_expertise_event_configuration',
		params,
	}, { manual: false });

	return {
		data,
		loading,
	};
};

export default useGetKamExpertiseScore;
