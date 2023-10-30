function dataFormatter(list) {
	let resultList = {};

	list?.forEach((item) => {
		const { created_at, new_message_count, ...rest } = item.data() || {};
		const userData = {
			id         : item?.id,
			created_at : created_at || Date.now(),
			new_message_count,
			...rest,
		};

		resultList = { ...resultList, [item?.id]: userData };
	});

	return resultList;
}

function pinnedChatsFormatter(list) {
	let resultList = [];
	list?.forEach((item) => {
		resultList = [...resultList, {
			id: item?.id,
			...(item.data() || {}),
		}];
	});

	return resultList;
}

function messagesFormatter(query) {
	let newMessagesHash = {};

	query.forEach((eachMessage) => {
		const timeStamp = eachMessage?.data()?.created_at;

		newMessagesHash = {
			...newMessagesHash,
			[timeStamp]: {
				...(eachMessage.data() || {}),
				id: eachMessage.id,
			},
		};
	});

	return newMessagesHash;
}

export { dataFormatter, pinnedChatsFormatter, messagesFormatter };
