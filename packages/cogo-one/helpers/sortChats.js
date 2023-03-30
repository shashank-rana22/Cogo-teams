const sortChats = (mergedChatsData, userId) => {
	const sortedChatsList = Object.keys(mergedChatsData || {})
		.sort((a, b) => {
			const {
				pinnedTime:{ [userId]:prevChatPinTime = 0 } = {},
				new_message_sent_at:prevChatNewMessageSentAt,
			} = mergedChatsData[a];

			const {
				pinnedTime:{ [userId]:presentChatPinTime = 0 } = {},
				new_message_sent_at:presentChatNewMessageSentAt,
			} = mergedChatsData[b];

			if (prevChatPinTime > 0 || presentChatPinTime > 0) {
				return Number(
					presentChatPinTime,
				) - Number(
					prevChatPinTime,
				);
			}
			return Number(
				presentChatNewMessageSentAt,
			) - Number(
				prevChatNewMessageSentAt,
			);
		})
		.map((eachkey) => mergedChatsData[eachkey]) || [];

	return sortedChatsList;
};
export default sortChats;
