import { IcMDownload } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';

import { firebaseConfig } from '../../configurations/firebase-config';
import { ANDRIOD_APK } from '../../constants';
import { hasPermission } from '../../constants/IDS_CONSTANTS';
import useAgentWorkPrefernce from '../../hooks/useAgentWorkPrefernce';
import useCreateUserInactiveStatus from '../../hooks/useCreateUserInactiveStatus';
import useListChats from '../../hooks/useListChats';
import useListChatSuggestions from '../../hooks/useListChatSuggestions';

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
	const [modalType, setModalType] = useState({ type: null, data: {} });
	const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

	const { userRoleIds, userId, token } = useSelector(({ profile, general }) => ({
		userRoleIds : profile.partner?.user_role_ids || [],
		userId      : profile?.user?.id,
		token       : general.firestoreToken,
	}));

	useEffect(() => {
		const auth = getAuth();
		signInWithCustomToken(auth, token).catch((error) => {
			console.log(error.message);
		});
	}, [token]);

	const firestore = getFirestore(app);

	const isomniChannelAdmin = userRoleIds?.some((eachRole) => hasPermission.includes(eachRole)) || false;

	const {
		loading:statusLoading,
		updateUserStatus = () => {},
	} = useCreateUserInactiveStatus({ fetchworkPrefernce, setOpenModal });

	const {
		listData = {},
		setActiveMessage = () => {},
		activeMessageCard = {},
		setAppliedFilters = () => {},
		appliedFilters,
		loading,
		setActiveCardId,
		activeCardId,
		firstLoading,
		updateLeaduser,
		handleScroll,
	} = useListChats({
		firestore,
		userId,
		isomniChannelAdmin,
		showBotMessages,
		searchValue,
	});
	const { messagesList = [], unReadChatsCount } = listData;

	useEffect(() => {
		if (!firstLoading) {
			setActiveVoiceCard({});
			setActiveCardId('');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeTab, showBotMessages]);

	useEffect(() => {
		setToggleStatus(status === 'active');
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(agentStatus)]);

	const renderComponent = () => {
		if ((activeTab === 'message' && !isEmpty(activeMessageCard))
			|| (activeTab === 'voice' && !isEmpty(activeVoiceCard))) {
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
						showBotMessages={showBotMessages}
					/>
					<ProfileDetails
						activeMessageCard={activeMessageCard}
						activeTab={activeTab}
						activeVoiceCard={activeVoiceCard}
						firestore={firestore}
						updateLeaduser={updateLeaduser}
						activeCardId={activeCardId}
						setModalType={setModalType}
					/>
				</>
			);
		}
		return (
			<EmptyChatPage
				displayMessage={activeTab === 'message' ? 'chat' : 'call log'}
			/>
		);
	};

	return (
		<div className={styles.layout_container}>
			<Customers
				setActiveCardId={setActiveCardId}
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
				messagesList={messagesList}
				unReadChatsCount={unReadChatsCount}
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
				handleScroll={handleScroll}
				setModalType={setModalType}
				modalType={modalType}
			/>

			<div className={styles.chat_details_continer}>
				{renderComponent()}
			</div>
			<div
				className={styles.download_apk}
			>
				<div
					role="presentation"
					className={styles.download_div}
					// eslint-disable-next-line no-undef
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
								fill="#EE3425"
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
	);
}

export default CogoOne;
