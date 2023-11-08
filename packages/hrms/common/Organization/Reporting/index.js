import { cl } from '@cogoport/components';
import React from 'react';

import UserCard from '../UserCard';

import styles from './styles.module.css';

function Reporting({
	reporting_managers = [],
	user = {},
	params = {},
	setParams = () => {},
}) {
	const reversedData = ([...reporting_managers || []]).reverse();

	return (
		<div className={styles.container}>
			{reversedData?.map((item) => (
				<div className={styles.card_container} key={item}>
					<UserCard user_data={item} params={params} setParams={setParams} />
				</div>
			))}

			<div className={cl`${styles.card_container} ${styles.leaf_node}`}>
				<UserCard
					is_leaf_node
					user_data={user}
					type="active"
					params={params}
					setParams={setParams}
				/>
			</div>
			<div className={styles.connector} />
		</div>
	);
}

export default Reporting;
