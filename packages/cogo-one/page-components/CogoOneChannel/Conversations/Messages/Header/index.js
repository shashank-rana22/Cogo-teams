import { Button, cl, Popover } from '@cogoport/components';
import { IcMProfile, IcMRefresh } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import AssigneeAvatar from '../../../../../common/AssigneeAvatar';
import HeaderName from '../../../../../common/HeaderName';

import Assignes from './Assignes';
import TagsPopOver from './HeaderFuncs';
import ShowContent from './ShowContent';
import styles from './styles.module.css';

function Header({
	setOpenModal = () => {},
	formattedData = {},
	setheaderTags = () => {},
	headertags = '',
	updateChat = () => {},
	loading = false,
	closeModal = () => {},
	assignLoading = false,
	assignChat = () => {},
	activeAgentName = '',
	hasPermissionToEdit = false,
	filteredSpectators = [],
	activeMessageCard,
	tagOptions = [],
	support_agent_id = null,
	showBotMessages = false,
	userId = '',
	isomniChannelAdmin = false,
	setDisableButton = () => {},
	disableButton = '',
	updateRoomLoading = false,
	updateUserRoom = () => {},
	requestForAssignChat = () => {},
	requestAssignLoading = false,
	canMessageOnBotSession = false,
}) {
	const [isVisible, setIsVisible] = useState(false);
	const [openPopover, setOpenPopover] = useState(false);
	const { chat_tags = [] } = activeMessageCard || {};

	const {
		mobile_no = '',
		channel_type,
		has_requested_by = {},
		lead_user_id = '',
		user_id = '',
		sender = '',
		id = '',
	} = formattedData || {};

	const { agent_id = '', agent_name = '' } = has_requested_by || {};

	const openAssignModal = () => {
		setOpenModal({
			type : 'assign',
			data : {
				closeModal,
				assignLoading,
				assignChat,
				support_agent_id,
			},
		});
	};

	const assignButtonAction = (type) => {
		setDisableButton(type);
		if (type === 'assign') {
			setOpenPopover(false);
			openAssignModal();
			return;
		}
		let agentIdPayload = {};

		if (type === 'approve_request') {
			agentIdPayload = { agent_id };
		} else if (type === 'stop_and_assign') {
			agentIdPayload = { agent_id: userId };
		}

		assignChat({ ...agentIdPayload, is_allowed_to_chat: true });
	};

	const requestAssignPaylod = () => {
		const payload = {
			lead_user_id    : lead_user_id || undefined,
			user_id         : user_id || undefined,
			sender          : sender || undefined,
			channel         : channel_type,
			channel_chat_id : id,
		};
		requestForAssignChat(payload);
	};
	const renderPopoverOption = () => (
		<div className={styles.button_container}>
			<Button
				themeType="secondary"
				size="md"
				disabled={disableButton}
				className={styles.styled_buttons}
				onClick={() => assignButtonAction('stop_and_assign')}
				loading={assignLoading && disableButton === 'stop_and_assign'}
			>
				Assign to me
			</Button>
			<Button
				themeType="secondary"
				size="md"
				disabled={disableButton}
				className={styles.styled_buttons}
				onClick={() => assignButtonAction('auto_assign')}
				loading={assignLoading && disableButton === 'auto_assign'}
			>
				Auto Assign
			</Button>
			<Button
				themeType="secondary"
				size="md"
				disabled={disableButton}
				className={styles.styled_button}
				onClick={() => assignButtonAction('assign')}
				loading={assignLoading && disableButton === 'assign'}
			>
				Assign
			</Button>
		</div>
	);

	const renderRightButton = () => {
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
					render={renderPopoverOption()}
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
	};

	const handleUpdateUser = () => {
		if (!updateRoomLoading) {
			updateUserRoom(mobile_no);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.flex_space_between}>
				<div className={styles.flex}>
					<TagsPopOver
						prevtags={chat_tags}
						headertags={headertags}
						setheaderTags={setheaderTags}
						isVisible={isVisible}
						setIsVisible={setIsVisible}
						updateChat={updateChat}
						loading={loading}
						tagOptions={tagOptions}
						hasPermissionToEdit={hasPermissionToEdit}
					/>
					<ShowContent
						list={chat_tags}
						showMorePlacement="right"
						hasPermissionToEdit={hasPermissionToEdit}
					/>
				</div>
				<div
					className={styles.flex}
				>
					{!isEmpty(filteredSpectators) && (
						<Assignes filteredSpectators={filteredSpectators} />
					)}
					{activeAgentName && (
						<div className={styles.active_agent}>
							<AssigneeAvatar
								name={activeAgentName}
								type="active"
								key={activeAgentName}
							/>
						</div>
					)}
					<div>{renderRightButton()}</div>
					{isomniChannelAdmin && channel_type === 'whatsapp' && (
						<div
							role="button"
							tabIndex="0"
							className={cl`${styles.icon_div} ${updateRoomLoading ? styles.disable_icon : ''}`}
							onClick={handleUpdateUser}
						>
							<IcMProfile
								className={cl`${styles.profile_icon} 
								${updateRoomLoading ? styles.disable_icon : ''}`}
							/>
							<IcMRefresh className={cl`${styles.update_icon} 
								${updateRoomLoading ? styles.disable_icon : ''}`}
							/>
						</div>
					)}
				</div>
			</div>
			<div className={styles.flex_space_between}>
				<HeaderName formattedData={formattedData} />
				<Button
					themeType="primary"
					size="sm"
					disabled={!hasPermissionToEdit || canMessageOnBotSession}
					onClick={() => setOpenModal({
						type : 'mark_as_closed',
						data : {
							updateChat,
							loading,
						},
					})}
				>
					Mark as Closed
				</Button>
			</div>
		</div>
	);
}

export default Header;
