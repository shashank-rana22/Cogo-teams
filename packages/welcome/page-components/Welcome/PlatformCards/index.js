import React from 'react';

import CardItem from './CardItem';
import data from './platformCardsData';
import styles from './styles.module.css';

function PlatformCards() {
	return (
		<div className={styles.container}>
			<div className={styles.heading}>Cogoport Platforms -</div>
			<div className={styles.cards_container}>
				{data.map((item) => <CardItem data={item} />)}
			</div>
		</div>
	);
}

export default PlatformCards;
