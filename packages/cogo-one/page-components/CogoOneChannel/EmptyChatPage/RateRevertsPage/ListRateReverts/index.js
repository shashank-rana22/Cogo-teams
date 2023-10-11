import React from 'react';

// import dummyData from './dummyData';
import RateRevertCard from './RateRevertCard';
import styles from './styles.module.css';

function ListRateReverts({ list = [] }) {
	return (
		<div className={styles.container}>
			{(list || []).map((itm) => (
				<RateRevertCard
					key={itm?.id}
					cardData={itm}
				/>
			))}
		</div>
	);
}

export default ListRateReverts;
