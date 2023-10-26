import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetIndividualUserActivity = () => {
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/get_individual_user_activity',
	}, { manual: true });

	const getIndividualUserActivity = useCallback(
		(id) => {
			console.log(id, 'id');
			trigger({
				params: {
					employee_user_id: id,
				},
			});
		},
		[trigger],
	);

	useEffect(() => {
		try {
			getIndividualUserActivity();
		} catch (error) {
			console.log('err', error);
		}
	}, [getIndividualUserActivity]);

	return { loading, data, getIndividualUserActivity };
};

export default useGetIndividualUserActivity;
