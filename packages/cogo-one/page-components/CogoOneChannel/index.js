import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';

import { firebaseConfig } from '../../configurations/firebase-config';
import useAgentWorkPrefernce from '../../hooks/useAgentWorkPrefernce';
import useCreateUserInactiveStatus from '../../hooks/useCreateUserInactiveStatus';
import useListChats from '../../hooks/useListChats';
import useListChatSuggestions from '../../hooks/useListChatSuggestions';

import Conversations from './Conversations';
import Customers from './Customers';
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
	const [filterVisible, setFilterVisible] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const { suggestions = [] } = useListChatSuggestions();

	const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

	const firestore = getFirestore(app);

	const { partner, userId } = useSelector(({ profile }) => ({
		partner : profile.partner || {},
		userId  : profile?.user?.id,
	}));
	const {
		loading:statusLoading,
		updateUserStatus = () => {},
	} = useCreateUserInactiveStatus({ fetchworkPrefernce, setOpenModal });

	const {
		listData = {},
		setActiveMessage = () => {},
		activeMessageCard,
		setAppliedFilters = () => {},
		appliedFilters,
		loading,
	} = useListChats({
		firestore,
		userId,
		user_role_ids: partner?.user_role_ids,
	});

	const { messagesList = [], unReadChatsCount } = listData;

	useEffect(() => {
		setActiveVoiceCard({});
		setActiveMessage({});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeTab]);

	useEffect(() => {
		setToggleStatus(status === 'active');
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(agentStatus)]);

	return (
		<div className={styles.layout_container}>
			<Customers
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
			/>

			<div className={styles.chat_details_continer}>
				{(!isEmpty(activeMessageCard) || !isEmpty(activeVoiceCard)) ? (
					<>
						<Conversations
							activeTab={activeTab}
							activeMessageCard={activeMessageCard}
							firestore={firestore}
							activeVoiceCard={activeVoiceCard}
							suggestions={suggestions}
						/>
						<ProfileDetails
							activeMessageCard={activeMessageCard}
							activeTab={activeTab}
							activeVoiceCard={activeVoiceCard}
						/>
					</>
				) : (
					<EmptyChatPage
						displayMessage={activeTab === 'message' ? 'chat' : 'call log'}
					/>
				)}
			</div>
		</div>
	);
}

export default CogoOne;
