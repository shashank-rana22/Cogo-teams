import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMCall, IcMShip, IcMSettings, IcMAgentManagement } from '@cogoport/icons-react';
import { startCase, isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const COLORS_MAPPING = {
	call_customer  : '#F37166',
	send_quotation : '#88CAD1',
	other          : '#FCEEDF',
	default        : '#88CAD1',
};

const HEADER_MAPPING = {
	call_customer: {
		title : 'Call',
		icon  : <IcMCall width={10} height={10} />,
		color : '#FCEEDF',
	},
	send_quotation: {
		title : 'Shipping',
		icon  : <IcMShip width={10} height={10} />,
		color : '#F3FAFA',
	},
	other: {
		title : 'Other',
		icon  : <IcMSettings width={10} height={10} />,
		color : '#FCEEDF',
	},
	default: {
		title : 'Meeting',
		icon  : <IcMAgentManagement width={10} height={10} />,
		color : '#F3FAFA',
	},
};

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
