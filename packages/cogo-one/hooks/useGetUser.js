// import { Toast } from '@cogoport/components';
// import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
// import { isEmpty } from '@cogoport/utils';
// import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

const useGetUser = ({ activeMessageCard, activeTab, activeVoiceCard }) => {
	const { user_id } = activeVoiceCard || {};
	const { user_id: MessageUserId } = activeMessageCard || {};
	// const { userId } = useSelector(({ profile }) => ({ userId: profile?.user?.id }));
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_user',
		method : 'get',
	}, { manual: true });

	const fetchUser = async () => {
		let id;
		if (activeTab === 'voice') {
			id = user_id;
		} else {
			id = MessageUserId;
		}
		await trigger({
			params: {
				id,
			},
		});
	};
	useEffect(() => {
		fetchUser();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeMessageCard, activeVoiceCard]);

	return {
		loading,
		userData: data?.data,
	};
};
export default useGetUser;
