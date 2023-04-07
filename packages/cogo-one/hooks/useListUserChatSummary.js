import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

const useListUserChatSummary = ({
	id = '',
	activeSubTab = '',
	user_id = '',
	lead_user_id = '',
	mobile_no,
	sender,
}) => {
	const [firstLoading, setFirstLoading] = useState(false);
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_user_chat_summary',
		method : 'get',
	}, { manual: true, autoCancel: false });

	const getUserChatSummary = useCallback(async () => {
		try {
			const payload = {
				mobile_number : mobile_no,
				platform_type : 'whatsapp',
				user_id,
				lead_user_id,
				user_token    : sender,
			};
			await trigger({
				params: payload,
			});
		} catch (error) {
			// console.log(error);
		}
	}, [lead_user_id, mobile_no, sender, trigger, user_id]);

	useEffect(() => {
		if (activeSubTab === 'summary' && (user_id || lead_user_id || id)) {
			getUserChatSummary();
		}
	}, [activeSubTab, getUserChatSummary, lead_user_id, user_id, id]);

	return {
		chatData                : data || {},
		getUserChatSummary,
		timeLineLoading         : loading,
		firstTimeLineLoading    : firstLoading,
		setFirstTimeLineLoading : setFirstLoading,
	};
};

export default useListUserChatSummary;
