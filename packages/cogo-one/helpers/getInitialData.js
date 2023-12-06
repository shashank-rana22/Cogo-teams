const CHANNEL_TYPE_MAPPING = {
	email         : 'firebase_emails',
	internal_chat : 'teams',
	default       : 'teams',
};

function getInitialData({ assigned_chat = '', channel_type = '' }) {
	const activeTab = CHANNEL_TYPE_MAPPING[channel_type] || CHANNEL_TYPE_MAPPING.default;

	const data = channel_type === 'internal_chat' ? {
		group_id: assigned_chat,

	} : {
		id: assigned_chat,
		channel_type,
	};

	const initialData = {
		tab               : activeTab,
		subTab            : 'all',
		hasNoFireBaseRoom : false,
		expandSideBar     : false,
		data              : assigned_chat ? data : {},
	};

	return initialData;
}

export { getInitialData };
