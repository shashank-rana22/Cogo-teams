export function getOptionsMapping({
	requestToJoinGroup, assignChat,
	openAssignModal, formattedData, requestForAssignChat, userId, setPopoverProps,

}) {
	const callBackFunc = () => {
		setPopoverProps({ isOpen: false, clickedButton: '' });
	};

	return {
		add_me_to_group: {
			onClick: () => {
				requestToJoinGroup();
				callBackFunc();
			},
			label: 'Add me To Group',
		},
		auto_assign: {
			onClick : () => assignChat({ payload: { is_allowed_to_chat: true }, callBackFunc }),
			label   : 'Auto Assign',
		},
		assign_modal: {
			onClick: () => {
				openAssignModal();
				callBackFunc();
			},
			label: 'Assign',
		},
		request_for_assign: {
			onClick: () => {
				const {
					channel_type,
					lead_user_id = '',
					user_id = '',
					sender = '',
					id = '',
					support_agent_id = '',
				} = formattedData || {};

				const payload = {
					lead_user_id    : lead_user_id || undefined,
					user_id         : user_id || undefined,
					sender          : sender || undefined,
					channel         : channel_type,
					channel_chat_id : id,
					...(support_agent_id ? { agent_id: support_agent_id } : {}),
				};

				requestForAssignChat({ payload, callBackFunc });
			},
			label: 'Request for Assign',
		},
		assign_to_me: {
			onClick: () => {
				assignChat({ payload: { agent_id: userId, is_allowed_to_chat: true, callBackFunc }, callBackFunc });
			},
			label: 'Assign to me',
		},
	};
}

export const ACCESSABLE_BUTTON_FUNC_MAPPING = {
	admin_view: ({
		showBotMessages,
		isServiceProvider,
		isPartOfGroup,
	}) => {
		const accesableButtonOptions = ['auto_assign', 'assign_modal', 'assign_to_me'];
		if (!showBotMessages && isServiceProvider && !isPartOfGroup) {
			accesableButtonOptions.push('add_me_to_group');
		}
		return accesableButtonOptions;
	},

	kam_view: ({
		supportAgentId,
		userId,
		showBotMessages,
	}) => {
		if (supportAgentId === userId) {
			return ['assign_modal'];
		}

		if (showBotMessages) {
			return ['request_to_assign'];
		}

		return [];
	},

	supply_view: ({
		showBotMessages,
		supportAgentId,
		userId,
		isGroupFormed,
		isServiceProvider,
		isPartOfGroup,
	}) => {
		let accesableButtons = [];
		if ((supportAgentId === userId) || isPartOfGroup) {
			accesableButtons = ['assign_modal'];
		}

		if (!isGroupFormed && supportAgentId !== userId && !showBotMessages) {
			accesableButtons = [...accesableButtons, 'request_for_assign'];
		}

		if (!showBotMessages && supportAgentId !== userId && isServiceProvider && !isPartOfGroup) {
			accesableButtons = [...accesableButtons, 'add_me_to_group'];
		}

		if (showBotMessages) {
			accesableButtons = [...accesableButtons, 'assign_to_me'];
		}

		return accesableButtons;
	},
	shipment_view: ({
		supportAgentId,
		userId,
	}) => {
		if (supportAgentId === userId) {
			return ['assign_modal'];
		}
		return [];
	},
};
