import { where } from 'firebase/firestore';

import { getShipmentSpecialistButtons } from '../../../helpers/viewTypeFunctions';
import { COGOVERSE_AGENT_MAPPINGS } from '../../../utils/getViewTypeFromWorkPreferences';
import { COMMON_AGENT_TYPES } from '../defaultViewOptions';

const SHIPMENT_SPECIALIST = {
	chat_tabs_to_be_shown        : ['message', 'voice', 'firebase_emails', 'teams'],
	all_chats_base_query         : ({ agentId }) => [where('support_agent_id', '==', agentId)],
	group_chats_query            : ({ agentId }) => [where('group_members', 'array-contains', agentId)],
	session_type_query           : () => [where('session_type', '==', 'admin')],
	chat_sub_tabs_access         : ['all', 'teams', 'groups', 'hidden_filter'],
	teams_chats_base_query       : ({ agentId }) => [where('managers_ids', 'array-contains', agentId)],
	extra_side_bar_navs_access   : ['user_mails'],
	default_side_nav             : 'user_activity',
	get_accesible_assign_buttons : getShipmentSpecialistButtons,
	accesible_agent_types_query  : [where('agent_type', 'in', COMMON_AGENT_TYPES)],
	show_relevant_templates      : ['quick_reply', 'shipment_specialist'],
	mails_to_be_shown            : [],
	bulk_assign_features         : [],
	stats_feedback_count         : [],
	to_show_agent_activity_graph : false,
	configurations_to_be_shown   : ['agents_status'],
	shift_view_default_type      : '',
	email_signature_designation  : 'Customer Support',
	group_agents_api_filter      : ['shipment_specialist',
		'support', 'shipment_specialist_admin', ...COGOVERSE_AGENT_MAPPINGS.sales],
	accessible_new_communications : ['new_mail'],
	permissions                   : {
		auto_assign                                 : false,
		bot_message_toggle                          : false,
		organization_users_contacts                 : false,
		bulk_auto_assign                            : false,
		claim_chats                                 : false,
		toggle_self_status                          : false,
		on_leave_status_toggle                      : true,
		has_group_access                            : true,
		can_message_on_bot_session                  : true,
		has_permission_to_edit                      : false,
		show_organization_users                     : false,
		send_promotional_rate                       : false,
		agent_type_filter                           : false,
		flash_revert_logs                           : false,
		punch_in_out                                : true,
		show_shipments_home_page                    : true,
		customer_org_users                          : true,
		convert_account_to_cp                       : false,
		show_shipment_reminder                      : false,
		show_lead_voice_calls                       : false,
		show_shipments_stakeholders_contact_details : true,
		hide_personal_mail                          : true,
		show_services                               : false,
		show_rm_agent_details                       : true,
	},
};

export default SHIPMENT_SPECIALIST;
