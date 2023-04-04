const sortChats = (listData, userId) => {
	const { messagesListData = {}, pinnedMessagesData = {} } = listData || {};

	const pinnedChatKeys = Object.keys(pinnedMessagesData) || [];
	const sortedPinnedChatList = pinnedChatKeys.sort((a, b) => {
		const {
			pinnedTime:{ [userId]:prevChatPinTime = 0 } = {},
		} = pinnedMessagesData[a];
		const {
			pinnedTime:{ [userId]:presentChatPinTime = 0 } = {},

		} = pinnedMessagesData[b];
		return Number(
			presentChatPinTime,
		) - Number(
			prevChatPinTime,
		);
	}).map((eachKey) => pinnedMessagesData[eachKey]);

	const sortedUnpinnedList = [];

	Object.keys(messagesListData).sort((a, b) => Number(
		messagesListData[b]?.new_message_sent_at,
	) - Number(
		messagesListData[a]?.new_message_sent_at,
	)).forEach((eachKey) => {
		if (!pinnedChatKeys.includes(eachKey)) {
			sortedUnpinnedList.push(messagesListData[eachKey]);
		}
	});

	return { sortedPinnedChatList, sortedUnpinnedList };
};
export default sortChats;
