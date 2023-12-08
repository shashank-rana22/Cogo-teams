/* eslint-disable max-lines-per-function */
import { cl } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';

import { firebaseConfig } from '../../configurations/firebase-config';
import {
	ENABLE_EXPAND_SIDE_BAR, ENABLE_SIDE_BAR,
	// FIREBASE_TABS
} from '../../constants';
import { DEFAULT_EMAIL_STATE } from '../../constants/mailConstants';
import { getInitialData } from '../../helpers/getInitialData';
// import useGetTicketsData from '../../helpers/useGetTicketsData';
import useAgentWorkPrefernce from '../../hooks/useAgentWorkPrefernce';
import useGetIsMobile from '../../hooks/useGetIsMobile';
import useGetSignature from '../../hooks/useGetSignature';
import useListChatSuggestions from '../../hooks/useListChatSuggestions';
import useListCogooneGroupMembers from '../../hooks/useListCogooneGroupMembers';
// import getActiveCardDetails from '../../utils/getActiveCardDetails';

import Calender from './Calendar';
import Conversations from './Conversations';
import Customers from './Customers';
import EmptyChatPage from './EmptyChatPage';
// import ModalComp from './ModalComps';
// import ProfileDetails from './ProfileDetails';
import styles from './styles.module.css';

function CogoOne() {
	const { query: { assigned_chat = '', channel_type = '' } } = useRouter();
	const { userId = '', userEmailAddress = '', userName = '' } = useSelector(({ profile }) => ({
		userId           : profile?.user?.id,
		userName         : profile?.user?.name,
		userEmailAddress : profile?.user?.email,
	}));

	const [activeTab, setActiveTab] = useState(getInitialData({ assigned_chat, channel_type }));
	const [viewType, setViewType] = useState('');
	// const [activeRoomLoading, setActiveRoomLoading] = useState(false);
	// const [raiseTicketModal, setRaiseTicketModal] = useState({ state: false, data: {} });
	const [modalType, setModalType] = useState({ type: null, data: {} });
	const [buttonType, setButtonType] = useState('');
	const [activeMailAddress, setActiveMailAddress] = useState('');
	const [emailState, setEmailState] = useState(DEFAULT_EMAIL_STATE);
	// const [openKamContacts, setOpenKamContacts] = useState(false);
	const [selectedAutoAssign, setSelectedAutoAssign] = useState({});
	const [mailAttachments, setMailAttachments] = useState([]);

	// const { zippedTicketsData = {}, refetchTickets = () => {} } = useGetTicketsData({
	// 	activeMessageCard : activeTab?.data,
	// 	activeVoiceCard   : activeTab?.data,
	// 	activeTab         : activeTab?.tab,
	// 	setRaiseTicketModal,
	// 	agentId           : userId,
	// });
	const {
		viewType: initialViewType = '', userSharedMails = [],
	} = useAgentWorkPrefernce();

	const { signature } = useGetSignature({ viewType });

	const { suggestions = [] } = useListChatSuggestions();

	const { isMobile = false } = useGetIsMobile();
	const { group_id = '' } = activeTab?.data || {};

	const {
		listCogooneGroupMembers = () => {},
		membersList = [],
		// groupMembersLoading,
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
		setActiveTab,
		selectedAutoAssign,
		queryAssignedChat: assigned_chat,
		isMobile,
		setSelectedAutoAssign,
		viewType,
	};

	const teamsSideBarCheck = (activeTab?.tab === 'teams' && (!!activeTab?.data?.id || !!activeTab?.data?.group_id));
	// const { hasNoFireBaseRoom = false, data:tabData } = activeTab || {};
	// const { user_id = '', lead_user_id = '' } = tabData || {};
	// const formattedMessageData = getActiveCardDetails(activeTab?.data) || {};
	// const orgId = FIREBASE_TABS.includes(activeTab?.tab)
	// 	? formattedMessageData?.organization_id
	// 	: activeTab?.data?.organization_id;
	const expandedSideBar = (ENABLE_SIDE_BAR.includes(activeTab?.data?.channel_type)
		|| ((ENABLE_EXPAND_SIDE_BAR.includes(
			activeTab?.data?.channel_type,
		) || teamsSideBarCheck) && activeTab?.expandSideBar));
	const collapsedSideBar = (ENABLE_EXPAND_SIDE_BAR.includes(activeTab?.data?.channel_type) || teamsSideBarCheck)
								&& !activeTab?.expandSideBar;

	useEffect(() => setViewType(initialViewType), [initialViewType]);
	console.log(activeTab?.showSidebar, 'Send Bulk Templates');

	return (
		<>
			<div className={styles.layout_container}>
				<div
					style={(!isMobile || isEmpty(activeTab?.data)) ? {} : { display: 'none' }}
					className={isMobile ? styles.mobile_customer_layout : styles.customers_layout}
				>
					<Customers
						activeTab={activeTab}
						userId={userId}
						setModalType={setModalType}
						modalType={modalType}
						// tagOptions={tagOptions}
						// mailProps={mailProps}
						firestore={firestore}
						// suggestions={suggestions}
						// workPrefernceLoading={workPrefernceLoading}
						// setOpenKamContacts={setOpenKamContacts}
						// agentStatus={agentWorkStatus}
						// fetchworkPrefernce={fetchWorkStatus}
						// agentTimeline={agentTimeline}
						// autoAssignChats={autoAssignChats}
						{...commonProps}
					/>
				</div>
				{isEmpty(activeTab?.data)
					? (
						<div
							className={styles.empty_page}
						>
							<EmptyChatPage
								activeTab={activeTab}
								// viewType={viewType}
								// setActiveTab={setActiveTab}
								// mailProps={mailProps}
								// isBotSession={isBotSession}
								// firestore={firestore}
								// userId={userId}
								// initialViewType={initialViewType}
							/>
						</div>
					) : null}
				{isEmpty(activeTab?.data) ? null : (
					<>
						<div
							style={(!isMobile || !activeTab?.expandSideBar) ? {} : { display: 'none' }}
							className={cl`${styles.chat_body} ${expandedSideBar ? styles.chats_layout : ''} 
									${collapsedSideBar ? styles.mail_layout : ''} 
								${!expandedSideBar && !collapsedSideBar ? styles.nosidebar_layout : ''}
								${isMobile ? styles.mobile_nosidebar_layout : ''}`}
						>
							<Conversations
								activeTab={activeTab}
								firestore={firestore}
								userId={userId}
								// setRaiseTicketModal={setRaiseTicketModal}
								// setActiveRoomLoading={setActiveRoomLoading}
								mailProps={mailProps}
								suggestions={suggestions}
								// setModalType={setModalType}
								listCogooneGroupMembers={listCogooneGroupMembers}
								membersList={membersList}
								{...commonProps}
							/>
						</div>

						{/* {((ENABLE_SIDE_BAR.includes(activeTab?.data?.channel_type)
								|| ENABLE_EXPAND_SIDE_BAR.includes(activeTab?.data?.channel_type)
								|| teamsSideBarCheck))
							? (
								<div
									className={cl`${styles.user_profile_layout}
								${(hasNoFireBaseRoom && !user_id && !lead_user_id) ? styles.disable_user_profile : ''}
								${expandedSideBar ? styles.expanded_side_bar : styles.collapsed_side_bar}
								${isMobile ? styles.mobile_user_profile_layout : null}`}
									style={(!isMobile || activeTab?.showSidebar) ? {} : { display: 'none' }}
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
										firestore={firestore}
										userId={userId}
										formattedMessageData={formattedMessageData}
										orgId={orgId}
										mailProps={mailProps}
										chatsConfig={activeTab}
										membersList={membersList}
										teamsSideBarCheck={teamsSideBarCheck}
										groupMembersLoading={groupMembersLoading}
										userName={userName}
										{...commonProps}
									/>
									{(hasNoFireBaseRoom && !user_id && !lead_user_id)
									&& <div className={styles.overlay_div} />}
								</div>
							) : null} */}
					</>
				)}
			</div>
			{!isMobile ? <Calender firestore={firestore} /> : null}
			{/* <ModalComp
				raiseTicketModal={raiseTicketModal}
				setRaiseTicketModal={setRaiseTicketModal}
				refetchTickets={refetchTickets}
				firestore={firestore}
				userId={userId}
				openKamContacts={openKamContacts}
				setOpenKamContacts={setOpenKamContacts}
				orgId={orgId}
				{...commonProps}
			/> */}
		</>
	);
}

export default CogoOne;
