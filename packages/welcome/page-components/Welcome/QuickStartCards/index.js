import React from 'react';

import CardItem from './CardItem';
import styles from './styles.module.css';
import data from './tempData';

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
