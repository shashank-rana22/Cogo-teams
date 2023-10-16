import { where } from 'firebase/firestore';

import {
	getSalesSessionQuery,
	getSalesAgentButtons,
} from '../../../helpers/viewTypeFunctions';
import { COMMON_AGENT_TYPES } from '../defaultViewOptions';

const MARKETING = {
	chat_tabs_to_be_shown     : ['message', 'voice', 'teams'],
	all_chats_base_query      : ({ agentId }) => [where('support_agent_id', '==', agentId)],
	observer_chats_base_query : ({ agentId }) => [where('spectators_ids', 'array-contains', agentId)],
	teams_chats_base_query    : ({ agentId }) => [where('managers_ids', 'array-contains', agentId)],
	session_type_query        : getSalesSessionQuery,
	kam_contacts_base_query   : ({ agentId }) => [where('user_details.agent_ids', 'array-contains', agentId)],
	chat_sub_tabs_access      : ['all', 'observer', 'teams', 'kamContacts'],
	default_side_nav          : 'profile',
	accesible_filters         : {
		observer : ['closed_session'],
		all      : ['chat_tags'],
	},
	stats_feedback_count          : [],
	to_show_agent_activity_graph  : false,
	extra_side_bar_navs_access    : ['spot_search'],
	get_accesible_assign_buttons  : getSalesAgentButtons,
	accesible_agent_types_query   : [where('agent_type', 'in', [...COMMON_AGENT_TYPES, 'marketing_event'])],
	show_relevant_templates       : ['quick_reply', 'marketing'],
	mails_to_be_shown             : [],
	bulk_assign_features          : [],
	configurations_to_be_shown    : [],
	shift_view_default_type       : '',
	group_agents_api_filter       : ['marketing'],
	accessible_new_communications : ['new_call', 'new_whatsapp', 'new_mail', 'global_contacts'],
	permissions                   : {
		auto_assign                                 : false,
		bot_message_toggle                          : false,
		organization_users_contacts                 : false,
		bulk_auto_assign                            : false,
		claim_chats                                 : false,
		toggle_self_status                          : true,
		on_leave_status_toggle                      : false,
		has_group_access                            : false,
		can_message_on_bot_session                  : false,
		has_permission_to_edit                      : false,
		send_promotional_rate                       : true,
		agent_type_filter                           : false,
		flash_revert_logs                           : false,
		punch_in_out                                : false,
		show_shipments_home_page                    : false,
		customer_org_users                          : false,
		convert_account_to_cp                       : false,
		show_shipment_reminder                      : false,
		show_lead_voice_calls                       : false,
		show_shipments_stakeholders_contact_details : false,
		show_services                               : false,
		show_rm_agent_details                       : false,
	},
};

export default MARKETING;
