import { cl } from '@cogoport/components';
import { useRouter, dynamic } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';

import { firebaseConfig } from '../../configurations/firebase-config';
import { ENABLE_EXPAND_SIDE_BAR, ENABLE_SIDE_BAR, FIREBASE_TABS } from '../../constants';
import { DEFAULT_EMAIL_STATE } from '../../constants/mailConstants';
import { getInitialData } from '../../helpers/getInitialData';
import useGetTicketsData from '../../helpers/useGetTicketsData';
import useAgentWorkPrefernce from '../../hooks/useAgentWorkPrefernce';
import useGetAgentPreference from '../../hooks/useGetAgentPreference';
import useGetAgentTimeline from '../../hooks/useGetAgentTimeline';
import useGetSignature from '../../hooks/useGetSignature';
import useListAssignedChatTags from '../../hooks/useListAssignedChatTags';
import useListChatSuggestions from '../../hooks/useListChatSuggestions';
import useListCogooneGroupMembers from '../../hooks/useListCogooneGroupMembers';
import getActiveCardDetails from '../../utils/getActiveCardDetails';

import Conversations from './Conversations';
import Customers from './Customers';
import EmptyChatPage from './EmptyChatPage';
import HeaderBar from './HeaderBar';
import ModalComp from './ModalComps';
import ProfileDetails from './ProfileDetails';
import styles from './styles.module.css';

const PortPairOrgFilters = dynamic(() => import('./PortPairOrgFilters'));

