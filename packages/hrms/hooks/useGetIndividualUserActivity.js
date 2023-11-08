import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetIndividualUserActivity = (selectedUser) => {
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/get_individual_user_activity',
	}, { manual: true });

	const getIndividualUserActivity = useCallback(
		(id) => {
			if (id || selectedUser) {
				trigger({
					params: {
						employee_user_id: id || selectedUser,
					},
				});
			}
		},
		[trigger, selectedUser],
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
