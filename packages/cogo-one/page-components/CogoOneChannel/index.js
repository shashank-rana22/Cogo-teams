import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';

import { firebaseConfig } from '../../configurations/firebase-config';
import useAgentWorkPrefernce from '../../hooks/useAgentWorkPrefernce';
import useListChats from '../../hooks/useListChats';

import Conversations from './Conversations';
import Customers from './Customers';
import EmptyChatPage from './EmptyChatPage';
import ProfileDetails from './ProfileDetails';
import styles from './styles.module.css';

function CogoOne() {
	const {
		agentStatus = {},
		workPrefernce = () => {},
	} = useAgentWorkPrefernce();
	const { status = '' } = agentStatus;

	const userStatus = status === 'active';

	const [activeTab, setActiveTab] = useState('message');
	const [toggleStatus, setToggleStatus] = useState(userStatus);
	const [activeVoiceCard, setActiveVoiceCard] = useState({});
	const [searchValue, setSearchValue] = useState('');
	const [filterVisible, setFilterVisible] = useState(false);

	const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

	const firestore = getFirestore(app);

	const { partner, userId } = useSelector(({ profile }) => ({
		partner : profile.partner || {},
		userId  : profile?.user?.id,
	}));

	const {
		listData = {},
		setActiveMessage = () => {},
		activeMessageCard,
		setAppliedFilters = () => {},
		appliedFilters,
	} = useListChats({
		firestore,
		userId,
		user_role_ids: partner?.user_role_ids,
	});

	const { messagesList = [], unReadChatsCount } = listData;
	console.log('messagesList', messagesList);

	useEffect(() => {
		setActiveVoiceCard({});
		setActiveMessage({});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeTab]);

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
				status={status}
				workPrefernce={workPrefernce}
			/>

			<div className={styles.chat_details_continer}>
				{(!isEmpty(activeMessageCard) || !isEmpty(activeVoiceCard)) ? (
					<>
						<Conversations
							activeTab={activeTab}
							activeMessageCard={activeMessageCard}
							firestore={firestore}
							activeVoiceCard={activeVoiceCard}
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
