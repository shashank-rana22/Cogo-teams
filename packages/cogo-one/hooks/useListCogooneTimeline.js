import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

const useListCogooneTimeline = ({
	id = '',
	setMessagesState = () => {},
	activeSubTab = '',
	user_id = '',
	lead_user_id = '',
	type = '',
}) => {
	const [page, setPage] = useState(1);
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_cogoone_timeline',
		method : 'get',
	}, { manual: true, autoCancel: false });

	const getCogooneTimeline = async ({
		endDate = '',
		startDate = '',
		currentMessages = {},
		lastDocumentTimeStamp = '',
		islastPage = '',
	}) => {
		try {
			let payload = {};
			if (type === 'messages') {
				payload = {
					page_limit               : 100,
					pagination_data_required : false,
					filters                  : {
						channel_chat_id         : id,
						created_at_less_than    : new Date(Number(endDate)),
						created_at_greater_than : new Date(Number(startDate)),
					},
				};
			} else {
				payload = {
					filters: {
						channel_chat_id: id,
					},
					page,
				};
			}
			const res = await trigger({
				params: payload,
			});
			if (type === 'messages') {
				let formatTimeLineData = { ...currentMessages };
				(res.data.list || []).forEach((itm) => {
					formatTimeLineData = { ...formatTimeLineData, [itm.created_at_epoch]: itm };
				});

				const sortedMessages = {};
				Object.keys(formatTimeLineData)
					.sort()
					.forEach((key) => {
						sortedMessages[key] = formatTimeLineData[key];
					});

				setMessagesState((prev) => ({
					...prev,
					[id]: {
						...(prev?.[id] || {}),
						messagesData: { ...sortedMessages, ...prev?.[id]?.messagesData },
						lastDocumentTimeStamp,
						islastPage,
					},
				}));
			}
		} catch (error) {
			// console.log(error);
		}
	};

	useEffect(() => {
		if (activeSubTab === 'agent' && (user_id || lead_user_id)) {
			getCogooneTimeline({});
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeSubTab, page]);

	return {
		data,
		getCogooneTimeline,
		loading,
		page,
		setPage,
	};
};

export default useListCogooneTimeline;
