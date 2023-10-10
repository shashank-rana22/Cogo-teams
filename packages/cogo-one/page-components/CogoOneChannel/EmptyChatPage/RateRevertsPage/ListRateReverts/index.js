import React from 'react';

import dummyData from './dummyData';
import RateRevertCard from './RateRevertCard';
import styles from './styles.module.css';

function ListRateReverts() {
	return (
		<div className={styles.container}>
			{dummyData.map((itm) => (
				<RateRevertCard
					key={itm?.id}
					cardData={itm}
				/>
			))}
		</div>
	);
}

export default ListRateReverts;
