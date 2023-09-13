import { where } from 'firebase/firestore';

export function getSupplySessionQuery({
	sessionType = '',
	activeSubTab = '',
}) {
	return activeSubTab === 'contacts'
		? [where('session_type', 'in', ['bot', 'admin'])]
		: [where('session_type', '==', sessionType)];
}

export function getSalesSessionQuery({
	sessionType = '',
	activeSubTab = '',
}) {
	return activeSubTab === 'kamContacts'
		? [where('session_type', 'in', ['bot', 'admin'])]
		: [where('session_type', '==', sessionType)];
}

export function getKamButtons({
	supportAgentId = '',
	userId = '',
	showBotMessages = false,
	isManager = false,
	isGroupFormed = false,
	isPartOfGroup = false,
}) {
	if (isPartOfGroup) {
		return [];
	}

	if (supportAgentId === userId || isManager) {
		return ['assign_modal'];
	}

	if (showBotMessages) {
		return ['request_for_assign'];
	}

	if (isGroupFormed) {
		return ['add_me_to_group'];
	}

	return [];
}

export function getSalesAgentButtons({
	supportAgentId = '',
	userId = '',
	showBotMessages = false,
	isManager = false,
	isPartOfGroup = false,
	isGroupFormed = false,
}) {
	if (isPartOfGroup) {
		return [];
	}

	if (supportAgentId === userId || isManager) {
		return ['assign_modal'];
	}

	if (showBotMessages) {
		return ['assign_to_me'];
	}

	if (isGroupFormed) {
		return ['add_me_to_group'];
	}

	return ['request_for_assign', 'add_me_to_group'];
}

export function getSupplyAgentButtons({
	showBotMessages = false,
	supportAgentId = '',
	userId = '',
	isGroupFormed = false,
	isManager = false,
	isPartOfGroup = false,
}) {
	if (isPartOfGroup) {
		return [];
	}

	if (showBotMessages) {
		return ['assign_to_me'];
	}

	if ((supportAgentId === userId) || isManager) {
		return ['assign_modal'];
	}

	if (isGroupFormed) {
		return ['add_me_to_group'];
	}

	return ['request_for_assign'];
}

export function getShipmentSpecialistButtons({
	supportAgentId = '',
	userId = '',
	showBotMessages = false,
	isGroupFormed = false,
	isManager = false,
	isPartOfGroup = false,
}) {
	if (isPartOfGroup) {
		return [];
	}

	if (showBotMessages) {
		return ['assign_to_me'];
	}

	if ((supportAgentId === userId) || isManager) {
		return ['assign_modal'];
	}

	if (isGroupFormed) {
		return ['add_me_to_group'];
	}

	return ['request_for_assign'];
}
