import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
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
		await trigger({
			params: {
				id: 'cba50126-efbc-4caa-8383-b616dec9d44b',
			},
		});
	};
	useEffect(() => {
		fetchUser();
	}, [activeMessageCard]);

	return {
		loading,
		userData: data?.data,
	};
};
export default useGetUser;
