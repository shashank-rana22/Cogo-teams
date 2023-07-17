import { Button, cl } from '@cogoport/components';
import { IcMProfile, IcMRefresh, IcCFcrossInCircle, IcCFtick, IcMCallmonitor } from '@cogoport/icons-react';
import { useDispatch } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { isEmpty } from '@cogoport/utils';
import { useState, useCallback } from 'react';

import AssigneeAvatar from '../../../../../common/AssigneeAvatar';
import HeaderName from '../../../../../common/HeaderName';
import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../../../constants/viewTypeMapping';
import useTransferChat from '../../../../../hooks/useTransferChat';

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
	activeMessageCard = {},
	tagOptions = [],
	support_agent_id = null,
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
	supplierLoading = false,
}) {
	const [isVisible, setIsVisible] = useState(false);
	const dispatch = useDispatch();

	const { requestToJoinGroup, dissmissTransferRequest } = useTransferChat({ firestore, activeMessageCard });

	const openAssignModal = () => {
		setOpenModal({
			type : 'assign',
			data : {
				closeModal,
				assignLoading,
				assignChat,
				support_agent_id,
				accountType: formattedData?.account_type,
			},
		});
	};

	const { chat_tags = [] } = activeMessageCard || {};

	const {
		mobile_no = '',
		channel_type,
		has_requested_by = {},
		group_members = [],
		organization_id = '',
		user_id,
		user_name,
		user_type = '',
		account_type = '',
		managers_ids = [],
		id,
	} = formattedData || {};

	const handleEsclateClick = () => {
		escalateToSupplyRm({
			payload: {
				organization_id,
				organization_user_id : user_id,
				channel              : channel_type,
				channel_chat_id      : id,
			},
		});
	};

	const handleUpdateUser = () => {
		if (!updateRoomLoading) {
			updateUserRoom(mobile_no);
		}
	};

	const unmountVideoCall = useCallback(() => {
		dispatch(
			setProfileState({
				video_call_recipient_data: {
					user_id,
					user_name,
				},
				is_in_video_call: true,
			}),
		);
	}, [dispatch, user_id, user_name]);

	const { agent_id = '', agent_name = '' } = has_requested_by || {};

	const hasAccessToApprove = (support_agent_id === userId
		|| VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions?.has_permission_to_edit);

	const hasRequests = !!agent_id;

	const isGroupFormed = !isEmpty(group_members);

	const showApprovePanel = (hasRequests && hasAccessToApprove);

	const isPartOfGroup = group_members?.includes(userId);
	const isManager = managers_ids?.includes(userId);

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
							supportAgentId={support_agent_id}
							isGroupFormed={isGroupFormed}
							accountType={account_type}
							isPartOfGroup={isPartOfGroup}
							isManager={isManager}
						/>

						{channel_type === 'whatsapp' && (
							<div
								role="presentation"
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
					<div className={styles.button_flex}>
						{user_type === 'cp' ? (
							<div role="presentation" className={styles.video_call_btn} onClick={unmountVideoCall}>
								<IcMCallmonitor />
							</div>

						) : null}

						{account_type === 'service_provider' && (
							<Button
								themeType="secondary"
								size="sm"
								disabled={!hasPermissionToEdit || canMessageOnBotSession}
								onClick={handleEsclateClick}
								loading={supplierLoading}
								className={styles.escalate_button}
							>
								escalate
							</Button>
						)}
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
									assignChat({ payload: { agent_id, is_allowed_to_chat: true } });
								}
							}}
						/>
						<IcCFcrossInCircle
							className={styles.icon_styles}
							cursor="pointer"
							onClick={dissmissTransferRequest}
						/>
					</>
				)}
			</div>
		</div>
	);
}

export default Header;
