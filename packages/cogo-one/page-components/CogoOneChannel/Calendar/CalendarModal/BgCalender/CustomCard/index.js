import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase, isEmpty } from '@cogoport/utils';
import React from 'react';

import { HEADER_MAPPING, COLORS_MAPPING } from '../../../../../../constants/calenderConstants';

import styles from './styles.module.css';

const MORE_THEN = 2;

function CustomCard({ event = {} }) {
	const { eventsList = [] } = event || {};

	const firstTwoEvents = (eventsList || []).slice([GLOBAL_CONSTANTS.zeroth_index], MORE_THEN);

	const isShowMore = (eventsList || []).length > MORE_THEN;
	const firstEvent = [firstTwoEvents?.[GLOBAL_CONSTANTS.zeroth_index]];
	const moreCount = eventsList.length - MORE_THEN;

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				{(firstEvent || []).map((item) => {
					const eventData = HEADER_MAPPING[item?.subject] || HEADER_MAPPING?.default;

					if (isEmpty(eventData)) {
						return null;
					}

					return (
						<div
							className={styles.pills}
							style={{ background: `${eventData?.color}` }}
							key={item?.id}
						>
							{eventData?.icon}
							{' '}
							<span className={styles.label}>{eventData?.title}</span>
						</div>
					);
				})}
			</div>

			<div className={styles.events}>
				{(firstTwoEvents || []).map((item) => (
					<div className={styles.remarks_container} key={item?.id}>
						<div
							className={styles.remarks}
							style={{
								borderLeft: `2px solid ${COLORS_MAPPING[item?.subject]
								|| COLORS_MAPPING?.default}`,
							}}
						>
							{startCase(item?.subject)}

						</div>
					</div>
				))}
			</div>

			{isShowMore ? (
				<div className={styles.more}>
					+
					<span className={styles.more_count}>
						{moreCount}
					</span>

					More...
				</div>
			) : null}

		</div>
	);
}

export default CustomCard;
