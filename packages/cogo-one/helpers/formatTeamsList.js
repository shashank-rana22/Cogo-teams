function dataFormatter(list) {
	let resultList = {};

	list?.forEach((item) => {
		const { created_at, updated_at, new_message_count, ...rest } = item.data() || {};
		const userData = {
			id         : item?.id,
			created_at : item.data().created_at || Date.now(),
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

export { dataFormatter, pinnedChatsFormatter };
