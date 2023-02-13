import { useForm } from '@cogoport/forms';
import React, { useState } from 'react';

import control from '../configurations/filter-controls';

import Conversations from './Conversations';
import Customers from './Customers';
import ProfileDetails from './ProfileDetails';
import styles from './styles.module.css';
import Tabs from './Tabs';

function CogoOne() {
	const [activeTab, setActiveTab] = useState('open');
	const [activeCard, setActiveCard] = useState({});
	const [searchValue, setSearchValue] = useState('');
	const [filterVisible, setFilterVisible] = useState(false);

	const { reset, watch } = useForm();

	// const filterData = watch();

	return (
		<div className={styles.layout_container}>
			<Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
			<Customers
				setActiveCard={setActiveCard}
				activeCard={activeCard}
				setSearchValue={setSearchValue}
				searchValue={searchValue}
				setFilterVisible={setFilterVisible}
				filterVisible={filterVisible}
				// fields={control}
				reset={reset}
			/>
			<Conversations />
			<ProfileDetails />
		</div>
	);
}

export default CogoOne;
