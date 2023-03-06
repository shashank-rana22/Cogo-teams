import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';

import { firebaseConfig } from '../../configurations/firebase-config';
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

	const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

	const firestore = getFirestore(app);

	const { userRoleIds, userId } = useSelector(({ profile }) => ({
		userRoleIds : profile.partner?.user_role_ids || [],
		userId      : profile?.user?.id,
	}));

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
	} = useListChats({
		firestore,
		userId,
		isomniChannelAdmin,
		showBotMessages,
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
			/>

			<div className={styles.chat_details_continer}>
				{renderComponent()}
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
