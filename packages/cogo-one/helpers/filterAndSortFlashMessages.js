const FALLBACK_TIMESTAMP = 0;

const filterAndSortFlashMessages = ({ flashMessagesData }) => Object.keys(flashMessagesData || {})
	.sort((a, b) => Number(b.updated_at || FALLBACK_TIMESTAMP) - Number(a.updated_at || FALLBACK_TIMESTAMP))
	.map((sortedkeys) => flashMessagesData[sortedkeys]);

export default filterAndSortFlashMessages;
