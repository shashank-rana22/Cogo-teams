function getShowChat({
	item = {},
	appliedFilters = {},
	searchValue = '',
}) {
	const { new_message_count = 0, user_name = '' } = item;
	const searchName = user_name?.toLowerCase();

	const { status = 'all' } = appliedFilters;

	if (status === 'unread' && Number(new_message_count) === 0) {
		return false;
	}
	return searchName.includes(searchValue);
}

export default getShowChat;
