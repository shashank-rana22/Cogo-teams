import { where } from 'firebase/firestore';

import {
	getKamButtons,
} from '../../../helpers/viewTypeFunctions';
import { COMMON_AGENT_TYPES } from '../defaultViewOptions';

const DEFAULT = {
	chat_tabs_to_be_shown     : ['message', 'voice', 'teams'],
	all_chats_base_query      : ({ agentId }) => [where('support_agent_id', '==', agentId)],
	observer_chats_base_query : ({ agentId }) => [where('spectators_ids', 'array-contains', agentId)],
	session_type_query        : ({ sessionType }) => [where('session_type', '==', sessionType)],
	chat_sub_tabs_access      : ['all', 'observer'],
	default_side_nav          : 'profile',
	accesible_filters         : {
		observer : ['closed_session'],
		all      : ['chat_tags'],
	},
	stats_feedback_count: ['no_of_quotation_send', 'no_of_bookings', 'customer_satisfaction_score',
		'calls_made', 'calls_received', 'chats_assigned'],
	to_show_agent_activity_graph  : true,
	accesible_agent_types_query   : [where('agent_type', 'in', COMMON_AGENT_TYPES)],
	extra_side_bar_navs_access    : [],
	get_accesible_assign_buttons  : getKamButtons,
	show_relevant_templates       : ['quick_reply'],
	mails_to_be_shown             : [],
	bulk_assign_features          : [],
	configurations_to_be_shown    : [],
	shift_view_default_type       : '',
	accessible_new_communications : ['new_mail', 'global_contacts'],
	group_agents_api_filter       : ['sales'],
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
		send_promotional_rate                       : false,
		agent_type_filter                           : false,
		flash_revert_logs                           : false,
		punch_in_out                                : true,
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

export default DEFAULT;
