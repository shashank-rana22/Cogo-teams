import React, { useState } from 'react';

import Conversations from './Conversations';
import Customers from './Customers';
import ProfileDetails from './ProfileDetails';
import styles from './styles.module.css';
import Tabs from './Tabs';

function CogoOne() {
	const [activeTab, setActiveTab] = useState('open');
	const [activeCard, setActiveCard] = useState({});
	const [searchValue, setSearchValue] = useState('');

	return (
		<div className={styles.layout_container}>
			<Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
			<Customers
				setActiveCard={setActiveCard}
				activeCard={activeCard}
				setSearchValue={setSearchValue}
				searchValue={searchValue}
			/>
			<Conversations />
			<ProfileDetails />
		</div>
	);
}

export default CogoOne;
