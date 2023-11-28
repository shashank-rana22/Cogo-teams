import { Placeholder, Toast, Button } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../../../../common/EmptyState';
import { FIREBASE_TABS } from '../../../../constants';
import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../../constants/viewTypeMapping';
import { getHasAccessToEditGroup, switchUserChats } from '../../../../helpers/agentDetailsHelpers';
import useCreateLeadProfile from '../../../../hooks/useCreateLeadProfile';
import useGetOrganization from '../../../../hooks/useGetOrganization';
import useGetUser from '../../../../hooks/useGetUser';
import useGroupChat from '../../../../hooks/useGroupChat';
import useListPartnerUsers from '../../../../hooks/useListPartnerUsers';

import AddGroupMember from './AddGroupMember';
import AgentQuickActions from './AgentQuickActions';
import AgentWiseServices from './AgentWiseServices';
import ContactVerification from './ContactVerification';
import ConversationContainer from './ConversationContainer';
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
	setModalType = () => {},
	activeRoomLoading = false,
	firestore = {},
	userId: agentId = '',
	viewType = '',
	setActiveTab = () => {},
	mailProps = {},
}) {
	const partnerId = useSelector((s) => s?.profile?.partner?.id);

	const [showAddNumber, setShowAddNumber] = useState(false);
	const [profileValue, setProfilevalue] = useState({
		name         : '',
		country_code : '+91',
		number       : '',
	});
	const [showError, setShowError] = useState(false);

	const geo = getGeoConstants();

	const {
		user_id, lead_user_id, email, user_name: messageName, mobile_no, organization_id, sender,
		channel_type = '', user_type, id = '', lead_user_details = {},
		user_details = {},
	} = formattedMessageData || {};

	const customerUserId = FIREBASE_TABS.includes(activeTab)
		? formattedMessageData?.user_id : activeVoiceCard?.user_data?.id;

	const {
		userData = {},
		loading : getUserLoading = false,
	} = useGetUser({
		userId     : customerUserId,
		leadUserId : lead_user_id,
		customerId : id,
	});

	const { partnerUsers } = useListPartnerUsers({ activeMessageCard });
	const {
		deleteGroupMember, approveGroupRequest, deleteGroupRequest,
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

	const userMessageMobileNumber = mobile_no || user_details?.whatsapp_number_eformat
	|| user_details?.mobile_number_eformat || lead_user_details?.whatsapp_number_eformat
	|| lead_user_details?.mobile_number_eformat;

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
			mobile_number : userMessageMobileNumber,
			orgId         : organization_id,
			leadUserId    : lead_user_id || lead_user_details?.lead_user_id,
		},
		firebase_emails: {
			userId        : user_id,
			name          : messageName || lead_user_details?.name,
			userEmail     : email || lead_user_details?.email,
			mobile_number : userMessageMobileNumber,
			orgId         : organization_id,
			leadUserId    : lead_user_id || lead_user_details?.lead_user_id,
		},
	};

	const { userId, name, userEmail, mobile_number, orgId, leadUserId } = DATA_MAPPING[activeTab] || {};
	const { leadUserProfile, loading: leadLoading } = useCreateLeadProfile({
		setShowError,
		sender,
		formattedMessageData,
		firestore,
	});

	const { organizationData = {}, fetchOrganization = () => {}, orgLoading = false } = useGetOrganization({
		organizationId     : orgId,
		leadOrganizationId : lead_user_details.lead_organization_id,
	});

	const isAddFeedBackButton = !getUserLoading && !orgId && lead_user_details?.lead_organization_id;

	const handleSubmit = async () => {
		if (!isEmpty(profileValue?.name) && !isEmpty(profileValue?.number)) {
			await leadUserProfile({ profileValue });
			setShowAddNumber(false);
			setProfilevalue({});
		} else {
			setShowError(true);
		}
	};

	const handleRoute = () => {
		window.open(`/${partnerId}/lead-organization/${lead_user_details?.lead_organization_id}`, '_blank');
	};

	const setActiveMessage = (val) => { switchUserChats({ val, firestore, setActiveTab }); };
	if (!userId && !leadUserId && !mobile_no) {
		return (
			<>
				<div className={styles.flex_div}>
					<div className={styles.title}>Profile</div>
					{FIREBASE_TABS.includes(activeTab) && (
						<div
							role="presentation"
							className={styles.copy_link}
							onClick={() => handleClick({ id, channel_type })}
						>
							Share
						</div>
					)}
				</div>
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
				<div className={styles.quick_actions}>
					{FIREBASE_TABS.includes(activeTab) && (
						<div
							role="presentation"
							className={styles.copy_link}
							onClick={() => handleClick({ id, channel_type })}
						>
							Share
						</div>
					)}
				</div>
			</div>

			<Profile loading={getUserLoading} name={name} userEmail={userEmail || userData?.email} />

			<ContactVerification leadUserId={leadUserId} userId={userId} loading={getUserLoading} userData={userData} />

			{(FIREBASE_TABS.includes(activeTab) && !getUserLoading && !orgLoading)
			&& (
				<AgentQuickActions
					userEmail={userEmail}
					userId={user_id}
					leadUserId={lead_user_id}
					orgId={orgId}
					mobileNumber={mobile_number}
					organizationData={organizationData}
					fetchOrganization={fetchOrganization}
					partnerId={partnerId}
					formattedMessageData={formattedMessageData}
					name={name}
				/>
			)}

			{isAddFeedBackButton ? (
				<Button size="sm" themeType="secondary" onClick={handleRoute}>Add Feedback</Button>
			) : null}
			{getUserLoading ? (
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
			{hasAccessToEditGroup && <AddGroupMember addGroupMember={addGroupMember} viewType={viewType} /> }
			<GroupMembersRequests
				deleteGroupRequest={deleteGroupRequest}
				approveGroupRequest={approveGroupRequest}
				groupMembers={activeMessageCard.requested_group_members}
				partnerUsers={partnerUsers}
				agentId={agentId}
				hasAccessToEditGroup={hasAccessToEditGroup}
			/>
			<GroupMembers
				deleteGroupMember={deleteGroupMember}
				groupMembers={activeMessageCard?.group_members}
				partnerUsers={partnerUsers}
				agentId={agentId}
				hasAccessToEditGroup={hasAccessToEditGroup}
			/>
			{(mobile_no || user_number) && (
				<>
					<div className={styles.conversation_title}>Other Channels</div>
					<ConversationContainer
						userData={userData}
						noData={!leadUserId && !userId}
						loading={getUserLoading}
						activeCardData={DATA_MAPPING[activeTab] || {}}
						activeMessageCard={activeMessageCard}
						setActiveMessage={setActiveMessage}
						leadLoading={leadLoading}
						activeRoomLoading={activeRoomLoading}
						viewType={viewType}
						mailProps={mailProps}
					/>
				</>
			)}

			{VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions?.show_services && organization_id ? (
				<AgentWiseServices orgId={organization_id} />
			) : null}
		</>
	);
}
export default AgentDetails;
