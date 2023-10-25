import { dynamic } from '@cogoport/next';

import CommonLoader from '../common/CommonLoader';

const COMPONENT_MAPPING = {
	profile: dynamic(
		() => import('../page-components/CogoOneChannel/ProfileDetails/AgentDetails'),
		{ loading: () => <CommonLoader /> },
	),
	organization: dynamic(
		() => import('../page-components/CogoOneChannel/ProfileDetails/OrganizationDetails'),
		{ loading: () => <CommonLoader /> },
	),
	user_activity: dynamic(
		() => import('../page-components/CogoOneChannel/ProfileDetails/UserActivity'),
		{ loading: () => <CommonLoader /> },
	),
	reminder: dynamic(
		() => import('../page-components/CogoOneChannel/ProfileDetails/AgentReminder'),
		{ loading: () => <CommonLoader /> },
	),
	notes: dynamic(
		() => import('../page-components/CogoOneChannel/ProfileDetails/AgentNotes'),
		{ loading: () => <CommonLoader /> },
	),
	quick_actions: dynamic(
		() => import('../page-components/CogoOneChannel/ProfileDetails/QuickActions'),
		{ loading: () => <CommonLoader /> },
	),
	customer_insights: dynamic(
		() => import('../page-components/CogoOneChannel/ProfileDetails/CustomerInsight'),
		{ loading: () => <CommonLoader /> },
	),
	help_desk: dynamic(
		() => import('../page-components/CogoOneChannel/ProfileDetails/HelpDesk'),
		{ loading: () => <CommonLoader /> },
	),
	documents: dynamic(
		() => import('../page-components/CogoOneChannel/ProfileDetails/Document'),
		{ loading: () => <CommonLoader /> },
	),
	flash_shipment_bookings: dynamic(
		() => import('../page-components/CogoOneChannel/ProfileDetails/RateReverts'),
		{ loading: () => <CommonLoader /> },
	),
	add_on_services: dynamic(
		() => import('../page-components/CogoOneChannel/ProfileDetails/AddOnServices'),
		{ loading: () => <CommonLoader /> },
	),
	user_mails: dynamic(
		() => import('../page-components/CogoOneChannel/ProfileDetails/UserMails'),
		{ loading: () => <CommonLoader /> },
	),
	teams_profile: dynamic(
		() => import('../page-components/CogoOneChannel/ProfileDetails/TeamsProfile'),
		{ loading: () => <CommonLoader /> },
	),
};

export default COMPONENT_MAPPING;
