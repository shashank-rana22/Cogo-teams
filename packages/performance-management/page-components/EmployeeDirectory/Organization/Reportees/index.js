import React from 'react';

import UserCard from '../UserCard';

import styles from './styles.module.css';

function Reportees({ reportees = [], params = {}, setParams = () => {} }) {
	return (
		<div className={styles.main_container}>
			<div className={styles.connecting_line} />

			<div className={styles.container}>
				{reportees?.map((item) => (
					<UserCard user_data={item} params={params} setParams={setParams} key={item.user_id} />
				))}
			</div>
		</div>
	);
}

export default Reportees;
