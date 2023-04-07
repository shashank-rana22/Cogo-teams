import { useRequest } from '@cogoport/request';
import { format } from '@cogoport/utils';
import { useEffect, useCallback, useState } from 'react';

const useListUserChatSummary = ({
	id = '',
	activeSubTab = '',
	user_id = '',
	lead_user_id = '',
	mobile_no = '',
	sender = '',
	pagination = 0,
	channel_type = '',
}) => {
	const [dateFilters, setDateFilters] = useState(null);
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_user_chat_summary',
		method : 'get',
	}, { manual: true });

	const getUserChatSummary = useCallback(async () => {
		try {
			const payload = {
				filters: {
					platform_type             : channel_type,
					mobile_number             : mobile_no,
					user_id                   : user_id || undefined,
					lead_user_id              : lead_user_id || undefined,
					user_token                : sender || undefined,
					summary_date_greater_than : dateFilters?.startDate
						? format(dateFilters?.startDate, 'dd MMM yyyy') : undefined,
					summary_date_less_than: dateFilters?.endDate
						? format(dateFilters?.endDate, 'dd MMM yyyy') : undefined,
				},
				page       : pagination,
				page_limit : 10,
			};
			await trigger({
				params: payload,
			});
		} catch (error) {
			// console.log(error);
		}
	}, [channel_type,
		mobile_no, user_id,
		lead_user_id,
		sender,
		dateFilters?.startDate,
		dateFilters?.endDate, pagination, trigger]);

	useEffect(() => {
		if (activeSubTab === 'summary') {
			getUserChatSummary();
		}
	}, [activeSubTab, getUserChatSummary, lead_user_id, user_id, id]);

	return {
		chatData           : data || {},
		getUserChatSummary,
		chatSummaryLoading : loading,
		dateFilters,
		setDateFilters,
	};
};

export default useListUserChatSummary;
