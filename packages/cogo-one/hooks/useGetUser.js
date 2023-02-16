import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
// import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

const useGetUser = ({ activeMessageCard }) => {
	// const { user_id } = activeMessageCard || {};
	// const { userId } = useSelector(({ profile }) => ({ userId: profile?.user?.id }));
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_user',
		method : 'get',
	}, { manual: true });

	const fetchUser = async () => {
		try {
			await trigger({
				params: {
					id: 'cba50126-efbc-4caa-8383-b616dec9d44b',
				},
			});
		} catch (error) {
			Toast.error(getApiErrorString(error?.data));
		}
	};
	useEffect(() => {
		if (isEmpty(activeMessageCard)) { fetchUser(); }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isEmpty(activeMessageCard)]);

	return {
		loading,
		userData: data?.data,
	};
};
export default useGetUser;
