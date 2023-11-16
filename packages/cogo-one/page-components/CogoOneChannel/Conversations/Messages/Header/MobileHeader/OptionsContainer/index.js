import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import AssigneeAvatar from '../../../../../../../common/AssigneeAvatar';
import Assignes from '../../HeaderFuncs/assignes';
import ShowContent from '../../HeaderFuncs/showContent';
import TagsPopOver from '../../HeaderFuncs/tagsPopOver';
import RightButton from '../../RightButton';

import styles from './styles.module.css';

function OptionsContainer({
	activeMessageCard = {},
	updateChat = () => {},
	loading = false,
	tagOptions = [],
	hasPermissionToEdit = false,
	activeAgentName = '',
	filteredSpectators = [],
	assignChat = () => {},
	openAssignModal = () => {},
	requestToJoinGroup = () => {},
	formattedData = {},
	requestForAssignChat = () => {},
	userId = '',
	assignLoading = false,
	requestAssignLoading = false,
	viewType = '',
	supportAgentId = '',
	isGroupFormed = false,
	showBotMessages = false,
	accountType = '',
	isPartOfGroup = false,
	isManager = false,
	hasNoFireBaseRoom = false,
	supplierLoading = false,
	canMessageOnBotSession = false,
	escalateToSupplyRm = () => {},
	setOpenModal = () => {},
}) {
	const { chat_tags = [] } = activeMessageCard || {};
	const {
		channel_type,
		organization_id = '',
		user_id,
		id,
	} = formattedData || {};

	const handleEscalateClick = () => {
		escalateToSupplyRm({
			payload: {
				organization_id,
				organization_user_id : user_id,
				channel              : channel_type,
				channel_chat_id      : id,
			},
		});
	};

	return (
		<div className={styles.container}>
			<div className={styles.tags_container}>
				{!isEmpty(filteredSpectators) && (
					<Assignes filteredSpectators={filteredSpectators} />
				)}

				{activeAgentName && (
					<div className={styles.active_agent}>
						<AssigneeAvatar
							name={activeAgentName}
							type="active"
						/>
					</div>
				)}
			</div>

			<div className={styles.tags_container}>
				<TagsPopOver
					prevTags={chat_tags}
					updateChat={updateChat}
					loading={loading}
					tagOptions={tagOptions}
					hasPermissionToEdit={hasPermissionToEdit}
					isMobile
				/>

				<ShowContent
					list={chat_tags}
					showMorePlacement="right"
					hasPermissionToEdit={hasPermissionToEdit}
					updateChat={updateChat}
					isMobile
				/>
			</div>

			<div className={styles.button_container}>
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
					accountType={accountType}
					isPartOfGroup={isPartOfGroup}
					isManager={isManager}
					hasNoFireBaseRoom={hasNoFireBaseRoom}
				/>

				{accountType === 'service_provider' ? (
					<Button
						themeType="secondary"
						size="sm"
						disabled={!hasPermissionToEdit || canMessageOnBotSession}
						onClick={handleEscalateClick}
						loading={supplierLoading}
						className={styles.escalate_button}
					>
						escalate
					</Button>
				) : null}

				{channel_type !== 'email' ? (
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
				) : null}

			</div>
		</div>
	);
}

export default OptionsContainer;
