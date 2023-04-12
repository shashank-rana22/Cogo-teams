import { useAthenaRequest } from '@cogoport/request';

function useGetCoordinates() {
	const [{ data: responseData = {} }] = useAthenaRequest({
		url    : '/world_countries',
		method : 'get',
	}, { manual: false });

	return { responseData };
}

export default useGetCoordinates;
