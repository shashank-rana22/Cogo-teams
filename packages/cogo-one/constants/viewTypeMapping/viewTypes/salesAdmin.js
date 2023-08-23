import { where } from 'firebase/firestore';

import { getSalesSessionQuery } from '../../../helpers/viewTypeFunctions';
import { COMMON_AGENT_TYPES, COMMON_ADMIN_ACCESIBLE_BUTTONS } from '../defaultViewOptions';

const SALES_ADMIN = {
	all_chats_base_query    : () => [where('agent_type', 'in', ['sales'])],
	group_chats_query       : ({ agentId }) => [where('group_members', 'array-contains', agentId)],
	teams_chats_base_query  : ({ agentId }) => [where('managers_ids', 'array-contains', agentId)],
	session_type_query      : getSalesSessionQuery,
	kam_contacts_base_query : ({ agentId }) => [where('user_details.agent_ids', 'array-contains', agentId)],
	chat_sub_tabs_access    : ['all', 'teams', 'kamContacts'],
	default_side_nav        : 'profile',
	accesible_filters       : {
		observer : ['closed_session'],
		all      : ['chat_tags'],
	},
	stats_feedback_count: ['no_of_quotation_send', 'no_of_bookings', 'customer_satisfaction_score',
		'calls_made', 'calls_received', 'chats_assigned'],
	to_show_agent_activity_graph  : true,
	accesible_agent_types_query   : [where('agent_type', 'in', COMMON_AGENT_TYPES)],
	extra_side_bar_navs_access    : ['spot_search'],
	get_accesible_assign_buttons  : () => COMMON_ADMIN_ACCESIBLE_BUTTONS,
	show_relevant_templates       : ['quick_reply'],
	mails_to_be_shown             : [],
	bulk_assign_features          : [],
	configurations_to_be_shown    : [],
	group_agents_api_filter       : 'sales',
	accessible_new_communications : ['new_call', 'new_whatsapp', 'new_mail', 'global_contacts'],
	permissions                   : {
		auto_assign                 : false,
		bot_message_toggle          : false,
		organization_users_contacts : false,
		bulk_auto_assign            : false,
		claim_chats                 : false,
		toggle_self_status          : true,
		on_leave_status_toggle      : false,
		has_group_access            : false,
		can_message_on_bot_session  : false,
		has_permission_to_edit      : true,
		send_promotional_rate       : true,
		agent_type_filter           : false,
		flash_revert_logs           : false,
		punch_in_out                : true,
		show_shipments_home_page    : false,
		customer_org_users          : false,
		convert_account_to_cp       : false,
		show_shipment_reminder      : false,
	},
};

export default SALES_ADMIN;
