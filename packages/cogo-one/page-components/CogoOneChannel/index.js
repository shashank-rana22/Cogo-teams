import { IcMDownload, IcMSettings } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';

import RaiseTicket from '../../common/RaiseTicket';
import { firebaseConfig } from '../../configurations/firebase-config';
import { ANDRIOD_APK } from '../../constants';
import { hasPermission } from '../../constants/IDS_CONSTANTS';
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
import ProfileDetails from './ProfileDetails';
import styles from './styles.module.css';

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

	const [modalType, setModalType] = useState({ type: null, data: {} });
	const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

	const firestore = getFirestore(app);

	const { userRoleIds, userId, emailAddress } = useSelector(({ profile }) => ({
		userRoleIds  : profile.partner?.user_role_ids || [],
		userId       : profile?.user?.id,
		emailAddress : profile?.user?.email,
	}));

	const isomniChannelAdmin = userRoleIds?.some((eachRole) => hasPermission.includes(eachRole)) || false;

	const {
		loading:statusLoading,
		updateUserStatus = () => {},
	} = useCreateUserInactiveStatus({ fetchworkPrefernce, setOpenModal });

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
	} = useListChats({
		firestore,
		userId,
		isomniChannelAdmin,
		showBotMessages,
		searchValue,
	});

	const { zippedTicketsData = {}, refetchTickets = () => {} } = useGetTicketsData({
		activeMessageCard,
		activeVoiceCard,
		activeTab,
		setRaiseTicketModal,
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
						<img
							src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/cogo-logo-without-bg"
							alt="bot"
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
				{showDialModal && (
					<DialCallModal
						setShowDialModal={setShowDialModal}
						showDialModal={showDialModal}
					/>
				)}
			</div>
			{agentDetails && (
				<AgentModal
					agentDetails={agentDetails}
					setAgentDetails={setAgentDetails}
				/>
			)}
			{raiseTicketModal?.state && (
				<RaiseTicket
					setRaiseTicketModal={setRaiseTicketModal}
					raiseTicketModal={raiseTicketModal}
					refetchTickets={refetchTickets}
				/>
			)}
		</>
	);
}

export default CogoOne;
