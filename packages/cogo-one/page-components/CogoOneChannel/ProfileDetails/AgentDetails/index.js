import { Pill, Placeholder, Toast } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMCall, IcCWhatsapp } from '@cogoport/icons-react';
import { isEmpty, snakeCase } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../../../../common/EmptyState';
import { getHasAccessToEditGroup, switchUserChats } from '../../../../helpers/agentDetailsHelpers';
import useCreateLeadProfile from '../../../../hooks/useCreateLeadProfile';
import useGetUser from '../../../../hooks/useGetUser';
import useGroupChat from '../../../../hooks/useGroupChat';
import useListPartnerUsers from '../../../../hooks/useListPartnerUsers';

import AddGroupMember from './AddGroupMember';
import ConversationContainer from './ConversationContainer';
import ExecutiveSummary from './ExecutiveSummary';
import GroupMembers from './GroupMembers';
import GroupMembersRequests from './GroupMembersRequests';
import Profile from './Profile';
import styles from './styles.module.css';
import VoiceCallComponent from './VoiceCallComponent';

const handleClick = ({ id, channel_type }) => {
	const OMNICHANNEL_URL = window.location.href.split('?')?.[GLOBAL_CONSTANTS.zeroth_index];
	navigator.clipboard.writeText(`${OMNICHANNEL_URL}?assigned_chat=${id}&channel_type=${channel_type}`);
	Toast.success('Copied!!!');
};

