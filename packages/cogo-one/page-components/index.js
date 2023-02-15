import { useForm } from '@cogoport/forms';
import { useSelector } from '@cogoport/store';
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import React, { useState } from 'react';

import control from '../configurations/filter-controls';
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
	const [inactiveReasons, setInactiveReasons] = useState('');
	const [inactiveDate, setInactiveDate] = useState('');
	const [inactiveTime, setInactiveTime] = useState('');

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
	const { messagesList = [] } = listData;

	const {
		loading,
		data = {},
		setPagination = () => {},
	} = useGetVoiceCallList({ activeTab });
	const { list = [] } = data;

	const { reset, watch, control } = useForm();

	const filterData = watch();

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
				reset={reset}
				setToggleStatus={setToggleStatus}
				toggleStatus={toggleStatus}
				inactiveReasons={inactiveReasons}
				setInactiveReasons={setInactiveReasons}
				setInactiveDate={setInactiveDate}
				inactiveDate={inactiveDate}
				setInactiveTime={setInactiveTime}
				inactiveTime={inactiveTime}
				voiceList={list}
				messagesList={messagesList}
				voiceListLoading={loading}
			/>
			<Conversations />
			<ProfileDetails />
		</div>
	);
}

export default CogoOne;
