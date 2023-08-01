import React from 'react';

import DetailCard from './DetailCard';
import styles from './styles.module.css';

const fields = ['Revenue', 'Expense'];

function Details({ item = {}, taxType = {} }) {
	return (
		<div className={styles.background}>
			{fields.map((field) => (<DetailCard heading={field} key={field} item={item} taxType={taxType} />))}
		</div>
	);
}

export default Details;
