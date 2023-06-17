import { Button, Popover } from '@cogoport/components';

import styles from '../styles.module.css';

import PopoverOptions from './PopoverOptions';

function RightButton({
	hasRequests,
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
	requestAssignPaylod,
	requestAssignLoading,
	isGroupFormed,
	addToGroup,
}) {
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
	if (!showBotMessages && hasPermissionToEdit) {
		return (
			<Popover
				placement="bottom"
				trigger="click"
				render={(
					<>
						<Button
							themeType="secondary"
							size="md"
							className={styles.popover_button}
							onClick={openAssignModal}
						>
							Assign
						</Button>
						<Button
							themeType="secondary"
							size="md"
							className={styles.popover_button}
							onClick={() => {
								addToGroup();
								setOpenPopover(false);
							}}
						>
							Add me to Group
						</Button>
					</>
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
					Assign
				</Button>
			</Popover>
		);
	}
	if (isomniChannelAdmin && !hasRequests) {
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

	if (!isomniChannelAdmin && !isGroupFormed) {
		return (
			<Button
				themeType="secondary"
				size="md"
				className={styles.styled_button}
				onClick={requestAssignPaylod}
				loading={requestAssignLoading}
			>
				Request for Assign
			</Button>
		);
	}
	return (
		<Button
			themeType="secondary"
			size="md"
			className={styles.styled_button}
			disabled
		>
			Assign
		</Button>
	);
}

export default RightButton;
