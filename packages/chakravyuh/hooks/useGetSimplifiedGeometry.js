import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useCallback } from 'react';

const COUNTRY_ZOOM = 5;
const REGION_ZOOM = 20;

const useGetSimplifiedGeometry = ({
	country_id = null,
	continent_id = null, type = null,
	setActiveList = () => {},
}) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : 'get_simplified_geometry',
		method : 'GET',
	}, { manual: true });

	const getData = useCallback(async (zoom) => {
		try {
			trigger({
				params: {
					zoom,
					filters: {
						continent_id : continent_id || undefined,
						country_id   : country_id || undefined,
						type,
					},
				},
			});
		} catch (e) {
			// console.error(e);
		}
	}, [trigger, country_id, continent_id, type]);

	useEffect(() => {
		if (type) {
			getData(type === 'country' ? COUNTRY_ZOOM : REGION_ZOOM);
		}
	}, [getData, type]);

	useEffect(() => {
		if (!isEmpty(data)) {
			setActiveList(data?.list);
		}
	}, [data, setActiveList]);

	return { data: data?.list, loading };
};

export default useGetSimplifiedGeometry;
