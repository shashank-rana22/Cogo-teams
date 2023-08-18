import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';

const useListNearestLocations = ({
	setLocationFilters,
	setHierarchy, activeId, setActiveList,
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : 'list_nearest_available_location',
		method : 'GET',
	});

	const getNearestLocations = async (params) => {
		try {
			const res = await trigger({ params });
			const data = res?.data?.list?.[GLOBAL_CONSTANTS.zeroth_index];
			if (data && (data?.country_id || data?.id) !== activeId) {
				setActiveList([]);
				setHierarchy({ country_id: data?.country_id || data?.id });
				setLocationFilters((prev) => ({
					...prev,
					destination: {
						id   : data.id,
						type : 'country',
					},
				}));
			}
		} catch (err) {
			// console.log(err);
		}
	};

	return { loading, getNearestLocations };
};

export default useListNearestLocations;
