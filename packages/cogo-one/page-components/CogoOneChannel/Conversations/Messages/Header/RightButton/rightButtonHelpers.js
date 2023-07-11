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
