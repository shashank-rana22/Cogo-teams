import { useForm } from '@cogoport/forms';
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

	const props = useListChats({
		firestore,
		userId,
		user_role_ids: partner?.user_role_ids,
	});

	const [activeTab, setActiveTab] = useState('message');
	const [toggleStatus, setToggleStatus] = useState('active');
	const [activeCard, setActiveCard] = useState({});
	const [searchValue, setSearchValue] = useState('');
	const [filterVisible, setFilterVisible] = useState(false);

	const { reset, watch } = useForm();

	const filterData = watch();

	return (
		<div className={styles.layout_container}>
			{/* <Tabs activeTab={activeTab} setActiveTab={setActiveTab} /> */}
			<Customers
				setActiveCard={setActiveCard}
				activeCard={activeCard}
				setSearchValue={setSearchValue}
				searchValue={searchValue}
				setFilterVisible={setFilterVisible}
				filterVisible={filterVisible}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
					// fields={fields}
				reset={reset}
				setToggleStatus={setToggleStatus}
				toggleStatus={toggleStatus}
			/>
			<Conversations />
			<ProfileDetails />
		</div>
	);
}

export default CogoOne;
