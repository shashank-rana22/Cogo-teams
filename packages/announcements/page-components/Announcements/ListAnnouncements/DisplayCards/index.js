import React from 'react';

import DisplayCard from './DisplayCard';
import styles from './styles.module.css';

function DisplayCards({ data = [] }) {
	return (
		<div className={styles.container}>
			{data.map((item) => (
				<DisplayCard data={item} />
			))}
		</div>
	);
}

export default DisplayCards;
