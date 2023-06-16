import { Button, cl } from '@cogoport/components';
import { IcMProfile, IcMRefresh, IcCFcrossInCircle, IcCFtick } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import AssigneeAvatar from '../../../../../common/AssigneeAvatar';
import HeaderName from '../../../../../common/HeaderName';

import Assignes from './Assignes';
import TagsPopOver from './HeaderFuncs';
import RightButton from './RightButton';
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
	updateRequestsOfRoom,
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
		group_members = [],
	} = formattedData || {};

	const { agent_id = '', agent_name = '' } = has_requested_by || {};

	const hasAccessToApprove = isomniChannelAdmin || support_agent_id === userId;

	const hasRequests = !!agent_id;

	const isGroupFormed = !isEmpty(group_members);

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
			agent_id        : support_agent_id || undefined,
		};
		requestForAssignChat(payload);
	};

	const handleUpdateUser = () => {
		if (!updateRoomLoading) {
			updateUserRoom(mobile_no);
		}
	};

	const showApprovePanel = (hasRequests && hasAccessToApprove);

	return (
		<div className={styles.outer_container}>
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
						<RightButton
							hasRequests={hasRequests}
							canMessageOnBotSession={canMessageOnBotSession}
							showBotMessages={showBotMessages}
							hasPermissionToEdit={hasPermissionToEdit}
							openAssignModal={openAssignModal}
							isomniChannelAdmin={isomniChannelAdmin}
							disableButton={disableButton}
							assignButtonAction={assignButtonAction}
							assignLoading={assignLoading}
							openPopover={openPopover}
							setOpenPopover={setOpenPopover}
							requestAssignPaylod={requestAssignPaylod}
							requestAssignLoading={requestAssignLoading}
							isGroupFormed={isGroupFormed}
						/>
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
			<div className={styles.approve_req} style={{ height: showApprovePanel ? '30px' : '0' }}>
				{showApprovePanel && (
					<>
						<text className={styles.agent_name}>
							{`${agent_name || 'A agent'} 
						has requested you to transfer chat`}
						</text>
						<IcCFtick
							className={styles.icon_styles}
							cursor={assignLoading ? 'disabled' : 'pointer'}
							onClick={() => {
								if (!assignLoading) {
									assignButtonAction('approve_request');
								}
							}}
						/>
						<IcCFcrossInCircle
							className={styles.icon_styles}
							cursor="pointer"
							onClick={updateRequestsOfRoom}
						/>
					</>
				)}
			</div>
		</div>
	);
}

export default Header;
