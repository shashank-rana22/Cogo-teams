import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const getParams = ({ id = '', endDate = '', startDate = '' }) => ({
	page_limit               : 100,
	pagination_data_required : false,
	filters                  : {
		channel_chat_id         : id,
		created_at_less_than    : new Date(Number(endDate)),
		created_at_greater_than : new Date(Number(startDate)),
	},
});

const formatResponse = ({ res = {}, setMessagesState = () => {} }) => {
	const formattedResponse = res?.data?.list?.reduce((acc, item) => {
		if (!item?.created_at_epoch) {
			return acc;
		}

		return {
			...acc,
			[item.created_at_epoch]: item,
		};
	}, {});

	setMessagesState((prev) => (
		{
			...prev,
			messagesData: { ...prev?.messagesData, ...(formattedResponse || {}) },
		}));
};

const useMessagesTimeline = ({ setMessagesState = () => {}, id = '' }) => {
	const [, trigger] = useRequest({
		url    : '/list_cogoone_timelines',
		method : 'get',
	}, { manual: true, autoCancel: false });

	const addMessageTimeline = useCallback(async ({
		endDate = '',
		startDate = '',
	}) => {
		try {
			const res = await trigger({
				params: getParams({ id, endDate, startDate }),
			});
			formatResponse({ res, setMessagesState });
		} catch (error) {
			console.error(error);
		}
	}, [setMessagesState, trigger, id]);

	return {
		addMessageTimeline,
	};
};

export default useMessagesTimeline;
