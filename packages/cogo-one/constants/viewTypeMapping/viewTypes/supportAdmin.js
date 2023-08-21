import { where } from 'firebase/firestore';

import { COMMON_AGENT_TYPES, COMMON_ADMIN_ACCESIBLE_BUTTONS } from '../defaultViewOptions';

const SUPPORT_ADMIN = {
	all_chats_base_query   : () => [where('agent_type', 'in', ['support', 'bot'])],
	group_chats_query      : ({ agentId }) => [where('group_members', 'array-contains', agentId)],
	teams_chats_base_query : ({ agentId }) => [where('managers_ids', 'array-contains', agentId)],
	session_type_query     : ({ sessionType }) => [where('session_type', '==', sessionType)],
	chat_sub_tabs_access   : ['all', 'teams', 'groups'],
	default_side_nav       : 'profile',
	accesible_filters      : {
		observer : ['closed_session'],
		all      : ['chat_tags'],
	},
	accesible_agent_types_query   : [where('agent_type', 'in', COMMON_AGENT_TYPES)],
	extra_side_bar_navs_access    : ['spot_search'],
	get_accesible_assign_buttons  : () => COMMON_ADMIN_ACCESIBLE_BUTTONS,
	show_relevant_templates       : ['quick_reply'],
	mails_to_be_shown             : [],
	bulk_assign_features          : [],
	configurations_to_be_shown    : [],
	accessible_new_communications : ['new_call', 'new_whatsapp', 'new_mail', 'global_contacts'],
	permissions                   : {
		auto_assign                 : false,
		bot_message_toggle          : false,
		organization_users_contacts : false,
		bulk_auto_assign            : false,
		claim_chats                 : true,
		toggle_self_status          : true,
		on_leave_status_toggle      : false,
		has_group_access            : true,
		can_message_on_bot_session  : false,
		has_permission_to_edit      : true,
		send_promotional_rate       : true,
		agent_type_filter           : false,
		flash_revert_logs           : false,
		punch_in_out                : false,
		show_shipments_home_page    : false,
		customer_org_users          : false,
		convert_account_to_cp       : false,
		show_shipment_reminder      : true,
	},
};

export default SUPPORT_ADMIN;