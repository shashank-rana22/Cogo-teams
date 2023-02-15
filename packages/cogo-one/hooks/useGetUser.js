import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

const useGetUser = () => {
	const { userId } = useSelector(({ profile }) => ({ userId: profile?.user?.id }));
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_user',
		method : 'get',
	}, { manual: true });

	const fetchUser = async () => {
		try {
			await trigger({
				params: {
					id: userId,
				},
			});
		} catch (error) {
			Toast.error('Something went wrong');
		}
	};
	useEffect(() => {
		fetchUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		loading,
		listData: data?.data,
	};
};
export default useGetUser;
