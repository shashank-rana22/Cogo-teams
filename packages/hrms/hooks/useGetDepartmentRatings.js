import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetDepartmentRatings = () => {
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/get_squad_wise_rating',
	}, { manual: true });

	const getDepartmentRatings = useCallback(
		() => {
			try {
				trigger({
					params: {
						department_wise : true,
						squad_wise      : true,
					},
				});
			} catch (error) {
				console.log('err', error);
			}
		},
		[trigger],
	);

	useEffect(() => {
		try {
			getDepartmentRatings();
		} catch (error) {
			console.log('err', error);
		}
	}, [getDepartmentRatings]);

	return { loading, data };
};

export default useGetDepartmentRatings;
