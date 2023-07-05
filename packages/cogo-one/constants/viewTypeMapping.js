import { where } from 'firebase/firestore';

const COMMON_ADMIN_ACCESIBLE_BUTTONS = ['auto_assign', 'assign_modal', 'assign_to_me'];

function getSupplySessionQuery({ sessionType, isContactsSelected = false }) {
	return isContactsSelected
		? [where('session_type', 'in', ['bot', 'admin'])]
		: [where('session_type', '==', sessionType)];
}

function getKamButtons({
	supportAgentId,
	userId,
	showBotMessages,
	isManager,
}) {
	if (supportAgentId === userId || isManager) {
		return ['assign_modal'];
	}

	if (showBotMessages) {
		return ['request_for_assign'];
	}

	return [];
}

function getSupplyAgentButtons({
	showBotMessages,
	supportAgentId,
	userId,
	isGroupFormed,
	isServiceProvider,
	isPartOfGroup,
	isManager,
}) {
	if (!isServiceProvider) {
		return [];
	}

	if (showBotMessages) {
		return ['assign_to_me'];
	}

	if ((supportAgentId === userId) || isPartOfGroup || isManager) {
		return ['assign_modal'];
	}

	if (isGroupFormed) {
		return ['add_me_to_group'];
	}

	return ['request_for_assign', 'add_me_to_group'];
}

