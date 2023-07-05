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

import { firebaseConfig } from '../../configurations/firebase-config';
import { ANDRIOD_APK } from '../../constants';
import getViewType from '../../helpers/getViewType';
import useGetTicketsData from '../../helpers/useGetTicketsData';
import useAgentWorkPrefernce from '../../hooks/useAgentWorkPrefernce';
import useCreateUserInactiveStatus from '../../hooks/useCreateUserInactiveStatus';
import useListAssignedChatTags from '../../hooks/useListAssignedChatTags';
import useListChats from '../../hooks/useListChats';
import useListChatSuggestions from '../../hooks/useListChatSuggestions';

import ConversationsComp from './ConversationComp';
import Customers from './Customers';
import ModalComp from './ModalComps';
import styles from './styles.module.css';

const geo = getGeoConstants();

function CogoOne() {
	const {
		agentStatus = {},
		fetchworkPrefernce = () => {},
	} = useAgentWorkPrefernce();

	const { status = '' } = agentStatus || {};

	const [activeTab, setActiveTab] = useState('message');
	const [activeSubTab, setActiveSubTab] = useState('all');
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

	const { userRoleIds, userId, token, emailAddress, authRoleData } = useSelector(({ profile, general }) => ({
		userRoleIds  : profile.partner?.user_role_ids || [],
		userId       : profile?.user?.id,
		token        : general.firestoreToken,
		emailAddress : profile?.user?.email,
		authRoleData : profile?.auth_role_data,
	}));

	const viewType = getViewType({ userRoleIds, userId, authRoleData });

	const isomniChannelAdmin = viewType === 'admin_view';

	const { has_voice_call_access = false } = geo.others.navigations.cogo_one;
	const {
		loading:statusLoading,
		updateUserStatus = () => {},
	} = useCreateUserInactiveStatus({ fetchworkPrefernce, setOpenModal });

	const app = isEmpty(getApps()) ? initializeApp(firebaseConfig) : getApp();

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
		activeSubTab,
	});

	const { zippedTicketsData = {}, refetchTickets = () => {} } = useGetTicketsData({
		activeMessageCard,
		activeVoiceCard,
		activeTab,
		setRaiseTicketModal,
		agentId: userId,
	});

	useEffect(() => {
		setActiveVoiceCard({});
		setActiveCard({});
		setActiveMail({});
		setFirstMount(true);
		if (isomniChannelAdmin) {
			setAppliedFilters({});
		}
	}, [activeTab, activeSubTab, setActiveCard, showBotMessages, setFirstMount, setAppliedFilters, isomniChannelAdmin]);

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
					activeSubTab={activeSubTab}
					setActiveSubTab={setActiveSubTab}
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
					<ConversationsComp
						activeTab={activeTab}
						activeMessageCard={activeMessageCard}
						activeVoiceCard={activeVoiceCard}
						activeMail={activeMail}
						firestore={firestore}
						suggestions={suggestions}
						userId={userId}
						isomniChannelAdmin={isomniChannelAdmin}
						mailProps={mailProps}
						setActiveMessage={setActiveMessage}
						setRaiseTicketModal={setRaiseTicketModal}
						viewType={viewType}
						updateLeaduser={updateLeaduser}
						activeCardId={activeCardId}
						setModalType={setModalType}
						activeRoomLoading={activeRoomLoading}
						zippedTicketsData={zippedTicketsData}
						hasVoiceCallAccess={has_voice_call_access}
					/>
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
			<ModalComp
				agentDetails={agentDetails}
				setAgentDetails={setAgentDetails}
				showFeedback={showFeedback}
				setShowFeedback={setShowFeedback}
				raiseTicketModal={raiseTicketModal}
				setRaiseTicketModal={setRaiseTicketModal}
				refetchTickets={refetchTickets}
				firestore={firestore}
				showDialModal={showDialModal}
				setShowDialModal={setShowDialModal}
				userId={userId}
				getAssignedChats={getAssignedChats}
			/>
		</>
	);
}

export default CogoOne;
