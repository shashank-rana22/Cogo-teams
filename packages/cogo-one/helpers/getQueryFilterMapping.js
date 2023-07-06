import { orderBy, where } from 'firebase/firestore';

function getQueryFilterMapping({
	filterId,
	isBotSession,
	epochTimestamp,
	appliedFilters,
}) {
	return {
		channels:
			[where('channel_type', 'in', appliedFilters?.channels)],
		escalation:
			[where('chat_status', '==', appliedFilters?.escalation)],
		chat_tags:
			[where('chat_tags', 'array-contains', appliedFilters?.chat_tags)],
		mobile_no:
			[where('mobile_no', '==', appliedFilters?.mobile_no)],
		assigned_to:
			isBotSession
				? [where('spectators_ids', 'array-contains', filterId)]
				: [where('support_agent_id', '==', filterId)],
		status:
			appliedFilters?.status === 'unread'
				? [where('has_admin_unread_messages', '==', true)]
				: [],
		shipment_filters:
			appliedFilters?.shipment_filters?.includes('likely_to_book_shipment')
				? [where('is_likely_to_book_shipment', '==', true)]
				: [],
		'15_min_filter':
			appliedFilters?.['15_min_filter']?.includes('seen_by_user')
				? [
					where('last_message_document.conversation_type', '==', 'received'),
					where('last_message_document.message_type', '==', 'text'),
					where('last_message_document.created_at', '<=', epochTimestamp),
					orderBy('last_message_document.created_at', 'desc'),
				] : [],
	};
}

export default getQueryFilterMapping;
