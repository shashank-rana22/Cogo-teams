import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetGeometry = ({ type, country_id }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : 'location/list_locations',
		method : 'GET',
	}, { manual: true });

	const getData = useCallback(
		async (params) => {
			try {
				await trigger({ params });
			} catch (err) {
				// console.error(err);
			}
		},
		[trigger],
	);

	useEffect(() => {
		if (type && country_id) {
			getData({
				filters    : { type, country_id },
				includes   : { id: true, name: true, geometry: true },
				page_limit : 250,
			});
		}
	}, [getData, type, country_id]);

	return { data: data?.list, loading };
};
export default useGetGeometry;
