import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMCall, IcMShip } from '@cogoport/icons-react';
import { startCase, isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const COLORS_MAPPING = {
	call_customer  : '#F37166',
	send_quotation : '#88CAD1',
	other          : '#FCEEDF',
};

const HEADER_MAPPING = {
	call_customer: {
		title : 'Call',
		icon  : <IcMCall width={10} height={10} />,
		color : '#FCEEDF',
	},
	send_quotation: {
		title : 'shipping',
		icon  : <IcMShip width={10} height={10} />,
		color : '#F3FAFA',
	},
};

const MORE_THEN = 2;

function CustomCard({ event = {} }) {
	const { marked_events = [], start = '', end = '' } = event || {};
	console.log('end:', end);
	console.log('start:', start);

	const firstTwoEvents = (marked_events || []).slice([GLOBAL_CONSTANTS.zeroth_index], MORE_THEN);

	const isShowMore = (marked_events || []).length > MORE_THEN;

	const moreCount = marked_events.length - MORE_THEN;

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				{(firstTwoEvents || []).map((item) => {
					const eventData = HEADER_MAPPING[item?.event_types];

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
							{eventData?.title}
						</div>
					);
				})}
			</div>
			<div className={styles.events}>
				{(firstTwoEvents || []).map((item) => (
					<div className={styles.remarks_container} key={item?.id}>
						<div
							className={styles.remarks}
							style={{ borderLeft: `2px solid ${COLORS_MAPPING[item?.event_types]}` }}
						>
							{startCase(item?.event_types)}
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
