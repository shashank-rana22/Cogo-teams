import { useTranslation } from 'next-i18next';
import React from 'react';

import CardItem from './CardItem';
import getPlatformCardsData from './platformCardsData';
import styles from './styles.module.css';

function PlatformCards() {
	const { t } = useTranslation(['welcome']);

	const data = getPlatformCardsData({ t });

	return (
		<div className={styles.container}>
			<div className={styles.heading}>{t('welcome:platform_cards_title')}</div>
			<div className={styles.cards_container}>
				{data.map((item) => (
					<div key={item.heading} className={styles.card_item}>
						<CardItem data={item} />
					</div>
				))}
			</div>
		</div>
	);
}

export default PlatformCards;
