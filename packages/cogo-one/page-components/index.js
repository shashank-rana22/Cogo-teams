import { useSelector } from '@cogoport/store';
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import React, { useState } from 'react';

import { firebaseConfig } from '../configurations/firebase-config';
import useGetVoiceCallList from '../hooks/useGetVoiceCallList';
import useListChats from '../hooks/useListChats';

import Conversations from './Conversations';
import Customers from './Customers';
import ProfileDetails from './ProfileDetails';
import styles from './styles.module.css';

function CogoOne() {
	const [activeTab, setActiveTab] = useState('message');
	const [toggleStatus, setToggleStatus] = useState(false);
	const [activeMessageCard, setActiveMessageCard] = useState({});
	const [activeVoiceCard, setActiveVoiceCard] = useState({});
	const [searchValue, setSearchValue] = useState('');
	const [filterVisible, setFilterVisible] = useState(false);

	const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

	const firestore = getFirestore(app);

	const { partner, userId } = useSelector(({ profile }) => ({
		partner : profile.partner || {},
		userId  : profile?.user?.id,
	}));

	const { listData = {} } = useListChats({
		firestore,
		userId,
		user_role_ids: partner?.user_role_ids,
	});
	console.log('listData', listData);
	const { messagesList = [], unReadChatsCount } = listData;

	const {
		loading,
		data = {},
		handleScroll = () => {},
	} = useGetVoiceCallList({ activeTab });
	const { list = [] } = data;

	return (
		<div className={styles.layout_container}>
			<Customers
				setActiveMessageCard={setActiveMessageCard}
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
				voiceList={list}
				messagesList={messagesList}
				voiceListLoading={loading}
				handleScroll={handleScroll}
			/>
			<Conversations />
			<ProfileDetails activeCard={activeMessageCard} />
		</div>
	);
}

export default CogoOne;
