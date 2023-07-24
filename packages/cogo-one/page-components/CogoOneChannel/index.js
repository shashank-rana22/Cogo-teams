import { cl } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';

import { firebaseConfig } from '../../configurations/firebase-config';
import { DEFAULT_EMAIL_STATE } from '../../constants/mailConstants';
import useGetTicketsData from '../../helpers/useGetTicketsData';
import useAgentWorkPrefernce from '../../hooks/useAgentWorkPrefernce';
import useListAssignedChatTags from '../../hooks/useListAssignedChatTags';
import useListChatSuggestions from '../../hooks/useListChatSuggestions';

import AndroidApp from './AndroidApp';
import Conversations from './Conversations';
import Customers from './Customers';
import EmptyChatPage from './EmptyChatPage';
import HeaderBar from './HeaderBar';
import ModalComp from './ModalComps';
import PortPairOrgFilters from './PortPairOrgFilters';
import ProfileDetails from './ProfileDetails';
import styles from './styles.module.css';

function CogoOne() {
	const {
		query: {
			assigned_chat = '',
			channel_type = '',
		},
	} = useRouter();

	const { userId, token, userEmailAddress } = useSelector(({ profile, general }) => ({
		userId           : profile?.user?.id,
		token            : general.firestoreToken,
		userEmailAddress : profile?.user?.email,
	}));

	const [activeTab, setActiveTab] = useState({
		tab               : 'message',
		subTab            : 'all',
		hasNoFireBaseRoom : false,
		data              : assigned_chat ? {
			id: assigned_chat,
			channel_type,
		} : {},
	});

	const [activeRoomLoading, setActiveRoomLoading] = useState(false);
	const [raiseTicketModal, setRaiseTicketModal] = useState({ state: false, data: {} });
	const [modalType, setModalType] = useState({ type: null, data: {} });
	const [buttonType, setButtonType] = useState('');
	const [activeMailAddress, setActiveMailAddress] = useState(userEmailAddress);
	const [emailState, setEmailState] = useState(DEFAULT_EMAIL_STATE);
	const [openKamContacts, setOpenKamContacts] = useState(false);
	const [openSpContacts, setOpenSpContacts] = useState(false);

	const { zippedTicketsData = {}, refetchTickets = () => {} } = useGetTicketsData({
		activeMessageCard : activeTab?.data,
		activeVoiceCard   : activeTab?.data,
		activeTab         : activeTab?.tab,
		setRaiseTicketModal,
		agentId           : userId,
	});

	const { viewType, loading: workPrefernceLoading = false } = useAgentWorkPrefernce();

	const { suggestions = [] } = useListChatSuggestions();
	const { tagOptions = [] } = useListAssignedChatTags();

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
		activeMail    : activeTab?.data,
		setActiveMail : (val) => {
			setActiveTab((prev) => ({ ...prev, data: val }));
		},
	};
	const { hasNoFireBaseRoom = false } = activeTab || {};

	useEffect(() => {
		if (process.env.NEXT_PUBLIC_REST_BASE_API_URL.includes('api.cogoport.com')) {
			const auth = getAuth();

			signInWithCustomToken(auth, token).catch((error) => {
				console.error(error.message);
			});
		}
	}, [token]);

	return (
		<>
			<HeaderBar
				firestore={firestore}
				viewType={viewType}
			/>
			<div className={styles.layout_container}>
				<div className={styles.customers_layout}>
					<Customers
						viewType={viewType}
						activeTab={activeTab}
						setActiveTab={setActiveTab}
						userId={userId}
						setModalType={setModalType}
						modalType={modalType}
						tagOptions={tagOptions}
						mailProps={mailProps}
						firestore={firestore}
						suggestions={suggestions}
						workPrefernceLoading={workPrefernceLoading}
						setOpenKamContacts={setOpenKamContacts}
						setOpenSpContacts={setOpenSpContacts}
					/>
				</div>

				{openSpContacts ? (
					<PortPairOrgFilters
						setOpenSpContacts={setOpenSpContacts}
						setActiveTab={setActiveTab}
						openSpContacts={openSpContacts}
					/>
				) : null}

				{isEmpty(activeTab?.data)
					? (
						<div className={styles.empty_page}>
							<EmptyChatPage activeTab={activeTab} />
						</div>
					) : (
						<>
							<div
								className={activeTab?.tab === 'mail'
									? styles.mail_layout : styles.chats_layout}
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
								/>
							</div>

							{activeTab?.tab !== 'mail' && (
								<div className={cl`${styles.user_profile_layout} 
								${hasNoFireBaseRoom ? styles.disable_user_profile : ''}`}
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
									/>
									{hasNoFireBaseRoom && <div className={styles.overlay_div} />}
								</div>
							)}
						</>
					)}
				<AndroidApp />
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
				openSpContacts={openSpContacts}
				setOpenSpContacts={setOpenSpContacts}
			/>
		</>
	);
}

export default CogoOne;
