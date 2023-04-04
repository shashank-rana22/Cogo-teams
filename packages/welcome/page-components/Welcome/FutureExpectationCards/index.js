import { IcMArrowLeft, IcMArrowRight } from '@cogoport/icons-react';
import React, { useRef } from 'react';

import CardItem from './CardItem';
import data from './futureExpectationCardsData';
import styles from './styles.module.css';

function FutureExpectationCards() {
	const scrollRef = useRef('');

	const scrollWidth = window.innerWidth / 2;

	const slide = (shift) => {
		scrollRef.current.scrollLeft += shift;
	};

	return (
		<div className={styles.container}>

			<div className={styles.heading}>What’s expected of you over the next few days -</div>

			<div className={styles.cards_container}>

				{data.length > 4 && (
					<div
						role="presentation"
						className={`${styles.arrow_container} ${styles.left}`}
						onClick={() => slide(-scrollWidth)}
					>
						<div className={styles.arrow}><IcMArrowLeft /></div>
					</div>
				)}

				<div className={styles.cards} ref={scrollRef}>{data.map((item) => <CardItem data={item} />)}</div>

				{data.length > 4 && (
					<div
						role="presentation"
						className={`${styles.arrow_container} ${styles.right}`}
						onClick={() => slide(+scrollWidth)}
					>
						<div className={styles.arrow}><IcMArrowRight /></div>
					</div>
				)}
			</div>
		</div>
	);
}

export default FutureExpectationCards;
