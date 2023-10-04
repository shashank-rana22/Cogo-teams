import { isEmpty } from '@cogoport/utils';
import { orderBy } from 'firebase/firestore';

import { VIEW_TYPE_GLOBAL_MAPPING } from '../constants/viewTypeMapping';

import getQueryFilterMapping from './getQueryFilterMapping';

const BULK_ASSIGN_SEEN_MINUTES = 15;

const TAB_WISE_QUERY_KEY_MAPPING = {
	all           : 'all_chats_base_query',
	observer      : 'observer_chats_base_query',
	groups        : 'group_chats_query',
	teams         : 'teams_chats_base_query',
	contacts      : 'contacts_base_query',
	kamContacts   : 'kam_contacts_base_query',
	hidden_filter : 'hidden_filter_base_query',
};

const getModifiedFilters = ({
	appliedFilters = {},
	listOnlyMails = false,
	activeFolder = '',
	sidFilters = '',
}) => {
	const requiredChannels = listOnlyMails
		? ['email']
		: ['platform_chat', 'telegram', 'whatsapp', 'zalo'];

	return {
		...(appliedFilters || {}),
		...(
			(activeFolder && (activeFolder !== 'all_mails'))
				? { activeFolder: `show_in_${activeFolder}` } : {}
		),
		channels           : isEmpty(appliedFilters?.channels) ? requiredChannels : appliedFilters?.channels,
		shipment_serial_id : !isEmpty(appliedFilters?.shipment_serial_id)
			? appliedFilters?.shipment_serial_id : sidFilters || undefined,
	};
};

function getFireStoreQuery({
	userId = '',
	appliedFilters = {},
	isBotSession = false,
	viewType = '',
	activeSubTab = '',
	listOnlyMails = false,
	activeFolder = '',
	sidFilters = '',
	mailsToBeShown = [],
}) {
	const filterId = appliedFilters.assigned_to === 'me'
		? userId
		: appliedFilters?.assigned_agent;

	const currentTime = new Date();
	currentTime.setMinutes(currentTime.getMinutes() - BULK_ASSIGN_SEEN_MINUTES);
	const epochTimestamp = currentTime.getTime();

	const modifiedFilters = getModifiedFilters({ appliedFilters, listOnlyMails, activeFolder, sidFilters });

	const queryFilterMapping = getQueryFilterMapping({
		appliedFilters: modifiedFilters,
		isBotSession,
		epochTimestamp,
		filterId,
	});

	const queryFilters = Object.keys(modifiedFilters).reduce(
		(accumulator, currentValue) => [
			...accumulator,
			...(queryFilterMapping?.[currentValue] || []),
		],
		[],
	);

	const tabWiseQuery = (
		VIEW_TYPE_GLOBAL_MAPPING[viewType]?.[TAB_WISE_QUERY_KEY_MAPPING[activeSubTab]]?.({
			userSharedEmails : mailsToBeShown,
			agentId          : userId,
		}) || []
	);

	const sessionTypeQuery = (
		VIEW_TYPE_GLOBAL_MAPPING[viewType]?.session_type_query?.({
			sessionType: isBotSession ? 'bot' : 'admin',
			activeSubTab,
		}) || []
	);

	return [
		...tabWiseQuery,
		...sessionTypeQuery,
		...queryFilters,
		orderBy('new_message_sent_at', 'desc'),
	];
}

export default getFireStoreQuery;
