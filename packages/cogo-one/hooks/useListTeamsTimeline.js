import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useCallback, useEffect } from 'react';

const BUFFER_DURATION = 600000;

const BUFFER_IN_API_CALL = 5000;

const getPayload = ({ endDate = Date.now(), startDate = Date.now(), groupId = '' }) => ({
	page_limit               : 100,
	pagination_data_required : false,
	filters                  : {
		channel_chat_id         : groupId,
		channel                 : 'internal_chat',
		created_at_less_than    : new Date(Number(endDate)),
		created_at_greater_than : new Date(Number(startDate)),
	},
});

const dataFormatter = ({ res = {}, setMessagesState = () => {}, groupId = '' }) => {
	const timeline = res?.data?.list || [];

	if (isEmpty(timeline)) {
		return;
	}

	const formattedTimeline = timeline?.reduce((acc, item) => ({
		...acc,
		[item.created_at_epoch]: { ...item, type: 'timeline' },
	}), {});

	setMessagesState((prev) => ({
		...prev,
		[groupId]: {
			...(prev?.[groupId] || {}),
			messagesData: { ...prev?.[groupId]?.messagesData, ...(formattedTimeline || {}) },
		},
	}));
};

const useListTeamsTimeline = ({
	setMessagesState = () => {},
	lastGroupUpdatedAt = 0,
	roomId = '',
	scrollToLastMessage = () => {},
}) => {
	const [, trigger] = useRequest({
		url    : '/list_cogoone_timelines',
		method : 'get',
	}, { manual: true, autoCancel: false });

	const getCogooneTimeline = useCallback(async ({
		endDate = '',
		startDate = '',
		groupId = '',
		callBackFuc = () => {},
	}) => {
		try {
			const res = await trigger({
				params: getPayload({ endDate, startDate, groupId }),
			});
			dataFormatter({ res, setMessagesState, groupId });
			callBackFuc();
		} catch (error) {
			console.error(error);
		}
	}, [setMessagesState, trigger]);

	useEffect(() => {
		let timeoutId;
		if (roomId && lastGroupUpdatedAt) {
			setTimeout(() => {
				timeoutId = getCogooneTimeline({
					endDate     : Date.now() + BUFFER_DURATION,
					startDate   : Date.now() - BUFFER_DURATION,
					groupId     : roomId,
					callBackFuc : scrollToLastMessage,
				});
			}, BUFFER_IN_API_CALL);
		}
		return () => {
			clearTimeout(timeoutId);
		};
	}, [lastGroupUpdatedAt, roomId, getCogooneTimeline, scrollToLastMessage]);

	return {
		getCogooneTimeline,
	};
};

export default useListTeamsTimeline;
