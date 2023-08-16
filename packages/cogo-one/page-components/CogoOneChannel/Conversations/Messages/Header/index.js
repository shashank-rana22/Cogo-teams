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
import ChatTransfer from './ChatTransfer';
import Assignes from './HeaderFuncs/assignes';
import ShowContent from './HeaderFuncs/showContent';
import TagsPopOver from './HeaderFuncs/tagsPopOver';
import RightButton from './RightButton';
import styles from './styles.module.css';

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
}) {
	const {
		updateRoomLoading = false,
		updateUserRoom = () => {},
	} = useUpdateUserRoom();

	const { requestToJoinGroup, dissmissTransferRequest } = useTransferChat({ firestore, activeMessageCard });

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
	} = formattedData || {};

	const handleUpdateUser = () => {
		if (!updateRoomLoading || !hasNoFireBaseRoom) {
			updateUserRoom(mobile_no);
		}
	};

	const isGroupFormed = !isEmpty(group_members);

	const isPartOfGroup = group_members?.includes(userId);
	const isManager = managers_ids?.includes(userId);

	return (
		<>
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

						{channel_type === 'whatsapp' && (
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
						)}
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
				/>
			</div>
			<ChatTransfer
				hasRequestedBy={formattedData?.has_requested_by}
				dissmissTransferRequest={dissmissTransferRequest}
				viewType={viewType}
				supportAgentId={supportAgentId}
				userId={userId}
				assignLoading={assignLoading}
				assignChat={assignChat}
			/>
		</>
	);
}

export default Header;
