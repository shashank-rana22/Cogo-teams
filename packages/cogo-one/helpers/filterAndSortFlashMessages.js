const FALLBACK_TIMESTAMP = 0;

const HAS_ALL_CLAIM_CHATS_ACESS = ['cogoone_admin'];

const filterAndSortFlashMessages = ({ flashMessagesData, viewType = '' }) => Object.keys(flashMessagesData || {})
	.filter(
		(keys) => (HAS_ALL_CLAIM_CHATS_ACESS.includes(viewType)
	|| flashMessagesData[keys]?.claim_chat_agent_type === viewType),
	)
	.sort((a, b) => Number(b.updated_at || FALLBACK_TIMESTAMP) - Number(a.updated_at || FALLBACK_TIMESTAMP))
	.map((sortedkeys) => flashMessagesData[sortedkeys]);

export default filterAndSortFlashMessages;
