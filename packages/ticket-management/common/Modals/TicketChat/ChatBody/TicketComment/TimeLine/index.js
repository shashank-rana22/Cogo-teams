import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcCStarfull } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import getRenderHeader from '../../../../../../utils/renderHeader';

import styles from './styles.module.css';

function Rating({ rating = 0, t = () => {} }) {
	return (
		<div className={styles.rating_star}>
			<span className={styles.rating_label}>
				{t('myTickets:with_a_customer_rating_of')}
			</span>

			{[...Array(rating).keys()].map((key) => (
				<IcCStarfull key={key} className={styles.star} />
			))}
		</div>
	);
}

function TimeLine({
	createdAt = '', type = '', description = '', ticketType = '', name = '',
	userType = '', oldReviewerName = '', reviewerName = '', rating = 0,
}) {
	const { t } = useTranslation(['myTickets']);

	const timelineText = getRenderHeader({
		t,
		type,
		name,
		userType,
		description,
		oldReviewerName,
		ticketType,
		reviewerName,
	}) || '';

	if (!timelineText) {
		return null;
	}

	return (
		<div className={styles.container} key={description}>
			<div className={styles.timeline_container}>
				<div className={styles.timeline_date}>
					{formatDate({
						date       : createdAt,
						formatType : 'dateTime',
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
						timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
						separator  : ' ',
					})}
				</div>
				<div className={styles.text_wrapper}>
					<div className={styles.timeline_text}>
						{timelineText}
						{rating && type === 'mark_as_resolved' ? <Rating rating={rating} t={t} /> : null}
					</div>
					<div className={styles.chat_break} />
				</div>
			</div>
		</div>
	);
}

export default TimeLine;
