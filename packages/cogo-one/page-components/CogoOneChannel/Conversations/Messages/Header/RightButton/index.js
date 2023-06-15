import { Button, Popover } from '@cogoport/components';

import styles from '../styles.module.css';

import PopoverOptions from './PopoverOptions';

function RightButton({
	agent_id,
	canMessageOnBotSession,
	showBotMessages,
	hasPermissionToEdit,
	openAssignModal,
	isomniChannelAdmin,
	disableButton,
	assignButtonAction,
	assignLoading,
	openPopover,
	setOpenPopover,
	agent_name,
	requestAssignPaylod,
	requestAssignLoading,
}) {
	const hasAnyRequests = !!agent_id;
	if (canMessageOnBotSession) {
		return (
			<Button
				themeType="secondary"
				size="md"
				disabled
				className={styles.styled_button}
			>
				Assign
			</Button>
		);
	}
	if (!showBotMessages) {
		return (
			<Button
				themeType="secondary"
				size="md"
				className={styles.styled_button}
				disabled={!hasPermissionToEdit}
				onClick={openAssignModal}
			>
				Assign
			</Button>
		);
	}
	if (isomniChannelAdmin && !hasAnyRequests) {
		return (
			<Popover
				placement="bottom"
				trigger="click"
				render={(
					<PopoverOptions
						disableButton={disableButton}
						assignButtonAction={assignButtonAction}
						assignLoading={assignLoading}
					/>
				)}
				visible={openPopover}
				onClickOutside={() => setOpenPopover(false)}
			>
				<Button
					themeType="secondary"
					size="md"
					className={styles.styled_button}
					onClick={() => setOpenPopover(true)}
				>
					Assign To
				</Button>
			</Popover>
		);
	}
	if (isomniChannelAdmin && hasAnyRequests) {
		return (
			<Button
				themeType="secondary"
				size="md"
				className={styles.styled_button}
				onClick={() => assignButtonAction('approve_request')}
				loading={assignLoading}
			>
				Assign to
				{' '}
				{agent_name}
			</Button>
		);
	}
	if (!isomniChannelAdmin) {
		return (
			<Button
				themeType="secondary"
				size="md"
				disabled={hasAnyRequests}
				className={styles.styled_button}
				onClick={requestAssignPaylod}
				loading={requestAssignLoading}
			>
				{hasAnyRequests ? 'Requested' : 'Request for Assign'}
			</Button>
		);
	}
	return null;
}

export default RightButton;
