import { useForm } from '@cogoport/forms';
import React, { useState } from 'react';

import control from '../configurations/filter-controls';

import Conversations from './Conversations';
import Customers from './Customers';
import ProfileDetails from './ProfileDetails';
import styles from './styles.module.css';

function CogoOne() {
	const [activeTab, setActiveTab] = useState('message');
	console.log('activeTab', activeTab);
	const [toggleStatus, setToggleStatus] = useState(true);
	console.log('toggleStatus', toggleStatus);
	const [activeCard, setActiveCard] = useState({});
	const [searchValue, setSearchValue] = useState('');
	const [filterVisible, setFilterVisible] = useState(false);
	const [inactiveReasons, setInactiveReasons] = useState('');
	console.log('inactiveReasons', inactiveReasons);
	const [inactiveDate, setInactiveDate] = useState('');
	const [inactiveTime, setInactiveTime] = useState('');
	console.log('inactiveTime', inactiveTime);
	console.log('inactiveDate', inactiveDate);

	const { reset, watch, control } = useForm();

	const filterData = watch();
	console.log('filterData', filterData);

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
					// fields={fields}
				reset={reset}
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
