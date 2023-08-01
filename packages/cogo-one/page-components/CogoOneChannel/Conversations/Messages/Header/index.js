import { cl } from '@cogoport/components';
import {
	IcMProfile,
	IcMRefresh,
	IcMHome,
} from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import AssigneeAvatar from '../../../../../common/AssigneeAvatar';
import useTransferChat from '../../../../../hooks/useTransferChat';

import Assignes from './Assignes';
import ChatControls from './ChatControls';
import ChatTransfer from './ChatTransfer';
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
	activeMessageCard = {},
	tagOptions = [],
	supportAgentId = null,
	showBotMessages = false,
	userId = '',
	updateRoomLoading = false,
	updateUserRoom = () => {},
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
	const [isVisible, setIsVisible] = useState(false);

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

	const { chat_tags = [] } = activeMessageCard || {};

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
		<div className={styles.outer_container}>
			<div className={styles.container}>
				<div className={styles.flex_space_between}>
					<div className={styles.flex}>
						<IcMHome
							className={styles.home_button}
							onClick={() => setActiveTab((prev) => ({ ...prev, data: {} }))}
						/>
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
		</div>
	);
}

export default Header;
