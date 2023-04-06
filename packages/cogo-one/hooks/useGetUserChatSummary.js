import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

const useGetUserChatSummary = ({
	id = '',
	// setMessagesState = EmptyFunction,
	activeSubTab = '',
	user_id = '',
	lead_user_id = '',
	type = '',
	mobile_no,
}) => {
	const [firstLoading, setFirstLoading] = useState(false);
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_user_chat_summary',
		method : 'get',
	}, { manual: true, autoCancel: false });

	const getCogooneTimeline = useCallback(async () => {
		let res = {};
		try {
			let payload = {};
			if (type === 'messages') {
				payload = {
					// page_limit               : 100,
					// pagination_data_required : false,
					// filters                  : {
					// 	channel_chat_id         : id,
					// 	created_at_less_than    : new Date(Number(endDate)),
					// 	created_at_greater_than : new Date(Number(startDate)),
					// },
					mobile_no,
					platform_chat: 'whatsapp',
				};
			} else {
				payload = {
					// filters: {
					// 	channel_chat_id: id,
					// },
					// pagination,
					mobile_no,
					platform_chat: 'whatsapp',
				};
			}
			res = await trigger({
				params: payload,
			});
			console.log(res.data);
		} catch (error) {
			// console.log(error);
		} finally {
			// console.log(res.data);
			// if (type === 'messages') {
			// 	let formatTimeLineData = { ...prevMessageData };
			// 	(res?.data?.list || []).forEach((itm) => {
			// 		if (!isEmpty(itm) && (itm?.created_at_epoch)) {
			// 			formatTimeLineData = {
			// 				...formatTimeLineData,
			// 				[itm.created_at_epoch]: itm,
			// 			};
			// 		}
			// 	});

			// 	const sortedMessages = {};
			// 	Object.keys(formatTimeLineData).map((x) => Number(x))
			// 		.sort().forEach((key) => {
			// 			sortedMessages[key] = formatTimeLineData[key];
			// 		});

			// 	setMessagesState((prev) => ({
			// 		...prev,
			// 		[id]: {
			// 			...(prev?.[id] || {}),
			// 			messagesData: { ...prev?.[id]?.messagesData, ...sortedMessages },
			// 			lastDocumentTimeStamp,
			// 			islastPage,
			// 		},
			// 	}));
			// 	setFirstLoading(false);
			// }
		}
	}, [mobile_no, trigger, type]);

	useEffect(() => {
		getCogooneTimeline({});
		if (activeSubTab === 'summary' && (user_id || lead_user_id || id)) {
			// console.log('first');
		}
	}, [activeSubTab, getCogooneTimeline, lead_user_id, user_id, id]);

	return {
		chatData                : data || {},
		getCogooneTimeline,
		timeLineLoading         : loading,
		firstTimeLineLoading    : firstLoading,
		setFirstTimeLineLoading : setFirstLoading,
	};
};

export default useGetUserChatSummary;
