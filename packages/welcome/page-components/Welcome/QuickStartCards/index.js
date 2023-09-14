import { useTranslation } from 'next-i18next';
import React from 'react';

import CardItem from './CardItem';
import useTestsList from './CardItem/useListTests';
import useCourseList from './CardItem/useListUserCourses';
import getQuickStartCardsData from './quickStartData';
import styles from './styles.module.css';

function QuickStartCards() {
	const { t } = useTranslation(['welcome']);

	const { total_count:testsCount } = useTestsList();
	const { total_count:coursesCount } = useCourseList();

	const data = getQuickStartCardsData(t);

	return (
		<div className={styles.container}>
			<div className={styles.heading}>{t('welcome:quick_start_title')}</div>
			<div className={styles.cards_container}>
				{data.map((item) => (
					<div key={item.title} className={styles.card_item}>
						<CardItem data={item} coursesCount={coursesCount} testsCount={testsCount} />
					</div>
				))}
			</div>
		</div>
	);
}

export default QuickStartCards;
