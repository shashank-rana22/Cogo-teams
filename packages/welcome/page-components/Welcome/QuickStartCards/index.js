import React from 'react';

import CardItem from './CardItem';
import data from './quickStartData';
import styles from './styles.module.css';

function QuickStartCards() {
	return (
		<div className={styles.container}>
			<div className={styles.heading}>We have curated these links to help you quick start -</div>
			<div className={styles.cards_container}>
				{data.map((item) => <CardItem data={item} />)}
			</div>
		</div>
	);
}

export default QuickStartCards;
