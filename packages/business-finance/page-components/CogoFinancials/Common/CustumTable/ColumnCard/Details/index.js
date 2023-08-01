import React from 'react';

import DetailCard from './DetailCard';
import styles from './styles.module.css';

const fields = ['Revenue', 'Expense'];

function Details({ item = {}, taxType = {}, LABEL_MAPPING = [], type = '' }) {
	return (
		<div className={styles.background}>
			{fields.map((field) => (
				<DetailCard
					heading={field}
					key={field}
					item={item}
					taxType={taxType}
					LABEL_MAPPING={LABEL_MAPPING}
					type={type}
				/>
			))}
		</div>
	);
}

export default Details;
