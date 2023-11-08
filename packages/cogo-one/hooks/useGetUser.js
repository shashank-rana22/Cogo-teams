import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const getParams = ({ userId, leadUserId }) => ({
	id: userId || leadUserId,
});

const useGetUser = ({
	leadUserId = '',
	userId = '',
	customerId = '',
}) => {
	const apiName =	 userId ? '/get_user' : '/get_lead_user';

	const [{ loading, data }, trigger] = useRequest({
		url    : apiName,
		method : 'get',
	}, { manual: true, autoCancel: false });

	const fetchUser = useCallback(
		async () => {
			try {
				if (!userId && !leadUserId) {
					return;
				}

				await trigger({
					params: getParams({ leadUserId, userId }),
				});
			} catch (error) {
				console.error(error);
			}
		},
		[leadUserId, trigger, userId],
	);

	useEffect(() => {
		fetchUser();
	}, [fetchUser, customerId]);

	return {
		loading,
		userData: loading || !customerId ? {} : data?.data,
	};
};

export default useGetUser;
