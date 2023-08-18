import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useCallback } from 'react';

const useListLocations = ({ region_id, type, setActiveList = () => {}, id }) => {
	const [{ data, loading }, trigger] = useRequest({
		url    : 'list_locations',
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
		if (type && region_id) {
			getData({
				filters    : { type, region_id, id },
				includes   : { id: true, name: true, type: true, loc: true },
				page_limit : 250,
			});
		}
	}, [getData, type, region_id, id]);

	useEffect(() => {
		if (!isEmpty(data)) {
			setActiveList(data?.list);
		}
	}, [data, setActiveList]);

	return { data: data?.list, loading };
};
export default useListLocations;
