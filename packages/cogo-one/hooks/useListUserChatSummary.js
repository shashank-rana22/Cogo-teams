import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

const useListUserChatSummary = ({
	activeSubTab = '',
	user_id = '',
	lead_user_id = '',
	mobile_no = '',
	sender = '',
	pagination = 1,
	channel_type = '',
	activeSelect = '',
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
						? formatDate({
							date       : dateFilters?.startDate,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType : 'date',
						}) : undefined,
					summary_date_less_than: dateFilters?.endDate
						? formatDate({
							date       : dateFilters?.endDate,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType : 'date',
						}) : undefined,
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
		mobile_no,
		user_id,
		lead_user_id,
		sender,
		dateFilters,
		pagination,
		trigger,
	]);

	useEffect(() => {
		if (activeSubTab === 'summary' || activeSelect === 'profile') {
			getUserChatSummary();
		}
	}, [activeSubTab, getUserChatSummary, activeSelect]);

	return {
		chatData           : data || {},
		getUserChatSummary,
		chatSummaryLoading : loading,
		dateFilters,
		setDateFilters,
	};
};

export default useListUserChatSummary;
