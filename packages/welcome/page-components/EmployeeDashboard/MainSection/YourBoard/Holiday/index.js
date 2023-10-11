import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMAirport, IcMArrowRight } from '@cogoport/icons-react';
import React from 'react';

import Loader from '../../../../../common/Loader';

import styles from './styles.module.css';

function Holiday({ data = {}, loading = false }) {
	const { holiday_date, holiday_occassion } = data || {};

	const getDate = (format) => formatDate({
		date       : holiday_date,
		dateFormat : GLOBAL_CONSTANTS.formats.date[format],
		formatType : 'date',
	});

	if (loading) {
		return (
			<div className={styles.container}>
				<Loader height="20px" count={3} />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.heading_title}>
				Next Holiday
			</div>
			<div className={styles.holiday_summary}>
				<div style={{ marginRight: 40 }}>
					<div className={styles.holiday_flex}>
						<div className={styles.holiday_date}>
							{getDate('dd')}
						</div>
						<div className={styles.holiday_month}>
							<div>
								{getDate('MMM')}
							</div>
							{getDate('yyyy')}
						</div>
					</div>
					{holiday_occassion || ''}
				</div>
				<IcMAirport fill="#828282" width={50} height={50} />
			</div>
			<div className={styles.view_calendar}>
				View Calendar
				{' '}
				<IcMArrowRight style={{ marginLeft: 8 }} />
			</div>
		</div>
	);
}

export default Holiday;
