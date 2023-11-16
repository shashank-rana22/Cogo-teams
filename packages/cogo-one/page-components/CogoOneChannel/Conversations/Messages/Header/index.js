import { cl } from '@cogoport/components';
import {
	IcMProfile,
	IcMRefresh,
	IcMHome,
} from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import AssigneeAvatar from '../../../../../common/AssigneeAvatar';
import useTransferChat from '../../../../../hooks/useTransferChat';
import useUpdateUserRoom from '../../../../../hooks/useUpdateUserRoom';

import ChatControls from './ChatControls';
import Assignes from './HeaderFuncs/assignes';
import ShowContent from './HeaderFuncs/showContent';
import TagsPopOver from './HeaderFuncs/tagsPopOver';
import MobileHeader from './MobileHeader';
import RightButton from './RightButton';
import styles from './styles.module.css';

const SHOW_UPDATE_USER_BUTTON = ['whatsapp', 'platform_chat'];

function Header({
	setOpenModal = () => {},
	formattedData = {},
	updateChat = () => {},
	loading = false,
	closeModal = () => {},
	assignLoading = false,
	assignChat = () => {},
	activeAgentName = '',
	hasPermissionToEdit = false,
	filteredSpectators = [],
	activeMessageCard = {},
	tagOptions = [],
	supportAgentId = '',
	showBotMessages = false,
	userId = '',
	requestForAssignChat = () => {},
	requestAssignLoading = false,
	canMessageOnBotSession = false,
	viewType = '',
	firestore = {},
	escalateToSupplyRm = () => {},
	setActiveTab = () => {},
	supplierLoading = false,
	hasNoFireBaseRoom = false,
	isMobile = false,
}) {
	const {
		updateRoomLoading = false,
		updateUserRoom = () => {},
	} = useUpdateUserRoom();

	const { requestToJoinGroup = () => {} } = useTransferChat({ firestore, activeMessageCard });

	const openAssignModal = () => {
		setOpenModal({
			type : 'assign',
			data : {
				closeModal,
				assignLoading,
				assignChat,
				supportAgentId,
				accountType: formattedData?.account_type,
			},
		});
	};

	const { chat_tags = [], channel_type: channelType = '' } = activeMessageCard || {};

	const {
		mobile_no = '',
		channel_type,
		group_members = [],
		account_type = '',
		managers_ids = [],
		user_id = '',
	} = formattedData || {};

	const handleUpdateUser = () => {
		if (!updateRoomLoading && !hasNoFireBaseRoom) {
			updateUserRoom({ mobile_number: mobile_no, channel: channel_type, user_id });
		}
	};

	const isGroupFormed = !isEmpty(group_members);

	const isPartOfGroup = group_members?.includes(userId);
	const isManager = managers_ids?.includes(userId);

	if (isMobile) {
		return (
			<MobileHeader
				formattedData={formattedData}
				setActiveTab={setActiveTab}
				channelType={channelType}
				activeMessageCard={activeMessageCard}
				updateChat={updateChat}
				loading={loading}
				tagOptions={tagOptions}
				hasPermissionToEdit={hasPermissionToEdit}
				filteredSpectators={filteredSpectators}
				activeAgentName={activeAgentName}
				assignChat={assignChat}
				openAssignModal={openAssignModal}
				requestToJoinGroup={requestToJoinGroup}
				requestForAssignChat={requestForAssignChat}
				userId={userId}
				assignLoading={assignLoading}
				requestAssignLoading={requestAssignLoading}
				showBotMessages={showBotMessages}
				viewType={viewType}
				supportAgentId={supportAgentId}
				isGroupFormed={isGroupFormed}
				accountType={account_type}
				isPartOfGroup={isPartOfGroup}
				isManager={isManager}
				hasNoFireBaseRoom={hasNoFireBaseRoom}
				setOpenModal={setOpenModal}
				canMessageOnBotSession={canMessageOnBotSession}
				supplierLoading={supplierLoading}
				escalateToSupplyRm={escalateToSupplyRm}
				isMobile={isMobile}
			/>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.flex_space_between}>
				<div className={styles.flex}>
					<IcMHome
						className={styles.home_button}
						onClick={() => setActiveTab((prev) => ({ ...prev, data: {} }))}
					/>

					<TagsPopOver
						prevTags={chat_tags}
						updateChat={updateChat}
						loading={loading}
						tagOptions={tagOptions}
						hasPermissionToEdit={hasPermissionToEdit}
					/>

					<ShowContent
						list={chat_tags}
						showMorePlacement="right"
						hasPermissionToEdit={hasPermissionToEdit}
						updateChat={updateChat}
					/>
				</div>

				<div className={styles.flex}>
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
						assignChat={assignChat}
						openAssignModal={openAssignModal}
						requestToJoinGroup={requestToJoinGroup}
						formattedData={formattedData}
						requestForAssignChat={requestForAssignChat}
						userId={userId}
						assignLoading={assignLoading}
						requestAssignLoading={requestAssignLoading}
						showBotMessages={showBotMessages}
						viewType={viewType}
						supportAgentId={supportAgentId}
						isGroupFormed={isGroupFormed}
						accountType={account_type}
						isPartOfGroup={isPartOfGroup}
						isManager={isManager}
						hasNoFireBaseRoom={hasNoFireBaseRoom}
					/>

					{(SHOW_UPDATE_USER_BUTTON.includes(channel_type) && (mobile_no || user_id)) ? (
						<div
							role="presentation"
							className={cl`${styles.icon_div} 
								${(updateRoomLoading || hasNoFireBaseRoom) ? styles.disable_icon : ''}`}
							onClick={handleUpdateUser}
						>
							<IcMProfile
								className={cl`${styles.profile_icon} 
								${(updateRoomLoading || hasNoFireBaseRoom) ? styles.disable_icon : ''}`}
							/>
							<IcMRefresh className={cl`${styles.update_icon} 
								${(updateRoomLoading || hasNoFireBaseRoom) ? styles.disable_icon : ''}`}
							/>
						</div>
					) : null}
				</div>
			</div>

			<ChatControls
				formattedData={formattedData}
				escalateToSupplyRm={escalateToSupplyRm}
				setOpenModal={setOpenModal}
				updateChat={updateChat}
				loading={loading}
				channelType={channelType}
				supplierLoading={supplierLoading}
				hasPermissionToEdit={hasPermissionToEdit}
				canMessageOnBotSession={canMessageOnBotSession}
				isMobile={isMobile}
				setActiveTab={setActiveTab}
			/>
		</div>
	);
}

export default Header;
