const getEmailType = (item) => {
	const { is_reply_to, is_return_path, is_sender } = item || {};

	const TYPES = {
		'Reply to email' : is_reply_to,
		'Return path'    : is_return_path,
		'Sender email'   : is_sender,
	};

	return Object.keys(TYPES).filter((key) => TYPES[key]);
};

export default getEmailType;
