import { Button } from '@cogoport/components';

import styles from './styles.module.css';

export function CommonButton({
	onClick = () => {},
	label = '',
	setPopoverProps = () => {}, disabled = false,
	loading = false,
	buttonType = '',
}) {
	return (
		<Button
			themeType="secondary"
			size="md"
			className={styles.popover_button}
			disabled={disabled}
			loading={loading}
			onClick={() => {
				setPopoverProps((p) => ({ ...p, clickedButton: buttonType }));
				onClick();
			}}
		>
			{label}
		</Button>
	);
}

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
					agent_id        : support_agent_id || undefined,
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
	}) => {
		const accesableButtonOptions = ['auto_assign', 'assign_modal', 'assign_to_me'];
		if (!showBotMessages && isServiceProvider) {
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
	}) => {
		let ACCESSABLE_BUTTON_OPTIONS = [];
		if (supportAgentId === userId) {
			ACCESSABLE_BUTTON_OPTIONS = ['assign_modal'];
		}

		if (!isGroupFormed) {
			ACCESSABLE_BUTTON_OPTIONS = [...ACCESSABLE_BUTTON_OPTIONS, 'request_for_assign'];
		}

		if (!showBotMessages && supportAgentId !== userId && isServiceProvider) {
			ACCESSABLE_BUTTON_OPTIONS = [...ACCESSABLE_BUTTON_OPTIONS, 'add_me_to_group'];
		}

		if (showBotMessages) {
			ACCESSABLE_BUTTON_OPTIONS = [...ACCESSABLE_BUTTON_OPTIONS, 'assign_to_me'];
		}

		return ACCESSABLE_BUTTON_OPTIONS;
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
