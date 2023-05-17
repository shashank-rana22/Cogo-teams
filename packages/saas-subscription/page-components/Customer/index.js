import { useState } from 'react';

import ArrowStepper from '../../common/ArrowStepper';
import useGetUserList from '../../hooks/useGetUserList';
import useGetUserStats from '../../hooks/useGetUserStats';

import FilterContainer from './FilterContainer';
import styles from './styles.module.css';
import Table from './Table';

const items = [
	{ title: 'Total Count', key: 'platform_user' },
	{ title: 'Potential Users', key: 'potential_user' },
	{ title: 'Active Users', key: 'active_user' },
	{ title: 'Expired Plans', key: 'plan_expired_user' },
];

function CustomerSubscription() {
	const { userStatsData } = useGetUserStats();
	const {
		userList, loading,
		globalFilters, refectUserList, setGlobalFilters,
	} =	useGetUserList();

	return (
		<div className={styles.main_container}>
			<div className={styles.container}>
				<FilterContainer />
				<ArrowStepper
					items={items}
					stepperData={userStatsData}
					globalFilters={globalFilters}
					setGlobalFilters={setGlobalFilters}
				/>
				<Table userList={userList} loading={loading} setGlobalFilters={setGlobalFilters} />
			</div>

		</div>
	);
}

export default CustomerSubscription;
