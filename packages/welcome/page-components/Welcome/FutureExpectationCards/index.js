import React from 'react';

import CardItem from './CardItem';
import styles from './styles.module.css';
import data from './tempData';

function FutureExpectationCards() {
	return (
		<div className={styles.container}>
			<div className={styles.heading}>What’s expected of you over the next 15 days -</div>
			<div className={styles.cards_container}>
				{data.map((item) => <CardItem data={item} />)}
			</div>
		</div>
	);
}

export default FutureExpectationCards;
