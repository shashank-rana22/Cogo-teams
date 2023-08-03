import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useCallback, useState } from 'react';

const EmptyFunction = () => {};

const useListCogooneTimeline = ({
	id = '',
	setMessagesState = EmptyFunction,
	activeSubTab = '',
	user_id = '',
	lead_user_id = '',
	type = '',
	pagination,
}) => {
	const [firstLoading, setFirstLoading] = useState(false);
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_cogoone_timelines',
		method : 'get',
	}, { manual: true, autoCancel: false });

	const getCogooneTimeline = useCallback(async ({
		endDate = '',
		startDate = '',
		prevMessageData = {},
		lastDocumentTimeStamp = '',
		islastPage = '',
	}) => {
		let res = {};
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
					page: pagination,
				};
			}
			res = await trigger({
				params: payload,
			});
		} catch (error) {
			// console.log(error);
		} finally {
			if (type === 'messages') {
				let formatTimeLineData = { ...prevMessageData };
				(res?.data?.list || []).forEach((itm) => {
					if (!isEmpty(itm) && (itm?.created_at_epoch)) {
						formatTimeLineData = {
							...formatTimeLineData,
							[itm.created_at_epoch]: itm,
						};
					}
				});

				const sortedMessages = {};
				Object.keys(formatTimeLineData).map((x) => Number(x))
					.sort().forEach((key) => {
						sortedMessages[key] = formatTimeLineData[key];
					});

				setMessagesState((prev) => ({
					...prev,
					[id]: {
						...(prev?.[id] || {}),
						messagesData: { ...prev?.[id]?.messagesData, ...sortedMessages },
						lastDocumentTimeStamp,
						islastPage,
					},
				}));
				setFirstLoading(false);
			}
		}
	}, [id, pagination, setMessagesState, trigger, type]);

	useEffect(() => {
		if (activeSubTab === 'agent' && (user_id || lead_user_id || id)) {
			getCogooneTimeline({});
		}
	}, [activeSubTab, getCogooneTimeline, lead_user_id, user_id, id]);

	return {
		timeLineData            : data || {},
		getCogooneTimeline,
		timeLineLoading         : loading,
		firstTimeLineLoading    : firstLoading,
		setFirstTimeLineLoading : setFirstLoading,
	};
};

export default useListCogooneTimeline;
