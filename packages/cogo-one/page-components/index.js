import { useForm } from '@cogoport/forms';
import React, { useState } from 'react';

// import control from '../configurations/filter-controls';

import Conversations from './Conversations';
import Customers from './Customers';
import ProfileDetails from './ProfileDetails';
import styles from './styles.module.css';

function CogoOne() {
	const [activeTab, setActiveTab] = useState('message');
	const [toggleStatus, setToggleStatus] = useState(false);
	console.log('toggleStatus', toggleStatus);
	const [activeCard, setActiveCard] = useState({});
	const [searchValue, setSearchValue] = useState('');
	const [filterVisible, setFilterVisible] = useState(false);

	const { reset, watch } = useForm();

	const filterData = watch();
	console.log('filterData', filterData);

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
