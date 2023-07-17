import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetWorldData = () => {
	const [{ loading, data }, trigger] = useRequest({
		url    : 'get_simplified_country_geometry',
		method : 'GET',
	}, { manual: true });

	const getData = useCallback(async () => {
		try {
			trigger({
				params: {
					zoom: 5,
				},
			});
		} catch (e) {
			// console.error(e);
		}
	}, [trigger]);

	useEffect(() => {
		getData();
	}, [getData]);
	return { data: data?.list, loading };
};

export default useGetWorldData;
