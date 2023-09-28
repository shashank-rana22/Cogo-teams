const getStatus = (is_clicked = false, is_seen = false) => {
	if (is_clicked) {
		return 'Read';
	}
	if (is_seen) {
		return 'Seen';
	}
	return 'Unread';
};

export default getStatus;
