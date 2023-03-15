import { useRequest } from '@cogoport/request';

const useListCogooneTimeline = ({
	id = '',
	setMessagesState = () => {},
}) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_cogoone_timeline',
		method : 'get',
	}, { manual: true, autoCancel: false });

	const getCogooneTimeline = async ({
		endDate,
		startDate,
		currentMessages = {},
		lastDocumentTimeStamp,
		islastPage,
	}) => {
		try {
			const res = await trigger({
				params: {
					page_limit               : 100,
					pagination_data_required : false,
					filters                  : {
						channel_chat_id         : id,
						created_at_less_than    : new Date(Number(endDate)),
						created_at_greater_than : new Date(Number(startDate)),
					},
				},
			});
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
		} catch (error) {
			// console.log(error);
		}
	};

	return {
		data,
		getCogooneTimeline,
		loading,
	};
};

export default useListCogooneTimeline;
