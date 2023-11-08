import { useRequest } from '@cogoport/request';

const URL = 'get_service_discovery_configuration';

const useGetActiveServices = () => {
	const [{ loading, data }] = useRequest({
		method : 'GET',
		url    : URL,
	}, { manual: false });

	return { data, loading };
};

export default useGetActiveServices;
