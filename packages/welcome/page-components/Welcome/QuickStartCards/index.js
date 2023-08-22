import { useTranslation } from 'next-i18next';
import React from 'react';

import CardItem from './CardItem';
import getQuickStartCardsData from './quickStartData';
import styles from './styles.module.css';

function QuickStartCards() {
	const { t } = useTranslation(['welcome']);

	const data = getQuickStartCardsData(t);

	return (
		<div className={styles.container}>
			<div className={styles.heading}>{t('welcome:quick_start_title')}</div>
			<div className={styles.cards_container}>
				{data.map((item) => (
					<div key={item.title} className={styles.card_item}>
						<CardItem data={item} />
					</div>
				))}
			</div>
		</div>
	);
}

export default QuickStartCards;
