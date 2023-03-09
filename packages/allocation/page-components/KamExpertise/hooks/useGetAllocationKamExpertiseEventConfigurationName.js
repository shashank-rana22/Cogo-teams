import { useAllocationRequest } from '@cogoport/request';

function useGetAllocationKamExpertiseEventConfigurationName() {
	const [{ data: event_configuration_list = [] }] = useAllocationRequest({
		url     : '/kam_expertise_event_configuration_name',
		method  : 'GET',
		authkey : 'get_allocation_kam_expertise_event_configuration_name',
	});

	return {
		event_configuration_list,
	};
}

export default useGetAllocationKamExpertiseEventConfigurationName;
