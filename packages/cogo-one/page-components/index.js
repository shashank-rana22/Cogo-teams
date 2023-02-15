import { useSelector } from '@cogoport/store';
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import React, { useState } from 'react';

import { firebaseConfig } from '../configurations/firebase-config';
import useListChats from '../hooks/useListChats';

import Conversations from './Conversations';
import Customers from './Customers';
import ProfileDetails from './ProfileDetails';
import styles from './styles.module.css';

function CogoOne() {
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

	const [activeTab, setActiveTab] = useState('message');
	const [toggleStatus, setToggleStatus] = useState(false);

	const [activeCard, setActiveCard] = useState({});
	const [searchValue, setSearchValue] = useState('');
	const [filterVisible, setFilterVisible] = useState(false);
	const [inactiveReasons, setInactiveReasons] = useState('');
	console.log('inactiveReasons', inactiveReasons);
	const [inactiveDate, setInactiveDate] = useState('');
	const [inactiveTime, setInactiveTime] = useState('');
	console.log('inactiveTime', inactiveTime);
	console.log('inactiveDate', inactiveDate);

	return (
		<div className={styles.layout_container}>
			<Customers
				setActiveCard={setActiveCard}
				activeCard={activeCard}
				setSearchValue={setSearchValue}
				searchValue={searchValue}
				setFilterVisible={setFilterVisible}
				filterVisible={filterVisible}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				setToggleStatus={setToggleStatus}
				toggleStatus={toggleStatus}
				inactiveReasons={inactiveReasons}
				setInactiveReasons={setInactiveReasons}
				setInactiveDate={setInactiveDate}
				inactiveDate={inactiveDate}
				setInactiveTime={setInactiveTime}
				inactiveTime={inactiveTime}
			/>
			<Conversations />
			<ProfileDetails />
		</div>
	);
}

export default CogoOne;
