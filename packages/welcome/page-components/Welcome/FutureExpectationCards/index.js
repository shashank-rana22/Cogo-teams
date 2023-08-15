import { IcMArrowLeft, IcMArrowRight } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import React, { useRef } from 'react';

import CardItem from './CardItem';
import getFutureExpectationCardsData from './futureExpectationCardsData';
import styles from './styles.module.css';

const DATA_LENGTH = 4;

const SCROLL_DIVISOR = 2;

function FutureExpectationCards() {
	const scrollRef = useRef('');

	const { t } = useTranslation(['welcome']);

	const scrollWidth = window.innerWidth / SCROLL_DIVISOR;

	const slide = (shift) => {
		scrollRef.current.scrollLeft += shift;
	};

	const data = getFutureExpectationCardsData(t);

	return (
		<div className={styles.container}>

			<div className={styles.heading}>{t('welcome:future_expectation_cards_title')}</div>

			<div className={styles.cards_container}>

				{data.length > DATA_LENGTH && (
					<div
						role="presentation"
						className={`${styles.arrow_container} ${styles.left}`}
						onClick={() => slide(-scrollWidth)}
					>
						<div className={styles.arrow}><IcMArrowLeft /></div>
					</div>
				)}

				<div className={styles.cards} ref={scrollRef}>
					{data.map((item, index) => (
						<CardItem data={item} key={item.heading} index={index} />
					))}

				</div>

				{data.length > DATA_LENGTH && (
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
