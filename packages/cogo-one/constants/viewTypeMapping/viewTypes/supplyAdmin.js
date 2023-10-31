import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { where } from 'firebase/firestore';

import {
	getSupplySessionQuery,
} from '../../../helpers/viewTypeFunctions';
import { COMMON_AGENT_TYPES, COMMON_ADMIN_ACCESIBLE_BUTTONS } from '../defaultViewOptions';

const SUPPLY_ADMIN = {
	chat_tabs_to_be_shown  : ['message', 'voice', 'firebase_emails', 'teams'],
	all_chats_base_query   : () => [where('agent_type', 'in', ['supply'])],
	group_chats_query      : ({ agentId }) => [where('group_members', 'array-contains', agentId)],
	teams_chats_base_query : ({ agentId }) => [where('managers_ids', 'array-contains', agentId)],
	contacts_base_query    : () => [where('agent_type', 'in', ['supply', 'bot']),
		where('user_details.account_type', '==', 'service_provider')],
	session_type_query   : getSupplySessionQuery,
	chat_sub_tabs_access : ['all', 'groups', 'teams', 'contacts'],
	accesible_filters    : {
		observer : ['closed_session'],
		all      : ['chat_tags'],
		contacts : ['chat_tags'],
	},
	stats_feedback_count: ['no_of_rates_reverted',
		'no_of_rate_sheets_received', 'chats_assigned', 'avg_response_time', 'emails_send_count',
		'calls_made', 'calls_received'],
	to_show_agent_activity_graph  : false,
	extra_side_bar_navs_access    : ['flash_shipment_bookings'],
	accesible_agent_types_query   : [where('agent_type', 'in', COMMON_AGENT_TYPES)],
	get_accesible_assign_buttons  : () => COMMON_ADMIN_ACCESIBLE_BUTTONS,
	default_side_nav              : 'flash_shipment_bookings',
	show_relevant_templates       : ['supply'],
	mails_to_be_shown             : [],
	bulk_assign_features          : ['bulk_send_templates'],
	configurations_to_be_shown    : [],
	shift_view_default_type       : '',
	contact_number                : GLOBAL_CONSTANTS.mobile_number.cogoone_supply_contact_no,
	email_signature_designation   : 'CogoOne Supply Advisor',
	accessible_new_communications : ['new_call', 'new_whatsapp', 'new_mail', 'sp_contacts'],
	group_agents_api_filter       : ['supply', 'supply_admin'],
	permissions                   : {
		auto_assign                                 : false,
		bot_message_toggle                          : false,
		organization_users_contacts                 : false,
		bulk_auto_assign                            : false,
		claim_chats                                 : false,
		toggle_self_status                          : true,
		on_leave_status_toggle                      : false,
		has_group_access                            : true,
		can_message_on_bot_session                  : false,
		has_permission_to_edit                      : true,
		send_promotional_rate                       : false,
		agent_type_filter                           : false,
		flash_revert_logs                           : true,
		punch_in_out                                : true,
		show_shipments_home_page                    : false,
		customer_org_users                          : false,
		convert_account_to_cp                       : false,
		show_shipment_reminder                      : false,
		show_lead_voice_calls                       : false,
		show_shipments_stakeholders_contact_details : false,
		hide_personal_mail                          : true,
		show_services                               : true,
		show_rm_agent_details                       : false,
		show_rate_reverts_page                      : true,
	},
};

export default SUPPLY_ADMIN;