export const VIEW_TYPE_GLOBAL_MAPPING = {
	sales: {
		all_chats_base_query      : ({ agentId }) => [where('support_agent_id', '==', agentId)],
		observer_chats_base_query : ({ agentId }) => [where('spectators_ids', 'array-contains', agentId)],
		teams_chats_base_query    : ({ agentId }) => [where('managers_ids', 'array-contains', agentId)],
		group_chats_query         : ({ agentId }) => [where('group_members', 'array-contains', agentId)],
		session_type_query        : ({ sessionType }) => [where('session_type', '==', sessionType)],
		chat_sub_tabs_access      : ['all', 'observer', 'teams'],
		default_side_nav          : 'profile',
		accesible_filters         : {
			observer : ['closed_session'],
			all      : ['chat_tags'],
		},
		extra_side_bar_navs_access   : ['spot_search'],
		get_accesible_assign_buttons : getKamButtons,
		accesible_agent_types_query  : [where('agent_type', 'in', ['sales', 'bot'])],
		permissions                  : {
			auto_assign                 : false,
			bot_message_toggle          : false,
			organization_users_contacts : false,
			bulk_auto_assign            : false,
			claim_chats                 : false,
			toggle_agent_status         : false,
			toggle_self_status          : true,
			has_group_access            : false,
			can_message_on_bot_session  : false,
			has_permission_to_edit      : false,
			show_organization_users     : true,
		},
	},
	sales_admin: {
		all_chats_base_query   : () => [where('agent_type', 'in', ['sales', 'bot'])],
		group_chats_query      : ({ agentId }) => [where('group_members', 'array-contains', agentId)],
		teams_chats_base_query : ({ agentId }) => [where('managers_ids', 'array-contains', agentId)],
		session_type_query     : ({ sessionType }) => [where('session_type', '==', sessionType)],
		chat_sub_tabs_access   : ['all', 'teams'],
		default_side_nav       : 'profile',
		accesible_filters      : {
			observer : ['closed_session'],
			all      : ['chat_tags'],
		},
		accesible_agent_types_query  : [where('agent_type', 'in', ['sales', 'bot'])],
		extra_side_bar_navs_access   : ['spot_search'],
		get_accesible_assign_buttons : () => COMMON_ADMIN_ACCESIBLE_BUTTONS,
		permissions                  : {
			auto_assign                 : false,
			bot_message_toggle          : false,
			organization_users_contacts : false,
			bulk_auto_assign            : false,
			claim_chats                 : false,
			toggle_agent_status         : false,
			toggle_self_status          : false,
			has_group_access            : false,
			can_message_on_bot_session  : false,
			has_permission_to_edit      : true,
			show_organization_users     : true,

		},
	},
	support: {
		all_chats_base_query      : ({ agentId }) => [where('support_agent_id', '==', agentId)],
		observer_chats_base_query : ({ agentId }) => [where('spectators_ids', 'array-contains', agentId)],
		teams_chats_base_query    : ({ agentId }) => [where('managers_ids', 'array-contains', agentId)],
		group_chats_query         : ({ agentId }) => [where('group_members', 'array-contains', agentId)],
		contacts_base_query       : () => [where('user_details.account_type', '==', 'service_provider')],
		session_type_query        : ({ sessionType }) => [where('session_type', '==', sessionType)],
		chat_sub_tabs_access      : ['all', 'observer'],
		default_side_nav          : 'profile',
		accesible_filters         : {
			observer : ['closed_session'],
			all      : ['chat_tags'],
		},
		accesible_agent_types_query  : [where('agent_type', 'in', ['support', 'bot'])],
		extra_side_bar_navs_access   : ['spot_search'],
		get_accesible_assign_buttons : getKamButtons,
		permissions                  : {
			auto_assign                 : false,
			bot_message_toggle          : false,
			organization_users_contacts : false,
			bulk_auto_assign            : false,
			claim_chats                 : true,
			toggle_agent_status         : false,
			toggle_self_status          : true,
			has_group_access            : false,
			can_message_on_bot_session  : false,
			has_permission_to_edit      : false,
			show_organization_users     : false,
		},
	},
	support_admin: {
		all_chats_base_query   : () => [where('agent_type', 'in', ['support', 'bot'])],
		group_chats_query      : ({ agentId }) => [where('group_members', 'array-contains', agentId)],
		teams_chats_base_query : ({ agentId }) => [where('managers_ids', 'array-contains', agentId)],
		session_type_query     : ({ sessionType }) => [where('session_type', '==', sessionType)],
		chat_sub_tabs_access   : ['all', 'teams'],
		default_side_nav       : 'profile',
		accesible_filters      : {
			observer : ['closed_session'],
			all      : ['chat_tags'],
		},
		accesible_agent_types_query  : [where('agent_type', 'in', ['support', 'bot'])],
		extra_side_bar_navs_access   : ['spot_search'],
		get_accesible_assign_buttons : () => COMMON_ADMIN_ACCESIBLE_BUTTONS,
		permissions                  : {
			auto_assign                 : false,
			bot_message_toggle          : false,
			organization_users_contacts : false,
			bulk_auto_assign            : false,
			claim_chats                 : true,
			toggle_agent_status         : false,
			toggle_self_status          : false,
			has_group_access            : false,
			can_message_on_bot_session  : false,
			has_permission_to_edit      : true,
			show_organization_users     : false,
		},
	},
	supply: {
		all_chats_base_query      : ({ agentId }) => [where('support_agent_id', '==', agentId)],
		observer_chats_base_query : ({ agentId }) => [where('spectators_ids', 'array-contains', agentId)],
		teams_chats_base_query    : ({ agentId }) => [where('managers_ids', 'array-contains', agentId)],
		group_chats_query         : ({ agentId }) => [where('group_members', 'array-contains', agentId)],
		contacts_base_query       : () => [where('user_details.account_type', '==', 'service_provider')],
		session_type_query        : getSupplySessionQuery,
		chat_sub_tabs_access      : ['all', 'groups', 'teams', 'observer', 'contacts'],
		accesible_filters         : {
			observer : ['closed_session'],
			all      : ['chat_tags'],
			contacts : ['chat_tags'],
		},
		extra_side_bar_navs_access   : ['flash_shipment_bookings'],
		accesible_agent_types_query  : [where('agent_type', 'in', ['supply', 'bot'])],
		get_accesible_assign_buttons : getSupplyAgentButtons,
		default_side_nav             : 'flash_shipment_bookings',
		permissions                  : {
			auto_assign                 : false,
			bot_message_toggle          : false,
			organization_users_contacts : false,
			bulk_auto_assign            : false,
			claim_chats                 : true,
			toggle_agent_status         : false,
			toggle_self_status          : true,
			has_group_access            : true,
			can_message_on_bot_session  : false,
			has_permission_to_edit      : false,
			show_organization_users     : true,
		},
	},
	supply_admin: {
		all_chats_base_query   : () => [where('agent_type', 'in', ['supply', 'bot'])],
		group_chats_query      : ({ agentId }) => [where('group_members', 'array-contains', agentId)],
		teams_chats_base_query : ({ agentId }) => [where('managers_ids', 'array-contains', agentId)],
		contacts_base_query    : () => [where('user_details.account_type', '==', 'service_provider')],
		session_type_query     : getSupplySessionQuery,
		chat_sub_tabs_access   : ['all', 'groups', 'teams', 'contacts'],
		accesible_filters      : {
			observer : ['closed_session'],
			all      : ['chat_tags'],
			contacts : ['chat_tags'],
		},
		extra_side_bar_navs_access   : ['flash_shipment_bookings'],
		accesible_agent_types_query  : [where('agent_type', 'in', ['supply', 'bot'])],
		get_accesible_assign_buttons : () => COMMON_ADMIN_ACCESIBLE_BUTTONS,
		default_side_nav             : 'flash_shipment_bookings',
		permissions                  : {
			auto_assign                 : false,
			bot_message_toggle          : false,
			organization_users_contacts : false,
			bulk_auto_assign            : false,
			claim_chats                 : false,
			toggle_agent_status         : false,
			toggle_self_status          : false,
			has_group_access            : true,
			can_message_on_bot_session  : false,
			has_permission_to_edit      : true,
			show_organization_users     : true,
		},
	},
	shipment_specialist: {
		all_chats_base_query         : ({ agentId }) => [where('booking_agent_ids', 'array-contains', agentId)],
		session_type_query           : () => [where('session_type', 'in', ['bot', 'admin'])],
		chat_sub_tabs_access         : ['all'],
		extra_side_bar_navs_access   : [],
		default_side_nav             : 'user_activity',
		get_accesible_assign_buttons : ({
			supportAgentId,
			userId,
		}) => (supportAgentId === userId ? ['assign_modal'] : []),
		accesible_agent_types_query : [where('agent_type', 'in', ['shipment', 'bot'])],
		permissions                 : {
			auto_assign                 : false,
			bot_message_toggle          : false,
			organization_users_contacts : false,
			bulk_auto_assign            : false,
			claim_chats                 : false,
			toggle_agent_status         : false,
			toggle_self_status          : true,
			has_group_access            : true,
			can_message_on_bot_session  : true,
			has_permission_to_edit      : true,
			show_organization_users     : false,
		},
	},
	cogoone_admin: {
		group_chats_query      : ({ agentId }) => [where('group_members', 'array-contains', agentId)],
		teams_chats_base_query : ({ agentId }) => [where('managers_ids', 'array-contains', agentId)],
		session_type_query     : getSupplySessionQuery,
		contacts_base_query    : () => [where('user_details.account_type', '==', 'service_provider')],
		chat_sub_tabs_access   : ['all', 'groups', 'contacts'],
		accesible_filters      : {
			all      : ['15_min_filter', 'assigned_to', 'assigned_agent', 'chat_tags'],
			contacts : ['chat_tags'],
		},
		extra_side_bar_navs_access   : ['spot_search', 'flash_shipment_bookings'],
		accesible_agent_types_query  : [],
		get_accesible_assign_buttons : () => COMMON_ADMIN_ACCESIBLE_BUTTONS,
		default_side_nav             : 'profile',
		permissions                  : {
			auto_assign                 : true,
			bot_message_toggle          : true,
			organization_users_contacts : true,
			bulk_auto_assign            : true,
			claim_chats                 : true,
			toggle_agent_status         : true,
			toggle_self_status          : false,
			has_group_access            : true,
			can_message_on_bot_session  : false,
			has_permission_to_edit      : true,
			show_organization_users     : false,
		},
	},
};
