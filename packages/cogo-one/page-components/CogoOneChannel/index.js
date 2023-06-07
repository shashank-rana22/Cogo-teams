import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMDownload, IcMSettings } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';

import RaiseTicket from '../../common/RaiseTicket';
import { firebaseConfig } from '../../configurations/firebase-config';
import { ANDRIOD_APK } from '../../constants';
import getViewType from '../../helpers/getViewType';
import useGetTicketsData from '../../helpers/useGetTicketsData';
import useAgentWorkPrefernce from '../../hooks/useAgentWorkPrefernce';
import useCreateUserInactiveStatus from '../../hooks/useCreateUserInactiveStatus';
import useListAssignedChatTags from '../../hooks/useListAssignedChatTags';
import useListChats from '../../hooks/useListChats';
import useListChatSuggestions from '../../hooks/useListChatSuggestions';

import AgentModal from './AgentModal';
import Conversations from './Conversations';
import Customers from './Customers';
import DialCallModal from './DialCallModal';
import EmptyChatPage from './EmptyChatPage';
import FeedbackModal from './FeedbackModal';
import ProfileDetails from './ProfileDetails';
import ReminderModal from './ReminderModal';
import styles from './styles.module.css';

const geo = getGeoConstants();

function CogoOne() {
	const {
		agentStatus = {},
		fetchworkPrefernce = () => {},
	} = useAgentWorkPrefernce();

	const { status = '' } = agentStatus || {};

	const [activeTab, setActiveTab] = useState('message');
	const [toggleStatus, setToggleStatus] = useState(false);
	const [activeVoiceCard, setActiveVoiceCard] = useState({});
	const [searchValue, setSearchValue] = useState('');
	const [showBotMessages, setShowBotMessages] = useState(false);
	const [filterVisible, setFilterVisible] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const { suggestions = [] } = useListChatSuggestions();
	const [showDialModal, setShowDialModal] = useState(false);

	const [activeMail, setActiveMail] = useState({});
	const [recipientArray, setRecipientArray] = useState([]);
	const [bccArray, setBccArray] = useState([]);
	const [buttonType, setButtonType] = useState('');
	const [emailState, setEmailState] = useState({
		subject : '',
		body    : '',
	});

	const [raiseTicketModal, setRaiseTicketModal] = useState({ state: false, data: {} });
	const [agentDetails, setAgentDetails] = useState(false);
	const [showFeedback, setShowFeedback] = useState(false);

	const [modalType, setModalType] = useState({ type: null, data: {} });

	const { userRoleIds, userId, token, emailAddress } = useSelector(({ profile, general }) => ({
		userRoleIds  : profile.partner?.user_role_ids || [],
		userId       : profile?.user?.id,
		token        : general.firestoreToken,
		emailAddress : profile?.user?.email,
	}));

	const viewType = getViewType(userRoleIds);

	const isomniChannelAdmin = viewType === 'admin_view';

	const { has_voice_call_access = false } = geo.others.navigations.cogo_one;
	const {
		loading:statusLoading,
		updateUserStatus = () => {},
	} = useCreateUserInactiveStatus({ fetchworkPrefernce, setOpenModal });

	const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

	useEffect(() => {
		if (process.env.NODE_ENV === 'production') {
			const auth = getAuth();
			signInWithCustomToken(auth, token).catch((error) => {
				console.log(error.message);
			});
		}
	}, [token]);

	const firestore = getFirestore(app);

	const { tagOptions = [] } = useListAssignedChatTags();
	const mailProps = {
		activeMail,
		setActiveMail,
		recipientArray,
		setRecipientArray,
		bccArray,
		setBccArray,
		buttonType,
		setButtonType,
		emailState,
		setEmailState,
		emailAddress,
	};

	const {
		chatsData = {},
		setActiveMessage = () => {},
		activeMessageCard = {},
		setAppliedFilters = () => {},
		appliedFilters,
		loading,
		setActiveCard,
		activeCardId,
		setFirstMount,
		updateLeaduser,
		handleScroll,
		activeRoomLoading,
		getAssignedChats,
		flashMessagesLoading,
	} = useListChats({
		firestore,
		userId,
		isomniChannelAdmin,
		showBotMessages,
		searchValue,
		viewType,
		setShowFeedback,
	});

	const { zippedTicketsData = {}, refetchTickets = () => {} } = useGetTicketsData({
		activeMessageCard,
		activeVoiceCard,
		activeTab,
		setRaiseTicketModal,
		agentId: userId,
	});
	const renderComponent = () => {
		if ((activeTab === 'message' && !isEmpty(activeMessageCard))
			|| (activeTab === 'voice' && !isEmpty(activeVoiceCard))
			|| (activeTab === 'mail' && !isEmpty(activeMail))) {
			return (
				<>
					<Conversations
						activeTab={activeTab}
						activeMessageCard={activeMessageCard}
						firestore={firestore}
						activeVoiceCard={activeVoiceCard}
						suggestions={suggestions}
						userId={userId}
						isomniChannelAdmin={isomniChannelAdmin}
						mailProps={mailProps}
						setActiveMessage={setActiveMessage}
						setRaiseTicketModal={setRaiseTicketModal}
						viewType={viewType}
					/>

					{activeTab !== 'mail' && (
						<ProfileDetails
							activeMessageCard={activeMessageCard}
							activeTab={activeTab}
							activeVoiceCard={activeVoiceCard}
							updateLeaduser={updateLeaduser}
							activeCardId={activeCardId}
							setActiveMessage={setActiveMessage}
							setModalType={setModalType}
							activeRoomLoading={activeRoomLoading}
							setRaiseTicketModal={setRaiseTicketModal}
							zippedTicketsData={zippedTicketsData}
							viewType={viewType}
							hasVoiceCallAccess={has_voice_call_access}
						/>
					)}
				</>
			);
		}
		return (
			<EmptyChatPage
				displayMessage={activeTab === 'message' ? 'chat' : 'call log'}
			/>
		);
	};

	useEffect(() => {
		setActiveVoiceCard({});
		setActiveCard({});
		setActiveMail({});
		setFirstMount(true);
		if (isomniChannelAdmin) {
			setAppliedFilters({});
		}
	}, [activeTab, setActiveCard, showBotMessages, setFirstMount, setAppliedFilters, isomniChannelAdmin]);

	useEffect(() => {
		setToggleStatus(status === 'active');
	}, [status]);

	return (
		<>
			{isomniChannelAdmin && (
				<div className={styles.settings}>
					<IcMSettings
						className={styles.settings_icon}
						onClick={() => setAgentDetails(true)}
					/>
				</div>
			)}
			<div className={styles.layout_container}>
				<Customers
					isomniChannelAdmin={isomniChannelAdmin}
					viewType={viewType}
					setActiveMessage={setActiveMessage}
					activeMessageCard={activeMessageCard}
					setActiveVoiceCard={setActiveVoiceCard}
					activeVoiceCard={activeVoiceCard}
					setSearchValue={setSearchValue}
					searchValue={searchValue}
					setFilterVisible={setFilterVisible}
					filterVisible={filterVisible}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					setToggleStatus={setToggleStatus}
					toggleStatus={toggleStatus}
					chatsData={chatsData}
					appliedFilters={appliedFilters}
					setAppliedFilters={setAppliedFilters}
					fetchworkPrefernce={fetchworkPrefernce}
					messagesLoading={loading}
					setOpenModal={setOpenModal}
					openModal={openModal}
					updateUserStatus={updateUserStatus}
					statusLoading={statusLoading}
					activeCardId={activeCardId}
					setShowBotMessages={setShowBotMessages}
					showBotMessages={showBotMessages}
					setShowDialModal={setShowDialModal}
					activeMail={activeMail}
					setActiveMail={setActiveMail}
					userId={userId}
					handleScroll={handleScroll}
					setModalType={setModalType}
					modalType={modalType}
					tagOptions={tagOptions}
					mailProps={mailProps}
					firestore={firestore}
					flashMessagesLoading={flashMessagesLoading}
					hasVoiceCallAccess={has_voice_call_access}
				/>
				<div className={styles.chat_details_continer}>
					{renderComponent()}
				</div>
				<div
					className={styles.download_apk}
				>
					<div
						role="button"
						tabIndex={0}
						className={styles.download_div}
						onClick={() => window.open(ANDRIOD_APK, '_blank')}
					>
						<Image
							src={GLOBAL_CONSTANTS.image_url.cogo_logo_without_bg}
							alt="bot"
							height={16}
							width={15}
							className={styles.bot_icon_styles}
						/>
						<div className={styles.text_styles}>
							<div className={styles.flex}>
								<IcMDownload
									className={styles.download_icon}
								/>
								<div>Get the</div>
							</div>
							app now
						</div>
					</div>
				</div>
			</div>
			{agentDetails && (
				<AgentModal
					agentDetails={agentDetails}
					setAgentDetails={setAgentDetails}
				/>
			)}
			{
				showFeedback && (
					<FeedbackModal
						showFeedback={showFeedback}
						setShowFeedback={setShowFeedback}
					/>
				)
			}
			{raiseTicketModal?.state && (
				<RaiseTicket
					setRaiseTicketModal={setRaiseTicketModal}
					raiseTicketModal={raiseTicketModal}
					refetchTickets={refetchTickets}
				/>
			)}
			<ReminderModal firestore={firestore} agentId={userId} getAssignedChats={getAssignedChats} />
			{showDialModal && (
				<DialCallModal
					setShowDialModal={setShowDialModal}
					showDialModal={showDialModal}
				/>
			)}
		</>
	);
}

export default CogoOne;