function AgentDetails({
	activeMessageCard = {},
	activeTab = '',
	activeVoiceCard = {},
	formattedMessageData = {},
	customerId = '',
	setModalType = () => {},
	activeRoomLoading = false,
	activeSelect = '',
	setActiveSelect = () => {},
	setShowMore = () => {},
	firestore = {},
	userId: agentId = '',
	viewType = '',
	setActiveTab = () => {},
}) {
	const [showAddNumber, setShowAddNumber] = useState(false);
	const [profileValue, setProfilevalue] = useState({
		name         : '',
		country_code : '+91',
		number       : '',
	});
	const [showError, setShowError] = useState(false);

	const geo = getGeoConstants();

	const {
		user_id,
		lead_user_id,
		email,
		user_name: messageName,
		mobile_no,
		organization_id,
		sender,
		channel_type = '',
		user_type,
		id = '',
		lead_user_details = {},
	} = formattedMessageData || {};

	const { partnerUsers } = useListPartnerUsers({ activeMessageCard });
	const {
		deleteGroupMember,
		approveGroupRequest,
		deleteGroupRequest,
		addGroupMember,
	} = useGroupChat({ activeMessageCard, firestore });

	const hasAccessToEditGroup = getHasAccessToEditGroup({
		formattedMessageData,
		agentId,
		viewType,
	});

	const {
		user_data = {},
		user_number = '',
		organization_id: voiceOrgId = '',
	} = activeVoiceCard || {};

	const DATA_MAPPING = {
		voice: {
			userId        : user_data?.id,
			name          : user_data?.name,
			userEmail     : user_data?.email,
			mobile_number : user_number,
			orgId         : voiceOrgId,
			leadUserId    : null,
		},
		message: {
			userId        : user_id,
			name          : messageName || lead_user_details?.name,
			userEmail     : email || lead_user_details?.email,
			mobile_number : mobile_no,
			orgId         : organization_id,
			leadUserId    : lead_user_id,
		},
	};

	const { userId, name, userEmail, mobile_number, orgId, leadUserId } = DATA_MAPPING[activeTab];

	const { leadUserProfile, loading: leadLoading } = useCreateLeadProfile({
		setShowError,
		sender,
		formattedMessageData,
		firestore,
	});

	const { userData, loading } = useGetUser({ userId, lead_user_id: leadUserId, customerId });

	const { mobile_verified, whatsapp_verified } = userData || {};
	const VERIFICATION_STATUS = [
		{
			label      : mobile_verified ? 'Verified' : 'Not Verified',
			color      : mobile_verified ? 'green' : '#f8aea8',
			size       : 'sm',
			prefixIcon : <IcMCall />,
		},
		{
			label      : whatsapp_verified ? 'Verified' : 'Not Verified',
			color      : whatsapp_verified ? 'green' : '#f8aea8',
			size       : 'sm',
			prefixIcon : <IcCWhatsapp />,
		},
	];
	const handleSubmit = async () => {
		if (!isEmpty(profileValue?.name) && !isEmpty(profileValue?.number)) {
			await leadUserProfile({ profileValue });
			setShowAddNumber(false);
			setProfilevalue({});
		} else {
			setShowError(true);
		}
	};

	const handleSummary = () => {
		setShowMore(true);
		setActiveSelect('user_activity');
	};

	const setActiveMessage = (val) => {
		switchUserChats({ val, firestore, setActiveTab });
	};

	if (!userId && !leadUserId && !mobile_no) {
		return (
			<>
				<div className={styles.title}>Profile</div>
				<EmptyState
					type="profile"
					user_type={user_type}
					leadLoading={leadLoading}
					handleSubmit={handleSubmit}
					showAddNumber={showAddNumber}
					setProfilevalue={setProfilevalue}
					setShowAddNumber={setShowAddNumber}
					profileValue={profileValue}
					showError={showError}
					setShowError={setShowError}
				/>
			</>
		);
	}

	return (
		<>
			<div className={styles.top_div}>
				<div className={styles.title}>Profile</div>
				{activeTab === 'message' && (
					<div
						role="presentation"
						className={styles.copy_link}
						onClick={() => handleClick({ id, channel_type })}
					>
						Share
					</div>
				)}
			</div>
			<Profile loading={loading} name={name} userEmail={userEmail} />
			{(leadUserId || userId) && (
				<div className={styles.verification_pills}>
					{VERIFICATION_STATUS.map((item, index) => {
						const itemKey = `${snakeCase(item.label)}_${index}`;
						return (
							<div key={itemKey}>
								{loading ? (
									<Placeholder
										height="20px"
										width="120px"
										margin="10px 0px 10px 0px"
									/>
								) : (
									<Pill
										key={item.label}
										prefix={item.prefixIcon}
										size="md"
										color={item.color}
									>
										<div className={styles.pill_name}>
											{item.label}
										</div>
									</Pill>
								)}
							</div>
						);
					})}
				</div>
			)}
			{loading ? (
				<Placeholder
					height="50px"
					width="220px"
					margin="0px 0px 0px 0px"
				/>
			) : (
				<VoiceCallComponent
					userMobile={mobile_number}
					orgId={orgId}
					userId={userId}
					userName={name}
					activeTab={activeTab}
					setModalType={setModalType}
					hasVoiceCallAccess={geo.others.navigations.cogo_one.has_voice_call_access}
				/>
			)}
			{hasAccessToEditGroup && <AddGroupMember addGroupMember={addGroupMember} /> }
			<GroupMembersRequests
				deleteGroupRequest={deleteGroupRequest}
				approveGroupRequest={approveGroupRequest}
				groupMembers={activeMessageCard.requested_group_members}
				partnerUsers={partnerUsers}
				hasAccessToEditGroup={hasAccessToEditGroup}
			/>
			<GroupMembers
				deleteGroupMember={deleteGroupMember}
				groupMembers={activeMessageCard?.group_members}
				partnerUsers={partnerUsers}
				hasAccessToEditGroup={hasAccessToEditGroup}
			/>
			{(mobile_no || user_number) && (
				<>
					<div className={styles.conversation_title}>Other Channels</div>
					<ConversationContainer
						userData={userData}
						noData={!leadUserId && !userId}
						loading={loading}
						activeCardData={DATA_MAPPING[activeTab] || {}}
						activeMessageCard={activeMessageCard}
						setActiveMessage={setActiveMessage}
						leadLoading={leadLoading}
						activeRoomLoading={activeRoomLoading}
						viewType={viewType}
					/>
				</>
			)}

			<ExecutiveSummary
				handleSummary={handleSummary}
				mobile_no={mobile_no}
				sender={sender}
				user_id={user_id}
				lead_user_id={lead_user_id}
				channel_type={channel_type}
				activeSelect={activeSelect}
			/>
		</>
	);
}
export default AgentDetails;
