import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { where } from 'firebase/firestore';

import {
	getSupplyAgentButtons,
	getSupplySessionQuery,
} from '../../../helpers/viewTypeFunctions';
import { COMMON_AGENT_TYPES } from '../defaultViewOptions';

const SUPPLY = {
	all_chats_base_query      : ({ agentId }) => [where('support_agent_id', '==', agentId)],
	observer_chats_base_query : ({ agentId }) => [where('spectators_ids', 'array-contains', agentId)],
	teams_chats_base_query    : ({ agentId }) => [where('managers_ids', 'array-contains', agentId)],
	group_chats_query         : ({ agentId }) => [where('group_members', 'array-contains', agentId)],
	contacts_base_query       : () => [where('agent_type', 'in', ['supply', 'bot']),
		where('user_details.account_type', '==', 'service_provider')],
	session_type_query   : getSupplySessionQuery,
	chat_sub_tabs_access : ['all', 'groups', 'teams', 'observer', 'contacts'],
	accesible_filters    : {
		observer : ['closed_session'],
		all      : ['chat_tags'],
		contacts : ['chat_tags'],
	},
	extra_side_bar_navs_access    : ['flash_shipment_bookings'],
	accesible_agent_types_query   : [where('agent_type', 'in', COMMON_AGENT_TYPES)],
	get_accesible_assign_buttons  : getSupplyAgentButtons,
	default_side_nav              : 'flash_shipment_bookings',
	show_relevant_templates       : ['supply'],
	mails_to_be_shown             : [GLOBAL_CONSTANTS.emails.import_rates, GLOBAL_CONSTANTS.emails.export_rates],
	bulk_assign_features          : ['bulk_send_templates'],
	configurations_to_be_shown    : [],
	accessible_new_communications : ['new_call', 'new_whatsapp', 'new_mail', 'sp_contacts'],
	group_agents_api_filter       : 'supply',
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
		has_permission_to_edit      : false,
		send_promotional_rate       : false,
		agent_type_filter           : false,
		flash_revert_logs           : true,
		punch_in_out                : false,
		show_shipments_home_page    : false,
		customer_org_users          : false,
		convert_account_to_cp       : false,
		show_shipment_reminder      : false,
		show_lead_voice_calls       : false,
	},
};

export default SUPPLY;
