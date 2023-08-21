import { where } from 'firebase/firestore';

import { getSupplySessionQuery } from '../../../helpers/viewTypeFunctions';
import { COMMON_ADMIN_ACCESIBLE_BUTTONS } from '../defaultViewOptions';

const COGOONE_ADMIN = {
	group_chats_query      : ({ agentId }) => [where('group_members', 'array-contains', agentId)],
	teams_chats_base_query : ({ agentId }) => [where('managers_ids', 'array-contains', agentId)],
	session_type_query     : getSupplySessionQuery,
	contacts_base_query    : () => [where('user_details.account_type', '==', 'service_provider')],
	chat_sub_tabs_access   : ['all', 'groups', 'contacts'],
	accesible_filters      : {
		all      : ['15_min_filter', 'assigned_to', 'assigned_agent', 'chat_tags'],
		contacts : ['chat_tags'],
	},
	extra_side_bar_navs_access    : ['spot_search', 'flash_shipment_bookings'],
	accesible_agent_types_query   : [],
	get_accesible_assign_buttons  : () => COMMON_ADMIN_ACCESIBLE_BUTTONS,
	default_side_nav              : 'profile',
	show_relevant_templates       : ['quick_reply', 'supply'],
	mails_to_be_shown             : [],
	bulk_assign_features          : ['bulk_auto_assign', 'bulk_send_templates'],
	configurations_to_be_shown    : ['lock_configuration', 'list_agents'],
	accessible_new_communications : ['new_call', 'new_whatsapp', 'new_mail', 'global_contacts', 'sp_contacts'],
	permissions                   : {
		auto_assign                 : true,
		bot_message_toggle          : true,
		organization_users_contacts : true,
		bulk_auto_assign            : true,
		claim_chats                 : true,
		toggle_self_status          : false,
		on_leave_status_toggle      : false,
		has_group_access            : true,
		can_message_on_bot_session  : false,
		has_permission_to_edit      : true,
		send_promotional_rate       : true,
		agent_type_filter           : true,
		flash_revert_logs           : false,
		punch_in_out                : false,
		show_shipments_home_page    : false,
		customer_org_users          : false,
		convert_account_to_cp       : false,
		show_shipment_reminder      : false,
	},
};

export default COGOONE_ADMIN;