import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import React from 'react';

import getRenderHeader from '../../../../../../utils/renderHeader';

import styles from './styles.module.css';

function Rating({ rating = 0 }) {
	return (
		<div>
			with a customer rating of
			{' '}
			{[...Array(rating).keys()].map((key) => (<span key={key}>&#11088;</span>))}
		</div>
	);
}

function TimeLine({
	createdAt = '', type = '', description = '', ticketType = '', name = '',
	userType = '', oldReviewerName = '', reviewerName = '', rating = 0,
}) {
	const timelineText = getRenderHeader({
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
			<div className={styles.timeline_text}>
				<div className={styles.timeline_container}>
					{formatDate({
						date       : createdAt,
						formatType : 'dateTime',
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
						timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
						separator  : ' ',
					})}
				</div>
				<div className={styles.timeline_container}>
					{timelineText}
					{rating && type === 'mark_as_resolved' ? <Rating rating={rating} /> : null}
				</div>
			</div>
			<div className={styles.break_the_chat} />
		</div>
	);
}

export default TimeLine;
