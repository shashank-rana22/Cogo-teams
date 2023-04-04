import React from 'react';

import UserCard from '../UserCard';

import styles from './styles.module.css';

function Reporting({
	reporting_managers = [],
	user = {},
	params = {},
	setParams = () => {},
}) {
	return (
		<div className={styles.container}>
			{reporting_managers?.map((item) => (
				<div className={styles.card_container}>
					<UserCard user_data={item} params={params} setParams={setParams} />
				</div>
			))}

			<div className={styles.card_container}>
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