function CogoOne() {
	const { query: { assigned_chat = '', channel_type = '' } } = useRouter();
	const { userId = '', token = '', userEmailAddress = '', userName = '' } = useSelector(({ profile, general }) => ({
		userId           : profile?.user?.id,
		userName         : profile?.user?.name,
		token            : general.firestoreToken,
		userEmailAddress : profile?.user?.email,
	}));

	const [activeTab, setActiveTab] = useState(getInitialData({ assigned_chat, channel_type }));
	const [viewType, setViewType] = useState('');
	const [activeRoomLoading, setActiveRoomLoading] = useState(false);
	const [raiseTicketModal, setRaiseTicketModal] = useState({ state: false, data: {} });
	const [modalType, setModalType] = useState({ type: null, data: {} });
	const [buttonType, setButtonType] = useState('');
	const [activeMailAddress, setActiveMailAddress] = useState('');
	const [emailState, setEmailState] = useState(DEFAULT_EMAIL_STATE);
	const [openKamContacts, setOpenKamContacts] = useState(false);
	const [sendBulkTemplates, setSendBulkTemplates] = useState(false);
	const [selectedAutoAssign, setSelectedAutoAssign] = useState({});
	const [autoAssignChats, setAutoAssignChats] = useState(true);
	const [mailAttachments, setMailAttachments] = useState([]);
	const [isBotSession, setIsBotSession] = useState(false);

	const { zippedTicketsData = {}, refetchTickets = () => {} } = useGetTicketsData({
		activeMessageCard : activeTab?.data,
		activeVoiceCard   : activeTab?.data,
		activeTab         : activeTab?.tab,
		setRaiseTicketModal,
		agentId           : userId,
	});
	const {
		viewType: initialViewType = '', loading: workPrefernceLoading = false, userSharedMails = [],
	} = useAgentWorkPrefernce();
	const { fetchWorkStatus = () => {}, agentWorkStatus = {}, preferenceLoading = false } = useGetAgentPreference();
	const { signature } = useGetSignature({ viewType });
	const { agentTimeline = () => {}, data = {}, timelineLoading = false } = useGetAgentTimeline({ viewType });
	const { suggestions = [] } = useListChatSuggestions();
	const { tagOptions = [] } = useListAssignedChatTags();

	const { group_id = '' } = activeTab?.data || {};

	const {
		listCogooneGroupMembers = () => {},
		membersList = [], groupMembersLoading,
	} = useListCogooneGroupMembers({ globalGroupId: group_id });

	const app = isEmpty(getApps()) ? initializeApp(firebaseConfig) : getApp();
	const firestore = getFirestore(app);

	const mailProps = {
		buttonType,
		setButtonType,
		emailState,
		setEmailState,
		userEmailAddress,
		activeMailAddress,
		setActiveMailAddress,
		viewType,
		userSharedMails,
		activeMail    : activeTab?.data,
		setActiveMail : ({ val = {}, tab = '', expandSideBar }) => {
			setActiveTab((prev) => ({ ...prev, data: val, tab, expandSideBar }));
		},
		userId,
		userName,
		signature,
		resetEmailState: ({ mailView = '' } = {}) => {
			setEmailState({ ...DEFAULT_EMAIL_STATE, mailView, body: signature });
			setMailAttachments([]);
		},
		setMailAttachments,
		mailAttachments,
	};
	const commonProps = {
		setSendBulkTemplates,
		preferenceLoading,
		setActiveTab,
		selectedAutoAssign,
		setAutoAssignChats,
		queryAssignedChat: assigned_chat,
	};

	const teamsSideBarCheck = (activeTab?.tab === 'teams' && (!!activeTab?.data?.id || !!activeTab?.data?.group_id));
	const { hasNoFireBaseRoom = false, data:tabData } = activeTab || {};
	const { user_id = '', lead_user_id = '' } = tabData || {};
	const formattedMessageData = getActiveCardDetails(activeTab?.data) || {};
	const orgId = FIREBASE_TABS.includes(activeTab?.tab)
		? formattedMessageData?.organization_id
		: activeTab?.data?.organization_id;
	const expandedSideBar = (ENABLE_SIDE_BAR.includes(activeTab?.data?.channel_type)
		|| ((ENABLE_EXPAND_SIDE_BAR.includes(
			activeTab?.data?.channel_type,
		) || teamsSideBarCheck) && activeTab?.expandSideBar));
	const collapsedSideBar = (ENABLE_EXPAND_SIDE_BAR.includes(activeTab?.data?.channel_type) || teamsSideBarCheck)
								&& !activeTab?.expandSideBar;
	useEffect(() => {
		if (process.env.NEXT_PUBLIC_REST_BASE_API_URL.includes('api.cogoport.com')) {
			const auth = getAuth();
			signInWithCustomToken(auth, token).catch((error) => {
				console.error(error.message);
			});
		}
	}, [token]);

	useEffect(
		() => { setViewType(initialViewType); },
		[initialViewType],
	);

	return (
		<>
			<HeaderBar
				firestore={firestore}
				viewType={viewType}
				fetchWorkStatus={fetchWorkStatus}
				agentStatus={agentWorkStatus}
				data={data}
				agentTimeline={agentTimeline}
				preferenceLoading={preferenceLoading}
				timelineLoading={timelineLoading}
				userId={userId}
				initialViewType={initialViewType}
				setViewType={setViewType}
			/>
			<div className={styles.layout_container}>
				<div className={styles.customers_layout}>
					<Customers
						setIsBotSession={setIsBotSession}
						isBotSession={isBotSession}
						viewType={viewType}
						activeTab={activeTab}
						userId={userId}
						setModalType={setModalType}
						modalType={modalType}
						tagOptions={tagOptions}
						mailProps={mailProps}
						firestore={firestore}
						suggestions={suggestions}
						workPrefernceLoading={workPrefernceLoading}
						setOpenKamContacts={setOpenKamContacts}
						agentStatus={agentWorkStatus}
						fetchworkPrefernce={fetchWorkStatus}
						agentTimeline={agentTimeline}
						setSelectedAutoAssign={setSelectedAutoAssign}
						autoAssignChats={autoAssignChats}
						{...commonProps}
					/>
				</div>
				{sendBulkTemplates ? (
					<PortPairOrgFilters
						setSelectedAutoAssign={setSelectedAutoAssign}
						sendBulkTemplates={sendBulkTemplates}
						viewType={viewType}
						{...commonProps}
					/>
				) : null}
				{isEmpty(activeTab?.data)
					? (
						<div className={styles.empty_page}>
							<EmptyChatPage
								activeTab={activeTab}
								viewType={viewType}
								setActiveTab={setActiveTab}
								mailProps={mailProps}
								isBotSession={isBotSession}
								firestore={firestore}
								userId={userId}
								initialViewType={initialViewType}
							/>
						</div>
					) : (
						<>
							<div
								className={cl`${styles.chat_body} ${expandedSideBar ? styles.chats_layout : ''} 
								${collapsedSideBar ? styles.mail_layout : ''} 
								${!expandedSideBar && !collapsedSideBar ? styles.nosidebar_layout : ''}`}
							>
								<Conversations
									activeTab={activeTab}
									firestore={firestore}
									userId={userId}
									setRaiseTicketModal={setRaiseTicketModal}
									viewType={viewType}
									setActiveRoomLoading={setActiveRoomLoading}
									mailProps={mailProps}
									setActiveTab={setActiveTab}
									suggestions={suggestions}
									setModalType={setModalType}
									listCogooneGroupMembers={listCogooneGroupMembers}
									membersList={membersList}
								/>
							</div>
							{(
								ENABLE_SIDE_BAR.includes(activeTab?.data?.channel_type)
								|| ENABLE_EXPAND_SIDE_BAR.includes(activeTab?.data?.channel_type)
								|| teamsSideBarCheck
							) ? (
								<div className={cl`${styles.user_profile_layout} 
								${(hasNoFireBaseRoom && !user_id && !lead_user_id) ? styles.disable_user_profile : ''}
								${expandedSideBar ? styles.expanded_side_bar : styles.collapsed_side_bar}`}
								>
									<ProfileDetails
										activeMessageCard={activeTab?.data}
										activeTab={activeTab?.tab}
										activeVoiceCard={activeTab?.data}
										activeCardId={activeTab?.data?.id}
										setModalType={setModalType}
										activeRoomLoading={activeRoomLoading}
										setRaiseTicketModal={setRaiseTicketModal}
										zippedTicketsData={zippedTicketsData}
										viewType={viewType}
										firestore={firestore}
										userId={userId}
										setActiveTab={setActiveTab}
										formattedMessageData={formattedMessageData}
										orgId={orgId}
										mailProps={mailProps}
										chatsConfig={activeTab}
										membersList={membersList}
										teamsSideBarCheck={teamsSideBarCheck}
										groupMembersLoading={groupMembersLoading}
										userName={userName}
									/>
									{(hasNoFireBaseRoom && !user_id && !lead_user_id)
									&& <div className={styles.overlay_div} />}
								</div>
								) : null}
						</>
					)}
			</div>
			<ModalComp
				raiseTicketModal={raiseTicketModal}
				setRaiseTicketModal={setRaiseTicketModal}
				refetchTickets={refetchTickets}
				firestore={firestore}
				userId={userId}
				openKamContacts={openKamContacts}
				setOpenKamContacts={setOpenKamContacts}
				setActiveTab={setActiveTab}
				orgId={orgId}
				viewType={viewType}
			/>
		</>
	);
}

export default CogoOne;
